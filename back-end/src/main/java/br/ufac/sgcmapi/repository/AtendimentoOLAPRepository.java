package br.ufac.sgcmapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufac.sgcmapi.model.AtendimentoOLAP;

public interface AtendimentoOLAPRepository extends JpaRepository<AtendimentoOLAP, Long> {
    
}
