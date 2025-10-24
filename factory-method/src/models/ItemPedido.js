export class ItemPedido {
  constructor(produto, quantidade, observacoes = '') {
    this.produto = produto;
    this.quantidade = quantidade;
    this.observacoes = observacoes;
    this.precoUnitario = produto.obterPreco();
  }

  calcularSubtotal() {
    return this.precoUnitario * this.quantidade;
  }
}
