# 🐍 PythonCalc Studio

> Calculadora didática em Python com as 4 operações básicas, **raiz quadrada**, **potência**, **porcentagem** e **histórico de cálculos**, acompanhada de uma aplicação web interativa para simulação e aprendizado em tempo real.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg?logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6.svg?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📌 Sobre o Projeto

Este repositório foi construído para ajudar estudantes e iniciantes em programação a dominarem os fundamentos essenciais da linguagem Python através de um projeto prático e progressivo: **uma calculadora completa**.

O projeto contém duas partes integradas:
1. **Scripts Python Puros (`/python_scripts`)**: 4 scripts prontos para rodar no seu terminal local sem nenhuma dependência externa além do Python padrão.
2. **Aplicação Web Interativa (`/src`)**: Uma interface com montador visual de fórmulas, histórico persistente, simulador de terminal em tempo real e explicações conceituais detalhadas de cada linha de código.

---

## 🚀 Funcionalidades

- **4 Operações Matemáticas Básicas**: Adição (`+`), Subtração (`-`), Multiplicação (`*`) e Divisão (`/`).
- **Prevenção de Falhas**: Tratamento da regra matemática de **Divisão por Zero** (`ZeroDivisionError`).
- **Raiz Quadrada**: Uso da biblioteca nativa `math.sqrt()` e do método por potência fracionária (`x ** 0.5`).
- **Potenciação**: Uso correto do operador `**` em Python (evitando a armadilha do `^` que é operador bitwise XOR).
- **Porcentagem Real**: Cálculo correto de percentuais (`(valor * taxa) / 100`), esclarecendo a confusão com o operador módulo (`%`).
- **Histórico de Cálculos**: Armazenamento na memória com listas (`list`) e dicionários (`dict`), com persistência e reutilização de fórmulas.
- **Transpiler Didático**: Visualização em tempo real de como uma fórmula matemática vira código Python.

---

## 📁 Estrutura de Arquivos do Repositório

```text
├── python_scripts/                         # 🐍 Scripts Python prontos para rodar
│   ├── 01_calculadora_simples.py           # Versão 1: Iniciante linear (input, float, if/elif/else)
│   ├── 02_calculadora_funcoes.py           # Versão 2: Modular com funções (def e return)
│   ├── 03_calculadora_while.py             # Versão 3: Contínua com laço de repetição e try/except
│   ├── 04_calculadora_avancada_historico.py# Versão 4: Raiz, potência, porcentagem e histórico
│   └── README.md                           # Guia de execução dos scripts Python
│
├── src/                                    # ⚛️ Código da Aplicação Web Interativa (React)
│   ├── components/
│   │   ├── FormulaBuilder.tsx              # Montador de fórmulas com teclado interativo
│   │   ├── CalculationHistory.tsx          # Histórico com pesquisa, filtros e exportação
│   │   ├── TerminalSimulator.tsx           # Simulador do terminal Python no navegador
│   │   ├── CodeViewer.tsx                  # Visualizador de código com syntax highlighting
│   │   ├── ConceptsSection.tsx             # Anatomia dos conceitos explicados para iniciantes
│   │   └── QuizSection.tsx                 # Quiz interativo de fixação com 4 perguntas
│   ├── data/
│   │   ├── codeSnippets.ts                 # Códigos-fonte mapeados com anotações de linha
│   │   └── concepts.ts                     # Base pedagógica de explicações
│   ├── App.tsx                             # Componente principal da aplicação
│   ├── main.tsx                            # Ponto de entrada React
│   └── index.css                           # Configuração Tailwind CSS v4
│
├── .gitignore                              # Arquivos ignorados pelo Git (node_modules, etc.)
├── index.html                              # Página HTML principal
├── package.json                            # Dependências do app web
├── tsconfig.json                           # Configuração TypeScript
├── vite.config.ts                          # Configuração do Vite
└── README.md                               # Documentação principal (este arquivo)
```

---

## 💻 Como Executar

### 1. Rodando os scripts Python no terminal

Você só precisa ter o **Python 3** instalado em sua máquina:

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/calculadora-python.git

# Acesse a pasta dos scripts
cd calculadora-python/python_scripts

# Execute a versão que desejar
python3 01_calculadora_simples.py
python3 02_calculadora_funcoes.py
python3 03_calculadora_while.py
python3 04_calculadora_avancada_historico.py
```

### 2. Rodando a Aplicação Web Interativa

Certifique-se de ter o **Node.js** (versão 18 ou superior) instalado:

```bash
# Na raiz do projeto, instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra o navegador no endereço indicado (normalmente `http://localhost:3000` ou `http://localhost:5173`).

---

## 🐙 Como Publicar este Projeto no Seu GitHub (Passo a Passo)

Se você é iniciante e está publicando seu primeiro repositório, siga este guia prático:

### Passo 1: Crie um novo repositório no GitHub
1. Acesse [github.com](https://github.com) e faça login.
2. Clique no botão verde **"New"** (ou no `+` no canto superior direito $\to$ **New repository**).
3. Dê um nome ao repositório, por exemplo: `calculadora-python`.
4. Deixe como **Public** (Público).
5. **Atenção:** Não marque as opções "Add a README file" ou "Add .gitignore", pois já criamos esses arquivos para você!
6. Clique em **Create repository**.

### Passo 2: Envie os arquivos do seu computador para o GitHub
Abra o terminal na pasta raiz deste projeto e execute os comandos:

```bash
# 1. Inicia o Git nesta pasta
git init

# 2. Adiciona todos os arquivos ao controle de versão
git add .

# 3. Cria o primeiro commit com uma mensagem descritiva
git commit -m "feat: calculadora interativa em python com histórico e fórmulas"

# 4. Define a branch principal como 'main'
git branch -M main

# 5. Conecta seu repositório local ao repositório remoto do GitHub
# (Substitua SEU-USUARIO e SEU-REPOSITORIO pela sua URL real)
git remote add origin https://github.com/SEU-USUARIO/calculadora-python.git

# 6. Envia os arquivos para o GitHub!
git push -u origin main
```

Pronto! Todos os seus arquivos, documentação e scripts em Python estarão disponíveis publicamente no seu perfil do GitHub.

---

## 📚 Conceitos Aprendidos Neste Projeto

1. **Entrada e Saída (`input` e `print`)**: Como interagir com o usuário e formatar saídas com *f-strings* (`f"Resultado: {resultado}"`).
2. **Conversão de Tipos (`float()` e `int()`)**: Por que o `input()` retorna texto e como converter para números.
3. **Controle de Fluxo (`if`, `elif`, `else`)**: Tomada de decisões lógicas baseadas na escolha do usuário.
4. **Tratamento de Exceções**: Como proteger cálculos contra divisão por zero e capturar erros com blocos `try/except ValueError`.
5. **Modularização (`def` e `return`)**: Como dividir o programa em funções reutilizáveis e com responsabilidade única.
6. **Módulos Nativos**: Como importar e utilizar o módulo `math` (`math.sqrt()`).
7. **Coleções de Dados (`list` e `dict`)**: Como salvar o histórico de operações com `historico.append({"formula": ..., "resultado": ...})`.

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
