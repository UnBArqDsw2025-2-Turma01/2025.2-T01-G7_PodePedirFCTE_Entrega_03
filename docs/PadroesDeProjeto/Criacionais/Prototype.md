# Prototype

## Introdução

O Prototype é um padrão de projeto criacional que permite copiar objetos existentes sem fazer seu código ficar dependente de suas classes.

## Padrão

O padrão Prototype parte da ideia de manter um ou mais objetos “protótipos” predefinidos, que servem como base para a criação de novas instâncias. Em vez de usar new, o cliente chama o método clone() no protótipo, que retorna uma cópia fiel — podendo ser cópia rasa (shallow copy) ou cópia profunda (deep copy) dependendo do nível de duplicação necessário.

Este padrão é especialmente aplicado em sistemas que criam objetos de forma repetitiva com pequenas variações, ou em contextos onde o custo de inicialização via construtor é elevado. Além disso, o Prototype promove maior flexibilidade, pois o cliente não precisa conhecer a classe concreta, apenas a interface de clonagem.

### Vantagens
- Desempenho: Evita recriações complexas, economizando tempo e recursos.

- Baixo acoplamento: O cliente depende apenas da interface clone(), e não do construtor.

- Flexibilidade dinâmica: Permite registrar, duplicar e modificar protótipos em tempo de execução.

- explicação do padrão
- pode criar novas seções aqui se necessário com ###, por exemplo: Vantagens, Desvantagens

### Desvantagens

- Complexidade com objetos compostos: Exige atenção ao escolher entre cópia rasa ou profunda.

- Objetos com recursos exclusivos: Itens como conexões, identificadores únicos ou arquivos podem não ser seguros de clonar diretamente.

- Legibilidade reduzida: Quando mal utilizado, pode dificultar o entendimento do fluxo de criação.

## Aplicação no projeto

- explicação de como utilizamos o padrão, insights, discussoes interessantes, aprofundamento em partes específicas do diagrama
- **comentar sobre ferramentas utilizadas, linguagens, fazer ligações com entregas anteriores!!**
- pode criar novas seções aqui se necessário com ###, por exemplo: Dificuldades Encontradas pela equipe

## Quadro de Participações

| **Membro da equipe** | **Função** |
| :------------- | :--------- |
| [Fábio](https://github.com/fabinsz) | Criação da Página, documentação de Introdução, explicação do padrão da página |
| [Nome](https://github.com/) | Detalhar contribução |
| [Nome](https://github.com/) | Detalhar contribução |

## Referências

> Gamma, Erich; Helm, Richard; Johnson, Ralph; Vlissides, John.
Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley, 1994.

> Refactoring Guru. Prototype, Disponível em:
https://refactoring.guru/design-patterns/prototype


## Histórico de Versões

| **Data**       | **Versão** | **Descrição**                         | **Autor**                                      | **Revisor**                                      | **Data da Revisão** |
| :--------: | :----: | :-------------------------------- | :----------------------------------------: | :----------------------------------------: | :-------------: |
| 19/10/2025 |  `1.0`   | Criação da Página e Documentação inicial | [`@Fábio`](https://github.com/fabinsz) | [`@`](https://github.com/) |   00/00/0000    |