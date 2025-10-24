export class ComponenteItem {
  constructor() {
    if (this.constructor === ComponenteItem) {
      throw new Error("ComponenteItem é uma interface e não pode ser instanciada diretamente");
    }
  }

  getCusto() {
    throw new Error("Método getCusto() deve ser implementado");
  }

  getDescricao() {
    throw new Error("Método getDescricao() deve ser implementado");
  }
}
