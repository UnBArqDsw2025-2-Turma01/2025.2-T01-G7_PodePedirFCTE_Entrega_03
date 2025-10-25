export interface PagamentoTarget {
    realizarPagamento(valor: number): boolean;
}