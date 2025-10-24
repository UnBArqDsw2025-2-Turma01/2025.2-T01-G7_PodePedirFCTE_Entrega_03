import { DecoradorDeItem } from './DecoradorDeItem.js';

export class OpcaoAdicional extends DecoradorDeItem {
  constructor(itemEmbrulhado, nomeAdicional, precoAdicional) {
    super(itemEmbrulhado);
    this.nomeAdicional = nomeAdicional;
    this.precoAdicional = precoAdicional;
  }

  getCusto() {
    return this.itemEmbrulhado.getCusto() + this.precoAdicional;
  }

  getDescricao() {
    return `${this.itemEmbrulhado.getDescricao()} + ${this.nomeAdicional}`;
  }
}
