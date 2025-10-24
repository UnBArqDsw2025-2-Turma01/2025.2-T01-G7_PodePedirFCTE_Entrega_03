import { Pedido } from './Pedido.js';

export class PedidoRetirada extends Pedido {
  constructor(id, cliente) {
    super();
    this.id = id;
    this.itens = [];
    this.cliente = cliente;
    this.status = 'AGUARDANDO_PREPARO';
    this.horarioRetirada = null;
    this.valorTotal = 0;
  }

  calcularTotal() {
    this.valorTotal = this.itens.reduce((total, item) => {
      return total + item.calcularSubtotal();
    }, 0);
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

  definirHorarioRetirada(horario) {
    this.horarioRetirada = horario;
    console.log(`Horário de retirada definido para: ${horario.toLocaleString('pt-BR')}`);
  }
}
