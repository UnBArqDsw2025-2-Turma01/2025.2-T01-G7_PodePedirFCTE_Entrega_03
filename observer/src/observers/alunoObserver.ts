import { Observer } from "./observer";
import { Subject } from "../subject";

export class alunoObserver extends Observer {
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
                mensagem = "🍽️ Seu pedido foi confirmado pelo restaurante e está sendo preparado!";
                break;
            case 2:
                mensagem = "👨‍🍳 Seu pedido está sendo preparado na cozinha!";
                break;
            case 3:
                mensagem = "📦 Seu pedido está pronto e aguardando o entregador!";
                break;
            case 4:
                mensagem = "🛵 Seu pedido saiu para entrega! O entregador está a caminho!";
                break;
            case 5:
                mensagem = "✅ Seu pedido foi entregue! Esperamos que aproveite sua refeição!";
                break;
            default:
                mensagem = `📱 Status do seu pedido atualizado: ${status}`;
        }
        
        console.log(`🎓 [ALUNO] ${mensagem}`);
    }
}
