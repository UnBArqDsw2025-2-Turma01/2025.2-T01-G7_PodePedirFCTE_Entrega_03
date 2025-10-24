// Classe responsável por gerenciar pedidos utilizando o padrão Singleton
class OrquestradorDePedidos {
    // Propriedade estática que vai armazenar a instância única da classe
    static instancia;

    // Construtor da classe
    constructor() {
        console.log("Orquestrador de Pedidos criado!");
        // Array que armazenará todos os pedidos
        this.pedidos = [];
    }

    // Método estático para obter a instância única da classe
    static getInstance() {
        // Se ainda não existe instância, cria uma nova
        if (!OrquestradorDePedidos.instancia) {
            OrquestradorDePedidos.instancia = new OrquestradorDePedidos();
        } else {
            // Caso já exista, apenas informa que a instância existente será usada
            console.log("A instância já existe! Retornando a instância existente.");
        }
        // Retorna sempre a mesma instância
        return OrquestradorDePedidos.instancia;
    }

    // Método para adicionar um pedido ao array de pedidos
    adicionarPedido(pedido) {
        this.pedidos.push(pedido);
        console.log(`Pedido adicionado: ${pedido}`);
    }

    // Método para listar todos os pedidos atuais
    listarPedidos() {
        console.log("Pedidos atuais:", this.pedidos);
    }
}

// Exporta a classe para que possa ser utilizada em outros arquivos
module.exports = { OrquestradorDePedidos };
