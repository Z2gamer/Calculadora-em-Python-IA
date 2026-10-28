import React from 'react';
import { PYTHON_CONCEPTS, ConceptItem } from '../data/concepts';
import { BookOpen, AlertOctagon, Lightbulb, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ConceptsSectionProps {
  selectedConceptKey: string | null;
  onSelectConceptKey: (key: string) => void;
}

export const ConceptsSection: React.FC<ConceptsSectionProps> = ({
  selectedConceptKey,
  onSelectConceptKey
}) => {
  const activeConcept = selectedConceptKey ? PYTHON_CONCEPTS[selectedConceptKey] : null;

  return (
    <section id="explicacoes" className="space-y-6 scroll-mt-20">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-indigo-400" />
          Anatomia do Código: Explicação dos Principais Componentes
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Entenda o papel de cada estrutura que faz a calculadora funcionar. Clique em qualquer conceito abaixo ou nas linhas de código acima para aprofundar.
        </p>
      </div>

      {/* Grid of Concept Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {Object.values(PYTHON_CONCEPTS).map((concept) => {
          const isSelected = selectedConceptKey === concept.id;
          return (
            <button
              key={concept.id}
              type="button"
              onClick={() => onSelectConceptKey(concept.id)}
              className={`p-3 text-left rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/60 border-indigo-500/80 ring-1 ring-indigo-500/40 text-white'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 block mb-1">
                  {concept.tag}
                </span>
                <span className="text-xs font-semibold text-slate-100 block line-clamp-1">
                  {concept.name.split(':')[0]}
                </span>
              </div>
              <div className="mt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <code className="text-slate-300 bg-slate-950 px-1.5 py-0.5 rounded text-[10px] border border-slate-800">
                  {concept.syntax.slice(0, 18)}...
                </code>
                <ArrowRight className={`w-3 h-3 ${isSelected ? 'text-indigo-400' : 'text-slate-600'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Spotlight Card for Active Concept */}
      {activeConcept && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">
                {activeConcept.tag}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-100">
                {activeConcept.name}
              </h3>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300 shrink-0">
              Sintaxe: {activeConcept.syntax}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Description & Why it Matters */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  O que este componente faz?
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeConcept.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Por que é essencial no programa?
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeConcept.whyItMatters}
                </p>
              </div>

              {/* Tips */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  Dicas práticas para quem está começando
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeConcept.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">·</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Code example & Beginner Trap */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Exemplo no Código da Calculadora
                </h4>
                <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {activeConcept.codeSnippet}
                </pre>
              </div>

              {/* Beginner Trap Warning */}
              <div className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                  Armadilha Comum de Iniciantes
                </h4>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {activeConcept.beginnerPitfall}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
