/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CODE_VERSIONS, CodeVersion } from './data/codeSnippets';
import { CodeViewer } from './components/CodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { ConceptsSection } from './components/ConceptsSection';
import { QuizSection } from './components/QuizSection';
import { FormulaBuilder, HistoryRecord } from './components/FormulaBuilder';
import { CalculationHistory } from './components/CalculationHistory';
import { 
  Download, 
  Terminal, 
  Code, 
  BookOpen, 
  Calculator,
  History,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const INITIAL_HISTORY: HistoryRecord[] = [
  {
    id: 'seed-1',
    formula: 'sqrt(64) + 2**4',
    result: 24,
    pythonCode: 'import math\n\nresultado = math.sqrt(64) + (2 ** 4)\nprint(f"Resultado: {resultado}")',
    timestamp: 'Hoje, 14:20:10',
    tags: ['Raiz Quadrada', 'Potência']
  },
  {
    id: 'seed-2',
    formula: '350 - (20% de 350)',
    result: 280,
    pythonCode: 'valor = 350\ntaxa = 20\nresultado = valor - (valor * (taxa / 100))\nprint(f"Resultado: {resultado}")',
    timestamp: 'Hoje, 14:25:45',
    tags: ['Porcentagem']
  },
  {
    id: 'seed-3',
    formula: 'sqrt(3**2 + 4**2)',
    result: 5,
    pythonCode: 'import math\n\nresultado = math.sqrt((3 ** 2) + (4 ** 2))\nprint(f"Resultado: {resultado}")',
    timestamp: 'Hoje, 14:30:00',
    tags: ['Raiz Quadrada', 'Potência']
  }
];

export default function App() {
  const [selectedVersion, setSelectedVersion] = useState<CodeVersion>(CODE_VERSIONS[3] || CODE_VERSIONS[0]);
  const [selectedConceptKey, setSelectedConceptKey] = useState<string>('potencia');
  const [selectedFormulaForBuilder, setSelectedFormulaForBuilder] = useState<string | null>(null);

  // Load history from localStorage
  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    try {
      const stored = localStorage.getItem('pythoncalc_history');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_HISTORY;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pythoncalc_history', JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  const handleAddToHistory = (newRecord: Omit<HistoryRecord, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const recordWithMeta: HistoryRecord = {
      ...newRecord,
      id: `calc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: `Hoje, ${timeStr}`
    };

    setHistory(prev => [recordWithMeta, ...prev]);
  };

  const handleClearHistory = () => {
    if (window.confirm('Tem certeza que deseja apagar todo o histórico de cálculos?')) {
      setHistory([]);
      try {
        localStorage.removeItem('pythoncalc_history');
      } catch {
        // ignore
      }
    }
  };

  const handleDownloadActiveScript = () => {
    const blob = new Blob([selectedVersion.rawCode], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedVersion.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleConceptSelect = (conceptKey: string) => {
    setSelectedConceptKey(conceptKey);
    const el = document.getElementById('explicacoes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFormulaToLoad = (formula: string) => {
    setSelectedFormulaForBuilder(formula);
    const el = document.getElementById('montador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar following Top Bar Contract (1 wordmark, 4 nav links, 1 primary action) */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2">
            <span className="text-indigo-400 font-mono font-bold">&gt;&gt;</span>
            PythonCalc Studio
          </a>

          {/* Zone 2: 4 single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#montador" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
              Montador de Fórmulas
            </a>
            <a href="#historico" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
              Histórico ({history.length})
            </a>
            <a href="#codigo" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
              Código Python
            </a>
            <a href="#explicacoes" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
              Anatomia dos Conceitos
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadActiveScript}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-indigo-600/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Script .py</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          <div className="lg:col-span-7 space-y-4">
            {/* Clean unboxed metadata (anti-pill) */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>Fórmulas Matemáticas</span>
              <span aria-hidden="true">·</span>
              <span>Raiz (√) & Potência (**)</span>
              <span aria-hidden="true">·</span>
              <span>Porcentagem & Histórico</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Monte Suas Fórmulas e Aprenda Python na Prática
            </h1>

            <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
              Crie expressões completas combinando <strong>as 4 operações básicas</strong> com <strong>raiz quadrada (math.sqrt)</strong>, <strong>potência (**)</strong> e <strong>porcentagem (%)</strong>. Acompanhe seu histórico de cálculos e veja em tempo real como o Python resolve cada etapa!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#montador"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium py-2.5 px-4 rounded-lg transition-all shadow-md shadow-indigo-600/25 whitespace-nowrap"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Montar Minha Fórmula</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#historico"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium py-2.5 px-4 rounded-lg transition-colors whitespace-nowrap"
              >
                <History className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ver Histórico de Cálculos ({history.length})</span>
              </a>
            </div>

            {/* Quick Operations Indicator Cards */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg">
                <span className="text-indigo-400 block font-bold text-sm">√x Raiz Quadrada</span>
                <span className="text-slate-400 text-[11px]">math.sqrt(x) ou x**0.5</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg">
                <span className="text-amber-400 block font-bold text-sm">xʸ Potência</span>
                <span className="text-slate-400 text-[11px]">base ** expoente</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg">
                <span className="text-emerald-400 block font-bold text-sm">% Porcentagem</span>
                <span className="text-slate-400 text-[11px]">(valor * taxa) / 100</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg">
                <span className="text-cyan-400 block font-bold text-sm">📋 Histórico</span>
                <span className="text-slate-400 text-[11px]">historico.append(...)</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img
                src="/src/assets/images/python_calc_hero_1793150388408.jpg"
                alt="Diagrama didático de conceitos de programação Python e operações aritméticas"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-video lg:aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-3 bg-slate-950/90 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Álgebra computacional & sintaxe limpa</span>
                <span className="text-indigo-400">PEMDAS · Listas · Math</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Interactive Formula Builder */}
        <section id="montador" className="space-y-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
                <Calculator className="w-6 h-6 text-indigo-400" />
                Montador Interativo de Fórmulas
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Digite ou use os botões para construir expressões com parênteses, raiz quadrada, potência e porcentagem.
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Avaliação Instantânea + Transpiler Python
            </div>
          </div>

          <FormulaBuilder 
            onAddToHistory={handleAddToHistory}
            onHighlightConcept={handleConceptSelect}
            externalFormula={selectedFormulaForBuilder}
          />
        </section>

        {/* Section 2: Calculation History */}
        <CalculationHistory
          history={history}
          onSelectFormula={handleSelectFormulaToLoad}
          onClearHistory={handleClearHistory}
        />

        {/* Section 3: Interactive Terminal Simulator */}
        <section id="terminal" className="space-y-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
                <Terminal className="w-6 h-6 text-indigo-400" />
                Simulador do Terminal Python
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Veja o fluxo de execução das operações passo a passo na memória do computador.
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Python 3.12 · Linha a Linha
            </div>
          </div>

          <TerminalSimulator onHighlightConcept={handleConceptSelect} />
        </section>

        {/* Section 4: Code Viewer with the 4 Python versions */}
        <section id="codigo" className="space-y-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
                <Code className="w-6 h-6 text-indigo-400" />
                Código-Fonte das 4 Versões da Calculadora
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Escolha a aba "4. Versão Completa" para ver o código com Raiz, Potência, Porcentagem e Histórico em Python.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Clique nas linhas para ver as explicações abaixo</span>
            </div>
          </div>

          <CodeViewer
            selectedVersion={selectedVersion}
            onSelectVersion={setSelectedVersion}
            onSelectConcept={handleConceptSelect}
            highlightedConcept={selectedConceptKey}
          />
        </section>

        {/* Section 5: Deep Component Anatomy Explanations */}
        <ConceptsSection
          selectedConceptKey={selectedConceptKey}
          onSelectConceptKey={setSelectedConceptKey}
        />

        {/* Section 6: Quiz & Knowledge Validation */}
        <QuizSection />
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-950 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-semibold font-mono">&gt; PythonCalc Studio</span>
            <span className="text-slate-600">·</span>
            <span>Calculadora com Fórmulas, Raiz, Potência, Porcentagem e Histórico</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#montador" className="hover:text-slate-200 transition-colors">Fórmulas</a>
            <a href="#historico" className="hover:text-slate-200 transition-colors">Histórico</a>
            <a href="#codigo" className="hover:text-slate-200 transition-colors">Código</a>
            <a href="#explicacoes" className="hover:text-slate-200 transition-colors">Conceitos</a>
            <a href="#quiz" className="hover:text-slate-200 transition-colors">Quiz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
