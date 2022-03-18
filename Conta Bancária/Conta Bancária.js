class ContaBancaria{
    constructor(agencia, numero, tipo, saldo){
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this._saldo = saldo;
    }
    get saldo(){
        return this._saldo;
    }
    set saldo(valor){
         this._saldo = valor;
    }
    sacar(valor){
        if (valor > this._saldo) {
            return 'Operação negada';            
        }
        this._saldo = this._saldo - valor;
        return this._saldo;
    }
    depositar(valor){
        this._saldo = this._saldo + valor;
        return this._saldo
    }
}
class ContaCorrente extends ContaBancaria{
    constructor(agencia, numero, saldo, CartaoDeCredito){
        super(agencia, numero, saldo);
        this.tipo = 'corrente';
        this._CartaoDeCredito = CartaoDeCredito;
    }
    get CartãoDeCredito(){
        return this._CartaoDeCrédito;
    }
    set CartãoDeCredito(valor){
        this._CartaoDeCredito = valor;

    }
}
class ContaPoupança extends ContaBancaria{
    constructor(agencia, numero, saldo){
        super(agencia, numero, saldo);
    
    this.tipo = 'Poupança';
    }
}
class ContaUniversitária extends ContaBancaria{
    constructor(agencia, numero, saldo){
        super(agencia, numero, saldo);
        this.tipo = 'universitária';
    }
    sacar(valor){
        if (valor > 500){
            return 'Operação negada';
        }
        this._saldo = this._saldo - valor;
    }
}