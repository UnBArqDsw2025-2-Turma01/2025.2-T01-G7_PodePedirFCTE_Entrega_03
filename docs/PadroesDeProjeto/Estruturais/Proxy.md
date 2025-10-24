# Proxy
## Introdução

O Proxy é a solução para gerenciar esse acesso. Ele atua como um substituto ou intermediário para outro objeto (o Objeto Real), permitindo que se controle o acesso a ele. Isso significa que podemos adicionar camadas de segurança, cache ou log antes de chamar o serviço real, garantindo que o utilize seus recursos de forma otimizada.

## Proxy

O Padrão Proxy (Procurador) fornece um substituto ou um intermediário para outro objeto, controlando o acesso a ele. O Proxy e o Objeto Real implementam a mesma interface, de modo que o cliente que utiliza o Proxy não percebe que está interagindo com um substituto em vez do objeto real.

O Proxy intercepta chamadas do cliente e pode executar ações adicionais antes de (ou em vez de) delegar a chamada para o Objeto Real.

### Componentes Principais:

- __Serviço/Interface (Subject Interface):__ A interface comum que define as operações que o Proxy e o Objeto Real devem implementar. No FCTEntregas, poderia ser IServicoPedidos ou IServicoPagamento.

- __Objeto Real (Real Subject):__ O objeto que realiza o trabalho pesado e que geralmente é caro ou complexo de inicializar. No FCTEntregas, seria a classe que se conecta diretamente ao Banco de Pedidos ou à API de pagamento.

- __Proxy:__ O substituto do Objeto Real. Ele contém uma referência ao Objeto Real e implementa a Interface do Serviço. Ele intercepta as chamadas e pode realizar verificações, cache, log, ou qualquer outra lógica de controle.

### Tipos Comuns de Proxies

- __Proxy de Segurança (Protection Proxy):__ Controla o acesso ao Objeto Real com base nos privilégios do cliente.

- __Proxy de Cache (Cache Proxy):__ Armazena o resultado de operações demoradas (como consulta ao banco) para evitar chamadas repetitivas. 

- __Proxy Remoto (Remote Proxy):__ Atua como um representante local para um objeto que reside em outro endereço de rede (um serviço ou API). 

- __Proxy Virtual (Virtual Proxy):__ Atrasar a criação e inicialização de objetos caros até que sejam realmente necessários (Lazy Initialization). 

### Vantagens

1. __Controle de Acesso:__ Adiciona uma camada de segurança ou controle (como logging ou autenticação) antes que o acesso ao Objeto Real seja concedido.

2. __Otimização de Recursos (Cache/Virtual):__ Reduz a latência e o consumo de recursos ao evitar a criação desnecessária de objetos ou a repetição de operações caras.

3. __Separação de Preocupações:__ Isola a lógica de controle e acesso (o Proxy) da lógica de negócio principal (o Objeto Real).

4. __Gerenciamento de Complexidade Remota:__ Oculta do cliente a complexidade de lidar com conexões de rede ou inicialização demorada (Proxy Remoto e Virtual).

### Desvantagens

1. __Atraso Adicional:__ A introdução do Proxy pode adicionar uma pequena latência à chamada do serviço, já que cada requisição deve passar pelo Proxy.

2. __Complexidade Estrutural:__ Aumenta o número de classes, pois o Proxy, o Objeto Real e a Interface devem coexistir.

3. __Manutenção:__ Se a Interface do Serviço mudar, o Proxy e o Objeto Real precisam ser atualizados.

## Aplicação no projeto

O cenário é a ação "Realiza Pedido" que exige que o usuário esteja autenticado.

### 1. Estrutura do Proxy (Classes de Base)

#### 1.1. Interface de Serviço (Subject Interface)

Define o contrato que tanto o serviço real quanto o proxy devem seguir.
```
from abc import ABC, abstractmethod

class IServicoPedidos(ABC):
    """
    Interface que define as operações do serviço de pedidos.
    """
    @abstractmethod
    def criar_pedido(self, dados_pedido: dict, id_usuario: str) -> str:
        """Cria um novo pedido no Banco de Pedidos e retorna um ID."""
        pass
```

#### 1.2. Objeto Real (Real Subject)

A classe que contém a lógica de negócio pesada, como a interação direta com o __Banco de Pedidos__.

```
class ServicoPedidosReal(IServicoPedidos):
    """
    O Objeto Real (Banco de Pedidos): Lógica de persistência custosa.
    """
    def criar_pedido(self, dados_pedido: dict, id_usuario: str) -> str:
        print("\n[SERVIÇO REAL] Tentando conectar ao Banco de Pedidos...")
        
        # Lógica de negócio pesada: validações finais, inserção no DB
        if not dados_pedido:
             return "ERRO_DADOS_INVALIDOS"
             
        id_novo_pedido = f"PED-{id_usuario}-{hash(str(dados_pedido)) % 1000}"
        
        print(f" Pedido criado com sucesso no Banco de Dados. ID: {id_novo_pedido}")
        return id_novo_pedido
```

#### 1.3. O Proxy de Segurança (Protection Proxy)

A classe intermediária que implementa o controle de acesso (Autenticação).

```
class ServicoPedidosProxy(IServicoPedidos):
    """
    O Proxy de Segurança (Protection Proxy). 
    Controla o acesso ao ServicoPedidosReal com base na autenticação.
    """
    def __init__(self, servico_real: ServicoPedidosReal, autenticador: dict):
        self._servico_real = servico_real
        self._autenticador = autenticador # Simula um serviço de autenticação/sessão

    def _verificar_autenticacao(self, id_usuario: str) -> bool:
        """
        Lógica de segurança: verifica se o usuário está logado e ativo.
        (Relacionado à piscina 'Autenticação' no BPMN).
        """
        print(f"[PROXY SEGURANÇA] Verificando status do usuário '{id_usuario}'...")
        if id_usuario in self._autenticador and self._autenticador[id_usuario]['logado']:
            print(" -> Autenticação OK. Acesso permitido.")
            return True
        else:
            print("  ERRO: Usuário não autenticado ou sessão expirada.")
            return False

    def criar_pedido(self, dados_pedido: dict, id_usuario: str) -> str:
        """
        Método de controle: Intercepta a chamada e aplica a segurança.
        """
        # AÇÃO PRINCIPAL DO PROXY: APLICAÇÃO DO CONTROLE DE ACESSO
        if self._verificar_autenticacao(id_usuario):
            # Delega a chamada ao Objeto Real (só se a segurança passar)
            return self._servico_real.criar_pedido(dados_pedido, id_usuario)
        else:
            # Retorna o erro de segurança antes de acessar o Objeto Real
            return "ERRO_NAO_AUTORIZADO"
```

### 2. Código Cliente (Simulação do Usuário)

Simula dois cenários de usuários (um logado e outro deslogado) tentando realizar um pedido.

```
# Dados de simulação de autenticação
AUTH_MOCK = {
    "ESTUDANTE_123": {"logado": True, "permissao": "comprador"},
    "MORADOR_999": {"logado": False, "permissao": "comprador"},
}

def executar_proxy_fcte():
    # 1. Inicializa o Objeto Real (Serviço de alta complexidade)
    servico_de_pedidos = ServicoPedidosReal()
    
    # 2. Inicializa o Proxy, passando o Objeto Real e o Autenticador
    servico_protegido = ServicoPedidosProxy(servico_de_pedidos, AUTH_MOCK)
    
    # Dados de um pedido de exemplo
    carrinho_de_exemplo = {"itens": ["Sanduíche", "Refrigerante"], "total": 35.50}

    print("==================================================")
    print("CENÁRIO 1: USUÁRIO AUTENTICADO (ESTUDANTE_123)")
    
    # O cliente (interface de checkout) chama o Proxy, pensando que é o Serviço Real
    resultado_1 = servico_protegido.criar_pedido(carrinho_de_exemplo, "ESTUDANTE_123")
    
    print(f"\nResultado final da requisição: {resultado_1}")

    print("\n==================================================")
    print("CENÁRIO 2: USUÁRIO NÃO AUTENTICADO (MORADOR_999)")

    # O usuário deslogado tenta realizar o pedido
    resultado_2 = servico_protegido.criar_pedido(carrinho_de_exemplo, "MORADOR_999")
    
    print(f"\nResultado final da requisição: {resultado_2}")
    
    print("==================================================")

if __name__ == "__main__":
    executar_proxy_fcte()
```

### Instruções de Execução e Saída Esperada

Como Executar o Exemplo em Python

Para rodar este exemplo e observar como o Proxy de Segurança controla o acesso ao serviço de Criar Pedido, siga estes passos:

1. Salve o Código: Copie o código Python completo do Padrão Proxy (incluindo a interface IServicoPedidos, as classes ServicoPedidosReal, ServicoPedidosProxy e a função de execução) em um único arquivo, por exemplo, proxy_pedidos_fcte.py.

2. Abra o Terminal: Navegue até o diretório onde você salvou o arquivo.

3. Execute o Script: Use o interpretador Python para rodar o arquivo:

```
python proxy_pedidos_fcte.py
```

### Saída Esperada (Console Output)

A saída demonstrará claramente que o Proxy permite o acesso ao Objeto Real (o Banco de Pedidos) apenas no primeiro cenário (usuário logado), e bloqueia a chamada antes que ela chegue ao serviço caro no segundo cenário (usuário deslogado).
```
==================================================
CENÁRIO 1: USUÁRIO AUTENTICADO (ESTUDANTE_123)

[PROXY SEGURANÇA] Verificando status do usuário 'ESTUDANTE_123'...
 -> Autenticação OK. Acesso permitido.
[SERVIÇO REAL] Tentando conectar ao Banco de Pedidos...
 Pedido criado com sucesso no Banco de Dados. ID: PED-ESTUDANTE_123-XXX

Resultado final da requisição: PED-ESTUDANTE_123-XXX

==================================================
CENÁRIO 2: USUÁRIO NÃO AUTENTICADO (MORADOR_999)

[PROXY SEGURANÇA] Verificando status do usuário 'MORADOR_999'...
  ERRO: Usuário não autenticado ou sessão expirada.

Resultado final da requisição: ERRO_NAO_AUTORIZADO

==================================================
```

## Quadro de Participações

| **Membro da equipe** | **Função** |
| :------------- | :--------- |
| [Fábio](https://github.com/fabinsz) | Criação da Página, documentação e implementação do Proxy |

## Referências

> Source Making. Proxy Design Pattern, Disponível em:
https://sourcemaking.com/design_patterns/proxy


## Histórico de Versões

| **Data**       | **Versão** | **Descrição**                         | **Autor**                                      | **Revisor**                                      | **Data da Revisão** |
| :--------: | :----: | :-------------------------------- | :----------------------------------------: | :----------------------------------------: | :-------------: |
| 14/10/2025 |  `0.1`   | Criação da Página, Documentação e Implementação | [`@Fábio`](https://github.com/fabinsz) | [`@](https://github.com/) |      |

