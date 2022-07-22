import { Especialidade } from "./especialidade";
import { Unidade } from "./unidade";

export interface Profissional {
    id: number;
    nome: string;
    registroConselho: string;
    especialidade: Especialidade;
    unidade: Unidade;
    telefone: string;
    email: string;
}
