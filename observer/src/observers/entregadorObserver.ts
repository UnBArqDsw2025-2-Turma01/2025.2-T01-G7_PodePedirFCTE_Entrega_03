import { Observer } from "./observer";
import { Subject } from "../subject";

export class entregadorObserver extends Observer {
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
                mensagem = "📋 Novo pedido disponível para retirada no restaurante!";
                break;
            case 2:
                mensagem = "⏳ Pedido ainda sendo preparado. Aguarde para retirada.";
                break;
            case 3:
                mensagem = "🚀 Pedido pronto! Dirija-se ao restaurante para coleta!";
                break;
            case 4:
                mensagem = "🛵 Você coletou o pedido! Realize a entrega ao cliente!";
                break;
            case 5:
                mensagem = "✅ Entrega concluída com sucesso! Parabéns pelo trabalho!";
                break;
            default:
                mensagem = `📱 Status da entrega atualizado: ${status}`;
        }
        
        console.log(`🛵 [ENTREGADOR] ${mensagem}`);
    }
}
