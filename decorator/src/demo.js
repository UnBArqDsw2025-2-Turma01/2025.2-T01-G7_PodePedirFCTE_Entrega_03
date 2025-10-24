import { Item } from './models/Item.js';
import { OpcaoAdicional } from './decorators/OpcaoAdicional.js';

console.log("=".repeat(70));
console.log("DEMONSTRAÇÃO DO PADRÃO DECORATOR - SISTEMA PODE PEDIR FCTE");
console.log("=".repeat(70));

console.log("\n[CENÁRIO 1] Criando um hambúrguer básico...\n");
const hamburguer = new Item(
  1,
  "Hambúrguer Clássico",
  "Hambúrguer com pão, carne e alface",
  15.00,
  "Lanches",
  true,
  20,
  "hamburguer.jpg"
);

console.log(`Item: ${hamburguer.nome}`);
console.log(`Descrição: ${hamburguer.getDescricao()}`);
console.log(`Custo: R$ ${hamburguer.getCusto().toFixed(2)}`);

console.log("\n" + "-".repeat(70));
console.log("\n[CENÁRIO 2] Adicionando queijo ao hambúrguer...\n");

const hamburguerComQueijo = new OpcaoAdicional(hamburguer, "Queijo", 3.00);

console.log(`Descrição: ${hamburguerComQueijo.getDescricao()}`);
console.log(`Custo: R$ ${hamburguerComQueijo.getCusto().toFixed(2)}`);

console.log("\n" + "-".repeat(70));
console.log("\n[CENÁRIO 3] Adicionando bacon ao hambúrguer com queijo...\n");

const hamburguerCompleto = new OpcaoAdicional(hamburguerComQueijo, "Bacon", 4.00);

console.log(`Descrição: ${hamburguerCompleto.getDescricao()}`);
console.log(`Custo: R$ ${hamburguerCompleto.getCusto().toFixed(2)}`);

console.log("\n" + "-".repeat(70));
console.log("\n[CENÁRIO 4] Criando uma pizza com múltiplos adicionais...\n");

const pizza = new Item(
  2,
  "Pizza Margherita",
  "Pizza com molho de tomate, queijo e manjericão",
  35.00,
  "Pizzas",
  true,
  30,
  "pizza.jpg"
);

console.log(`Item: ${pizza.nome}`);
console.log(`Descrição: ${pizza.getDescricao()}`);
console.log(`Custo: R$ ${pizza.getCusto().toFixed(2)}`);

console.log("\nAdicionando extras à pizza...\n");

let pizzaCustomizada = new OpcaoAdicional(pizza, "Borda recheada", 5.00);
pizzaCustomizada = new OpcaoAdicional(pizzaCustomizada, "Azeitonas", 2.50);
pizzaCustomizada = new OpcaoAdicional(pizzaCustomizada, "Cogumelos", 3.50);

console.log(`Descrição final: ${pizzaCustomizada.getDescricao()}`);
console.log(`Custo final: R$ ${pizzaCustomizada.getCusto().toFixed(2)}`);

console.log("\n" + "-".repeat(70));
console.log("\n[CENÁRIO 5] Demonstrando a transparência do Decorator...\n");

const suco = new Item(
  3,
  "Suco Natural",
  "Suco de laranja natural",
  8.00,
  "Bebidas",
  true,
  5,
  "suco.jpg"
);

const sucoComGelo = new OpcaoAdicional(suco, "Gelo", 0.00);
const sucoComGeloEHortela = new OpcaoAdicional(sucoComGelo, "Hortelã", 1.00);

console.log("Todos os objetos podem ser tratados através da interface ComponenteItem:");
console.log(`\n1. Suco básico: ${suco.getDescricao()} - R$ ${suco.getCusto().toFixed(2)}`);
console.log(`2. Com gelo: ${sucoComGelo.getDescricao()} - R$ ${sucoComGelo.getCusto().toFixed(2)}`);
console.log(`3. Com gelo e hortelã: ${sucoComGeloEHortela.getDescricao()} - R$ ${sucoComGeloEHortela.getCusto().toFixed(2)}`);

