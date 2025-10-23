# Decorator

## Introdução

Esse documento apresenta explicações referentes ao padrão de projeto Decorator e detalha como ele foi utilizado dentro do projeto Pode Pedir FCTE. 

## Decorator

O padrão Decorator é um padrão estrutural de objetos que tem como intenção "dinamicamente, agregar responsabilidades adicionais a um objeto. Os Decorators fornecem uma alternativa flexível ao uso de subclasses para extensão de funcionalidades" (GAMMA et al., 1995, p. 170).

Também conhecido como **Wrapper** (envoltório), o Decorator permite envolver um componente em outro objeto que acrescenta funcionalidades. O decorator segue a interface do componente que decora, de modo que sua presença é transparente para os clientes. Essa transparência permite encaixar decoradores recursivamente, permitindo um número ilimitado de responsabilidades adicionais.

### Motivação

Segundo Gamma et al. (1995), algumas vezes queremos acrescentar responsabilidades a objetos individuais, e não a toda uma classe. Uma forma de adicionar responsabilidades é através da herança, porém essa abordagem é inflexível, porque a escolha é feita estaticamente.

Uma abordagem mais flexível é embutir o componente em outro objeto que acrescente a funcionalidade desejada. O objeto que envolve o primeiro é chamado de decorator, que repassa solicitações para o componente, podendo executar ações adicionais antes ou depois do repasse.

### Vantagens

- Estabeleciamento de comportamentos de um objeto sem a necessidade de uma nova subclasse;
- Adição ou remoção de responsabilidades de um objeto durante a execução;
- Combinação de diversos comportamentos ao envolver o objeto com diferentes decoradores;
- Princípio da responsabilidade única;

### Desvantagens

- Difícil implementação de um decorador de tal maneira que o comportamento não dependa da ordem da pilha de decoradores;
- Confirguração inicial do código em camadas;

## Aplicação no projeto

<!-- - explicação de como utilizamos o padrão, insights, discussoes interessantes, aprofundamento em partes específicas do diagrama
- **comentar sobre ferramentas utilizadas, linguagens, fazer ligações com entregas anteriores!!**
- pode criar novas seções aqui se necessário com ###, por exemplo: Dificuldades Encontradas pela equipe -->

Os responsáveis pelo padrão inicialmente estudaram sobre o padrão de projeto, Decorator. Após isso, debateram por mensagens sobre como o padrão poderia ser implementado no projeto.

Para a aplicação no projeto, foi decidido que ele seria utilizado no contexto da opção de adicionais ao item de um pedido. Por exemplo, quando o usuário seleciona uma opção de adicional de queijo em seu hambúrguer.

### Diagrama 

O diagrama foi criado levando em consideração o [Diagrama de Classes](https://unbarqdsw2025-2-turma01.github.io/2025.2-T01-G7_PodePedirFCTE_Entrega_02/#/./Modelagem/ModelagemEstatica/DiagramaDeClasses) feito na segunda entrega e os debates entre as integrantes responsáveis pelo padrão de projeto.


#### Participantes do Diagrama:

- **ComponenteItem (Component)**: Interface que define a interface para objetos que podem ter responsabilidades acrescentadas dinamicamente. Define os métodos `getCusto()` e `getDescricao()` que todos os componentes devem implementar.

- **Item (ConcreteComponent)**: Classe concreta que implementa ComponenteItem e representa o objeto base ao qual responsabilidades adicionais podem ser atribuídas. Contém os atributos fundamentais de um item do cardápio (id, nome, descrição, preço, categoria, etc.).

- **DecoradorDeItem (Decorator)**: Classe abstrata que mantém uma referência para um objeto ComponenteItem (atributo `itemEmbrulhado`) e define uma interface que segue a interface de ComponenteItem. Implementa os métodos `getCusto()` e `getDescricao()` repassando as chamadas para o componente embrulhado.

- **OpcaoAdicional (ConcreteDecorator)**: Classe concreta que estende DecoradorDeItem e acrescenta responsabilidades ao componente. Adiciona um nome e preço de adicional, sobrescrevendo `getCusto()` para somar o preço adicional ao custo do item embrulhado, e `getDescricao()` para concatenar o nome do adicional à descrição original.

### Implementação

A implementação do padrão foi desenvolvida em **Node.js** utilizando **JavaScript**.

**Nota sobre a simulação de interfaces e classes abstratas:** JavaScript não possui suporte nativo para interfaces e classes abstratas como em linguagens fortemente tipadas (Java, C#, TypeScript). Para simular esse comportamento e manter a fidelidade ao padrão Decorator descrito por Gamma et al. (1995), foram adotadas as seguintes estratégias: (1) verificações no construtor que lançam erros caso a classe abstrata ou interface seja instanciada diretamente; (2) métodos que lançam erros caso não sejam sobrescritos pelas subclasses concretas. Essa abordagem garante o contrato de implementação, força a correta extensão das classes e facilita a detecção precoce de erros durante o desenvolvimento.

#### Interface ComponenteItem

```javascript
export class ComponenteItem {
  constructor() {
    if (this.constructor === ComponenteItem) {
      throw new Error("ComponenteItem é uma interface e não pode ser instanciada diretamente");
    }
  }

  getCusto() {
    throw new Error("Método getCusto() deve ser implementado");
  }

  getDescricao() {
    throw new Error("Método getDescricao() deve ser implementado");
  }
}
```

#### Classe Item (ConcreteComponent)

```javascript
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
```

#### Classe DecoradorDeItem (Decorator)

```javascript
import { ComponenteItem } from '../components/ComponenteItem.js';

export class DecoradorDeItem extends ComponenteItem {
  constructor(itemEmbrulhado) {
    super();
    if (this.constructor === DecoradorDeItem) {
      throw new Error("DecoradorDeItem é uma classe abstrata e não pode ser instanciada diretamente");
    }
    this.itemEmbrulhado = itemEmbrulhado;
  }

  getCusto() {
    return this.itemEmbrulhado.getCusto();
  }

  getDescricao() {
    return this.itemEmbrulhado.getDescricao();
  }
}
```

#### Classe OpcaoAdicional (ConcreteDecorator)

```javascript
import { DecoradorDeItem } from './DecoradorDeItem.js';

export class OpcaoAdicional extends DecoradorDeItem {
  constructor(itemEmbrulhado, nomeAdicional, precoAdicional) {
    super(itemEmbrulhado);
    this.nomeAdicional = nomeAdicional;
    this.precoAdicional = precoAdicional;
  }

  getCusto() {
    return this.itemEmbrulhado.getCusto() + this.precoAdicional;
  }

  getDescricao() {
    return `${this.itemEmbrulhado.getDescricao()} + ${this.nomeAdicional}`;
  }
}
```

### Demonstração de Uso

O código de demonstração ilustra como o padrão Decorator permite criar diferentes combinações de itens com adicionais:

```javascript
import { Item } from './models/Item.js';
import { OpcaoAdicional } from './decorators/OpcaoAdicional.js';

const hamburguer = new Item(
  1,
  "Hambúrguer Clássico",
  "Hambúrguer com pão, carne e alface",
  15.00,
  "Lanches"
);

const hamburguerComQueijo = new OpcaoAdicional(hamburguer, "Queijo", 3.00);

const hamburguerCompleto = new OpcaoAdicional(hamburguerComQueijo, "Bacon", 4.00);

console.log(hamburguerCompleto.getDescricao());
console.log(`R$ ${hamburguerCompleto.getCusto().toFixed(2)}`);
```

#### Passo a Passo para Rodar o Código

```bash
cd decorator
npm run demo
```

### Colaborações

Conforme descrito por Gamma et al. (1995, p. 173), o Decorator repassa solicitações para o seu objeto Component. Opcionalmente, ele pode executar operações adicionais antes e depois de repassar a solicitação. No nosso caso:

1. O cliente cria um `Item` base
2. Envolve o item com um ou mais `OpcaoAdicional` (decoradores)
3. Ao chamar `getCusto()` ou `getDescricao()`, a chamada é repassada através da cadeia de decoradores
4. Cada decorador adiciona sua contribuição (preço adicional ou texto na descrição) antes de repassar para o próximo

### Consequências e Benefícios

Segundo Gamma et al. (1995, p. 173-174), o padrão Decorator apresenta os seguintes benefícios e deficiências:

**Benefícios:**
1. **Maior flexibilidade do que a herança estática**: Responsabilidades podem ser acrescentadas e removidas em tempo de execução simplesmente associando-as e dissociando-as de um objeto
2. **Evita classes sobrecarregadas de características**: Funcionalidade pode ser composta a partir de peças simples, evitando o custo de características não utilizadas

**Deficiências:**
1. **Um decorador e seu componente não são idênticos**: Do ponto de vista da identidade de objeto, um componente decorado não é idêntico ao próprio componente
2. **Grande quantidade de pequenos objetos**: Um projeto que usa Decorator frequentemente resulta em sistemas compostos por muitos pequenos objetos parecidos

## Quadro de Participações

| **Membro da equipe** | **Função** |
| :------------- | :--------- |
| [Ana Clara](https://github.com/anabborges) | Documentação do padrão e criação do diagrama de classes |
| [Gabriela](https://github.com/gaubiela) | Documentação do padrão, ajustes e revisão do diagrama de classes, desenvolvimento do código demo |

## Referências

> GAMMA, Erich et al. **Padrões de Projeto: Soluções Reutilizáveis de Software Orientados a Objetos**. Porto Alegre: Bookman, 1995. p. 170-179.

> REFACTORING GURU. Decorator. Disponível em: https://refactoring.guru/design-patterns/decorator.

## Histórico de Versões

| **Data**       | **Versão** | **Descrição**                         | **Autor**                                      | **Revisor**                                      | **Data da Revisão** |
| :--------: | :----: | :-------------------------------- | :----------------------------------------: | :----------------------------------------: | :-------------: |
| 20/10/2025 |  `0.1`   | Criação da página | [`@Ana Clara`](https://github.com/anabborges) | [`@Gabriela`](https://github.com/gaubiela) |   23/10/2025    |
| 22/10/2025 |  `0.2`   | Adição da introdução, vantagens e desvantagens | [`@Ana Clara`](https://github.com/anabborges) | [`@Gabriela`](https://github.com/gaubiela) |   23/10/2025    |
| 22/10/2025 |  `0.3`   | Inicia a documentação da aplicação no projeto | [`@Ana Clara`](https://github.com/anabborges) | [`@Gabriela`](https://github.com/gaubiela) |   23/10/2025    |
| 23/10/2025 |  `0.4`   | Adiciona explicação completa do padrão, diagrama de classes, implementação e referências ao GoF | [`@Gabriela`](https://github.com/gaubiela) | [`@`](https://github.com/) |   00/00/0000    |