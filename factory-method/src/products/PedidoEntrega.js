import { Pedido } from './Pedido.js';

export class PedidoEntrega extends Pedido {
  constructor(id, cliente) {
    super();
    this.id = id;
    this.itens = [];
    this.cliente = cliente;
    this.status = 'AGUARDANDO_PREPARO';
    this.enderecoEntrega = null;
    this.taxaEntrega = 0;
    this.valorTotal = 0;
  }

  calcularTotal() {
    const subtotal = this.itens.reduce((total, item) => {
      return total + item.calcularSubtotal();
    }, 0);

    this.valorTotal = subtotal + this.taxaEntrega;
    return this.valorTotal;
  }

  obterStatus() {
    return this.status;
  }

  adicionarItem(item) {
    this.itens.push(item);
    this.calcularTotal();
  }

  removerItem(item) {
    const index = this.itens.indexOf(item);
    if (index > -1) {
      this.itens.splice(index, 1);
      this.calcularTotal();
    }
  }

  calcularTaxaEntrega() {
    const distanciaSimulada = Math.random() * 10;
    this.taxaEntrega = 5.00 + (distanciaSimulada * 2.00);
    this.calcularTotal();
    return this.taxaEntrega;
  }

  definirEnderecoEntrega(endereco) {
    this.enderecoEntrega = endereco;
    this.calcularTaxaEntrega();
    console.log(`Endereço de entrega definido: ${endereco.obterEnderecoCompleto()}`);
    console.log(`Taxa de entrega: R$ ${this.taxaEntrega.toFixed(2)}`);
  }
}
