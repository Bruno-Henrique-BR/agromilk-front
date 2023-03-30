import { cnpj } from 'cpf-cnpj-validator';

export interface Laticinio {
  idLaticinio: any;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  telefone: string;
}