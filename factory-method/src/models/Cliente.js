export class Cliente {
  constructor(id, nome, telefone, email) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
  }

  obterDados() {
    return `Cliente #${this.id}: ${this.nome} | Tel: ${this.telefone} | Email: ${this.email}`;
  }
}
