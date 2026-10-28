export interface ConceptItem {
  id: string;
  name: string;
  tag: string;
  syntax: string;
  summary: string;
  whyItMatters: string;
  codeSnippet: string;
  tips: string[];
  beginnerPitfall: string;
}

export const PYTHON_CONCEPTS: Record<string, ConceptItem> = {
  print: {
    id: 'print',
    name: 'A Função print() e Exibição de Mensagens',
    tag: 'Saída de Dados (I/O)',
    syntax: 'print("Mensagem a exibir")',
    summary: 'O print() é o comando que envia texto ou números para a tela do terminal, permitindo que o usuário veja instruções, menus e os resultados.',
    whyItMatters: 'Sem o print(), o computador realiza cálculos em silêncio e o usuário não saberia o que fazer nem qual foi a resposta encontrada.',
    codeSnippet: `# Exibe mensagens simples no terminal
print("--- CALCULADORA SIMPLES EM PYTHON ---")
print("1 - Adição (+)")`,
    tips: [
      'Você pode usar aspas simples (\'...\') ou aspas duplas ("...").',
      'Use \\n dentro do texto para pular uma linha automaticamente.',
      'Você pode imprimir múltiplos itens separando por vírgula: print("Resultado:", 42).'
    ],
    beginnerPitfall: 'Confundir print() com return: o print() apenas mostra na tela para humanos lerem, ele não devolve um valor para outra variável usar.'
  },
  input: {
    id: 'input',
    name: 'A Função input() e Interação com o Usuário',
    tag: 'Entrada de Dados (I/O)',
    syntax: 'variavel = input("Texto da pergunta: ")',
    summary: 'A função input() pausa a execução do programa e aguarda o usuário digitar algo pelo teclado e pressionar Enter.',
    whyItMatters: 'Torna o programa interativo e dinâmico: o usuário escolhe a operação e informa os números em vez de valores fixos no código.',
    codeSnippet: `# Lê o texto digitado pelo usuário e armazena na variável 'opcao'
opcao = input("Digite o número da operação (1/2/3/4): ")`,
    tips: [
      'O texto dentro dos parênteses do input() funciona como a pergunta (prompt) na tela.',
      'IMPORTANTE: O input() SEMPRE devolve os dados em formato de texto (string). Mesmo que o usuário digite 10, o Python recebe "10".'
    ],
    beginnerPitfall: 'Tentar somar valores vindos diretamente do input(): "5" + "5" resulta em "55" (junção de textos), e não em 10.'
  },
  float: {
    id: 'float',
    name: 'Conversão de Tipos com float() e int()',
    tag: 'Tipagem de Dados',
    syntax: 'num = float(input("Digite um número: "))',
    summary: 'Transforma o texto ("string") digitado pelo usuário em um número decimal (float) com o qual o computador pode calcular.',
    whyItMatters: 'Em programação, texto e números são coisas totalmente diferentes na memória. Se não converter com float(), não é possível fazer contas matemáticas corretas.',
    codeSnippet: `# Lê o texto e converte para número com ponto decimal
num1 = float(input("Digite o primeiro número: "))
# Agora num1 armazena 15.5 (número) e não "15.5" (texto)`,
    tips: [
      'Use float() se o cálculo aceitar casas decimais (como 3.14, 0.5, 10.0).',
      'Use int() se você quiser estritamente números inteiros sem vírgula (como 1, 2, 3).',
      'Em Python usamos ponto (.) para decimais (ex: 7.5), não vírgula (,).'
    ],
    beginnerPitfall: 'Digitar letras ou vírgula ao rodar o programa (ex: 7,5 em vez de 7.5) causa um erro ValueError no terminal.'
  },
  operadores: {
    id: 'operadores',
    name: 'Os 4 Operadores Aritméticos Básicos',
    tag: 'Aritmética Python',
    syntax: '+  -  *  /',
    summary: 'Os símbolos matemáticos fundamentais do Python que realizam as 4 operações básicas.',
    whyItMatters: 'São os blocos elementares de qualquer algoritmo numérico, desde cálculos simples até inteligência artificial.',
    codeSnippet: `adicao = num1 + num2        # Soma (+)
subtracao = num1 - num2     # Subtração (-)
multiplicacao = num1 * num2 # Multiplicação (*)
divisao = num1 / num2       # Divisão (/)`,
    tips: [
      '+ soma dois valores.',
      '- subtrai o segundo do primeiro.',
      '* multiplica (o asterisco é usado porque o "x" poderia ser confundido com variável).',
      '/ divide e sempre retorna um float (ex: 8 / 4 resulta em 2.0).',
      'Bônus: // faz divisão inteira (7 // 2 = 3) e % pega o resto (7 % 2 = 1).'
    ],
    beginnerPitfall: 'Usar "x" para multiplicar ou ":" para dividir. Em Python, sempre use * e /.'
  },
  condicionais: {
    id: 'condicionais',
    name: 'Tomada de Decisão: if, elif e else',
    tag: 'Controle de Fluxo',
    syntax: 'if condicao: ... elif condicao: ... else: ...',
    summary: 'Permite que o programa escolha caminhos diferentes conforme a opção digitada pelo usuário.',
    whyItMatters: 'Sem condicionais, o código só executaria uma linha após a outra sem inteligência para saber qual cálculo deve ser feito.',
    codeSnippet: `if opcao == '1':
    resultado = num1 + num2
elif opcao == '2':
    resultado = num1 - num2
elif opcao == '3':
    resultado = num1 * num2
elif opcao == '4':
    resultado = num1 / num2
else:
    print("Opção inválida!")`,
    tips: [
      'if significa "se": avalia a primeira condição.',
      'elif significa "senão, se": avalia condições seguintes se a anterior foi falsa.',
      'else significa "senão / caso contrário": roda se nenhuma das anteriores for atendida.',
      'Lembre-se sempre dos dois pontos (:) ao final de cada linha if/elif/else e da indentação (4 espaços) no bloco de código interno.'
    ],
    beginnerPitfall: 'Esquecer que comparação usa dois sinais de igual (==), enquanto um só sinal (=) serve para atribuir valor a uma variável.'
  },
  divisao_zero: {
    id: 'divisao_zero',
    name: 'Tratamento de Exceção: Divisão por Zero',
    tag: 'Validação e Segurança',
    syntax: 'if num2 == 0: print("Erro: Divisão por zero!")',
    summary: 'Protege o programa contra a tentativa de dividir qualquer número por 0, o que é matematicamente indefinido.',
    whyItMatters: 'Se o usuário digitar 0 como divisor e não houver verificação, o Python interrompe abruptamente a execução com o erro fatal ZeroDivisionError.',
    codeSnippet: `elif opcao == '4':
    # Verificação obrigatória antes da conta
    if num2 == 0:
        print("Erro: Não é possível dividir um número por zero!")
    else:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")`,
    tips: [
      'Sempre valide as entradas antes de operações sensíveis.',
      'Programadores profissionais antecipam possíveis erros do usuário.',
      'No futuro, você aprenderá também a usar try / except para capturar erros.'
    ],
    beginnerPitfall: 'Tentar dividir antes de testar: resultado = num1 / num2 quebra a linha antes do if ser alcançado!'
  },
  fstrings: {
    id: 'fstrings',
    name: 'F-Strings: Formatação Elegante de Texto',
    tag: 'Manipulação de Strings',
    syntax: 'f"Texto {variavel} texto"',
    summary: 'Colocando a letra "f" antes das aspas, você pode inserir variáveis e expressões diretamente dentro do texto usando chaves {}.',
    whyItMatters: 'É a maneira mais moderna, legível e rápida do Python (adicionada no Python 3.6) para montar mensagens dinâmicas.',
    codeSnippet: `# O Python substitui automaticamente {num1}, {num2} e {resultado} pelos seus valores
print(f"\\nResultado: {num1} + {num2} = {resultado}")

# Você pode até formatar casas decimais:
# print(f"Resultado com 2 decimais: {resultado:.2f}")`,
    tips: [
      'Não esqueça a letra f minúscula antes da primeira aspa.',
      'Você pode colocar expressões matemáticas dentro das chaves: f"Dobro: {num * 2}".',
      'Evita usar o antiquado e trabalhoso print("Resultado: " + str(num1) + " + " ...).'
    ],
    beginnerPitfall: 'Esquecer o "f" no início: "Resultado: {num1}" imprimirá literalmente a palavra {num1} na tela em vez do número.'
  },
  funcoes: {
    id: 'funcoes',
    name: 'Funções com def e return',
    tag: 'Modularização e Reutilização',
    syntax: 'def nome_da_funcao(parametro1, parametro2): ... return valor',
    summary: 'Blocos de código reutilizáveis que realizam uma tarefa específica, recebem argumentos e retornam um resultado.',
    whyItMatters: 'Elimina repetição de código, facilita testes unitários e mantém o código principal limpo e legível conforme o projeto cresce.',
    codeSnippet: `def adicionar(a, b):
    return a + b

def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero!"
    return a / b

# Chamando a função:
resultado = adicionar(10, 5)  # resultado recebe 15`,
    tips: [
      'def vem de "define".',
      'Parâmetros (a, b) são como variáveis locais que recebem os valores enviados.',
      'return "devolve" o valor para onde a função foi chamada.',
      'Funções devem ter nomes descritivos com verbos: somar, calcular, validar.'
    ],
    beginnerPitfall: 'Esquecer a palavra-chave return. Uma função sem return devolve None por padrão no Python.'
  },
  while: {
    id: 'while',
    name: 'Laços de Repetição com while True e break',
    tag: 'Estruturas de Repetição',
    syntax: 'while condicao: ... break',
    summary: 'Cria uma repetição que mantém o programa rodando para vários cálculos seguidos sem precisar abrir o terminal de novo.',
    whyItMatters: 'Ninguém quer que um aplicativo feche imediatamente após uma única soma. O loop permite cálculos infinitos até a ordem de saída.',
    codeSnippet: `while True:
    escolha = input("Opção (0 para sair): ")
    if escolha == '0':
        print("Saindo...")
        break  # Interrompe o loop imediatamente`,
    tips: [
      'while True cria um loop que só para quando encontra o comando break.',
      'continue pula imediatamente para a próxima volta do laço.',
      'Sempre forneça uma condição clara para o usuário sair do loop para não travar o terminal.'
    ],
    beginnerPitfall: 'Criar um loop infinito sem nenhuma instrução break ou condição de parada, fazendo o programa travar.'
  },
  potencia: {
    id: 'potencia',
    name: 'Potenciação em Python com o Operador **',
    tag: 'Operador Avançado',
    syntax: 'base ** expoente',
    summary: 'Em Python, o operador de exponenciação são dois asteriscos juntos (**). Por exemplo, 2 ** 3 calcula 2 elevado ao cubo, resultando em 8.',
    whyItMatters: 'Diferente de outras linguagens que usam o símbolo ^ para potência, no Python o circunflexo (^) é o operador binário XOR (Bitwise)! Usar ^ para potência gera cálculos completamente errados.',
    codeSnippet: `# Forma correta de calcular 3 elevado ao quadrado (9):
potencia = 3 ** 2

# Você também pode usar a função interna pow():
resultado = pow(2, 4)  # 2 elevado a 4 = 16`,
    tips: [
      'Lembre-se: em Python, ^ NÃO é potência! Sempre use **.',
      'Expoentes negativos calculam frações: 2 ** -1 resulta em 0.5.',
      'Expoentes decimais calculam raízes: 9 ** 0.5 resulta em 3.0.'
    ],
    beginnerPitfall: 'Escrever 2 ^ 3 achando que dará 8. Em Python 2 ^ 3 resulta em 1 devido à operação binária XOR.'
  },
  raiz: {
    id: 'raiz',
    name: 'Raiz Quadrada com math.sqrt() e Expoente Fracionário',
    tag: 'Módulo Math e Álgebra',
    syntax: 'import math; math.sqrt(numero)  ou  numero ** 0.5',
    summary: 'Para calcular a raiz quadrada, você pode importar o módulo nativo math e usar math.sqrt(x), ou usar a regra matemática elevando o número a 0.5 (meio).',
    whyItMatters: 'A raiz quadrada é fundamental para geometria (Teorema de Pitágoras), cálculos estatísticos e fórmulas financeiras.',
    codeSnippet: `import math

# Método 1: Usando a biblioteca math
raiz_1 = math.sqrt(64)  # Retorna 8.0

# Método 2: Sem importação, usando potência fracionária!
raiz_2 = 64 ** 0.5      # Retorna 8.0 (matematicamente idêntico!)`,
    tips: [
      'math.sqrt() é muito explícito e fácil de ler para quem está estudando seu código.',
      'Elevar a 0.5 (x ** 0.5) não requer nenhuma biblioteca extra.',
      'Não existe raiz quadrada real de número negativo: math.sqrt(-4) causa ValueError!'
    ],
    beginnerPitfall: 'Passar números negativos para math.sqrt(): números reais não possuem raiz de negativos, causando ValueError: math domain error.'
  },
  porcentagem: {
    id: 'porcentagem',
    name: 'Porcentagem: A Pegadinha do Símbolo % em Python',
    tag: 'Aritmética e Módulos',
    syntax: '(valor * percentual) / 100',
    summary: 'Em Python, o caractere % NÃO calcula porcentagem! O símbolo % é o operador de resto da divisão (módulo). Para calcular porcentagem de verdade, divide-se a taxa por 100.',
    whyItMatters: 'É a confusão número 1 de quem começa a programar. Escrever 100 % 10 em Python não calcula 10% de 100, mas sim o resto da divisão de 100 por 10 (que é 0!).',
    codeSnippet: `# ❌ ERRO COMUM DE INICIANTE:
# resultado = 200 % 15  -> Isto calcula o RESTO (5), não a porcentagem!

# ✅ FORMA CORRETA DE CALCULAR 15% DE 200:
valor = 200
taxa = 15
valor_porcentagem = valor * (taxa / 100)  # 30.0

# Para dar desconto de 15%:
preco_final = valor - valor_porcentagem    # 170.0`,
    tips: [
      'Guarde sempre: Porcentagem = por cento = dividir por 100.',
      'Para aumento de 10%: valor * 1.10.',
      'Para desconto de 10%: valor * 0.90.',
      'O operador % em Python serve para testar se número é par: if num % 2 == 0:'
    ],
    beginnerPitfall: 'Digitar "200 % 10" esperando 20. O Python devolverá 0 porque 200 dividido por 10 não deixa nenhum resto!'
  },
  historico_listas: {
    id: 'historico_listas',
    name: 'Histórico de Cálculos com Listas e Dicionários',
    tag: 'Estruturas de Dados',
    syntax: 'historico.append({"formula": expr, "resultado": res})',
    summary: 'Para salvar cada conta realizada pelo usuário, usamos uma lista do Python (historico = []) e adicionamos itens com o método .append().',
    whyItMatters: 'Permite que o programa consulte o passado, exiba os últimos 10 cálculos na tela e até reutilize resultados em fórmulas futuras.',
    codeSnippet: `# Criando a lista vazia de histórico
historico = []

# Após fazer um cálculo, salvamos na lista:
historico.append({
    "formula": "15 + 27",
    "resultado": 42.0
})

# Exibindo o histórico com um laço for:
for item in historico:
    print(f"{item['formula']} = {item['resultado']}")`,
    tips: [
      '.append() adiciona um novo item sempre no final da lista.',
      'Podemos pegar o último resultado com historico[-1]["resultado"].',
      'len(historico) nos diz quantas contas já foram feitas até agora.'
    ],
    beginnerPitfall: 'Sobrescrever a lista inteira historico = novo_item em vez de usar historico.append(novo_item).'
  }
};
