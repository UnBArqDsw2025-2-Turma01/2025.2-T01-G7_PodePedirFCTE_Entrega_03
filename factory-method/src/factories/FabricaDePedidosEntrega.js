import { FabricaDePedidos } from './FabricaDePedidos.js';
import { PedidoEntrega } from '../products/PedidoEntrega.js';

export class FabricaDePedidosEntrega extends FabricaDePedidos {
  criarPedido(dados) {
    console.log(`\n[FabricaDePedidosEntrega] Criando pedido de ENTREGA #${dados.id}...`);
    const pedido = new PedidoEntrega(dados.id, dados.cliente);
    console.log(`[FabricaDePedidosEntrega] Pedido de entrega criado com sucesso!`);
    return pedido;
  }
}
