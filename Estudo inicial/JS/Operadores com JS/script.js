const n1 = 8;
const n2 = 7;

function igualdade(n1, n2){
    const iguais = n1 === n2;
    const soma = n1 + n2;
    let similar = '';
    let c10 = '';
    let c20 = '';
    if (iguais !== true) {
        similar = 'não'; 
    }
    if(soma > 10){
        c10 = 'maior';
    }else{
        c10 = 'menor';
    }
    if (soma > 20) {
        c20 = 'maior'
    } else {
        c20 = 'menor'
    }
    return `Os números ${n1} e ${n2} ${similar} são iguais! Sua soma é ${soma}, a qual é ${c10} que 10 e ${c20} que 20. `
}
console.log(igualdade(n1, n2));