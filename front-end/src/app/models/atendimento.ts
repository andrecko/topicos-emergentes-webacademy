import { Convenio } from "./convenio";
import { Paciente } from "./paciente";
import { Profissional } from "./profissional";

export interface Atendimento {
    id: number;
    data: string;
    hora: string;
    profissional: Profissional;
    convenio: Convenio;
    paciente: Paciente;
    status: string;
}
