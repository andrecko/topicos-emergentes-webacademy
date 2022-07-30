package br.ufac.sgcmapi.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import br.ufac.sgcmapi.model.Atendimento;
import br.ufac.sgcmapi.model.AtendimentoOLAP;
import br.ufac.sgcmapi.model.EStatusAtendimento;
import br.ufac.sgcmapi.model.Profissional;
import br.ufac.sgcmapi.repository.AtendimentoOLAPRepository;
import br.ufac.sgcmapi.repository.AtendimentoRepository;
import weka.classifiers.Classifier;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.SerializationHelper;
import weka.core.Utils;
import weka.core.converters.ConverterUtils.DataSource;

@Service
public class AtendimentoService implements ICrudService<Atendimento> {

    private final AtendimentoRepository repo;
    private final ProfissionalService servicoProfissional;
    private final AtendimentoOLAPRepository repoOLAP;

    @Autowired
    public AtendimentoService(AtendimentoRepository repo, ProfissionalService servicoProfissional, AtendimentoOLAPRepository repoOLAP) {
        this.repo = repo;
        this.servicoProfissional = servicoProfissional;
        this.repoOLAP = repoOLAP;
    }

    @Override
    public List<Atendimento> getAll() {
        return repo.findAll();
    }

    @Override
    public Atendimento getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Atendimento> getByAll(String termoBusca) {
        return repo.findByAll(termoBusca);
    }

    public List<Atendimento> getByProfissional(Long id) {
        Profissional profissional = servicoProfissional.getById(id);
        return repo.findByProfissional(profissional);
    }

    @Override
    public Atendimento save(Atendimento objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        Atendimento registro = repo.getById(id);
        registro.setStatus(EStatusAtendimento.CANCELADO);
        repo.save(registro);
    }

    public Atendimento updateStatus(Long id) {
        Atendimento registro = repo.getById(id);
        registro.setStatus(registro.getStatus().next());
        registro = repo.save(registro);
        return registro;
    }

    public List<String> getHorarios(Long profissional_id, Date data) {
        Profissional profissional = servicoProfissional.getById(profissional_id);
        List<Atendimento> atendimentos = repo.findByProfissionalAndData(profissional, data);
        List<String> registros = atendimentos.stream()
                                             .filter(item -> item.getStatus() != EStatusAtendimento.CANCELADO)
                                             .map(item -> item.getHora().toString())
                                             .collect(Collectors.toList());
        return registros;
    }

    @Scheduled(cron = "0 * * * * *")
    private void atualizaIndicadorAusencia() {

        List<EStatusAtendimento> status = new ArrayList<EStatusAtendimento>();
        status.add(EStatusAtendimento.AGENDADO);
        status.add(EStatusAtendimento.CONFIRMADO);

        Date data = new Date(System.currentTimeMillis());

        List<Atendimento> atendimentos = repo.findByStatusInAndDataGreaterThanEqual(status, data);

        atendimentos.forEach(item -> {

            AtendimentoOLAP registro = repoOLAP.findById(item.getId()).orElse(null);

            if (registro != null) {

                Instances instancias;
                try {
                    instancias = DataSource.read("paciente_ausente.arff");
                    instancias.setClassIndex(instancias.numAttributes() - 1);

                    double[] valores = new double[instancias.numAttributes()];
                    valores[0] = instancias.attribute(0).indexOfValue(registro.getAtendimentoHora());
                    valores[1] = instancias.attribute(1).indexOfValue(registro.getProfissionalEspecialidade());
                    valores[2] = instancias.attribute(2).indexOfValue(registro.getUnidadeNome());
                    valores[3] = instancias.attribute(3).indexOfValue(registro.getConvenioNome());
                    valores[4] = instancias.attribute(4).indexOfValue(registro.getPacienteSexo());
                    valores[5] = instancias.attribute(5).indexOfValue(registro.getPacienteFaixaEtaria());
                    valores[6] = instancias.attribute(6).indexOfValue(registro.getPacienteNovo());
                    valores[7] = instancias.attribute(7).indexOfValue(registro.getPacienteTemAusencia());
                    valores[8] = Utils.missingValue();

                    Instance instancia = new DenseInstance(1.0, valores);
                    instancias.add(instancia);

                    double resultado = 0;

                    File modelo = ResourceUtils.getFile("classpath:paciente_ausente.model");
                    InputStream isModelo = new FileInputStream(modelo);
                    Classifier classificador = (Classifier) SerializationHelper.read(isModelo);
                    resultado = classificador.classifyInstance(instancias.lastInstance());

                    String novaClasse = instancias.classAttribute().value((int) resultado);
                    item.setIndicadorAusencia(novaClasse.equals("True"));
                    this.save(item);

                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }

            }
            
        });

    }
    
}
