# Factory Method - Sistema de Pedidos

Implementação do padrão de projeto Factory Method para gerenciar diferentes tipos de pedidos (Entrega e Retirada) no sistema PodePedirFCTE.

## Estrutura

```
factory-method/
├── src/
│   ├── models/           # Classes auxiliares
│   ├── products/         # Pedido (interface) e implementações concretas
│   ├── factories/        # FabricaDePedidos (interface) e fábricas concretas
│   └── demo.js          # Demonstração do padrão
└── package.json
```

## Como executar

```bash
cd factory-method
npm run demo
```

## Padrão Factory Method

O Factory Method é um padrão criacional que fornece uma interface para criar objetos em uma superclasse, mas permite que as subclasses alterem o tipo de objetos que serão criados.

### Componentes:

- **Creator (FabricaDePedidos)**: Interface que declara o método fábrica
- **Concrete Creators**: FabricaDePedidosEntrega e FabricaDePedidosRetirada
- **Product (Pedido)**: Interface do produto
- **Concrete Products**: PedidoEntrega e PedidoRetirada
