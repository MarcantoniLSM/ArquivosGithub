package digitalone.gof;

public class Singleton3 {
    private static class Holder{
        public static Singleton3 instance = new Singleton3();
    }
    private Singleton3(){
        super();
    }
    public static Singleton3 getInstance(){
        return Holder.instance;
    }
}
