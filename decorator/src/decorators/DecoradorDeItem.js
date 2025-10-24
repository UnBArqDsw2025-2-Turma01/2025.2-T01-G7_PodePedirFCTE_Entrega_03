import { ComponenteItem } from '../components/ComponenteItem.js';

export class DecoradorDeItem extends ComponenteItem {
  constructor(itemEmbrulhado) {
    super();
    if (this.constructor === DecoradorDeItem) {
      throw new Error("DecoradorDeItem é uma classe abstrata e não pode ser instanciada diretamente");
    }
    this.itemEmbrulhado = itemEmbrulhado;
  }

  getCusto() {
    return this.itemEmbrulhado.getCusto();
  }

  getDescricao() {
    return this.itemEmbrulhado.getDescricao();
  }
}
