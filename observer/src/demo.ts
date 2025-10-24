import { alunoObserver } from "./observers/alunoObserver";
import { entregadorObserver } from "./observers/entregadorObserver";
import { fornecedorObserver } from "./observers/fornecedorObserver";
import { Subject } from "./subject";

const subject = new Subject();

const aluno = new alunoObserver(subject);
const entregador = new entregadorObserver(subject);
const fornecedor = new fornecedorObserver(subject);

console.log("\n=== PodePedirFCTE: STATUS DO PEDIDO SUCULENTO  ===\n");

subject.setState(1);
subject.setState(2);
subject.setState(3);
subject.setState(4);
subject.setState(5);

console.log("\n--- O aluno saiu do sistema (detach) ---\n");
subject.detach(aluno);

console.log("\n--- Mudança de estado após aluno sair ---\n");
subject.setState(4);