import { Cliente } from './models/Cliente.js';
import { Produto } from './models/Produto.js';
import { Endereco } from './models/Endereco.js';
import { ItemPedido } from './models/ItemPedido.js';
import { FabricaDePedidosRetirada } from './factories/FabricaDePedidosRetirada.js';
import { FabricaDePedidosEntrega } from './factories/FabricaDePedidosEntrega.js';

console.log('='.repeat(80));
console.log('DEMONSTRAÇÃO DO PADRÃO FACTORY METHOD');
console.log('Sistema de Pedidos - PodePedirFCTE');
console.log('='.repeat(80));

console.log('\nPREPARANDO DADOS DE EXEMPLO...\n');

const cliente1 = new Cliente(1, 'João Silva', '(61) 98765-4321', 'joao@email.com');
const cliente2 = new Cliente(2, 'Maria Santos', '(61) 91234-5678', 'maria@email.com');

console.log('✓ Clientes criados:');
console.log(`  - ${cliente1.obterDados()}`);
console.log(`  - ${cliente2.obterDados()}`);

const produto1 = new Produto(1, 'X-Burger Especial', 25.90);
const produto2 = new Produto(2, 'Batata Frita Grande', 12.00);
const produto3 = new Produto(3, 'Refrigerante 350ml', 5.00);
const produto4 = new Produto(4, 'Milkshake de Chocolate', 15.00);

console.log('\n✓ Produtos disponíveis no cardápio:');
console.log(`  - ${produto1.nome}: R$ ${produto1.obterPreco().toFixed(2)}`);
console.log(`  - ${produto2.nome}: R$ ${produto2.obterPreco().toFixed(2)}`);
console.log(`  - ${produto3.nome}: R$ ${produto3.obterPreco().toFixed(2)}`);
console.log(`  - ${produto4.nome}: R$ ${produto4.obterPreco().toFixed(2)}`);

const endereco1 = new Endereco('Rua das Flores', '123', 'Asa Sul', 'Brasília', '70000-000');

console.log('\n✓ Endereço de entrega cadastrado:');
console.log(`  - ${endereco1.obterEnderecoCompleto()}`);

console.log('\n' + '='.repeat(80));
console.log('CENÁRIO 1: PEDIDO DE RETIRADA');
console.log('='.repeat(80));

const fabricaRetirada = new FabricaDePedidosRetirada();

const pedidoRetirada = fabricaRetirada.criarPedido({
  id: 1001,
  cliente: cliente1
});

console.log(`\nDetalhes do pedido:`);
console.log(`   ID: #${pedidoRetirada.id}`);
console.log(`   Cliente: ${pedidoRetirada.cliente.nome}`);
console.log(`   Status: ${pedidoRetirada.obterStatus()}`);

console.log(`\nAdicionando itens ao pedido de retirada...`);

const item1 = new ItemPedido(produto1, 2, 'Sem cebola');
const item2 = new ItemPedido(produto2, 1);
const item3 = new ItemPedido(produto3, 2);

pedidoRetirada.adicionarItem(item1);
console.log(`   ✓ ${item1.quantidade}x ${item1.produto.nome} - R$ ${item1.calcularSubtotal().toFixed(2)} (${item1.observacoes})`);

pedidoRetirada.adicionarItem(item2);
console.log(`   ✓ ${item2.quantidade}x ${item2.produto.nome} - R$ ${item2.calcularSubtotal().toFixed(2)}`);

pedidoRetirada.adicionarItem(item3);
console.log(`   ✓ ${item3.quantidade}x ${item3.produto.nome} - R$ ${item3.calcularSubtotal().toFixed(2)}`);

const horarioRetirada = new Date();
horarioRetirada.setHours(horarioRetirada.getHours() + 1);
pedidoRetirada.definirHorarioRetirada(horarioRetirada);

console.log(`\nTOTAL DO PEDIDO DE RETIRADA: R$ ${pedidoRetirada.calcularTotal().toFixed(2)}`);

console.log('\n' + '='.repeat(80));
console.log('CENÁRIO 2: PEDIDO DE ENTREGA');
console.log('='.repeat(80));

const fabricaEntrega = new FabricaDePedidosEntrega();

const pedidoEntrega = fabricaEntrega.criarPedido({
  id: 1002,
  cliente: cliente2
});

console.log(`\nDetalhes do pedido:`);
console.log(`   ID: #${pedidoEntrega.id}`);
console.log(`   Cliente: ${pedidoEntrega.cliente.nome}`);
console.log(`   Status: ${pedidoEntrega.obterStatus()}`);

console.log(`\nAdicionando itens ao pedido de entrega...`);

const item4 = new ItemPedido(produto1, 1);
const item5 = new ItemPedido(produto4, 2);

pedidoEntrega.adicionarItem(item4);
console.log(`   ✓ ${item4.quantidade}x ${item4.produto.nome} - R$ ${item4.calcularSubtotal().toFixed(2)}`);

pedidoEntrega.adicionarItem(item5);
console.log(`   ✓ ${item5.quantidade}x ${item5.produto.nome} - R$ ${item5.calcularSubtotal().toFixed(2)}`);

console.log(`\nConfigurando entrega...`);
pedidoEntrega.definirEnderecoEntrega(endereco1);

const subtotal = pedidoEntrega.itens.reduce((acc, item) => acc + item.calcularSubtotal(), 0);
console.log(`\nSubtotal: R$ ${subtotal.toFixed(2)}`);
console.log(`Taxa de entrega: R$ ${pedidoEntrega.taxaEntrega.toFixed(2)}`);
console.log(`TOTAL DO PEDIDO DE ENTREGA: R$ ${pedidoEntrega.calcularTotal().toFixed(2)}`);

console.log('\n' + '='.repeat(80));
console.log('RESUMO DOS PEDIDOS CRIADOS');
console.log('='.repeat(80));

console.log(`\nPedido #${pedidoRetirada.id} (RETIRADA)`);
console.log(`   Cliente: ${pedidoRetirada.cliente.nome}`);
console.log(`   Itens: ${pedidoRetirada.itens.length}`);
console.log(`   Horário de retirada: ${pedidoRetirada.horarioRetirada?.toLocaleString('pt-BR')}`);
console.log(`   Total: R$ ${pedidoRetirada.valorTotal.toFixed(2)}`);

console.log(`\nPedido #${pedidoEntrega.id} (ENTREGA)`);
console.log(`   Cliente: ${pedidoEntrega.cliente.nome}`);
console.log(`   Itens: ${pedidoEntrega.itens.length}`);
console.log(`   Endereço: ${pedidoEntrega.enderecoEntrega?.obterEnderecoCompleto()}`);
console.log(`   Total (com taxa): R$ ${pedidoEntrega.valorTotal.toFixed(2)}`);

console.log('\n' + '='.repeat(80));
console.log('DEMONSTRAÇÃO CONCLUÍDA COM SUCESSO!');
console.log('='.repeat(80));
console.log('\nPadrão Factory Method implementado:');
console.log('   - Interface FabricaDePedidos (Creator)');
console.log('   - FabricaDePedidosRetirada e FabricaDePedidosEntrega (Concrete Creators)');
console.log('   - Interface Pedido (Product)');
console.log('   - PedidoRetirada e PedidoEntrega (Concrete Products)');
console.log('\n');
