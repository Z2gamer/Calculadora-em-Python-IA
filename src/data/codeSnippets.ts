export interface CodeLine {
  num: number;
  code: string;
  comment?: string;
  conceptKey?: string;
}

export interface CodeVersion {
  id: string;
  title: string;
  badge: string;
  description: string;
  filename: string;
  rawCode: string;
  lines: CodeLine[];
}

export const CODE_VERSIONS: CodeVersion[] = [
  {
    id: 'iniciante',
    title: '1. Versão Simples e Direta (Iniciante)',
    badge: 'Recomendada para o 1º dia',
    description: 'Código linear passo a passo. Usa input(), conversão para float(), if/elif/else e tratamento de divisão por zero.',
    filename: 'calculadora_simples.py',
    rawCode: `# ==========================================
# CALCULADORA BÁSICA EM PYTHON
# Operações: Adição, Subtração, Multiplicação e Divisão
# ==========================================

# 1. Apresentação do Menu
print("--- CALCULADORA SIMPLES EM PYTHON ---")
print("Escolha a operação desejada:")
print("1 - Adição (+)")
print("2 - Subtração (-)")
print("3 - Multiplicação (*)")
print("4 - Divisão (/)")

# 2. Leitura da Opção do Usuário
opcao = input("Digite o número da operação (1/2/3/4): ")

# 3. Verificação se a opção é válida antes de pedir os números
if opcao in ('1', '2', '3', '4'):
    # Leitura dos números com conversão para decimal (float)
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))

    # 4. Processamento da Operação Escolhida
    if opcao == '1':
        resultado = num1 + num2
        print(f"\\nResultado: {num1} + {num2} = {resultado}")

    elif opcao == '2':
        resultado = num1 - num2
        print(f"\\nResultado: {num1} - {num2} = {resultado}")

    elif opcao == '3':
        resultado = num1 * num2
        print(f"\\nResultado: {num1} * {num2} = {resultado}")

    elif opcao == '4':
        # Verificação matemática: Não existe divisão por zero!
        if num2 == 0:
            print("\\nErro: Não é possível dividir um número por zero!")
        else:
            resultado = num1 / num2
            print(f"\\nResultado: {num1} / {num2} = {resultado}")

else:
    print("\\nOpção inválida! Por favor, escolha um número de 1 a 4.")
`,
    lines: [
      { num: 1, code: '# ==========================================', comment: 'Comentário explicativo' },
      { num: 2, code: '# CALCULADORA BÁSICA EM PYTHON', comment: 'Comentário' },
      { num: 3, code: '# ==========================================', comment: 'Comentário' },
      { num: 4, code: '', comment: '' },
      { num: 5, code: '# 1. Apresentação do Menu', conceptKey: 'print' },
      { num: 6, code: 'print("--- CALCULADORA SIMPLES EM PYTHON ---")', conceptKey: 'print' },
      { num: 7, code: 'print("Escolha a operação desejada:")', conceptKey: 'print' },
      { num: 8, code: 'print("1 - Adição (+)")', conceptKey: 'print' },
      { num: 9, code: 'print("2 - Subtração (-)")', conceptKey: 'print' },
      { num: 10, code: 'print("3 - Multiplicação (*)")', conceptKey: 'print' },
      { num: 11, code: 'print("4 - Divisão (/)")', conceptKey: 'print' },
      { num: 12, code: '', comment: '' },
      { num: 13, code: '# 2. Leitura da Opção do Usuário', conceptKey: 'input' },
      { num: 14, code: 'opcao = input("Digite o número da operação (1/2/3/4): ")', conceptKey: 'input' },
      { num: 15, code: '', comment: '' },
      { num: 16, code: '# 3. Verificação se a opção é válida', conceptKey: 'condicionais' },
      { num: 17, code: "if opcao in ('1', '2', '3', '4'):", conceptKey: 'condicionais' },
      { num: 18, code: '    # Leitura e conversão para float', conceptKey: 'float' },
      { num: 19, code: '    num1 = float(input("Digite o primeiro número: "))', conceptKey: 'float' },
      { num: 20, code: '    num2 = float(input("Digite o segundo número: "))', conceptKey: 'float' },
      { num: 21, code: '', comment: '' },
      { num: 22, code: '    # 4. Processamento da Operação Escolhida', conceptKey: 'operadores' },
      { num: 23, code: "    if opcao == '1':", conceptKey: 'operadores' },
      { num: 24, code: '        resultado = num1 + num2', conceptKey: 'operadores' },
      { num: 25, code: '        print(f"\\nResultado: {num1} + {num2} = {resultado}")', conceptKey: 'fstrings' },
      { num: 26, code: '', comment: '' },
      { num: 27, code: "    elif opcao == '2':", conceptKey: 'operadores' },
      { num: 28, code: '        resultado = num1 - num2', conceptKey: 'operadores' },
      { num: 29, code: '        print(f"\\nResultado: {num1} - {num2} = {resultado}")', conceptKey: 'fstrings' },
      { num: 30, code: '', comment: '' },
      { num: 31, code: "    elif opcao == '3':", conceptKey: 'operadores' },
      { num: 32, code: '        resultado = num1 * num2', conceptKey: 'operadores' },
      { num: 33, code: '        print(f"\\nResultado: {num1} * {num2} = {resultado}")', conceptKey: 'fstrings' },
      { num: 34, code: '', comment: '' },
      { num: 35, code: "    elif opcao == '4':", conceptKey: 'divisao_zero' },
      { num: 36, code: '        # Verificação: Não existe divisão por zero!', conceptKey: 'divisao_zero' },
      { num: 37, code: '        if num2 == 0:', conceptKey: 'divisao_zero' },
      { num: 38, code: '            print("\\nErro: Não é possível dividir um número por zero!")', conceptKey: 'divisao_zero' },
      { num: 39, code: '        else:', conceptKey: 'divisao_zero' },
      { num: 40, code: '            resultado = num1 / num2', conceptKey: 'operadores' },
      { num: 41, code: '            print(f"\\nResultado: {num1} / {num2} = {resultado}")', conceptKey: 'fstrings' },
      { num: 42, code: '', comment: '' },
      { num: 43, code: 'else:', conceptKey: 'condicionais' },
      { num: 44, code: '    print("\\nOpção inválida! Por favor, escolha um número de 1 a 4.")', conceptKey: 'condicionais' }
    ]
  },
  {
    id: 'funcoes',
    title: '2. Versão com Funções (Boas Práticas)',
    badge: 'Código Organizado e Modular',
    description: 'Separa cada cálculo em sua própria função com def e return. Facilita testes, reutilização e organização.',
    filename: 'calculadora_funcoes.py',
    rawCode: `# ==========================================
# CALCULADORA MODULAR COM FUNÇÕES EM PYTHON
# Cada operação matemática é isolada em sua função
# ==========================================

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
    """Retorna a divisão de a por b, tratando divisão por zero."""
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b

def menu():
    """Exibe o cabeçalho e as opções de escolha."""
    print("=" * 35)
    print("      CALCULADORA MODULAR")
    print("=" * 35)
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("=" * 35)

def principal():
    menu()
    opcao = input("Escolha uma opção (1-4): ")

    if opcao in ('1', '2', '3', '4'):
        n1 = float(input("Primeiro número: "))
        n2 = float(input("Segundo número: "))

        if opcao == '1':
            res = adicionar(n1, n2)
            print(f"\\nResultado: {n1} + {n2} = {res}")
        elif opcao == '2':
            res = subtrair(n1, n2)
            print(f"\\nResultado: {n1} - {n2} = {res}")
        elif opcao == '3':
            res = multiplicar(n1, n2)
            print(f"\\nResultado: {n1} * {n2} = {res}")
        elif opcao == '4':
            res = dividir(n1, n2)
            if isinstance(res, str):
                print(f"\\n{res}")
            else:
                print(f"\\nResultado: {n1} / {n2} = {res}")
    else:
        print("\\nOpção inválida! Tente novamente.")

# Executa o programa principal
if __name__ == "__main__":
    principal()
`,
    lines: [
      { num: 1, code: '# ==========================================', comment: 'Comentário' },
      { num: 2, code: '# CALCULADORA MODULAR COM FUNÇÕES EM PYTHON', comment: 'Comentário' },
      { num: 3, code: '# ==========================================', comment: 'Comentário' },
      { num: 4, code: '', comment: '' },
      { num: 5, code: 'def adicionar(a, b):', conceptKey: 'funcoes' },
      { num: 6, code: '    """Retorna a soma de a e b."""', conceptKey: 'funcoes' },
      { num: 7, code: '    return a + b', conceptKey: 'funcoes' },
      { num: 8, code: '', comment: '' },
      { num: 9, code: 'def subtrair(a, b):', conceptKey: 'funcoes' },
      { num: 10, code: '    return a - b', conceptKey: 'funcoes' },
      { num: 11, code: '', comment: '' },
      { num: 12, code: 'def multiplicar(a, b):', conceptKey: 'funcoes' },
      { num: 13, code: '    return a * b', conceptKey: 'funcoes' },
      { num: 14, code: '', comment: '' },
      { num: 15, code: 'def dividir(a, b):', conceptKey: 'divisao_zero' },
      { num: 16, code: '    if b == 0:', conceptKey: 'divisao_zero' },
      { num: 17, code: '        return "Erro: Divisão por zero não é permitida!"', conceptKey: 'divisao_zero' },
      { num: 18, code: '    return a / b', conceptKey: 'funcoes' },
      { num: 19, code: '', comment: '' },
      { num: 20, code: 'def menu():', conceptKey: 'print' },
      { num: 21, code: '    print("=" * 35)', conceptKey: 'print' },
      { num: 22, code: '    print("      CALCULADORA MODULAR")', conceptKey: 'print' },
      { num: 23, code: '    print("=" * 35)', conceptKey: 'print' },
      { num: 24, code: '    print("1 - Adição (+)")', conceptKey: 'print' },
      { num: 25, code: '    print("2 - Subtração (-)")', conceptKey: 'print' },
      { num: 26, code: '    print("3 - Multiplicação (*)")', conceptKey: 'print' },
      { num: 27, code: '    print("4 - Divisão (/)")', conceptKey: 'print' },
      { num: 28, code: '    print("=" * 35)', conceptKey: 'print' },
      { num: 29, code: '', comment: '' },
      { num: 30, code: 'def principal():', conceptKey: 'funcoes' },
      { num: 31, code: '    menu()', conceptKey: 'funcoes' },
      { num: 32, code: '    opcao = input("Escolha uma opção (1-4): ")', conceptKey: 'input' },
      { num: 33, code: '', comment: '' },
      { num: 34, code: "    if opcao in ('1', '2', '3', '4'):", conceptKey: 'condicionais' },
      { num: 35, code: '        n1 = float(input("Primeiro número: "))', conceptKey: 'float' },
      { num: 36, code: '        n2 = float(input("Segundo número: "))', conceptKey: 'float' },
      { num: 37, code: '', comment: '' },
      { num: 38, code: "        if opcao == '1':", conceptKey: 'funcoes' },
      { num: 39, code: '            res = adicionar(n1, n2)', conceptKey: 'funcoes' },
      { num: 40, code: '            print(f"\\nResultado: {n1} + {n2} = {res}")', conceptKey: 'fstrings' },
      { num: 41, code: "        elif opcao == '2':", conceptKey: 'funcoes' },
      { num: 42, code: '            res = subtrair(n1, n2)', conceptKey: 'funcoes' },
      { num: 43, code: '            print(f"\\nResultado: {n1} - {n2} = {res}")', conceptKey: 'fstrings' },
      { num: 44, code: "        elif opcao == '3':", conceptKey: 'funcoes' },
      { num: 45, code: '            res = multiplicar(n1, n2)', conceptKey: 'funcoes' },
      { num: 46, code: '            print(f"\\nResultado: {n1} * {n2} = {res}")', conceptKey: 'fstrings' },
      { num: 47, code: "        elif opcao == '4':", conceptKey: 'funcoes' },
      { num: 48, code: '            res = dividir(n1, n2)', conceptKey: 'divisao_zero' },
      { num: 49, code: '            if isinstance(res, str):', conceptKey: 'divisao_zero' },
      { num: 50, code: '                print(f"\\n{res}")', conceptKey: 'divisao_zero' },
      { num: 51, code: '            else:', conceptKey: 'operadores' },
      { num: 52, code: '                print(f"\\nResultado: {n1} / {n2} = {res}")', conceptKey: 'fstrings' },
      { num: 53, code: '    else:', conceptKey: 'condicionais' },
      { num: 54, code: '        print("\\nOpção inválida! Tente novamente.")', conceptKey: 'condicionais' },
      { num: 55, code: '', comment: '' },
      { num: 56, code: 'if __name__ == "__main__":', conceptKey: 'funcoes' },
      { num: 57, code: '    principal()', conceptKey: 'funcoes' }
    ]
  },
  {
    id: 'laco',
    title: '3. Versão com Laço de Repetição (while)',
    badge: 'Calculadora Contínua',
    description: 'Adiciona a opção de continuar calculando sem reiniciar o terminal, e opção para sair (0 ou "n").',
    filename: 'calculadora_continua.py',
    rawCode: `# ==========================================
# CALCULADORA PYTHON CONTÍNUA COM WHILE
# O programa roda continuamente até o usuário escolher sair
# ==========================================

while True:
    print("\\n" + "=" * 32)
    print("    CALCULADORA INTERATIVA")
    print("=" * 32)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("0. Sair do programa")
    print("=" * 32)

    escolha = input("Digite a opção desejada: ")

    # Se o usuário escolher '0', encerramos o laço com break
    if escolha == '0':
        print("\\nObrigado por usar a calculadora! Encerrando...")
        break

    if escolha in ('1', '2', '3', '4'):
        try:
            n1 = float(input("Digite o 1º número: "))
            n2 = float(input("Digite o 2º número: "))
        except ValueError:
            print("Entrada inválida! Digite apenas números válidos.")
            continue

        if escolha == '1':
            print(f"\\n>>> {n1} + {n2} = {n1 + n2}")
        elif escolha == '2':
            print(f"\\n>>> {n1} - {n2} = {n1 - n2}")
        elif escolha == '3':
            print(f"\\n>>> {n1} * {n2} = {n1 * n2}")
        elif escolha == '4':
            if n2 == 0:
                print("\\n>>> Erro: Não existe divisão por zero!")
            else:
                print(f"\\n>>> {n1} / {n2} = {n1 / n2}")
    else:
        print("\\nOpção inválida! Escolha um número de 0 a 4.")

    # Pergunta se o usuário quer continuar
    continuar = input("\\nDeseja fazer outro cálculo? (s/n): ").lower()
    if continuar != 's':
        print("Até logo!")
        break
`,
    lines: [
      { num: 1, code: '# ==========================================', comment: 'Comentário' },
      { num: 2, code: '# CALCULADORA PYTHON CONTÍNUA COM WHILE', comment: 'Comentário' },
      { num: 3, code: '# ==========================================', comment: 'Comentário' },
      { num: 4, code: '', comment: '' },
      { num: 5, code: 'while True:', conceptKey: 'while' },
      { num: 6, code: '    print("\\n" + "=" * 32)', conceptKey: 'print' },
      { num: 7, code: '    print("    CALCULADORA INTERATIVA")', conceptKey: 'print' },
      { num: 8, code: '    print("=" * 32)', conceptKey: 'print' },
      { num: 9, code: '    print("1. Adição (+)")', conceptKey: 'print' },
      { num: 10, code: '    print("2. Subtração (-)")', conceptKey: 'print' },
      { num: 11, code: '    print("3. Multiplicação (*)")', conceptKey: 'print' },
      { num: 12, code: '    print("4. Divisão (/)")', conceptKey: 'print' },
      { num: 13, code: '    print("0. Sair do programa")', conceptKey: 'while' },
      { num: 14, code: '    print("=" * 32)', conceptKey: 'print' },
      { num: 15, code: '', comment: '' },
      { num: 16, code: '    escolha = input("Digite a opção desejada: ")', conceptKey: 'input' },
      { num: 17, code: '', comment: '' },
      { num: 18, code: "    if escolha == '0':", conceptKey: 'while' },
      { num: 19, code: '        print("\\nObrigado por usar a calculadora! Encerrando...")', conceptKey: 'print' },
      { num: 20, code: '        break', conceptKey: 'while' },
      { num: 21, code: '', comment: '' },
      { num: 22, code: "    if escolha in ('1', '2', '3', '4'):", conceptKey: 'condicionais' },
      { num: 23, code: '        try:', conceptKey: 'float' },
      { num: 24, code: '            n1 = float(input("Digite o 1º número: "))', conceptKey: 'float' },
      { num: 25, code: '            n2 = float(input("Digite o 2º número: "))', conceptKey: 'float' },
      { num: 26, code: '        except ValueError:', conceptKey: 'float' },
      { num: 27, code: '            print("Entrada inválida! Digite apenas números.")', conceptKey: 'print' },
      { num: 28, code: '            continue', conceptKey: 'while' },
      { num: 29, code: '', comment: '' },
      { num: 30, code: "        if escolha == '1':", conceptKey: 'operadores' },
      { num: 31, code: '            print(f"\\n>>> {n1} + {n2} = {n1 + n2}")', conceptKey: 'fstrings' },
      { num: 32, code: "        elif escolha == '2':", conceptKey: 'operadores' },
      { num: 33, code: '            print(f"\\n>>> {n1} - {n2} = {n1 - n2}")', conceptKey: 'fstrings' },
      { num: 34, code: "        elif escolha == '3':", conceptKey: 'operadores' },
      { num: 35, code: '            print(f"\\n>>> {n1} * {n2} = {n1 * n2}")', conceptKey: 'fstrings' },
      { num: 36, code: "        elif escolha == '4':", conceptKey: 'divisao_zero' },
      { num: 37, code: '            if n2 == 0:', conceptKey: 'divisao_zero' },
      { num: 38, code: '                print("\\n>>> Erro: Não existe divisão por zero!")', conceptKey: 'divisao_zero' },
      { num: 39, code: '            else:', conceptKey: 'operadores' },
      { num: 40, code: '                print(f"\\n>>> {n1} / {n2} = {n1 / n2}")', conceptKey: 'fstrings' },
      { num: 41, code: '    else:', conceptKey: 'condicionais' },
      { num: 42, code: '        print("\\nOpção inválida! Escolha um número de 0 a 4.")', conceptKey: 'condicionais' },
      { num: 43, code: '', comment: '' },
      { num: 44, code: '    continuar = input("\\nDeseja fazer outro cálculo? (s/n): ").lower()', conceptKey: 'input' },
      { num: 45, code: "    if continuar != 's':", conceptKey: 'while' },
      { num: 46, code: '        print("Até logo!")', conceptKey: 'print' },
      { num: 47, code: '        break', conceptKey: 'while' }
    ]
  },
  {
    id: 'avancada',
    title: '4. Versão Completa (Fórmulas, Raiz, Potência & Histórico)',
    badge: 'Nova Versão Expandida',
    description: 'Calculadora completa com Raiz Quadrada (math.sqrt), Potenciação (**), Porcentagem real e salvamento em Lista de Histórico.',
    filename: 'calculadora_avancada_historico.py',
    rawCode: `# ==========================================
# CALCULADORA AVANÇADA COM HISTÓRICO EM PYTHON
# Recursos: +, -, *, /, Raiz (sqrt), Potência (**), Porcentagem (%) e Histórico
# ==========================================
import math

# Lista na memória para guardar os cálculos anteriores
historico = []

def calcular_potencia(base, expoente):
    """Calcula base elevada ao expoente usando **"""
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
    print("\\n" + "=" * 35)
    print("      HISTÓRICO DE CÁLCULOS")
    print("=" * 35)
    if not historico:
        print("Nenhum cálculo registrado ainda.")
    else:
        for idx, item in enumerate(historico, 1):
            print(f"[{idx}] {item['formula']} = {item['resultado']}")
    print("=" * 35)

while True:
    print("\\n=== CALCULADORA COM HISTÓRICO & FÓRMULAS ===")
    print("1. Adição (+)            5. Potência (x^y ou **)")
    print("2. Subtração (-)         6. Raiz Quadrada (√)")
    print("3. Multiplicação (*)     7. Porcentagem (%)")
    print("4. Divisão (/)           8. Ver Histórico de Cálculos")
    print("0. Sair")

    opcao = input("\\nEscolha uma opção (0-8): ")

    if opcao == '0':
        print("\\nEncerrando a calculadora. Bons estudos!")
        break

    elif opcao == '8':
        exibir_historico()

    elif opcao in ('1', '2', '3', '4'):
        n1 = float(input("1º Número: "))
        n2 = float(input("2º Número: "))

        if opcao == '1':
            res = n1 + n2
            salvar_historico(f"{n1} + {n2}", res)
            print(f"\\n>>> {n1} + {n2} = {res}")
        elif opcao == '2':
            res = n1 - n2
            salvar_historico(f"{n1} - {n2}", res)
            print(f"\\n>>> {n1} - {n2} = {res}")
        elif opcao == '3':
            res = n1 * n2
            salvar_historico(f"{n1} * {n2}", res)
            print(f"\\n>>> {n1} * {n2} = {res}")
        elif opcao == '4':
            if n2 == 0:
                print("\\n>>> Erro: Divisão por zero!")
            else:
                res = n1 / n2
                salvar_historico(f"{n1} / {n2}", res)
                print(f"\\n>>> {n1} / {n2} = {res}")

    elif opcao == '5':
        base = float(input("Digite a base: "))
        expoente = float(input("Digite o expoente: "))
        res = calcular_potencia(base, expoente)
        salvar_historico(f"{base} ** {expoente}", res)
        print(f"\\n>>> {base} elevado a {expoente} = {res}")

    elif opcao == '6':
        num = float(input("Digite o número para extrair a raiz: "))
        res = calcular_raiz(num)
        if isinstance(res, str):
            print(f"\\n>>> {res}")
        else:
            salvar_historico(f"sqrt({num})", res)
            print(f"\\n>>> A raiz quadrada de {num} é {res}")

    elif opcao == '7':
        val = float(input("Digite o valor principal: "))
        perc = float(input("Digite a porcentagem desejada (%): "))
        res = calcular_porcentagem(val, perc)
        salvar_historico(f"{perc}% de {val}", res)
        print(f"\\n>>> {perc}% de {val} = {res}")

    else:
        print("\\nOpção inválida! Escolha de 0 a 8.")
`,
    lines: [
      { num: 1, code: '# ==========================================', comment: 'Comentário' },
      { num: 2, code: '# CALCULADORA AVANÇADA COM HISTÓRICO EM PYTHON', comment: 'Comentário' },
      { num: 3, code: '# ==========================================', comment: 'Comentário' },
      { num: 4, code: 'import math', conceptKey: 'raiz' },
      { num: 5, code: '', comment: '' },
      { num: 6, code: '# Lista na memória para guardar os cálculos anteriores', conceptKey: 'historico_listas' },
      { num: 7, code: 'historico = []', conceptKey: 'historico_listas' },
      { num: 8, code: '', comment: '' },
      { num: 9, code: 'def calcular_potencia(base, expoente):', conceptKey: 'potencia' },
      { num: 10, code: '    """Calcula base elevada ao expoente usando **"""', conceptKey: 'potencia' },
      { num: 11, code: '    return base ** expoente', conceptKey: 'potencia' },
      { num: 12, code: '', comment: '' },
      { num: 13, code: 'def calcular_raiz(numero):', conceptKey: 'raiz' },
      { num: 14, code: '    """Calcula a raiz quadrada usando a biblioteca math"""', conceptKey: 'raiz' },
      { num: 15, code: '    if numero < 0:', conceptKey: 'raiz' },
      { num: 16, code: '        return "Erro: Não existe raiz quadrada real de número negativo!"', conceptKey: 'raiz' },
      { num: 17, code: '    return math.sqrt(numero)', conceptKey: 'raiz' },
      { num: 18, code: '', comment: '' },
      { num: 19, code: 'def calcular_porcentagem(valor, taxa):', conceptKey: 'porcentagem' },
      { num: 20, code: '    """Calcula taxa % sobre um valor: (valor * taxa) / 100"""', conceptKey: 'porcentagem' },
      { num: 21, code: '    return (valor * taxa) / 100', conceptKey: 'porcentagem' },
      { num: 22, code: '', comment: '' },
      { num: 23, code: 'def salvar_historico(formula, resultado):', conceptKey: 'historico_listas' },
      { num: 24, code: '    historico.append({"formula": formula, "resultado": resultado})', conceptKey: 'historico_listas' },
      { num: 25, code: '', comment: '' },
      { num: 26, code: 'def exibir_historico():', conceptKey: 'historico_listas' },
      { num: 27, code: '    if not historico:', conceptKey: 'historico_listas' },
      { num: 28, code: '        print("Nenhum cálculo registrado ainda.")', conceptKey: 'historico_listas' },
      { num: 29, code: '    else:', conceptKey: 'historico_listas' },
      { num: 30, code: '        for idx, item in enumerate(historico, 1):', conceptKey: 'historico_listas' },
      { num: 31, code: "            print(f'[{idx}] {item[\"formula\"]} = {item[\"resultado\"]}')", conceptKey: 'historico_listas' },
      { num: 32, code: '', comment: '' },
      { num: 33, code: 'while True:', conceptKey: 'while' },
      { num: 34, code: '    opcao = input("Escolha uma opção (0-8): ")', conceptKey: 'input' },
      { num: 35, code: "    if opcao == '0':", conceptKey: 'while' },
      { num: 36, code: '        break', conceptKey: 'while' },
      { num: 37, code: "    elif opcao == '8':", conceptKey: 'historico_listas' },
      { num: 38, code: '        exibir_historico()', conceptKey: 'historico_listas' },
      { num: 39, code: "    elif opcao == '5':", conceptKey: 'potencia' },
      { num: 40, code: '        res = calcular_potencia(base, expoente)', conceptKey: 'potencia' },
      { num: 41, code: "    elif opcao == '6':", conceptKey: 'raiz' },
      { num: 42, code: '        res = calcular_raiz(num)', conceptKey: 'raiz' },
      { num: 43, code: "    elif opcao == '7':", conceptKey: 'porcentagem' },
      { num: 44, code: '        res = calcular_porcentagem(val, perc)', conceptKey: 'porcentagem' }
    ]
  }
];
