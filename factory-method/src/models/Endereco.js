export class Endereco {
  constructor(rua, numero, bairro, cidade, cep) {
    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.cep = cep;
  }

  obterEnderecoCompleto() {
    return `${this.rua}, ${this.numero} - ${this.bairro}, ${this.cidade} - CEP: ${this.cep}`;
  }
}
