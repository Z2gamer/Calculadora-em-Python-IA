# ==============================================================================
# CALCULADORA CONTÍNUA COM WHILE - VERSÃO 3 (LAÇOS DE REPETIÇÃO)
# Permite fazer cálculos contínuos até o usuário escolher sair (0)
# ==============================================================================
# Como executar no terminal:
#   python3 03_calculadora_while.py
# ==============================================================================

def main():
    while True:
        print("\n" + "=" * 36)
        print("    CALCULADORA INTERATIVA CONTÍNUA")
        print("=" * 36)
        print("1. Adição (+)")
        print("2. Subtração (-)")
        print("3. Multiplicação (*)")
        print("4. Divisão (/)")
        print("0. Sair do programa")
        print("=" * 36)

        escolha = input("Digite a opção desejada: ").strip()

        # Opção de saída
        if escolha == '0':
            print("\nObrigado por usar a calculadora! Encerrando...")
            break

        if escolha in ('1', '2', '3', '4'):
            try:
                n1 = float(input("\nDigite o 1º número: "))
                n2 = float(input("Digite o 2º número: "))
            except ValueError:
                print(">>> Entrada inválida! Digite apenas números.")
                continue

            if escolha == '1':
                print(f"\n>>> {n1} + {n2} = {n1 + n2}")
            elif escolha == '2':
                print(f"\n>>> {n1} - {n2} = {n1 - n2}")
            elif escolha == '3':
                print(f"\n>>> {n1} * {n2} = {n1 * n2}")
            elif escolha == '4':
                if n2 == 0:
                    print("\n>>> Erro: Não existe divisão por zero!")
                else:
                    print(f"\n>>> {n1} / {n2} = {n1 / n2}")
        else:
            print("\n>>> Opção inválida! Escolha um número de 0 a 4.")

        # Pergunta de continuidade
        continuar = input("\nDeseja fazer outro cálculo? (s/n): ").strip().lower()
        if continuar != 's':
            print("Até logo!")
            break

if __name__ == "__main__":
    main()
