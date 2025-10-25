import { CartaoPagamento } from "./CartaoPagamento";
import { PagamentoTarget } from "./PagamentoTarget";

export class PagamentoAdapter implements PagamentoTarget {
  private cartao: CartaoPagamento;

  constructor(cartao: CartaoPagamento) {
    this.cartao = cartao;
  }

  realizarPagamento(valor: number): boolean {
    console.log("Adaptando chamada para o CartaoPagamento...");
    return this.cartao.autorizarTransacao(valor);
  }
}