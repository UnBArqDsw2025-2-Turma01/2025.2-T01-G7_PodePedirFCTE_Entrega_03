export class Produto {
  constructor(id, nome, preco, disponivel = true) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.disponivel = disponivel;
  }

  obterPreco() {
    return this.preco;
  }
}
