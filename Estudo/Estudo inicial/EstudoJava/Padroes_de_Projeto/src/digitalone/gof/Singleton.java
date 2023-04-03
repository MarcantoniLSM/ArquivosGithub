package digitalone.gof;

public class Singleton {
    private static Singleton instance;
    private Singleton(){
        super();
    }
    public static Singleton getInstance(){
        if (instance == null){
            instance = new Singleton();
        }
        return instance;
    }
}
