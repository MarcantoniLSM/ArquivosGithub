public class Main{
    public static void main(String[] args) {
        Conta cc = new ContaCorrente();
        Conta pp = new ContaPoupança();
        Conta marcantoni = new ContaCorrente();
        cc.depositar(200);
        cc.transferir(100, marcantoni);
        cc.transferir(20, pp);
        cc.extrato();
        pp.extrato();
        marcantoni.extrato();
    }
}
