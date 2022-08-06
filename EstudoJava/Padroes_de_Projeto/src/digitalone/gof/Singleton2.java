package digitalone.gof;

public class Singleton2 {
    private static Singleton2 instance = new Singleton2();

    private Singleton2(){
        super();
    }
    public static Singleton2 getInstance(){
        return instance;
    }
}
