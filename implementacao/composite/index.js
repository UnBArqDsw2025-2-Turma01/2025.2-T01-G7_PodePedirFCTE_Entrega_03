// ItemVendavel.js (Component - Interface conceitual)
class ItemVendavel {
    getPreco() {
        throw new Error("Método getPreco() deve ser implementado.");
    }

    getNome() {
        throw new Error("Método getNome() deve ser implementado.");
    }
}

// ItemSimples.js (Leaf)
class ItemSimples extends ItemVendavel {
    constructor(nome, preco) {
        super();
        this.nome = nome;
        this.preco = preco;
    }

    getPreco() {
        return this.preco;
    }

    getNome() {
        return this.nome;
    }
}

// Combo.js (Composite)
class Combo extends ItemVendavel {
    constructor(nome) {
        super();
        this.nome = nome;
        this.itens = [];
    }

    add(item) {
        this.itens.push(item);
    }

    remove(item) {
        this.itens = this.itens.filter(i => i !== item);
    }

    getPreco() {
        return this.itens.reduce((total, item) => total + item.getPreco(), 0);
    }

    getNome() {
        return this.nome;
    }

    listarItens() {
        console.log(`Itens do combo ${this.nome}:`);
        this.itens.forEach(item => console.log(`- ${item.getNome()} (${item.getPreco()} R$)`));
    }
}

// index.js (Teste/Demonstração)

// Criando itens simples
const refrigerante = new ItemSimples('Refrigerante', 5);
const lanche = new ItemSimples('Lanche', 15);
const batata = new ItemSimples('Batata', 7);

// Criando combo
const combo1 = new Combo('Combo Básico');
combo1.add(lanche);
combo1.add(batata);
combo1.add(refrigerante);

// Criando outro combo com combos internos (Composite dentro de Composite)
const comboMaster = new Combo('Combo Master');
comboMaster.add(combo1);
comboMaster.add(new ItemSimples('Sobremesa', 6));

// Demonstração
console.log(`Preço do ${combo1.getNome()}: ${combo1.getPreco()} R$`);
combo1.listarItens();

console.log(`\nPreço do ${comboMaster.getNome()}: ${comboMaster.getPreco()} R$`);
comboMaster.listarItens();
