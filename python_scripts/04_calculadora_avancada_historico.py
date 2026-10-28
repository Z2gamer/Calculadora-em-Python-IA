# ==============================================================================
# CALCULADORA AVANÇADA - VERSÃO 4 (RAIZ, POTÊNCIA, PORCENTAGEM E HISTÓRICO)
# Operações: +, -, *, /, Raiz (math.sqrt), Potência (**), Porcentagem (%) e Histórico
# ==============================================================================
# Como executar no terminal:
#   python3 04_calculadora_avancada_historico.py
# ==============================================================================
import math

# Lista na memória para guardar os cálculos realizados na sessão
historico = []

def calcular_potencia(base, expoente):
    """Calcula base elevada ao expoente usando o operador **"""
    return base ** expoente

def calcular_raiz(numero):
    """Calcula a raiz quadrada usando a biblioteca math"""
    if numero < 0:
        return "Erro: Não existe raiz quadrada real de número negativo!"
    return math.sqrt(numero)

def calcular_porcentagem(valor, taxa):
    """Calcula taxa % sobre um valor: (valor * taxa) / 100"""
    return (valor * taxa) / 100

def salvar_historico(formula, resultado):
    """Guarda a expressão e o resultado em um dicionário dentro da lista"""
    historico.append({
        "formula": formula,
        "resultado": resultado
    })

def exibir_historico():
    """Mostra todos os cálculos anteriores formatados"""
    print("\n" + "=" * 40)
    print("         HISTÓRICO DE CÁLCULOS")
    print("=" * 40)
    if not historico:
        print("Nenhum cálculo registrado até o momento.")
    else:
        for idx, item in enumerate(historico, 1):
            print(f"[{idx}] {item['formula']} = {item['resultado']}")
    print("=" * 40)

def main():
    while True:
        print("\n=== CALCULADORA COM HISTÓRICO & FÓRMULAS ===")
        print("1. Adição (+)            5. Potência (x^y ou **)")
        print("2. Subtração (-)         6. Raiz Quadrada (√)")
        print("3. Multiplicação (*)     7. Porcentagem (%)")
        print("4. Divisão (/)           8. Ver Histórico")
        print("0. Sair do programa")
        print("============================================")

        opcao = input("Escolha uma opção (0-8): ").strip()

        if opcao == '0':
            print("\nEncerrando a calculadora. Bons estudos de Python!")
            break

        elif opcao == '8':
            exibir_historico()

        elif opcao in ('1', '2', '3', '4'):
            try:
                n1 = float(input("\n1º Número: "))
                n2 = float(input("2º Número: "))
            except ValueError:
                print(">>> Entrada inválida! Digite números válidos.")
                continue

            if opcao == '1':
                res = n1 + n2
                salvar_historico(f"{n1} + {n2}", res)
                print(f"\n>>> {n1} + {n2} = {res}")
            elif opcao == '2':
                res = n1 - n2
                salvar_historico(f"{n1} - {n2}", res)
                print(f"\n>>> {n1} - {n2} = {res}")
            elif opcao == '3':
                res = n1 * n2
                salvar_historico(f"{n1} * {n2}", res)
                print(f"\n>>> {n1} * {n2} = {res}")
            elif opcao == '4':
                if n2 == 0:
                    print("\n>>> Erro: Não existe divisão por zero!")
                else:
                    res = n1 / n2
                    salvar_historico(f"{n1} / {n2}", res)
                    print(f"\n>>> {n1} / {n2} = {res}")

        elif opcao == '5':
            try:
                base = float(input("\nDigite a base: "))
                expoente = float(input("Digite o expoente: "))
                res = calcular_potencia(base, expoente)
                salvar_historico(f"{base} ** {expoente}", res)
                print(f"\n>>> {base} ** {expoente} = {res}")
            except ValueError:
                print(">>> Entrada inválida! Digite números válidos.")

        elif opcao == '6':
            try:
                num = float(input("\nDigite o número para extrair a raiz: "))
                res = calcular_raiz(num)
                if isinstance(res, str):
                    print(f"\n>>> {res}")
                else:
                    salvar_historico(f"sqrt({num})", res)
                    print(f"\n>>> A raiz quadrada de {num} é {res}")
            except ValueError:
                print(">>> Entrada inválida! Digite números válidos.")

        elif opcao == '7':
            try:
                val = float(input("\nDigite o valor principal: "))
                perc = float(input("Digite a porcentagem desejada (%): "))
                res = calcular_porcentagem(val, perc)
                salvar_historico(f"{perc}% de {val}", res)
                print(f"\n>>> {perc}% de {val} = {res}")
            except ValueError:
                print(">>> Entrada inválida! Digite números válidos.")

        else:
            print("\n>>> Opção inválida! Escolha de 0 a 8.")

if __name__ == "__main__":
    main()
