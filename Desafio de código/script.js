
function beneficio(precoAlcool,precoGasolina,rendimentoAlcool, rendimentoGasolina){
  let pkma = precoAlcool / rendimentoAlcool;
  let pkmg = precoGasolina / rendimentoGasolina;
  if(pkma < pkmg){
    return 'A'
  }else{return 'G'}
}
console.log(beneficio(1.20, 2.30, 10.00, 15.00))