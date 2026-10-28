import React, { useState, useEffect, useId } from 'react';
import { 
  Calculator, 
  Delete, 
  RotateCcw, 
  Equal, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

export interface HistoryRecord {
  id: string;
  formula: string;
  result: number | string;
  pythonCode: string;
  timestamp: string;
  tags: string[];
}

interface FormulaBuilderProps {
  onAddToHistory: (record: Omit<HistoryRecord, 'id' | 'timestamp'>) => void;
  onHighlightConcept?: (conceptKey: string) => void;
  externalFormula?: string | null;
}

export const FormulaBuilder: React.FC<FormulaBuilderProps> = ({
  onAddToHistory,
  onHighlightConcept,
  externalFormula
}) => {
  const [formula, setFormula] = useState<string>('sqrt(64) + 2**3');
  const [result, setResult] = useState<number | string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pythonCode, setPythonCode] = useState<string>('');
  const [copiedPython, setCopiedPython] = useState(false);

  // When external formula is passed from history
  useEffect(() => {
    if (externalFormula) {
      setFormula(externalFormula);
    }
  }, [externalFormula]);

  // Convert human expression into valid Python & JS evaluation
  const parseFormula = (expr: string) => {
    let clean = expr.trim();
    if (!clean) {
      return { jsExpr: '', pyExpr: '', error: null, tags: [] as string[] };
    }

    const tags: string[] = [];

    // Replace unicode / alternate symbols
    clean = clean.replace(/×/g, '*').replace(/÷/g, '/');

    // Detect tags
    if (clean.includes('sqrt') || clean.includes('√')) tags.push('Raiz Quadrada');
    if (clean.includes('**') || clean.includes('^')) tags.push('Potência');
    if (clean.includes('%')) tags.push('Porcentagem');

    // Convert ^ to ** for Python/JS
    let processed = clean.replace(/\^/g, '**');

    // Handle √x or sqrt(x)
    // If user writes √25 or √(25)
    processed = processed.replace(/√\s*(\d+(\.\d+)?)/g, 'sqrt($1)');
    processed = processed.replace(/√\s*\(([^)]+)\)/g, 'sqrt($1)');

    // Handle percentage logic:
    // e.g. "200 + 10%" or "15% de 200" or "50 * 20%"
    // 1) "X% de Y" -> (X / 100) * Y
    processed = processed.replace(/(\d+(?:\.\d+)?)\s*%\s*(?:de|of|\*)\s*(\d+(?:\.\d+)?)/gi, '(($1 / 100) * $2)');
    // 2) number followed by % -> (number / 100)
    processed = processed.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1 / 100)');

    // JS version for evaluation: replace sqrt with Math.sqrt
    const jsExpr = processed.replace(/sqrt\(/g, 'Math.sqrt(');

    // Python version for display
    const pyExpr = processed.replace(/sqrt\(/g, 'math.sqrt(');

    return { jsExpr, pyExpr, error: null, tags };
  };

  // Evaluate safely
  const evaluateCurrentFormula = (silent = false) => {
    setErrorMsg(null);
    if (!formula.trim()) {
      setResult(null);
      setPythonCode('');
      return;
    }

    const { jsExpr, pyExpr, tags } = parseFormula(formula);

    // Check negative sqrt
    const negSqrtMatch = /sqrt\(\s*-\s*\d+/.test(formula);
    if (negSqrtMatch) {
      const err = 'Erro: Não existe raiz quadrada real de número negativo em Python (ValueError)';
      setErrorMsg(err);
      setResult('Erro');
      if (onHighlightConcept) onHighlightConcept('raiz');
      return;
    }

    try {
      // Validate characters to avoid arbitrary code injection
      if (!/^[0-9+\-*/().,\sMathsqrt**%]+$/.test(jsExpr)) {
        throw new Error('Expressão contém caracteres inválidos.');
      }

      // Check division by zero
      if (/\/0(?![0-9.])/.test(jsExpr.replace(/\s+/g, ''))) {
        const err = 'Erro: Divisão por zero (ZeroDivisionError)';
        setErrorMsg(err);
        setResult('Divisão por Zero');
        if (onHighlightConcept) onHighlightConcept('divisao_zero');
        return;
      }

      // Evaluate formula
      // eslint-disable-next-line no-new-func
      const calcResult = Function(`"use strict"; return (${jsExpr})`)();

      if (typeof calcResult !== 'number' || isNaN(calcResult)) {
        throw new Error('Resultado numérico indefinido.');
      }

      // Format result (round to 6 decimal places to prevent float precision artifacts like 0.30000000000000004)
      const cleanResult = Number.isInteger(calcResult) ? calcResult : parseFloat(calcResult.toFixed(6));
      setResult(cleanResult);

      const generatedPy = `import math\n\n# Expressão calculada:\nresultado = ${pyExpr}\nprint(f"Resultado: {resultado}")`;
      setPythonCode(generatedPy);

      if (!silent) {
        onAddToHistory({
          formula: formula.trim(),
          result: cleanResult,
          pythonCode: generatedPy,
          tags: tags.length > 0 ? tags : ['Operação Básica']
        });
      }

      // Highlight active concept
      if (onHighlightConcept) {
        if (tags.includes('Raiz Quadrada')) onHighlightConcept('raiz');
        else if (tags.includes('Potência')) onHighlightConcept('potencia');
        else if (tags.includes('Porcentagem')) onHighlightConcept('porcentagem');
        else onHighlightConcept('operadores');
      }
    } catch {
      setErrorMsg('Expressão matemática incompleta ou inválida. Verifique parênteses e operadores.');
      setResult('Erro de Sintaxe');
    }
  };

  // Live preview evaluation on formula change
  useEffect(() => {
    evaluateCurrentFormula(true);
  }, [formula]);

  const insertToken = (token: string) => {
    setFormula(prev => prev + token);
  };

  const handleBackspace = () => {
    setFormula(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setFormula('');
    setResult(null);
    setErrorMsg(null);
    setPythonCode('');
  };

  const copyPython = async () => {
    if (!pythonCode) return;
    try {
      await navigator.clipboard.writeText(pythonCode);
      setCopiedPython(true);
      setTimeout(() => setCopiedPython(false), 2000);
    } catch {
      setCopiedPython(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Montador de Fórmulas Matemáticas
              <span className="text-[11px] font-mono text-indigo-400 font-normal">
                (Álgebra + Python)
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>PEMDAS Ativo</span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400">Tempo Real</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left Side: Formula Display & Interactive Keypad (7 cols) */}
        <div className="lg:col-span-7 p-6 space-y-5">
          {/* Formula Screen / Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Fórmula Digitada:</span>
              <span>{formula.length} caracteres</span>
            </div>

            {/* Formula Input */}
            <input
              type="text"
              value={formula}
              onChange={e => setFormula(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') evaluateCurrentFormula(false);
              }}
              placeholder="Digite ou monte sua fórmula (ex: sqrt(25) + 3**2)..."
              className="w-full bg-transparent text-xl sm:text-2xl font-mono text-slate-100 focus:outline-none placeholder:text-slate-600 tracking-wide"
            />

            {/* Result row */}
            <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Equal className="w-3.5 h-3.5 text-indigo-400" />
                Resultado:
              </span>
              <span className={`text-2xl font-mono font-bold ${
                errorMsg ? 'text-rose-400 text-base' : 'text-emerald-400'
              }`}>
                {result !== null ? result : '---'}
              </span>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="text-xs text-rose-400 flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Interactive Keypad */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">
                Teclado de Operações & Símbolos
              </span>
              <span className="text-slate-500">Clique para inserir na fórmula</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {/* Specialized math operations */}
              <button
                type="button"
                onClick={() => insertToken('sqrt(')}
                className="p-2.5 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-800/60 text-indigo-300 font-mono text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                title="Raiz Quadrada (math.sqrt no Python)"
              >
                <span>√x</span>
                <span className="text-[10px] text-indigo-400/80">sqrt</span>
              </button>

              <button
                type="button"
                onClick={() => insertToken('**')}
                className="p-2.5 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-800/60 text-indigo-300 font-mono text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                title="Potência em Python (**)"
              >
                <span>xʸ</span>
                <span className="text-[10px] text-indigo-400/80">**</span>
              </button>

              <button
                type="button"
                onClick={() => insertToken('**2')}
                className="p-2.5 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-800/60 text-indigo-300 font-mono text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                title="Elevar ao Quadrado (**2)"
              >
                <span>x²</span>
              </button>

              <button
                type="button"
                onClick={() => insertToken('%')}
                className="p-2.5 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-800/60 text-indigo-300 font-mono text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                title="Porcentagem"
              >
                <span>%</span>
                <span className="text-[10px] text-indigo-400/80">taxa</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="p-2.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 font-mono text-xs font-semibold rounded-lg transition-colors"
                title="Limpar toda a fórmula"
              >
                C (Limpar)
              </button>

              {/* Numbers and Basic Operations */}
              {[
                { label: '(', val: '(' },
                { label: ')', val: ')' },
                { label: '÷', val: ' / ', style: 'text-amber-400 bg-slate-800/80' },
                { label: '×', val: ' * ', style: 'text-amber-400 bg-slate-800/80' },
                { label: '⌫', action: handleBackspace, style: 'text-slate-400 hover:text-slate-200' },

                { label: '7', val: '7' },
                { label: '8', val: '8' },
                { label: '9', val: '9' },
                { label: '-', val: ' - ', style: 'text-amber-400 bg-slate-800/80' },
                { label: '3.1415 (π)', val: '3.14159', style: 'text-xs text-indigo-300' },

                { label: '4', val: '4' },
                { label: '5', val: '5' },
                { label: '6', val: '6' },
                { label: '+', val: ' + ', style: 'text-amber-400 bg-slate-800/80' },
                { label: '00', val: '00' },

                { label: '1', val: '1' },
                { label: '2', val: '2' },
                { label: '3', val: '3' },
                { label: '.', val: '.' },
                { label: '0', val: '0' }
              ].map((btn, idx) => {
                if ('action' in btn && btn.action) {
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={btn.action}
                      className={`p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 font-mono text-xs font-medium rounded-lg transition-colors ${btn.style || 'text-slate-200'}`}
                    >
                      {btn.label}
                    </button>
                  );
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertToken(btn.val!)}
                    className={`p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 font-mono text-sm font-medium rounded-lg transition-colors ${btn.style || 'text-slate-200'}`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evaluate & Save Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => evaluateCurrentFormula(false)}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-medium text-sm py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-600/25"
            >
              <Equal className="w-4 h-4" />
              <span>Calcular e Salvar no Histórico (=)</span>
            </button>
          </div>

          {/* Quick Formula Presets for learning */}
          <div className="pt-3 border-t border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-2">
              Fórmulas Prontas para Experimentar
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { label: 'Raiz + Potência', f: 'sqrt(64) + 2**3' },
                { label: 'Desconto 15% de 200', f: '200 - (15% de 200)' },
                { label: 'Pitágoras: Hipotenusa', f: 'sqrt(3**2 + 4**2)' },
                { label: 'Expressão com Parênteses', f: '(15 + 5) * (8 - 3) / 2' },
                { label: 'Juros: Capital * (1+i)^t', f: '1000 * (1 + 0.05)**3' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFormula(preset.f);
                  }}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Python Transpiler & Pedagogical Rule Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-950/60 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Equivalente em Código Python
              </h4>

              <button
                type="button"
                onClick={copyPython}
                className="text-[11px] font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-800 transition-colors"
              >
                {copiedPython ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPython ? 'Copiado!' : 'Copiar Python'}</span>
              </button>
            </div>

            {/* Generated Python Block */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed shadow-inner">
              <pre className="whitespace-pre-wrap">
                {pythonCode || `# Digite uma fórmula ao lado para\n# ver o código Python gerado em tempo real.\nimport math`}
              </pre>
            </div>

            {/* Python Operator Precedence Guide */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <h5 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                Ordem de Precedência no Python (PEMDAS)
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assim como na matemática, o Python calcula operações em uma ordem rigorosa:
              </p>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded border border-slate-800/80">
                  <span className="w-5 h-5 rounded bg-indigo-900/60 text-indigo-300 text-center font-bold text-[11px] leading-5 shrink-0">1</span>
                  <span className="text-indigo-300 font-semibold">Parênteses ( )</span>
                  <span className="text-slate-500 text-[11px] ml-auto">Prioridade máxima</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded border border-slate-800/80">
                  <span className="w-5 h-5 rounded bg-indigo-900/60 text-indigo-300 text-center font-bold text-[11px] leading-5 shrink-0">2</span>
                  <span className="text-indigo-300 font-semibold">Potência e Raiz ( ** )</span>
                  <span className="text-slate-500 text-[11px] ml-auto">2 ** 3 ou x ** 0.5</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded border border-slate-800/80">
                  <span className="w-5 h-5 rounded bg-indigo-900/60 text-indigo-300 text-center font-bold text-[11px] leading-5 shrink-0">3</span>
                  <span className="text-indigo-300 font-semibold">Mult / Div ( * , / , // , % )</span>
                  <span className="text-slate-500 text-[11px] ml-auto">Da esq. para dir.</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded border border-slate-800/80">
                  <span className="w-5 h-5 rounded bg-indigo-900/60 text-indigo-300 text-center font-bold text-[11px] leading-5 shrink-0">4</span>
                  <span className="text-indigo-300 font-semibold">Soma e Subtração ( + , - )</span>
                  <span className="text-slate-500 text-[11px] ml-auto">Executadas por último</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-900 text-xs text-slate-500 flex items-center justify-between">
            <span>Validador de Expressão Ativo</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Sintaxe Python OK
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
