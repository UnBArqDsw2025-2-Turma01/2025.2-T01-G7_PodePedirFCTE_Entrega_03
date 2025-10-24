export class Pedido {
  constructor() {
    if (this.constructor === Pedido) {
      throw new Error("Pedido é uma interface e não pode ser instanciada diretamente");
    }
  }

  calcularTotal() {
    throw new Error("Método calcularTotal() deve ser implementado");
  }

  obterStatus() {
    throw new Error("Método obterStatus() deve ser implementado");
  }

  adicionarItem(item) {
    throw new Error("Método adicionarItem() deve ser implementado");
  }

  removerItem(item) {
    throw new Error("Método removerItem() deve ser implementado");
  }
}
