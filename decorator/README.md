# Decorator - Sistema de Itens com Opções Adicionais

Implementação do padrão de projeto Decorator para gerenciar itens com opções adicionais (adicionais personalizáveis) no sistema PodePedirFCTE.

## Estrutura

```
decorator/
├── src/
│   ├── components/       # ComponenteItem (interface)
│   ├── models/           # Item (componente concreto)
│   ├── decorators/       # DecoradorDeItem e OpcaoAdicional
│   └── demo.js          # Demonstração do padrão
└── package.json
```

## Como executar

```bash
cd decorator
npm run demo
```

## Padrão Decorator

O Decorator é um padrão estrutural que permite adicionar responsabilidades a objetos individuais de forma dinâmica e transparente, sem afetar outros objetos. Os decoradores fornecem uma alternativa flexível ao uso de subclasses para extensão de funcionalidades.

### Componentes:

- **Component (ComponenteItem)**: Interface que define a interface comum para objetos que podem ter responsabilidades acrescentadas dinamicamente
- **ConcreteComponent (Item)**: Classe concreta que implementa a interface e representa o objeto base ao qual responsabilidades adicionais podem ser atribuídas
- **Decorator (DecoradorDeItem)**: Classe abstrata que mantém uma referência para um ComponenteItem e define uma interface que segue a interface de Component
- **ConcreteDecorator (OpcaoAdicional)**: Classe concreta que estende Decorator e acrescenta responsabilidades ao componente (neste caso, opções adicionais aos itens)

### Benefícios no Contexto do Projeto:

- **Flexibilidade**: Permite adicionar ou remover opções adicionais dinamicamente durante a execução
- **Combinações ilimitadas**: Os decoradores podem ser encaixados recursivamente, permitindo criar qualquer combinação de adicionais
- **Transparência**: O cliente interage com a mesma interface, independentemente do número de decoradores aplicados
- **Evita explosão de subclasses**: Sem o Decorator, seria necessário criar uma subclasse para cada combinação possível de adicionais
