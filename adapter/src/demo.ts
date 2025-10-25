import { CartaoPagamento } from "./CartaoPagamento";
import { PagamentoAdapter } from "./PagamentoAdapter";
import { PagamentoTarget } from "./PagamentoTarget";

const cartao1 = new CartaoPagamento(
    1, 
    "Fagundes Nogueira Pinheiro Santana", 
    "0123-4567-8901-2345", 
    "Visa", 
    "08/2032", 
    "678", 
    "Fagundes N. P. Santana", 
    true
);

const cartao2 = new CartaoPagamento(
  2,
  "Fagundes Nogueira Pinheiro Santana",
  "9876-5432-1098-7654",
  "Mastercard",
  "05/2030",
  "23",
  "Fagundes Nogueira P. S.",
  true
);

const cartao3 = new CartaoPagamento(
  2,
  "Fagundes Nogueira Pinheiro Santana",
  "9876-5432-1098-7654",
  "Hipercard",
  "05/2030",
  "444",
  "Fagundes Nogueira P. S.",
  false 
);

const adapter1: PagamentoTarget = new PagamentoAdapter(cartao1);
const sucesso1 = adapter1.realizarPagamento(550.0);
console.log(sucesso1 ? "Pagamento aprovado!\n" : "Pagamento recusado!\n");

const adapter2: PagamentoTarget = new PagamentoAdapter(cartao2);
const sucesso2 = adapter2.realizarPagamento(2200.0);
console.log(sucesso2 ? "Pagamento aprovado!\n" : "Pagamento recusado!\n");

const adapter3: PagamentoTarget = new PagamentoAdapter(cartao3);
const sucesso3 = adapter3.realizarPagamento(1500.0);
console.log(sucesso3 ? "Pagamento aprovado!\n" : "Pagamento recusado!\n");