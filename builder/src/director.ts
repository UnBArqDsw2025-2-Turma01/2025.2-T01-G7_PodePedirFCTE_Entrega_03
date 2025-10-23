import userBuilder from "./userBuilder";

class Director {
    private builder!: userBuilder;

    setBuilder(builder: userBuilder): void {
        this.builder = builder;
    }

    cadastrarAluno(): void {
        this.builder.reset();
        this.builder.setUsername("aluno123");
        this.builder.setEmail("aluno@example.com");
        this.builder.setSenha("123456");
        this.builder.setTelefone("(11) 99999-9999");

        if ("setNome" in this.builder && "setCPF" in this.builder) {
            (this.builder as any).setNome("João Silva");
            (this.builder as any).setCPF("123.456.789-00");
        }
    }

    cadastrarEntregador(): void {
        this.builder.reset();
        this.builder.setUsername("entregador01");
        this.builder.setEmail("entregador@example.com");
        this.builder.setSenha("senha123");
        this.builder.setTelefone("(21) 98888-7777");

        if ("setNome" in this.builder && "setVeiculo" in this.builder) {
            (this.builder as any).setNome("Carlos Souza");
            (this.builder as any).setVeiculo("Moto");
            (this.builder as any).setIdentificador("ENT12345");
        }
    }

    cadastrarFornecedor(): void {
        this.builder.reset();
        this.builder.setUsername("fornecedorX");
        this.builder.setEmail("contato@fornecedorx.com");
        this.builder.setSenha("abc123");
        this.builder.setTelefone("(31) 97777-6666");
    
        if (
        "setNomeFantasia" in this.builder &&
        "setRazaoSocial" in this.builder &&
        "setCNPJ" in this.builder &&
        "setEndereco" in this.builder
        ) {
        (this.builder as any).setNomeFantasia("Fornecedor X");
        (this.builder as any).setRazaoSocial("Fornecedor X Ltda");
        (this.builder as any).setCNPJ("12.345.678/0001-99");
        (this.builder as any).setEndereco("Rua das Flores, 100");
        (this.builder as any).setHorarioFuncionamento("08:00 - 18:00");
        (this.builder as any).setCategoria("Alimentos");
        (this.builder as any).setStatus("Ativo");
        }
    }
}

export default Director;