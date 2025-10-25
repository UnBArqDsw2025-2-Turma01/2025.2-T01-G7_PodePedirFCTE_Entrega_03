export class CartaoPagamento {
    private idCartao: number;
    private nomeTitular: string;
    private numeroCartao: string;
    private bandeira: string;
    private dataValidade: string;
    private codigoSeguranca: string;
    private apelidoCartao: string;
    private status: boolean;

    constructor(
        idCartao: number, nomeTitular: string, numeroCartao: string,
        bandeira: string, dataValidade: string, codigoSeguranca: string,
        apelidoCartao: string, status: boolean
    ) {
        this.idCartao = idCartao;
        this.nomeTitular = nomeTitular;
        this.numeroCartao = numeroCartao;
        this.bandeira = bandeira;
        this.dataValidade = dataValidade;
        this.codigoSeguranca = codigoSeguranca;
        this.apelidoCartao = apelidoCartao;
        this.status = status;
    }

    public autorizarTransacao(valor: number): boolean {
        console.log(`Autorizando transação no cartão ${this.numeroCartao} no valor de R$${valor}...`);

        if (!this.status) {
            console.log("Falha: o cartão está inativo ou bloqueado.");
            return false;
        }

        if (this.codigoSeguranca.length !== 3) {
            console.log("Falha: código de segurança inválido.");
            return false;
        }

        console.log("Transação autorizada com sucesso!");
        return true;
    }
}
