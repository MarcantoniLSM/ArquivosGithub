import digitalone.gof.Singleton;

public class main {
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
        eager = Singleton3.getInstance();
        System.out.println(holder);
    }
}
