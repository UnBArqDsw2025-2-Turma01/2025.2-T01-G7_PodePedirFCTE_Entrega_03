/**
 * Classe Entregador
 * Representa um entregador no sistema
 */
export class Entregador {
    private _username: string = '';
    private _email: string = '';
    private _senha: string = '';
    private _telefone: string = '';
    
    // Propriedades específicas do entregador
    private _veiculo: string = '';
    private _identificador: string = '';

    constructor() {
        console.log('🛵 Novo entregador criado!');
    }

    // GETTERS - Para ler os valores
    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get senha(): string {
        return this._senha;
    }

    public get telefone(): string {
        return this._telefone;
    }

    public get veiculo(): string {
        return this._veiculo;
    }

    public get identificador(): string {
        return this._identificador;
    }

    // SETTERS - Para definir os valores com validação
    public set username(value: string) {
        this._username = value;
    }

    public set email(value: string) {
        this._email = value;
    }

    public set senha(value: string) {
        this._senha = value;
    }

    public set telefone(value: string) {
        this._telefone = value;
    }

    public set veiculo(value: string) {
        this._veiculo = value;
    }

    public set identificador(value: string) {
        this._identificador = value;
    }

    // Método para mostrar informações do entregador
    public mostrarInfo(): void {
        console.log(`\n🛵 Informações do Entregador:`);
        console.log(`Username: ${this._username}`);
        console.log(`Email: ${this._email}`);
        console.log(`Telefone: ${this._telefone}`);
        console.log(`Veículo: ${this._veiculo}`);
        console.log(`Identificador: ${this._identificador}`);
    }
}
