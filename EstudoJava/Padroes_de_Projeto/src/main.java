import java.util.Set;

import digitalone.gof.Singleton;
import digitalone.gof.Singleton2;
import digitalone.gof.Singleton3;
import digitalone.gof2.Acao;
import digitalone.gof2.Strategy;
import digitalone.gof2.StrategyOne;
import digitalone.gof2.StrategyTwo;
import digitalone.gof3.Facede;

public class main {

    // Singleton

    public static void main(String[] args){
        Singleton lazy = Singleton.getInstance();
        System.out.println(lazy);
        lazy = Singleton.getInstance();
        System.out.println(lazy);

        Singleton2 eager = Singleton2.getInstance();
        System.out.println(eager);
        eager = Singleton2.getInstance();
        System.out.println(eager);

        Singleton3 holder = Singleton3.getInstance();
        System.out.println(holder);
        holder = Singleton3.getInstance();
        System.out.println(holder);

        // Strategy

        Strategy one = new StrategyOne();
        Strategy two = new StrategyTwo();

        Acao acao = new Acao();
            acao.setStrategy(one);

            acao.move();

        Acao acao2 = new Acao();
            acao2.setStrategy(two);

            acao2.move();

        // Facade

        Facede facede = new Facede();
        facede.migrarCliente("Marcantoni", "47658-399");
    }
}
