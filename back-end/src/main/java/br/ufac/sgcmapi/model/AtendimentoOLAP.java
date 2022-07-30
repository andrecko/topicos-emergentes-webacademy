package br.ufac.sgcmapi.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.Immutable;

@Entity
@Immutable
@Table(name = "atendimento_olap")
public class AtendimentoOLAP implements Serializable {

    @Id
    private Long atendimentoId;
    private String atendimentoHora;
    private String profissionalEspecialidade;
    private String unidadeNome;
    private String convenioNome;
    private String pacienteSexo;
    private String pacienteFaixaEtaria;
    private String pacienteNovo;
    private String pacienteTemAusencia;

    public Long getAtendimentoId() {
        return atendimentoId;
    }

    public void setAtendimentoId(Long atendimentoId) {
        this.atendimentoId = atendimentoId;
    }

    public String getAtendimentoHora() {
        return atendimentoHora;
    }

    public void setAtendimentoHora(String atendimentoHora) {
        this.atendimentoHora = atendimentoHora;
    }

    public String getProfissionalEspecialidade() {
        return profissionalEspecialidade;
    }

    public void setProfissionalEspecialidade(String profissionalEspecialidade) {
        this.profissionalEspecialidade = profissionalEspecialidade;
    }

    public String getUnidadeNome() {
        return unidadeNome;
    }

    public void setUnidadeNome(String unidadeNome) {
        this.unidadeNome = unidadeNome;
    }

    public String getConvenioNome() {
        return convenioNome;
    }

    public void setConvenioNome(String convenioNome) {
        this.convenioNome = convenioNome;
    }

    public String getPacienteSexo() {
        return pacienteSexo;
    }

    public void setPacienteSexo(String pacienteSexo) {
        this.pacienteSexo = pacienteSexo;
    }

    public String getPacienteFaixaEtaria() {
        return pacienteFaixaEtaria;
    }

    public void setPacienteFaixaEtaria(String pacienteFaixaEtaria) {
        this.pacienteFaixaEtaria = pacienteFaixaEtaria;
    }

    public String getPacienteNovo() {
        return pacienteNovo;
    }

    public void setPacienteNovo(String pacienteNovo) {
        this.pacienteNovo = pacienteNovo;
    }

    public String getPacienteTemAusencia() {
        return pacienteTemAusencia;
    }

    public void setPacienteTemAusencia(String pacienteTemAusencia) {
        this.pacienteTemAusencia = pacienteTemAusencia;
    }

}
