import { Observer } from "./observer";
import { Subject } from "../subject";

export class fornecedorObserver extends Observer {
    constructor(subject: Subject) {
        super(subject);
        this.subject = subject;
        this.subject.attach(this);
    }

    public update(): void {
        const status = this.subject.getState();
        let mensagem = "";
        
        switch(status) {
            case 1:
                mensagem = "🔔 Novo pedido recebido! Confirme e inicie o preparo!";
                break;
            case 2:
                mensagem = "👨‍🍳 Pedido em preparo na cozinha. Mantenha a qualidade!";
                break;
            case 3:
                mensagem = "📦 Pedido finalizado! Aguardando retirada do entregador.";
                break;
            case 4:
                mensagem = "🚚 Pedido coletado pelo entregador. A caminho do cliente!";
                break;
            case 5:
                mensagem = "🌟 Pedido entregue ao cliente! Obrigado pela parceria!";
                break;
            default:
                mensagem = `📊 Status do pedido atualizado: ${status}`;
        }
        
        console.log(`🏪 [FORNECEDOR] ${mensagem}`);
    }
}
