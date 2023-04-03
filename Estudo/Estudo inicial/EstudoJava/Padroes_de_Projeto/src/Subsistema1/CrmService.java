package Subsistema1;

public class CrmService {
    private CrmService(){
        super();
    } 

    public static void gravarCliente(String nome, String cep, String cidade){
        System.out.println("Cliente Salvo no CRM :)");
        System.out.println(nome);
        System.out.println(cep);

    }
}
