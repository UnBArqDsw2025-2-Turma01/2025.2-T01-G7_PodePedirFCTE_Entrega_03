# Builder

## Introdução

Este documento explica o padrão de projeto criacional Builder e apresenta a sua aplicação no **PodePedirFCTE**, desenvolvida com base no diagrama de classes elaborado, a partir do qual foram construídas a modelagem e a implementação do padrão.

## Explicação

[explicação do padrão]: #

O padrão criacional Builder surgiu com a intenção de separar o processo de construção de um objeto complexo de sua representação, de modo que o mesmo processo consiga criar representações distintas desse objeto (Gamma et al., 1994).

[pode criar novas seções aqui se necessário com ###, por exemplo: Vantagens, Desvantagens]: #

### Estrutura e interações

De acordo com Gamma et al. (1994), o padrão é estruturado em quatro elementos principais e em suas interações típicas com o cliente, sendo esses elementos compostos por uma interface e três classes.

| **Elemento**      | **Descrição**                                                                                                                              |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| _Builder_         | Interface que estabelece o conjunto de operações necessárias para montar as partes que formam um objeto do tipo Product.                   |
| _ConcreteBuilder_ | Classe encarregada de implementar as operações definidas por Builder, por intermédio da criação de variações específicas do produto final. |
| _Director_        | Classe que conduz o processo de construção e define a sequência e a forma de execução dos métodos do Builder.                              |
| _Product_         | Classe que representa o resultado final do processo, composto pela combinação estruturada dos elementos gerados durante a construção.      |

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

A implementação do padrão Builder no **PodePedirFCTE** foi desenvolvida para facilitar a criação de diferentes tipos de usuários no sistema de delivery: **Aluno**, **Entregador** e **Fornecedor**. O padrão foi aplicado utilizando **TypeScript** como linguagem de programação, aproveitando recursos de tipagem estática e orientação a objetos para garantir robustez e manutenibilidade do código.

### Estrutura da Implementação

#### **1. Builder Interface (`userBuilder`)**

```typescript
interface userBuilder {
  reset(): void;
  setUsername(username: string): void;
  setEmail(email: string): void;
  setSenha(senha: string): void;
  setTelefone(telefone: string): void;
}
```

Esta interface define o contrato base para todos os builders concretos, estabelecendo os métodos comuns necessários para a construção de qualquer tipo de usuário no sistema.

#### **2. Concrete Builders**

Foram implementados três builders concretos, cada um especializado na criação de um tipo específico de usuário:

- **`alunoBuilder`**: Responsável pela construção de objetos da classe `Aluno`, incluindo métodos específicos como `setNome()` e `setCPF()`
- **`entregadorBuilder`**: Encarregado da criação de objetos `Entregador`, com métodos particulares como `setVeiculo()` e `setIdentificador()`
- **`fornecedorBuilder`**: Dedicado à construção de objetos `Fornecedor`, implementando métodos empresariais como `setNomeFantasia()`, `setCNPJ()` e `setHorarioFuncionamento()`

Cada builder concreto mantém uma instância privada do produto que está construindo e implementa o método `getResult()` para retornar o objeto finalizado.

#### **3. Director Class**

A classe `Director` orquestra todo o processo de construção, definindo receitas específicas para cada tipo de usuário:

```typescript
cadastrarAluno(): void {
    this.builder.reset();
    this.builder.setUsername("aluno123");
    this.builder.setEmail("aluno@example.com");
    this.builder.setSenha("123456");
    this.builder.setTelefone("(11) 99999-9999");
    // Configurações específicas do aluno...
}
```

O Director utiliza verificação de tipos em tempo de execução para acessar métodos específicos de cada builder, mantendo a flexibilidade do sistema.

#### **4. Product Classes**

As classes de produto (`Aluno`, `Entregador`, `Fornecedor`) foram projetadas seguindo princípios de encapsulamento, utilizando:

- Propriedades privadas com prefixo underscore (`_username`, `_email`)
- Getters e setters públicos para controle de acesso
- Validação de dados nos setters (quando necessário)

### Ferramentas e Tecnologias Utilizadas

- **TypeScript 5.0+**: Linguagem principal, proporcionando tipagem estática e recursos avançados de OOP
- **Node.js**: Runtime para execução do código
- **ts-node**: Para execução direta de arquivos TypeScript durante desenvolvimento
- **npm**: Gerenciamento de dependências e scripts de build
- **VS Code**: Ambiente de desenvolvimento integrado

### Benefícios Alcançados

A implementação do padrão Builder trouxe vantagens significativas para o projeto:

1. **Flexibilidade de Construção**: Cada tipo de usuário pode ser construído de forma independente, com suas particularidades
2. **Reutilização de Código**: O processo de construção básico é compartilhado entre todos os builders
3. **Extensibilidade**: Novos tipos de usuários podem ser facilmente adicionados criando novos builders concretos
4. **Separação de Responsabilidades**: A lógica de construção fica isolada das classes de produto
5. **Testabilidade**: Cada componente pode ser testado independentemente

### Demonstração Prática

O arquivo `demo.ts` demonstra o uso completo do padrão:

```typescript
const director = new Director();

// Criação de um Aluno
const alunoBuilder = new alunoBuilder();
director.setBuilder(alunoBuilder);
director.cadastrarAluno();
const aluno = alunoBuilder.getResult();

// Criação de um Fornecedor
const fornecedorBuilder = new fornecedorBuilder();
director.setBuilder(fornecedorBuilder);
director.cadastrarFornecedor();
const fornecedor = fornecedorBuilder.getResult();
```

Esta implementação evidencia como o padrão Builder simplifica a criação de objetos complexos no contexto do **PodePedirFCTE**, proporcionando um código mais limpo, organizando e manutenível.

### Modelagem

<p style="text-align: center">
    <strong>Figura 1</strong> – Diagrama UML Builder cadastro de usuários no PodePedirFCTE
</p>

![Diagrama UML Builder PodePedirFCTE](./assests/builder.png)

<p>
    <strong>Autor: autoria da equipe</strong>, 2025
</p>

### Implementação

A implementação do padrão Builder no **PodePedirFCTE** está organizada em uma estrutura de diretórios que reflete claramente os componentes do padrão:

```
builder/
├── src/
│   ├── classes/           # Product classes
│   │   ├── aluno.ts
│   │   ├── entregador.ts
│   │   └── fornecedor.ts
│   ├── concreteBuilders/  # Concrete Builders
│   │   ├── alunoBuilder.ts
│   │   ├── entregadorBuilder.ts
│   │   └── fornecedorBuilder.ts
│   ├── userBuilder.ts     # Builder Interface
│   ├── director.ts        # Director Class
│   └── demo.ts           # Demonstração de uso
```

#### Principais Características Técnicas

**1. Interface Builder Genérica**: A interface `userBuilder` estabelece um contrato mínimo para todos os builders, garantindo que operações básicas como `reset()` e configuração de dados fundamentais (`username`, `email`, `senha`, `telefone`) estejam disponíveis em todas as implementações.

**2. Especialização por Herança**: Cada builder concreto implementa a interface base e adiciona métodos específicos para seu tipo de produto:

- `alunoBuilder`: adiciona `setNome()` e `setCPF()`
- `entregadorBuilder`: inclui `setVeiculo()` e `setIdentificador()`
- `fornecedorBuilder`: implementa métodos empresariais como `setNomeFantasia()`, `setCNPJ()`, `setRazaoSocial()`

**3. Encapsulamento Robusto**: Todas as classes de produto utilizam propriedades privadas com prefixo underscore (`_propriedade`) e expõem acesso controlado através de getters e setters, seguindo as melhores práticas de orientação a objetos.

**4. Flexibilidade do Director**: A classe `Director` utiliza verificação de tipos dinâmica (`"setNome" in this.builder`) para acessar métodos específicos de cada builder, mantendo flexibilidade sem comprometer a tipagem estática do TypeScript.

**5. Gestão de Estado**: Cada builder implementa adequadamente o método `reset()` para garantir que novas instâncias sejam criadas a cada uso, evitando efeitos colaterais entre construções sucessivas.

#### Exemplo de Uso Completo

```typescript
// Configuração inicial
const director = new Director();

// Builder para Aluno
const alunoBuilder = new alunoBuilder();
director.setBuilder(alunoBuilder);
director.cadastrarAluno();
const aluno = alunoBuilder.getResult();

console.log("Aluno criado:", {
  username: aluno.username,
  email: aluno.email,
  nome: aluno.nome,
  cpf: aluno.cpf,
});
```

Esta implementação demonstra como o padrão Builder foi adaptado especificamente para as necessidades do sistema **PodePedirFCTE**, proporcionando uma solução elegante e extensível para a criação de diferentes tipos de usuários no contexto de um sistema de delivery.

### Resultados e Insights

A implementação do padrão Builder no projeto revelou aspectos importantes sobre sua aplicabilidade em sistemas reais:

**1. Execução Bem-Sucedida**: O teste de execução confirma que o padrão foi implementado corretamente, criando objetos distintos conforme esperado:

```
Aluno criado: { _username: 'aluno123', _nome: 'João Silva', _cpf: '123.456.789-00', ... }
Fornecedor criado: { _username: 'fornecedorX', _nomeFantasia: 'Fornecedor X', _cnpj: '12.345.678/0001-99', ... }
Entregador criado: { _username: 'entregador01', _nome: 'Carlos Souza', _veiculo: 'Moto', ... }
```

**2. Consistência de Dados**: Observa-se que cada tipo de usuário mantém suas propriedades específicas adequadamente encapsuladas, demonstrando a eficácia do padrão na separação de responsabilidades.

**3. Extensibilidade Comprovada**: A estrutura permite facilmente a adição de novos tipos de usuários sem modificar código existante, apenas criando novos builders concretos.

### Instruções para Execução do Código

Para executar e testar a implementação do padrão Builder no **PodePedirFCTE**, siga os passos abaixo:

#### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **Git** (para clonar o repositório)

#### Passos para Execução

**1. Clone o repositório e navegue para o diretório do projeto:**

```bash
git clone https://github.com/UnBArqDsw2025-2-Turma01/2025.2-T01-G7_PodePedirFCTE_Entrega_03.git
cd 2025.2-T01-G7_PodePedirFCTE_Entrega_03/builder
```

**2. Instale as dependências do projeto:**

```bash
npm install
```

**3. Para compilar o TypeScript para JavaScript:**

```bash
npm run build
```

**4. Execute o projeto em modo de desenvolvimento:**

```bash
npm run dev
```


**5. Para executar o código compilado:**

```bash
npm start
```

**6. Para limpar os arquivos compilados:**

```bash
npm run clean
```

#### Scripts Disponíveis

O projeto inclui os seguintes scripts no `package.json`:

- `npm run dev`: Executa o código TypeScript diretamente usando ts-node
- `npm run build`: Compila o TypeScript para JavaScript
- `npm start`: Executa o código JavaScript compilado
- `npm run clean`: Remove o diretório `dist/` com os arquivos compilados

#### Saída Esperada

Ao executar `npm run dev`, você deve ver uma saída similar a:

```
Aluno criado: Aluno {
  _username: 'aluno123',
  _email: 'aluno@example.com',
  _nome: 'João Silva',
  _senha: '123456',
  _telefone: '(11) 99999-9999',
  _cpf: '123.456.789-00'
}

Fornecedor criado: Fornecedor {
  _username: 'fornecedorX',
  _email: 'contato@fornecedorx.com',
  _nomeFantasia: 'Fornecedor X',
  _razaoSocial: 'Fornecedor X Ltda',
  _cnpj: '12.345.678/0001-99',
  _endereco: 'Rua das Flores, 100',
  _horarioFuncionamento: '08:00 - 18:00',
  _categoria: 'Alimentos',
  _status: 'Ativo'
}

Entregador criado: Entregador {
  _username: 'entregador01',
  _email: 'entregador@example.com',
  _nome: 'Carlos Souza',
  _veiculo: 'Moto',
  _identificador: 'ENT12345'
}
```

Esta saída confirma que o padrão Builder foi implementado corretamente, criando instâncias distintas de cada tipo de usuário com suas propriedades específicas adequadamente configuradas.

### Dificuldades Encontradas e Soluções

Durante o desenvolvimento, alguns desafios técnicos foram identificados e solucionados:

**1. Tipagem Dinâmica vs. Tipagem Estática**: O maior desafio foi conciliar a flexibilidade necessária para acessar métodos específicos de cada builder com a rigidez da tipagem TypeScript. A solução encontrada foi utilizar verificação de tipos em tempo de execução (`"setNome" in this.builder`) combinada com type casting (`this.builder as any`).

**2. Gestão de Estado dos Builders**: Foi importante implementar corretamente o método `reset()` em cada builder para evitar que instâncias anteriores influenciassem novas construções, garantindo a independência entre criações sucessivas.

## Quadro de Participações

| **Membro da equipe**                         | **Função**                                               |
| :------------------------------------------- | :------------------------------------------------------- |
| [Rodrigo](https://github.com/rodrigoFAmaral) | Criação do UML e codificação                             |
| [Willian](https://github.com/Wooo589)        | Documentação inicial, explicação do padrão e codificação |

## Referências

> BUILDER. _In_: REFACTORING.GURU. [_s.l.: s.n._, 2019?]. Disponível em: https://refactoring.guru/design-patterns/builder. Acesso em: 17 out. 2025.

> GAMMA, Erich _et al._ **Design Patterns**: elements of reusable object-oriented software. Boston, MA: Addison-Wesley, 1994.

## Histórico de Versões

|  **Data**  | **Versão** | **Descrição**                                                                                                          |                    **Autor**                    |                   **Revisor**                   | **Data da Revisão** |
| :--------: | :--------: | :--------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------: | :---------------------------------------------: | :-----------------: |
| 17/10/2025 |   `0.1`    | Adicionar estrutura inicial da página e seção de introdução                                                            |    [`@Willian`](https://github.com/Wooo589)     | [`@Rodrigo`](https://github.com/rodrigoFAmaral) |     22/10/2025      |
| 20/10/2025 |   `0.2`    | Adicionar explicação do padrão                                                                                         |    [`@Willian`](https://github.com/Wooo589)     | [`@Rodrigo`](https://github.com/rodrigoFAmaral) |     22/10/2025      |
| 22/10/2025 |   `0.3`    | Adicionar diagrama UML                                                                                                 | [`@Rodrigo`](https://github.com/rodrigoFAmaral) |    [`@Willian`](https://github.com/Wooo589)     |     22/10/2025      |
| 23/10/2025 |   `1.0`    | Implementação do código para o padrão Builder                        | [`@William`](https://github.com/Wooo589) |    [`@Rodrigo`](https://github.com/rodrigoFAmaral)     |     23/10/2025      |
| 23/10/2025 |   `1.1`    | Adicionar seção de aplicação no projeto | [`@Rodrigo`](https://github.com/rodrigoFAmaral) |    [`@Willian`](https://github.com/Wooo589)     |     23/10/2025      |
