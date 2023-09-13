caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def decimal(numero, base):
    partes = numero.split('.')
    inteira = partes[0]
    decimal = partes[1] if len(partes) > 1 else ""
    novaInteiro = 0
    expoente = 0

    for i in inteira[::-1]:
        novaInteiro += caracteres.index(i) * int(base) ** expoente
        expoente += 1

    novaDecimal = 0
    for j, d in enumerate(decimal):
        novaDecimal += caracteres.index(d) * (int(base) ** -(j + 1))
    return novaInteiro + novaDecimal

def NovaBase(numero, novaBase):
    inteira = int(numero)
    decimal = numero - inteira

    novaInteira = ""
    while inteira > 0:
        resto = inteira % int(novaBase)
        novaInteira = caracteres[resto] + novaInteira
        inteira //= int(novaBase)

    novaDecimal = ""
    for _ in range(5):
        decimal *= int(novaBase)
        digito = int(decimal)
        novaDecimal += caracteres[digito]
        decimal -= digito

    return novaInteira + "." + novaDecimal

def ConverterBase(baseOrigem,numero,baseDestino):
    numeroDecimal = decimal(numero, baseOrigem)
    return NovaBase(numeroDecimal, baseDestino)

baseOrigem = input('Digite a base de origem: ')
numero = input('Digite o número a ser convertido: ')
baseDestino = input('Digite a base de destino: ')

resultado = ConverterBase(baseOrigem,numero,baseDestino)

print(resultado)