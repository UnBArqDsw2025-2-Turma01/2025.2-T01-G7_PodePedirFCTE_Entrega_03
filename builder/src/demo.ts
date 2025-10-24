import Director from "./director";
import alunoBuilder from "./concreteBuilders/alunoBuilder";
import fornecedorBuilder from "./concreteBuilders/fornecedorBuilder";
import entregadorBuilder from "./concreteBuilders/entregadorBuilder";

const director = new Director();

const AlunoBuilder = new alunoBuilder();
director.setBuilder(AlunoBuilder);
director.cadastrarAluno();
const aluno = AlunoBuilder.getResult();
console.log("Aluno criado:", aluno);

const FornecedorBuilder = new fornecedorBuilder();
director.setBuilder(FornecedorBuilder);
director.cadastrarFornecedor();
const fornecedor = FornecedorBuilder.getResult();
console.log("Fornecedor criado:", fornecedor);

const EntregadorBuilder = new entregadorBuilder();
director.setBuilder(EntregadorBuilder);
director.cadastrarEntregador();
const entregador = EntregadorBuilder.getResult();
console.log("Entregador criado:", entregador);