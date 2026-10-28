# ==============================================================================
# CALCULADORA BÁSICA EM PYTHON - VERSÃO 1 (INICIANTE)
# Operações: Adição (+), Subtração (-), Multiplicação (*) e Divisão (/)
# ==============================================================================
# Como executar no terminal:
#   python3 01_calculadora_simples.py
# ==============================================================================

def main():
    # 1. Apresentação do Menu
    print("=" * 40)
    print("      CALCULADORA BÁSICA EM PYTHON")
    print("=" * 40)
    print("Escolha a operação desejada:")
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("=" * 40)

    # 2. Leitura da Opção do Usuário
    opcao = input("Digite o número da operação (1/2/3/4): ").strip()

    # 3. Verificação se a opção escolhida é válida
    if opcao in ('1', '2', '3', '4'):
        # Leitura dos números com conversão para decimal (float)
        # O input() sempre retorna texto, por isso precisamos do float()
        num1 = float(input("\nDigite o primeiro número: "))
        num2 = float(input("Digite o segundo número: "))

        # 4. Processamento da Operação Escolhida
        if opcao == '1':
            resultado = num1 + num2
            print(f"\n>>> Resultado: {num1} + {num2} = {resultado}")

        elif opcao == '2':
            resultado = num1 - num2
            print(f"\n>>> Resultado: {num1} - {num2} = {resultado}")

        elif opcao == '3':
            resultado = num1 * num2
            print(f"\n>>> Resultado: {num1} * {num2} = {resultado}")

        elif opcao == '4':
            # Verificação matemática: Não existe divisão por zero!
            if num2 == 0:
                print("\n>>> Erro: Não é possível dividir um número por zero!")
            else:
                resultado = num1 / num2
                print(f"\n>>> Resultado: {num1} / {num2} = {resultado}")

    else:
        print("\n>>> Opção inválida! Por favor, escolha um número de 1 a 4.")

if __name__ == "__main__":
    main()
