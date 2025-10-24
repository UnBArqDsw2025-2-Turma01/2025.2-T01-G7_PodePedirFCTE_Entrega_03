import userBuilder from "../userBuilder";
import { Fornecedor } from "../classes/fornecedor";

class fornecedorBuilder implements userBuilder {
    private fornecedor!: Fornecedor;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.fornecedor = new Fornecedor();
    }

    setUsername(username: string): void {
        this.fornecedor.username = username;
    }

    setEmail(email: string): void {
        this.fornecedor.email = email;
    }

    setSenha(senha: string): void {
        this.fornecedor.senha = senha;
    }

    setTelefone(telefone: string): void {
        this.fornecedor.telefone = telefone;
    }

    setNomeFantasia(nomeFantasia: string): void {
        this.fornecedor.nomeFantasia = nomeFantasia;
    }

    setRazaoSocial(razaoSocial: string): void {
        this.fornecedor.razaoSocial = razaoSocial;
     }

    setCNPJ(cnpj: string): void {
        this.fornecedor.cnpj = cnpj;
    }

    setEndereco(endereco: string): void {
        this.fornecedor.endereco = endereco;
    }

    setHorarioFuncionamento(horario: string): void {
        this.fornecedor.horarioFuncionamento = horario;
    }

    setCategoria(categoria: string): void {
        this.fornecedor.categoria = categoria;
    }

    setStatus(status: string): void {
        this.fornecedor.status = status;
    }

    getResult(): Fornecedor {
        const resultado = this.fornecedor;
        this.reset();
        return resultado;
    }
}

export default fornecedorBuilder;