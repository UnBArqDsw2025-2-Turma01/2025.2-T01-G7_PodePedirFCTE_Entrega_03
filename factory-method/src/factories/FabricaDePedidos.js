export class FabricaDePedidos {
  constructor() {
    if (this.constructor === FabricaDePedidos) {
      throw new Error("FabricaDePedidos é uma interface e não pode ser instanciada diretamente");
    }
  }

  criarPedido(dados) {
    throw new Error("Método criarPedido() deve ser implementado pelas fábricas concretas");
  }
}
