import userBuilder from "../userBuilder";
import { Entregador } from "../classes/entregador";

class entregadorBuilder implements userBuilder {
    private entregador!: Entregador;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.entregador = new Entregador();
    }

    setUsername(username: string): void {
        this.entregador.username = username;
    }

    setEmail(email: string): void {
        this.entregador.email = email;
    }

    setSenha(senha: string): void {
        this.entregador.senha = senha;
    }

    setTelefone(telefone: string): void {
        this.entregador.telefone = telefone;
    }

    setNome(nome: string): void {
        this.entregador.nome = nome;
    }

    setVeiculo(veiculo: string): void {
        this.entregador.veiculo = veiculo;
    }
    
    setIdentificador(identificador: string): void {
        this.entregador.identificador = identificador;
    }

    getResult(): Entregador {
        this.reset();
        return this.entregador;
    }
}

export default entregadorBuilder;