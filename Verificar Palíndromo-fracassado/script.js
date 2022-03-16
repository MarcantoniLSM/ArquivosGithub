function verificador(cop) {
    if (!cop) return "Insira uma palavra";

    for (let i = 0; i < cop.length / 2; i++) {
        if (cop[i] !== cop.length - 1 - i) {
            return false;
        }
    }
    return true;
}
console.log(verificador("abba"));