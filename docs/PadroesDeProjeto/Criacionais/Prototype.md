# Prototype

## Introdução

O Prototype é um padrão de projeto criacional que permite copiar objetos existentes sem fazer seu código ficar dependente de suas classes.

## Prototype

O padrão Prototype parte da ideia de manter um ou mais objetos “protótipos” predefinidos, que servem como base para a criação de novas instâncias. Em vez de usar new, o cliente chama o método clone() no protótipo, que retorna uma cópia — podendo ser cópia rasa (shallow copy) ou cópia profunda (deep copy) dependendo do nível de duplicação necessário.

Este padrão é especialmente aplicado em sistemas que criam objetos de forma repetitiva com pequenas variações, ou em contextos onde o custo de inicialização via construtor é elevado. Além disso, o Prototype promove maior flexibilidade, pois o cliente não precisa conhecer a classe concreta, apenas a interface de clonagem.

### Vantagens
- **Desempenho:** Evita recriações complexas, economizando tempo e recursos.

- **Baixo acoplamento:** O cliente depende apenas da interface clone(), e não do construtor.

- **Flexibilidade dinâmica:** Permite registrar, duplicar e modificar protótipos em tempo de execução.

### Desvantagens

- **Complexidade com objetos compostos:** Exige atenção ao escolher entre cópia rasa ou profunda.

- **Objetos com recursos exclusivos:** Itens como conexões, identificadores únicos ou arquivos podem não ser seguros de clonar diretamente.

- **Legibilidade reduzida:** Quando mal utilizado, pode dificultar o entendimento do fluxo de criação.

## Aplicação no projeto

O projeto PodePedirFCTE, por ser uma plataforma de pedidos voltada para estudantes da FCTE, apresenta fluxos fortemente repetitivos como: montar carrinho, repetir pedidos e reutilizar perfis e endereços. Observamos, a partir dos fluxos BPMN e do Rich Picture, que o usuário tende a realizar pedidos similares com alta frequência, como “o mesmo lanche de sempre no mesmo restaurante”. A partir disso, podemos aplicar o padrão criacional Prototype.

Ao invés de reconstruir manualmente todo o pedido a cada nova solicitação, utilizamos objetos protótipo (como um pedido base ou item do menu) que podem ser clonados e modificados conforme necessário. Isso traz vantagens diretas:

→ Reutilizar pedidos/customizações do usuário (“Pedir novamente”)

→ Evita recriar objetos complexos (pedido completo, itens com observações)

→ Garante que os valores salvos (como preços, observações e endereço) sejam mantidos como snapshot (cópia estável), essencial para histórico

Nos diagramas elaborados, a presença do padrão Prototype é percebida de forma prática:

- No BPMN do comprador, a ação “Escolhe item(s) do menu” representa o momento exato em que o objeto MenuItem é clonado para gerar um novo CartItem no carrinho.

- No Diagrama de Causa e Efeito (Ishikawa), o Prototype contribui para reduzir fatores de Métodos e Máquinas, diminuindo o tempo de operação e aumentando a padronização do processo.

A seguir, demonstramos um exemplo de implementação dessa lógica em Python, focando em como o mecanismo de cópia profunda (__deepcopy__) garante a independência e a segurança dos dados no seu sistema de pedidos.

### 1. Classes Protótipos e o Contrato de Clonagem
O coração do padrão Prototype é a capacidade de um objeto se autoduplicar. Em Python, usamos o método mágico __deepcopy__ do módulo copy para implementar essa duplicação segura (cópia profunda).

**Código:** Customizacao e ItemCarrinho (O Protótipo)

```
import copy
from typing import List, Dict

class Customizacao:
    """Objeto composto: Detalhes de extras. Deve ser clonado recursivamente."""
    def __init__(self, nome: str, preco_extra: float):
        self.nome = nome
        self.preco_extra = preco_extra
    
    # Implementação do clone() para a customização
    def __deepcopy__(self, memo):
        return Customizacao(self.nome, self.preco_extra)

class ItemCarrinho:
    """Protótipo Concreto: Representa o MenuItem do BPMN."""
    # ... construtor e outros métodos ...

    def __deepcopy__(self, memo):
        # 1. Cópia Rasa: Copia atributos simples (preco, nome)
        novo_item = copy.copy(self) 
        
        # 2. Cópia Profunda: Clona a lista de objetos complexos (Customizacao)
        # ESSENCIAL para garantir que a customização do clone seja independente
        novo_item.extras = copy.deepcopy(self.extras, memo) 
        return novo_item
```
### 2. Registry de Protótipos (O Catálogo do Restaurante)

O padrão Prototype sugere a utilização de um Gerenciador ou Registro (Registry) para armazenar os protótipos de forma centralizada, simulando o catálogo de itens do restaurante.

**Código:** MenuRegistry (Gerenciamento)
```
class MenuRegistry:
    """
    Simula o 'Banco de Restaurantes' (Rich Picture). Armazena os protótipos base.
    """
    def __init__(self):
        self._prototypes: Dict[str, ItemCarrinho] = {}
        self._inicializar_menu() # Carrega os protótipos iniciais (sanduíche, combo, refri)

    def _inicializar_menu(self):
        # Exemplo de inicialização: cria o protótipo do Sanduíche
        sanduiche_base = ItemCarrinho("Sanduíche Premium", 15.00, "Comida")
        sanduiche_base.adicionar_extra("Bacon", 2.00)
        sanduiche_base.adicionar_extra("Queijo Cheddar", 1.50)
        self._prototypes["SANDUICHE_BASE"] = sanduiche_base
        
        # ... inicializa COMBO_PROMO e REFRI_BASE ...

    def get_prototype(self, key: str) -> ItemCarrinho:
        """
        Método chamado pelo cliente. Retorna o clone, não o original.
        Baixo acoplamento: o cliente só precisa saber a chave.
        """
        # AQUI É A APLICAÇÃO DO PROTOTYPE
        return copy.deepcopy(self._prototypes[key])
```

### 3. Código Cliente (O Fluxo de Pedidos)

O código cliente simula a ação do comprador (BPMN: "Escolhe item(s) do menu"), que é o momento exato em que o protótipo é clonado e customizado.

**Código:** Demonstração da Clonagem

```
def executar_sistema_fctentregas():
    registry = MenuRegistry()
    
    # Simulação da ação "Escolhe item(s) do menu" (BPMN)
    # Item A: Sanduíche customizado.
    item_a = registry.get_prototype("SANDUICHE_BASE") # CLONE!
    
    # Customização do clone, sem afetar o protótipo original.
    item_a.extras = [e for e in item_a.extras if e.nome != "Queijo Cheddar"] 
    item_a.adicionar_extra("Molho Picante", 1.00) 

    print("-> Item A (Sanduíche Customizado):")
    print(item_a)

    # Item B: Combo customizado. CLONE de um objeto complexo.
    item_b = registry.get_prototype("COMBO_PROMO") # CLONE!
    item_b.extras.append(Customizacao("Refrigerante Zero", 0.00))

    # ... (Verificação final) ...
    sanduiche_base_inalterado = registry._prototypes["SANDUICHE_BASE"]
    print("\nProtótipo Original (Sanduíche Base) Após Pedido:")
    print(sanduiche_base_inalterado)
```

### Instruções de Execução e Saída Esperada

Como Executar o Exemplo em Python

Para rodar este exemplo e ver a aplicação do Prototype em funcionamento, siga estes passos:

1. Salve o Código: Copie o código completo do exemplo Python (incluindo as classes Customizacao, ItemCarrinho, MenuRegistry e a função executar_sistema_fctentregas) em um único arquivo, por exemplo, prototype_fcte.py.

2. Abra o Terminal: Navegue até o diretório onde o arquivo foi salvo usando seu terminal ou prompt de comando.

3. Execute o Script: Use o interpretador Python para rodar o arquivo:

```
python prototype_fcte.py
```

### Saída Esperada (Console Output)

A saída no console demonstrará o fluxo de montagem do pedido e a verificação da independência entre os objetos clonados e os protótipos originais. Observe como as modificações feitas nos itens A, B e C não afetam o item base do menu na seção de verificação final.
```
--- SIMULAÇÃO FCTENTREGAS: PROTOTYPE NO PEDIDO COMPLETO ---

[1] O RESTAURANTE CONFIGURA OS ITENS PROTÓTIPOS (Menu Items)

Protótipo Base (Sanduíche):
| Comida | Sanduíche Premium    | Qtd: 1 | Preço Unit: R$15.00 | Extras: Bacon (R$2.00), Queijo Cheddar (R$1.50) | TOTAL: R$18.50 |

Protótipo Base (Combo):
| Combo  | Combo Estudante      | Qtd: 1 | Preço Unit: R$25.00 | Extras: Batata Pequena (R$0.00) | TOTAL: R$25.00 |

Protótipo Base (Refrigerante):
| Bebida | Refrigerante Cola    | Qtd: 1 | Preço Unit: R$6.00 | Extras: Nenhuma | TOTAL: R$6.00 |


[2] USUÁRIO MONTA O PEDIDO (Clonagem e Customização de Vários Itens)

-> Item A (Sanduíche Customizado):
| Comida | Sanduíche Premium    | Qtd: 1 | Preço Unit: R$15.00 | Extras: Bacon (R$2.00), Molho Picante (R$1.00) | TOTAL: R$18.00 |

-> Item B (Combo Customizado):
| Combo  | Combo Estudante      | Qtd: 1 | Preço Unit: R$25.00 | Extras: Batata Pequena (R$0.00), Bacon Extra no sanduíche (R$3.00), Refrigerante Zero (R$0.00) | TOTAL: R$28.00 |

-> Item C (Refrigerante em Qtd):
| Bebida | Refrigerante Cola    | Qtd: 3 | Preço Unit: R$6.00 | Extras: Nenhuma | TOTAL: R$18.00 |

TOTAL DO PEDIDO (Todos os Clones): R$64.00


[3] VERIFICAÇÃO DO PROTOTYPE (Independência das Customizações)

Protótipo Original (Sanduíche Base) Após Pedido:
| Comida | Sanduíche Premium    | Qtd: 1 | Preço Unit: R$15.00 | Extras: Bacon (R$2.00), Queijo Cheddar (R$1.50) | TOTAL: R$18.50 |

--- Verificação da Independência dos Extras ---
Extras do Item A (Sanduíche CLONADO): ['Bacon', 'Molho Picante']
Extras do Protótipo (Sanduíche BASE): ['Bacon', 'Queijo Cheddar']

Conclusão: O objeto base (protótipo) permaneceu imutável, enquanto o clone foi modificado.
```

## Quadro de Participações

| **Membro da equipe** | **Função** |
| :------------- | :--------- |
| [Fábio](https://github.com/fabinsz) | Criação da Página, documentação e implementação do Prototype |

## Referências

> Gamma, Erich; Helm, Richard; Johnson, Ralph; Vlissides, John.
Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley, 1994.

> Refactoring Guru. Prototype, Disponível em:
https://refactoring.guru/design-patterns/prototype


## Histórico de Versões

| **Data**       | **Versão** | **Descrição**                         | **Autor**                                      | **Revisor**                                      | **Data da Revisão** |
| :--------: | :----: | :-------------------------------- | :----------------------------------------: | :----------------------------------------: | :-------------: |
| 19/10/2025 |  `0.1`   | Criação da Página e Documentação inicial | [`@Fábio`](https://github.com/fabinsz) | [`@`](https://github.com/) |   00/00/0000    |
| 22/10/2025 |  `0.2`   | Implementação do Prototype | [`@Fábio`](https://github.com/fabinsz) | [`@`](https://github.com/) |   00/00/0000    |
