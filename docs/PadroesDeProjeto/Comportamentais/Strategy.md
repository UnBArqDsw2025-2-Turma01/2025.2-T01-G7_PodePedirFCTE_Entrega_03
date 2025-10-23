# Strategy

## Introdução

O Strategy propõe uma solução elegante para encapsular essas lógicas intercambiáveis. Ele permite que o comportamento de uma classe (seu Contexto) seja alterado em tempo de execução, delegando a responsabilidade de execução a um de vários objetos de estratégia, promovendo flexibilidade e organização do código.

## Strategy

O padrão Strategy define uma família de algoritmos, encapsula cada um deles e os torna intercambiáveis. Ele separa o algoritmo da classe que o utiliza, permitindo que a escolha do algoritmo seja feita em tempo de execução.

__Componentes Principais:__

1. __Contexto (Context):__ É a classe que mantém uma referência à interface da Estratégia e delega a execução do algoritmo a ela. O Contexto não sabe ou não se importa com a Estratégia Concreta que está sendo usada; ele apenas sabe que pode chamar um método comum.

2. __Estratégia (Strategy):__ É a interface (ou classe abstrata) comum que declara o método que todas as Estratégias Concretas devem implementar (o método a ser executado).

3. __Estratégia Concreta (Concrete Strategy):__ São as implementações específicas e concretas do algoritmo definido na interface Estratégia.

__Funcionamento:__ A classe Contexto é configurada com uma Estratégia Concreta no momento da criação ou em tempo de execução. Quando o Contexto precisa executar a operação (o algoritmo), ele invoca o método através da interface da Estratégia, e o código específico da Estratégia Concreta configurada é executado.

### Vantagens

- __Princípio Aberto/Fechado (OCP):__ O Contexto é fechado para modificação (sua estrutura permanece a mesma), mas aberto para extensão (novas estratégias podem ser adicionadas sem alterar o Contexto).

- __Encapsulamento de Algoritmos:__ Cada algoritmo é isolado em sua própria classe, o que melhora a coesão, a manutenibilidade e a testabilidade individual de cada estratégia.

- __Intercambialidade Dinâmica:__ Permite que o algoritmo seja trocado em tempo de execução, adaptando o comportamento do sistema às necessidades do momento.

- __Eliminação de Condicionais:__ Substitui estruturas condicionais complexas (if/else e switch/case) por delegação simples à interface da Estratégia.

### Desvantagens

- __Aumento na Complexidade Estrutural:__ Aumenta o número de classes no projeto, o que pode ser um excesso (overhead) para algoritmos muito simples que não terão variações.

- __Transferência de Dados:__ O Contexto deve ter conhecimento de todos os dados que a Estratégia precisa para realizar o cálculo, podendo resultar em uma interface de Estratégia com muitos parâmetros.

- __Decisão da Estratégia:__ O cliente (ou alguma parte do sistema) precisa saber o suficiente sobre as estratégias para fazer a escolha e configurar o Contexto corretamente.

## Aplicação no projeto

O objetivo é que o Contexto (Pedido ou Checkout) possa trocar o método de processamento de pagamento (Estratégia) dinamicamente, mantendo a classe do pedido simples e seguindo o Princípio Aberto/Fechado.

### 1. Estrutura do Padrão Strategy (Classes de Base)

#### 1.1 Interface da Estratégia (Strategy)

Define o contrato comum que todas as formas de pagamento devem seguir.

```
from abc import ABC, abstractmethod

# 2. Estratégia (Interface/Classe Abstrata)
class ProcessamentoPagamentoStrategy(ABC):
    """
    Interface comum para todos os métodos de pagamento. 
    Declara o método principal a ser executado.
    """
    @abstractmethod
    def processar_pagamento(self, valor: float, detalhes_pagamento: dict) -> bool:
        """Processa a transação e retorna True se for bem-sucedida."""
        pass
```
#### 1.2 Estratégias Concretas (Concrete Strategies)

Implementam as lógicas específicas de cada método de pagamento (Cartão de Crédito, PIX, Dinheiro).

```
# 3. Estratégias Concretas
class PagamentoCartaoCredito(ProcessamentoPagamentoStrategy):
    """Estratégia: Lógica para processar Cartão de Crédito."""
    def processar_pagamento(self, valor: float, detalhes_pagamento: dict) -> bool:
        print(f"\n[Cartão de Crédito] Iniciando processamento de R${valor:.2f}...")
        
        # Simula a validação de token/bandeira e comunicação com a adquirente
        if len(detalhes_pagamento.get('token', '')) == 16:
            print(f" -> Cartão {detalhes_pagamento.get('bandeira')} autorizado.")
            return True
        else:
            print(" -> ERRO: Token ou dados inválidos.")
            return False

class PagamentoPIX(ProcessamentoPagamentoStrategy):
    """Estratégia: Lógica para geração e validação de PIX."""
    def processar_pagamento(self, valor: float, detalhes_pagamento: dict) -> bool:
        chave_destino = detalhes_pagamento.get('chave_pix', 'FCTEPAGAMENTO')
        print(f"\n[PIX] Iniciando processamento de R${valor:.2f}...")
        print(f" -> Gerando QR Code para a chave: {chave_destino}")
        
        # Simula a verificação se o pagamento foi confirmado pelo banco
        if valor < 1000.00: # Supondo que valores abaixo de 1000 são instantâneos
            print(" -> PIX confirmado com sucesso (simulação).")
            return True
        else:
            print(" -> Aguardando confirmação bancária...")
            return False

class PagamentoDinheiro(ProcessamentoPagamentoStrategy):
    """Estratégia: Pagamento na entrega (não há processamento online)."""
    def processar_pagamento(self, valor: float, detalhes_pagamento: dict) -> bool:
        troco_para = detalhes_pagamento.get('troco_para', valor)
        
        print(f"\n[Dinheiro/Espécie] Processamento configurado.")
        if troco_para > valor:
            print(f" -> Aviso: O entregador deve levar R${troco_para - valor:.2f} de troco.")
        else:
            print(" -> Sem necessidade de troco.")
            
        # O pagamento é "processado" (aceito) no momento da finalização do pedido, 
        # mas a transação física ocorrerá na entrega.
        return True
```

### 2. Contexto (Context)

A classe Checkout (ou Pedido) que usa a estratégia. Ela delega a responsabilidade de processamento.

```
# 1. Contexto (Context)
class Checkout:
    """
    Contexto do Processo de Pagamento (BPMN: 'Sistema processa o pagamento').
    Mantém uma referência à Estratégia e delega a execução.
    """
    def __init__(self, valor_total: float):
        self._valor_total = valor_total
        self._estrategia: ProcessamentoPagamentoStrategy = None
        self.pagamento_status = False

    def set_estrategia(self, estrategia: ProcessamentoPagamentoStrategy):
        """Permite a troca dinâmica da estratégia em tempo de execução."""
        self._estrategia = estrategia
        
    def finalizar_e_processar(self, detalhes: dict) -> bool:
        """Delega a tarefa de processamento à estratégia configurada."""
        
        if not self._estrategia:
            print("\nERRO: Nenhuma estratégia de pagamento configurada.")
            return False
            
        print(f"\n--- INICIANDO CHECKOUT (Total: R${self._valor_total:.2f}) ---")
        
        # A MÁGICA DO STRATEGY: O Contexto chama o método genérico.
        self.pagamento_status = self._estrategia.processar_pagamento(
            self._valor_total,
            detalhes
        )
        
        if self.pagamento_status:
            print("--- PROCESSAMENTO CONCLUÍDO: PEDIDO FINALIZADO. ---")
        else:
            print("--- PROCESSAMENTO FALHOU: O pedido não pode ser finalizado. ---")
            
        return self.pagamento_status
```

#### 3. Código Cliente (Execução da Aplicação)

Simula o usuário alternando entre métodos de pagamento na tela de "Pagamento e Finalização".

```
if __name__ == "__main__":
    valor_do_pedido = 35.50
    
    # 1. Criação do Contexto (O Pedido/Checkout)
    checkout_fcte = Checkout(valor_do_pedido)

    print("--- Cenário 1: Pagamento com Cartão de Crédito ---")
    
    # Usuário seleciona Cartão (Estratégia 1)
    estrategia_cartao = PagamentoCartaoCredito()
    checkout_fcte.set_estrategia(estrategia_cartao)
    
    detalhes_cartao = {
        'token': '1234567890123456', 
        'bandeira': 'VISA'
    }
    
    # O Checkout processa, delegando ao PagamentoCartaoCredito
    checkout_fcte.finalizar_e_processar(detalhes_cartao) 
    
    print("\n" + "="*50 + "\n")
    
    # --- Cenário 2: Pagamento com PIX ---
    
    # A Estratégia é trocada em tempo de execução
    print("--- Cenário 2: Usuário muda para Pagamento via PIX ---")
    
    estrategia_pix = PagamentoPIX()
    checkout_fcte.set_estrategia(estrategia_pix)
    
    detalhes_pix = {
        'chave_pix': 'fcte.pagamento@pix.com.br'
    }
    
    # O mesmo Contexto (checkout_fcte) agora usa a Estratégia PIX
    checkout_fcte.finalizar_e_processar(detalhes_pix)
    
    print("\n" + "="*50 + "\n")

    # --- Cenário 3: Pagamento na Entrega (Dinheiro) ---
    
    print("--- Cenário 3: Usuário escolhe Dinheiro (Troco para R$50.00) ---")
    
    estrategia_dinheiro = PagamentoDinheiro()
    checkout_fcte.set_estrategia(estrategia_dinheiro)
    
    detalhes_dinheiro = {
        'troco_para': 50.00 # Detalhe relevante apenas para esta Estratégia
    }
    
    checkout_fcte.finalizar_e_processar(detalhes_dinheiro)
```

### Instruções de Execução e Saída Esperada

#### Como Executar o Exemplo em Python

Para rodar este exemplo e observar como o Contexto troca dinamicamente as Estratégias de Pagamento, siga estes passos:

1. Salve o Código: Copie o código Python completo do Padrão Strategy (incluindo a interface ProcessamentoPagamentoStrategy, as três estratégias concretas e a classe Checkout) em um único arquivo, por exemplo, strategy_pagamento_fcte.py.

2. Abra o Terminal: Navegue até o diretório onde você salvou o arquivo.

3. Execute o Script: Use o interpretador Python para rodar o arquivo:
```
python strategy_pagamento_fcte.py
```
#### Saída Esperada (Console Output)

A saída no console demonstrará que a classe Checkout (Contexto) executa três lógicas de pagamento totalmente diferentes, apenas trocando o objeto da Estratégia, confirmando o baixo acoplamento e a intercambialidade dinâmica do padrão.

```
--- Cenário 1: Pagamento com Cartão de Crédito ---

--- INICIANDO CHECKOUT (Total: R$35.50) ---

[Cartão de Crédito] Iniciando processamento de R$35.50...
 -> Cartão VISA autorizado.
--- PROCESSAMENTO CONCLUÍDO: PEDIDO FINALIZADO. ---

==================================================

--- Cenário 2: Usuário muda para Pagamento via PIX ---

--- INICIANDO CHECKOUT (Total: R$35.50) ---

[PIX] Iniciando processamento de R$35.50...
 -> Gerando QR Code para a chave: fcte.pagamento@pix.com.br
 -> PIX confirmado com sucesso (simulação).
--- PROCESSAMENTO CONCLUÍDO: PEDIDO FINALIZADO. ---

==================================================

--- Cenário 3: Usuário escolhe Dinheiro (Troco para R$50.00) ---

--- INICIANDO CHECKOUT (Total: R$35.50) ---

[Dinheiro/Espécie] Processamento configurado.
 -> Aviso: O entregador deve levar R$14.50 de troco.
--- PROCESSAMENTO CONCLUÍDO: PEDIDO FINALIZADO. ---
```


## Quadro de Participações

| **Membro da equipe** | **Função** |
| :------------- | :--------- |
| [Fabio](https://github.com/fabinsz) | Documentação e implementação do gof Criacional |


## Referências

> Gang of Four (GoF) - Design Patterns: Elements of Reusable Object-Oriented Software

> Refactoring Guru. Prototype, Disponível em:
https://refactoring.guru/pt-br/design-patterns/strategy

## Histórico de Versões

| **Data**       | **Versão** | **Descrição**                         | **Autor**                                      | **Revisor**                                      | **Data da Revisão** |
| :--------: | :----: | :-------------------------------- | :----------------------------------------: | :----------------------------------------: | :-------------: |
| 22/10/2025 |  `0.1`   | Documentação e implementação do gof Criacional | [`@Fabio`](https://github.com/fabinsz) | [`@`](https://github.com/) |   00/00/0000    |