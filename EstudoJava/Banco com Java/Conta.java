public abstract class Conta implements IConta {
    protected int agencia;
    protected int numero;
    protected int saldo;
    protected static final int AGENCIA_PADRAO = 1;
    protected static int SEQUENCIAL = 1;

    public int getAgencia() {
        return agencia;
    }

    public int getNumeroCorrente() {
        return numero;
    }

    public int getSaldo() {
        return saldo;
    }

    @Override
    public void sacar(double valor) {
      this.saldo -= valor;
    }

    @Override
    public void depositar(double valor) {
       this.saldo += valor;
    }

    @Override
    public void transferir(double valor, Conta destino) {
       this.sacar(valor);
       destino.depositar(valor);
    }
}
