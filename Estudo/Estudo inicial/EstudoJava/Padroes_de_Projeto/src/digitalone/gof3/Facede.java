package digitalone.gof3;

import Subsistema1.CrmService;
import Subsistema2.CepApi;

public class Facede {
    public void migrarCliente(String nome, String cep){
       String cidade = CepApi.getInstance().recuperarCidade(cep);
        CrmService.gravarCliente(nome, cep, cidade);
    }
}
