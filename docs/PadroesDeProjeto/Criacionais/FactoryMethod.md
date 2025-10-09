# Factory Method

## Introdução

Esse documento apresenta explicações referentes ao padrão de projeto Factory Method e detalha como ele foi utilizado dentro do projeto Pode Pedir FCTE. 

O padrão Factory Method propõe a criação de objetos em uma superclasse.

## Factory Method

O padrão Factory Method surgiu a partir de um problema onde havia uma classe sendo utilizada em grande proporção em um sistema. Entretando, após a expansão do sistema, a adição de classes semelhantes a ela gera a necessidade de revisão e possível alteração em todo o código da aplicação.

A fim de ter uma explicação mais lúdica e didática, segue a explicação que o site [Refactoring Guru](https://refactoring.guru/) apresenta para explicar a problemática que incentivou a criação do padrão:

[Adicinar explicacao]

### Vantagens

- **Desacoplamento:** Evita o acoplamento forte entre o criador e os produtos concretos;

- **Princípio da Responsabilidade Única:** Mover o código de criação do produto para um único lugar no programa, tornando o código mais fácil de manter e de alterar.

- **Princípio Aberto/Fechado:** Você pode introduzir novos tipos de produtos no programa sem quebrar o código cliente existente.

### Desvantagens

- **Complexidade do código:** A criação de várias subclasses novas para implementar o padrão pode aumentar a complexidade.

## Aplicação no projeto

- explicação de como utilizamos o padrão, insights, discussoes interessantes, aprofundamento em partes específicas do diagrama
- **comentar sobre ferramentas utilizadas, linguagens, fazer ligações com entregas anteriores!!**
- pode criar novas seções aqui se necessário com ###, por exemplo: Dificuldades Encontradas pela equipe

## Quadro de Participações

| **Membro da equipe** | **Função** |
| :------------- | :--------- |
| [Ana Clara](https://github.com/anabborges) | Documentação da Introdução e do Factory Method |

## Referências

> REFACTORING GURU. Factory Method. Disponível em: https://refactoring.guru/design-patterns/factory-method.

## Histórico de Versões

| **Data**       | **Versão** | **Descrição**                         | **Autor**                                      | **Revisor**                                      | **Data da Revisão** |
| :--------: | :----: | :-------------------------------- | :----------------------------------------: | :----------------------------------------: | :-------------: |
| 09/10/2025 |  `0.1`   | Criação da página e documentação da introdução, factory method e vantagens/desvantagens | [`@Ana Clara`](https://github.com/anabborges) | [`@`](https://github.com/) |   00/00/0000    |