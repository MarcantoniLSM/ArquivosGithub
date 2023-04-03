public class ContaCorrente extends Conta {

    public ContaCorrente(){
        super.agencia = AGENCIA_PADRAO;
        super.numero = SEQUENCIAL++;
    }
    @Override
    public void extrato(){
    System.out.println("Extrato Conta Corrente");
    System.out.println(String.format("Numero: %d", super.numero));
    System.out.println(String.format("Saldo: %.2f", super.saldo));
    }

}
