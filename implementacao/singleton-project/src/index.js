const { OrquestradorDePedidos } = require("./core/Configuracao");

// Tentando criar múltiplas instâncias
const orquestrador1 = OrquestradorDePedidos.getInstance();
const orquestrador2 = OrquestradorDePedidos.getInstance();

// Adicionando pedidos
orquestrador1.adicionarPedido("Pedido 001");
orquestrador2.adicionarPedido("Pedido 002");

// Listando pedidos de ambas as instâncias
orquestrador1.listarPedidos();
orquestrador2.listarPedidos();

// Verificação se é a mesma instância
console.log("Mesma instância?", orquestrador1 === orquestrador2);
