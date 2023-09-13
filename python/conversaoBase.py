caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def decimal(numero,base):
    novoNumero = 0
    expoente = 0

    for i in numero[::-1]:
        novoNumero += caracteres.index(i) * int(base) ** expoente
        expoente +=1
    return novoNumero

def NovaBase(numero,base):
    if numero == 0:
        return "0"
    novoNumero = ""

    while(numero > 0):
        resto = numero % int(base)
        novoNumero = caracteres[resto] + novoNumero
        numero = numero//int(base)
    return novoNumero


def ConverterBase(baseOrigem,numero,baseDestino):
    numeroDecimal = decimal(numero,baseOrigem)
    return NovaBase(numeroDecimal,baseDestino)



baseOrigem = input('digite a base de origem: ')
numero = input('Digite o número a ser convertido: ')
baseDestino = input('Digite a base de destino: ')

resultado = ConverterBase(baseOrigem,numero,baseDestino)

print(resultado)

