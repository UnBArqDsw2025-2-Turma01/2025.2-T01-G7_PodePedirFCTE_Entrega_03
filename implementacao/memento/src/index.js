// --- Classe Memento ---
class CarrinhoMemento {
    constructor(state) {
        this.state = JSON.parse(JSON.stringify(state));
    }

    getState() {
        return this.state;
    }
}

class CarrinhoDeCompras {
    constructor() {
        this.itens = [];
    }

    adicionarItem(item) {
        this.itens.push(item);
        console.log(`Item adicionado: ${item}`);
    }

    removerItem(item) {
        const index = this.itens.indexOf(item);
        if (index !== -1) {
            this.itens.splice(index, 1);
            console.log(`Item removido: ${item}`);
        } else {
            console.log(`Item "${item}" não encontrado.`);
        }
    }

    createMemento() {
        return new CarrinhoMemento(this.itens);
    }

    restore(memento) {
        this.itens = memento.getState();
        console.log("↩Carrinho restaurado para estado anterior!");
    }

    exibirCarrinho() {
        console.log("Carrinho atual:", this.itens.join(", ") || "(vazio)");
    }
}

class HistoricoCarrinho {
    constructor() {
        this.historico = [];
    }

    salvarEstado(carrinho) {
        const memento = carrinho.createMemento();
        this.historico.push(memento);
        console.log("Estado do carrinho salvo!");
    }

    desfazer(carrinho) {
        if (this.historico.length === 0) {
            console.log("Nenhum estado anterior para restaurar.");
            return;
        }
        const memento = this.historico.pop();
        carrinho.restore(memento);
    }
}


const carrinho = new CarrinhoDeCompras();
const historico = new HistoricoCarrinho();

carrinho.adicionarItem("Pizza Calabresa");
historico.salvarEstado(carrinho);

carrinho.adicionarItem("Refrigerante");
historico.salvarEstado(carrinho);

carrinho.adicionarItem("Sobremesa");
carrinho.exibirCarrinho();

historico.desfazer(carrinho);
carrinho.exibirCarrinho();

historico.desfazer(carrinho);
carrinho.exibirCarrinho();
