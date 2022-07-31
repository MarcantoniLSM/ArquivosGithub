public class Main{
    public static void main(String[] args) {
        Conta cc = new ContaCorrente();
        Conta pp = new ContaPoupança();

        cc.extrato();
        pp.extrato();
    }
}
