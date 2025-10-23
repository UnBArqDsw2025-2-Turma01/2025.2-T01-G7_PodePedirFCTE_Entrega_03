# Decorator

## Introdução

Esse documento apresenta explicações referentes ao padrão de projeto Decorator e detalha como ele foi utilizado dentro do projeto Pode Pedir FCTE. 

## Decorator

<!-- - explicação do padrão
- pode criar novas seções aqui se necessário com ###, por exemplo: Vantagens, Desvantagens -->

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

### Diagrama de Classes

O diagrama foi criado levando em consideração o [Diagrama de Classes](https://unbarqdsw2025-2-turma01.github.io/2025.2-T01-G7_PodePedirFCTE_Entrega_02/#/./Modelagem/ModelagemEstatica/DiagramaDeClasses) feito na segunda entrega e os debates entre as integrantes responsáveis pelo padrão de projeto.

## Quadro de Participações

| **Membro da equipe** | **Função** |
| :------------- | :--------- |
| [Ana Clara](https://github.com/anabborges) | Documentação do padrão e criação do diagrama de classes |

## Referências

> REFACTORING GURU. Factory Method. Disponível em: https://refactoring.guru/design-patterns/factory-method.

## Histórico de Versões

| **Data**       | **Versão** | **Descrição**                         | **Autor**                                      | **Revisor**                                      | **Data da Revisão** |
| :--------: | :----: | :-------------------------------- | :----------------------------------------: | :----------------------------------------: | :-------------: |
| 20/10/2025 |  `0.1`   | Criação da página | [`@Ana Clara`](https://github.com/anabborges) | [`@`](https://github.com/) |   00/00/0000    |
| 22/10/2025 |  `0.2`   | Adição da introdução, vantagens e desvantagens | [`@Ana Clara`](https://github.com/anabborges) | [`@`](https://github.com/) |   00/00/0000    |
| 22/10/2025 |  `0.3`   | Inicia a documentação da aplicação no projeto | [`@Ana Clara`](https://github.com/anabborges) | [`@`](https://github.com/) |   00/00/0000    |