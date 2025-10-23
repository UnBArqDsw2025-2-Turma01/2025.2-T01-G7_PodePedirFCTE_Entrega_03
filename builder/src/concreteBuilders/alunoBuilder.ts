import userBuilder from "../userBuilder";
import { Aluno } from "../classes/aluno";

class alunoBuilder implements userBuilder {
    private aluno!: Aluno;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.aluno = new Aluno();
    }

    setUsername(username: string): void {
        this.aluno.username = username;
    }

    setEmail(email: string): void {
        this.aluno.email = email;
    }

    setSenha(senha: string): void {
        this.aluno.senha = senha;
    }

    setTelefone(telefone: string): void {
        this.aluno.telefone = telefone;
    }

    setNome(nome: string): void {
        this.aluno.nome = nome;
    }

    setCPF(cpf: string): void {
        this.aluno.cpf = cpf;
    }
    
    getResult(): Aluno {
        this.reset();
        return this.aluno;
    }
}

export default alunoBuilder;