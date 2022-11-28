package digitalone.gof2;

public class Acao {
    private Strategy strategy;
    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }
    public void move(){
        strategy.move();
    }
}
