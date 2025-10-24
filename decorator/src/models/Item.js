import { ComponenteItem } from '../components/ComponenteItem.js';

export class Item extends ComponenteItem {
  constructor(idItem, nome, descricao, preco, categoria, disponibilidade = true, tempoPreparo = 15, imagemUrl = "") {
    super();
    this.idItem = idItem;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.categoria = categoria;
    this.disponibilidade = disponibilidade;
    this.tempoPreparo = tempoPreparo;
    this.imagemUrl = imagemUrl;
  }

  getCusto() {
    return this.preco;
  }

  getDescricao() {
    return this.descricao;
  }
}
