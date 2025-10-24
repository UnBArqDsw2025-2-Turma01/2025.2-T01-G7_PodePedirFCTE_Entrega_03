import { alunoObserver } from "./observers/alunoObserver";
import { entregadorObserver } from "./observers/entregadorObserver";
import { fornecedorObserver } from "./observers/fornecedorObserver";
import { Observer } from "./observers/observer";
import { Subject } from "./subject";

const subject = new Subject();

const aluno = new alunoObserver(subject);
const entregador = new entregadorObserver(subject);
const fornecedor = new fornecedorObserver(subject);

console.log("\n=== PodePedirFCTE: STATUS DO PEDIDO SUCULENTO  ===\n");

subject.setState(1);
setTimeout(() => subject.setState(2), 1000);
setTimeout(() => subject.setState(3), 2000);
setTimeout(() => subject.setState(4), 3000);
setTimeout(() => subject.setState(5), 4000);

setTimeout(() => {
    console.log("\n--- O aluno saiu do sistema (detach) ---\n");
    subject.detach(aluno);
}, 2500);

setTimeout(() => {
    console.log("\n--- Mudança de estado após aluno sair ---\n");
    subject.setState(4);
}, 3500);