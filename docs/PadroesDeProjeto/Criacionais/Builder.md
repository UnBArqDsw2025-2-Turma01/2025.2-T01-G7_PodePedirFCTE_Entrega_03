# Builder

## Introdução
Este documento explica o padrão de projeto criacional Builder e apresenta a sua aplicação no **PodePedirFCTE**, desenvolvida com base no diagrama de classes elaborado, a partir do qual foram construídas a modelagem e a implementação do padrão.

## Explicação

[explicação do padrão]: #

O padrão criacional Builder surgiu com a intenção de separar o processo de construção de um objeto complexo de sua representação, de modo que o mesmo processo consiga criar representações distintas desse objeto (Gamma et al., 1994).  

[pode criar novas seções aqui se necessário com ###, por exemplo: Vantagens, Desvantagens]: #

### Estrutura e interações
De acordo com Gamma et al. (1994), o padrão é estruturado em quatro elementos principais e em suas interações típicas com o cliente, sendo esses elementos compostos por uma interface e três classes.

| **Elemento** | **Descrição** |
| :----------- | :------------ |
| *Builder* | Interface que estabelece o conjunto de operações necessárias para montar as partes que formam um objeto do tipo Product. | 
| *ConcreteBuilder* | Classe encarregada de implementar as operações definidas por Builder, por intermédio da criação de variações específicas do produto final. |
| *Director* | Classe que conduz o processo de construção e define a sequência e a forma de execução dos métodos do Builder.| 
| *Product* | Classe que representa o resultado final do processo, composto pela combinação estruturada dos elementos gerados durante a construção. |

A ordem das interações segue a seguinte lógica: 

**1.** O cliente cria o objeto Director e o vincula a um Builder específico;

**2.** O Director conduz o processo de construção, por meio da solicitação ao Builder a execução das etapas correspondentes sempre que uma nova parte do produto precisa ser incorporada;

**3.** O Builder executa as instruções do Director e compõe o produto gradualmente, conforme as solicitações recebidas;

**4.** o cliente obtém o produto completo por meio do Builder.

### Aplicabilidade
O padrão pode ser aplicado quando o algoritmo de criação de um objeto complexo é independente das partes que o compõem e da forma como essas partes são montadas, o que permite que o processo de construção gere diferentes representações do mesmo produto (GAMMA et al., 1994). Além disso, seu uso é indicado para evitar a necessidade de declarar múltiplas versões de um mesmo construtor com diferentes combinações de parâmetros, o que contribui para tornar o código mais flexível (REFACTORING.GURU, 2019?).

### Vantagens e desvantagens
Segundo Refactoring.Guru (2019?), o padrão apresenta três vantagens e uma desvantagem. Sendo assim, as vantagens identificadas são:
- possibidade de construção de objetos de forma incremental;
- favorecimento à reutilização do código de construção na criação de diferentes representações de um produto;
- isolamento do código de construção em relação à lógica de negócio do produto.

Por outro lado, a principal desvantagem reconhecida é o aumento da complexidade de compreensão à medida que múltiplas classes são introduzidas no processo.

## Aplicação no projeto

[- explicação de como utilizamos o padrão, insights, discussoes interessantes, aprofundamento em partes específicas do diagrama]: #
[- **comentar sobre ferramentas utilizadas, linguagens, fazer ligações com entregas anteriores!!**]: #
[- pode criar novas seções aqui se necessário com ###, por exemplo: Dificuldades Encontradas pela equipe]: #

### Modelagem

<p style="text-align: center">
    <strong>Figura 1</strong> – Padrão Builder em...
</p>

<!--[Nome da figura ex:Diagrama de colaboração do projeto PodePedirFCTE](../../assets/colaboracao-solicitar-pedido.png)]-->

<p>
    <strong>Autor:</strong> <a href="https://github.com/...">Nome</a>, 2025
</p>

### Implementação

## Quadro de Participações

| **Membro da equipe** | **Função** |
| :------------- | :--------- |
| [Nome](https://github.com/) | Detalhar contribução |
| [Willian](https://github.com/Wooo589) | Documentação inicial e explicação do padrão |

## Referências

> BUILDER. _In_: REFACTORING.GURU. [_s.l.: s.n._, 2019?]. Disponível em: https://refactoring.guru/design-patterns/builder. Acesso em: 17 out. 2025.

> GAMMA, Erich _et al._ **Design Patterns**: elements of reusable object-oriented software. Boston, MA: Addison-Wesley, 1994.

## Histórico de Versões

| **Data**       | **Versão** | **Descrição**                         | **Autor**                                      | **Revisor**                                      | **Data da Revisão** |
| :--------: | :----: | :-------------------------------- | :----------------------------------------: | :----------------------------------------: | :-------------: |
| 17/10/2025 |  `0.1`   | Adicionar estrutura inicial da página e seção de introdução  | [`@Willian`](https://github.com/Wooo589) | [`@`](https://github.com/) |   00/00/0000    |
| 20/10/2025 |  `0.2`   | Adicionar explicação do padrão  | [`@Willian`](https://github.com/Wooo589) | [`@`](https://github.com/) |   00/00/0000    |