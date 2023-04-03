let quadrado = {
    lado: medidaLado,
    area(medidaLado){
        return this.lado*this.lado
    }
}
let medidaLado = 4

console.log(quadrado.area(medidaLado))