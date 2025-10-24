import { FabricaDePedidos } from './FabricaDePedidos.js';
import { PedidoRetirada } from '../products/PedidoRetirada.js';

export class FabricaDePedidosRetirada extends FabricaDePedidos {
  criarPedido(dados) {
    console.log(`\n[FabricaDePedidosRetirada] Criando pedido de RETIRADA #${dados.id}...`);
    const pedido = new PedidoRetirada(dados.id, dados.cliente);
    console.log(`[FabricaDePedidosRetirada] Pedido de retirada criado com sucesso!`);
    return pedido;
  }
}
