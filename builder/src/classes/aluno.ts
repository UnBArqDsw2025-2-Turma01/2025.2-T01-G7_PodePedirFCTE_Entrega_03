/**
 * Classe Aluno
 * Representa um estudante no sistema
 */
export class Aluno {
    private _username: string = '';
    private _email: string = '';
    private _nome: string = '';
    private _senha: string = '';
    private _telefone: string = '';
    private _cpf: string = '';
    
    // Construtor
    constructor() {
        console.log('🎓 Novo aluno criado!');
    }

    // GETTERS - Para ler os valores
    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get nome(): string {
        return this._nome;
    }

    public get senha(): string {
        return this._senha;
    }

    public get telefone(): string {
        return this._telefone;
    }

    public get cpf(): string {
        return this._cpf;
    }

    // SETTERS - Para definir os valores com validação
    public set username(value: string) {
        this._username = value;
    }

    public set email(value: string) {
        this._email = value;
    }

    public set nome(value: string) {
        this._nome = value;
    }

    public set senha(value: string) {
        this._senha = value;
    }

    public set telefone(value: string) {
        this._telefone = value;
    }

    public set cpf(value: string) {
        this._cpf = value;
    }

    // Método para mostrar informações do aluno
    public mostrarInfo(): void {
        console.log(`\n👤 Informações do Aluno:`);
        console.log(`Username: ${this._username}`);
        console.log(`Email: ${this._email}`);
        console.log(`Telefone: ${this._telefone}`);
        console.log(`CPF: ${this._cpf}`);
    }
}