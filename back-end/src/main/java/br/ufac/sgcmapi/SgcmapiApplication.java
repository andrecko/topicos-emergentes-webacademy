package br.ufac.sgcmapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SgcmapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SgcmapiApplication.class, args);
	}

}
