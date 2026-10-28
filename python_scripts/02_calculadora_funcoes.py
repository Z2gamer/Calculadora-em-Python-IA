# ==============================================================================
# CALCULADORA MODULAR COM FUNÇÕES - VERSÃO 2 (BOAS PRÁTICAS)
# Isolando cada operação matemática em sua função def com return
# ==============================================================================
# Como executar no terminal:
#   python3 02_calculadora_funcoes.py
# ==============================================================================

def adicionar(a, b):
    """Retorna a soma de a e b."""
    return a + b

def subtrair(a, b):
    """Retorna a diferença entre a e b."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de a e b."""
    return a * b

def dividir(a, b):
    """Retorna a divisão de a por b com tratamento de divisão por zero."""
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b

def exibir_menu():
    """Imprime o cabeçalho de opções."""
    print("=" * 40)
    print("      CALCULADORA MODULAR COM FUNÇÕES")
    print("=" * 40)
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("=" * 40)

def main():
    exibir_menu()
    opcao = input("Escolha uma opção (1-4): ").strip()

    if opcao in ('1', '2', '3', '4'):
        n1 = float(input("\nPrimeiro número: "))
        n2 = float(input("Segundo número: "))

        if opcao == '1':
            res = adicionar(n1, n2)
            print(f"\n>>> Resultado: {n1} + {n2} = {res}")
        elif opcao == '2':
            res = subtrair(n1, n2)
            print(f"\n>>> Resultado: {n1} - {n2} = {res}")
        elif opcao == '3':
            res = multiplicar(n1, n2)
            print(f"\n>>> Resultado: {n1} * {n2} = {res}")
        elif opcao == '4':
            res = dividir(n1, n2)
            if isinstance(res, str):
                print(f"\n>>> {res}")
            else:
                print(f"\n>>> Resultado: {n1} / {n2} = {res}")
    else:
        print("\n>>> Opção inválida! Escolha um número de 1 a 4.")

if __name__ == "__main__":
    main()
