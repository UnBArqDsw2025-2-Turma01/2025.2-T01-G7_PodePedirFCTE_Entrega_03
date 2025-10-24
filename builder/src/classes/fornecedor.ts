/**
 * Classe Fornecedor
 * Representa um fornecedor (restaurante, loja, etc.) no sistema
 */
export class Fornecedor {
    private _username: string = '';
    private _email: string = '';
    private _senha: string = '';
    private _telefone: string = '';
    
    // Propriedades específicas do fornecedor
    private _nomeFantasia: string = '';
    private _razaoSocial: string = '';
    private _cnpj: string = '';
    private _endereco: string = '';
    private _horarioFuncionamento: string = '';
    private _categoria: string = '';
    private _status: string = 'Inativo';

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

    public get nomeFantasia(): string {
        return this._nomeFantasia;
    }

    public get razaoSocial(): string {
        return this._razaoSocial;
    }

    public get cnpj(): string {
        return this._cnpj;
    }

    public get endereco(): string {
        return this._endereco;
    }

    public get horarioFuncionamento(): string {
        return this._horarioFuncionamento;
    }

    public get categoria(): string {
        return this._categoria;
    }

    public get status(): string {
        return this._status;
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

    public set nomeFantasia(value: string) {
        this._nomeFantasia = value;
    }

    public set razaoSocial(value: string) {
        this._razaoSocial = value;
    }

    public set cnpj(value: string) {
        this._cnpj = value;
    }

    public set endereco(value: string) {
        this._endereco = value;
    }

    public set horarioFuncionamento(value: string) {
        this._horarioFuncionamento = value;
    }

    public set categoria(value: string) {
        this._categoria = value;
    }

    public set status(value: string) {
        this._status = value;
    }

    // Método para mostrar informações do fornecedor
    public mostrarInfo(): void {
        console.log(`\n🏪 Informações do Fornecedor:`);
        console.log(`Username: ${this._username}`);
        console.log(`Nome Fantasia: ${this._nomeFantasia}`);
        console.log(`Razão Social: ${this._razaoSocial}`);
        console.log(`CNPJ: ${this._cnpj}`);
        console.log(`Email: ${this._email}`);
        console.log(`Telefone: ${this._telefone}`);
        console.log(`Endereço: ${this._endereco}`);
        console.log(`Horário: ${this._horarioFuncionamento}`);
        console.log(`Categoria: ${this._categoria}`);
        console.log(`Status: ${this._status}`);
    }
}
