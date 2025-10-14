# Abstract Factory

## Introdução

Esse documento apresenta explicações referentes ao padrão de projeto Abstract Factory e detalha como ele foi utilizado dentro do projeto Pode Pedir FCTE. 

O padrão Abstract Factory provê uma interface para a criação de famílias de objetos relacionados ou dependentes sem especificar suas classes concretas (GAMMA et. al., 1995).

## Abstract Factory

O padrão Factory Method surgiu a partir de um problema onde havia uma classe sendo utilizada em grande proporção em um sistema. Entretando, após a expansão do sistema, a adição de classes semelhantes a ela gera a necessidade de revisão e possível alteração em todo o código da aplicação.

O padrão Abstract Factory é apresentado no livro Design Patterns: Elements of Reusable Object-Oriented Software como um tipo de GOF criacional. Para isso, ele vem como uma forma de criar famílias de produtos relacionados sem instânciar as classes diretamente, de forma que ele pode ser aplicado para cenários em que:

- O sistema deve ser idependente de como seus produtos são criados, compostos e representados;
- O sistema deve ser configurado com uma de múltiplas famílias de produtos;
- A família de objetos de produto é designada para ser usada em conjunto, e o programador deve forçar que isso aconteça;
- É pretendido prover uma biblioteca de classe de produtos, e é intendido que seja acessado apenas suas interfaces e não suas implementações.

A fim de ter uma explicação mais lúdica e didática, segue a explicação que o site [Refactoring Guru](https://refactoring.guru/) apresenta para explicar a problemática que incentivou a criação do padrão:

[Adicinar explicacao]

### Vantagens

- **Isola Classes Concretas**: O Abstract Factory ajuda a controlar as classes de objetos produtos que a aplicação cria. A fábrica neste caso, fica responsável por encapsular a responsabilidade e o processo de criar objetos produtos, de forma que isola o cliente das implementações das classes;

- **Faz com que a troca de família de produtos seja fácil**: A classe concreta da fábrica aparece apenas uma vez na aplicação, fazendo com que seja fáciltrocar a classe concreta da fábrica que está sendo utilizada na aplicação;

- **Promove consistência entre os produtos**: Quando um produto objetos em uma família e planejado para trabalhar juntos, é importante com que a aplicação use objetos de apenas uma família por vez. 

### Desvantagens

- **O suporte para novos tipos de produtos é difícil:** Extender fábricas abstratas para produzir novos tipos de produtos não é fácil. Isso acontece porque a interface do Abstract Factory fixa o conjunto de produtos que devem ser criados.

## Aplicação no projeto

- explicação de como utilizamos o padrão, insights, discussoes interessantes, aprofundamento em partes específicas do diagrama
- **comentar sobre ferramentas utilizadas, linguagens, fazer ligações com entregas anteriores!!**
- pode criar novas seções aqui se necessário com ###, por exemplo: Dificuldades Encontradas pela equipe

## Quadro de Participações

| **Membro da equipe** | **Função** |
| :------------- | :--------- |
| [Luiz](https://github.com/luizfaria1989) | Documentação da Introdução e do Abstract Factory |

## Referências

> GAMMA, Erich et al. Design patterns: elements of reusable object-oriented software. Reading, Mass.: Addison-Wesley, 1995.

> REFACTORING GURU. Abstract Factory. Disponível em: https://refactoring.guru/design-patterns/abstract-factory.

## Histórico de Versões

| **Data**       | **Versão** | **Descrição**                         | **Autor**                                      | **Revisor**                                      | **Data da Revisão** |
| :--------: | :----: | :-------------------------------- | :----------------------------------------: | :----------------------------------------: | :-------------: |
| 14/10/2025 |  `0.1`   | Criação da página e documentação da introdução, abstract factory e vantagens/desvantagens | [`@Luiz`](https://github.com/luizfaria1989) | [`@`](https://github.com/) |   00/00/0000    |