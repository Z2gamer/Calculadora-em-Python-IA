import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Award, Code2, ChevronDown, ChevronUp } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Por que precisamos usar float(input(...)) em vez de apenas input(...) para ler os números?',
    options: [
      'Porque o input() sempre retorna texto (string), então "5" + "5" viraria "55" em vez de 10.',
      'Porque o Python não aceita números sem a palavra float antes.',
      'Apenas por costume, não faz nenhuma diferença real no cálculo.',
      'Porque o float() impede que o usuário digite números negativos.'
    ],
    correctAnswer: 0,
    explanation: 'Correto! A função input() sempre captura o que o usuário digita no formato de texto (string). A função float() converte esse texto em um número decimal real para que o processador possa realizar as operações matemáticas.'
  },
  {
    id: 2,
    question: 'O que aconteceria no Python se o usuário tentasse dividir por zero sem a verificação "if num2 == 0"?',
    options: [
      'O Python retornaria o número 0 como resultado padrão.',
      'O programa pararia abruptamente lançando a exceção ZeroDivisionError.',
      'O Python retornaria a palavra "Infinito".',
      'O computador reiniciaria o script silenciosamente.'
    ],
    correctAnswer: 1,
    explanation: 'Exato! Dividir por zero é uma impossibilidade matemática. Sem o teste prévio (if num2 == 0), o Python interrompe o programa com o erro ZeroDivisionError. Por isso, validar dados de entrada é fundamental.'
  },
  {
    id: 3,
    question: 'Qual a diferença essencial entre um sinal de igual (=) e dois sinais de igual (==)?',
    options: [
      '= serve para comparar igualdade lógica; == atribui valor a variáveis.',
      '= cria uma variável (atribuição); == testa se dois valores são iguais (comparação).',
      '= é para números inteiros; == é para números decimais.',
      'Ambos fazem exatamente a mesma coisa em Python.'
    ],
    correctAnswer: 1,
    explanation: 'Muito bem! Em Python, opcao = "1" guarda o valor "1" dentro da caixa "opcao". Já if opcao == "1": faz uma pergunta: "o valor dentro de opcao é igual a 1?".'
  },
  {
    id: 4,
    question: 'Nas funções com "def", qual a função da instrução "return"?',
    options: [
      'Apenas imprimir o valor na tela do terminal.',
      'Devolver o resultado calculado para quem chamou a função, permitindo guardá-lo em variáveis.',
      'Voltar ao início do arquivo de código.',
      'Apagar a memória da função.'
    ],
    correctAnswer: 1,
    explanation: 'Perfeito! O return devolve o dado para o programa principal. O print apenas exibe na tela para visualização humana temporária.'
  }
];

export const QuizSection: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(0);

  const handleSelectAnswer = (questionId: number, optionIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = QUESTIONS.filter(q => userAnswers[q.id] === q.correctAnswer).length;

  return (
    <section id="quiz" className="space-y-8 scroll-mt-20">
      {/* Quiz Section Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          Quiz de Fixação: Teste Seus Conhecimentos
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Responda a estas 4 perguntas rápidas para ter certeza de que compreendeu cada engrenagem da sua calculadora.
        </p>
      </div>

      {/* Quiz Progress & Score */}
      <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Progresso: {answeredCount} de {QUESTIONS.length} respondidas</span>
        </div>
        <div className="font-semibold text-indigo-400">
          {answeredCount > 0 ? `Pontuação: ${correctCount} / ${answeredCount} acertos` : 'Selecione uma resposta abaixo'}
        </div>
      </div>

      {/* Questions Grid */}
      <div className="space-y-4">
        {QUESTIONS.map((q) => {
          const selected = userAnswers[q.id];
          const hasAnswered = selected !== undefined;
          const isCorrect = hasAnswered && selected === q.correctAnswer;

          return (
            <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-slate-100">
                {q.id}. {q.question}
              </h3>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selected === optIdx;
                  let btnStyle = 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300';

                  if (hasAnswered) {
                    if (optIdx === q.correctAnswer) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-medium';
                    } else if (isThisSelected) {
                      btnStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-200';
                    } else {
                      btnStyle = 'bg-slate-950/50 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelectAnswer(q.id, optIdx)}
                      className={`text-left p-3 rounded-lg border text-xs transition-colors flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="font-mono text-slate-500 font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)})
                      </span>
                      <span className="flex-1">{opt}</span>
                      {hasAnswered && optIdx === q.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {hasAnswered && isThisSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when answered */}
              {hasAnswered && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed border ${
                  isCorrect
                    ? 'bg-emerald-950/30 border-emerald-900/40 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-900/40 text-rose-200'
                }`}>
                  <span className="font-semibold block mb-0.5">
                    {isCorrect ? '✅ Resposta Exata!' : '⚠️ Atenção:'}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Practical Challenges to Expand the Project */}
      <div className="pt-6 border-t border-slate-800 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            Desafios Práticos: Como Evoluir sua Calculadora
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Agora que você domina as 4 operações básicas, que tal tentar adicionar estes recursos ao seu código Python?
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              title: 'Desafio 1: Adicionar Exponenciação / Potência (**)',
              desc: 'Permita que o usuário calcule potenciação como 2 elevado a 3 (2 ** 3 = 8).',
              hint: 'Adicione a opção 5 no menu e faça: resultado = num1 ** num2'
            },
            {
              title: 'Desafio 2: Arredondar para 2 Casas Decimais (round)',
              desc: 'Em contas como 10 / 3 o resultado gera muitas casas (3.3333333333333335).',
              hint: 'Use a formatação f"{resultado:.2f}" ou a função round(resultado, 2).'
            },
            {
              title: 'Desafio 3: Divisão Inteira (//) e Resto da Divisão (%)',
              desc: 'Mostre quantas vezes um número cabe em outro e quanto sobra.',
              hint: '7 // 2 resulta em 3, e 7 % 2 resulta no resto 1.'
            },
            {
              title: 'Desafio 4: Proteção com try / except contra letras digitadas',
              desc: 'Se o usuário digitar "abc" no lugar do número, o programa pode quebrar.',
              hint: 'Envolva a leitura em: try: num = float(input(...)) except ValueError: print("Digite números!")'
            }
          ].map((ch, idx) => {
            const isExpanded = expandedChallenge === idx;
            return (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedChallenge(isExpanded ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-800/40 transition-colors"
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">
                      {ch.title}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {ch.desc}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-slate-950/60 border-t border-slate-800 text-xs">
                    <span className="text-indigo-400 font-medium">💡 Como implementar no código:</span>
                    <p className="text-slate-300 mt-1 font-mono text-[11px] bg-slate-950 p-2.5 rounded border border-slate-800">
                      {ch.hint}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
