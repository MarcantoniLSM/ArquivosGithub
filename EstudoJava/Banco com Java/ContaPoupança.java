public class ContaPoupança extends Conta {

    public ContaPoupança(){
        super.agencia = AGENCIA_PADRAO;
        super.numero = SEQUENCIAL++;
    }
    @Override
    public void extrato(){
    System.out.println("Extrato Conta Poupança");
    System.out.println(String.format("Saldo: %.2f", super.saldo));
    }
}
