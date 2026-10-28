import React, { useState } from 'react';
import { HistoryRecord } from './FormulaBuilder';
import { 
  History, 
  Trash2, 
  RotateCcw, 
  Copy, 
  Check, 
  Search, 
  Download, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface CalculationHistoryProps {
  history: HistoryRecord[];
  onSelectFormula: (formula: string) => void;
  onClearHistory: () => void;
}

export const CalculationHistory: React.FC<CalculationHistoryProps> = ({
  history,
  onSelectFormula,
  onClearHistory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter history
  const filteredHistory = history.filter(item => {
    const matchesSearch = 
      item.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.result).toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTag === 'todos') return matchesSearch;
    return matchesSearch && item.tags.includes(selectedTag);
  });

  const handleCopyResult = async (id: string, text: string | number) => {
    try {
      await navigator.clipboard.writeText(String(text));
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  const handleExportPythonScript = () => {
    if (history.length === 0) return;

    let scriptContent = `# ==========================================\n# HISTÓRICO DE CÁLCULOS EXPORTADO DO PYTHONCALC\n# ==========================================\nimport math\n\nhistorico = [\n`;
    
    history.forEach(item => {
      scriptContent += `    {\n        "formula": "${item.formula}",\n        "resultado": ${typeof item.result === 'number' ? item.result : `"${item.result}"`},\n        "data": "${item.timestamp}"\n    },\n`;
    });

    scriptContent += `]\n\nprint(f"Total de cálculos no histórico: {len(historico)}")\nfor idx, calc in enumerate(historico, 1):\n    print(f"[{idx}] {calc['formula']} = {calc['resultado']}")\n`;

    const blob = new Blob([scriptContent], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meu_historico_calculos.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="historico" className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0 scroll-mt-20">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              Histórico de Cálculos Anteriores
              <span className="text-xs font-mono font-normal text-slate-400">
                ({history.length} {history.length === 1 ? 'registro' : 'registros'})
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <>
              <button
                type="button"
                onClick={handleExportPythonScript}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
                title="Exportar como script Python funcional com a lista historico = [...]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar .py</span>
              </button>

              <button
                type="button"
                onClick={onClearHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 border border-rose-800/50 rounded-lg transition-colors whitespace-nowrap"
                title="Apagar todo o histórico"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpar</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-950/40 border-b border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por fórmula ou resultado..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter tags (Interactive filter controls) */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-slate-950 rounded-lg border border-slate-800/80">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'Raiz Quadrada', label: 'Raiz (√)' },
            { id: 'Potência', label: 'Potência (**)' },
            { id: 'Porcentagem', label: 'Porcentagem (%)' }
          ].map(tag => (
            <button
              key={tag.id}
              type="button"
              onClick={() => setSelectedTag(tag.id)}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                selectedTag === tag.id
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List */}
      <div className="p-5 max-h-[420px] overflow-y-auto space-y-2.5">
        {history.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800/60 border border-slate-700/80 mx-auto flex items-center justify-center text-slate-500">
              <History className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300">
                Seu histórico ainda está vazio
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Utilize o Montador de Fórmulas acima ou clique em "=" para calcular. Cada operação com raiz, potência e porcentagem será registrada aqui.
              </p>
            </div>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            Nenhum cálculo encontrado para "{searchTerm}".
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              {/* Formula & Tags */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-slate-100">
                    {item.formula}
                  </span>
                  <span className="text-slate-600 font-mono"> = </span>
                  <span className="font-mono text-sm font-bold text-emerald-400">
                    {item.result}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <span>{item.timestamp}</span>
                  {item.tags.map((tag, i) => (
                    <React.Fragment key={i}>
                      <span aria-hidden="true">·</span>
                      <span className="text-indigo-400">{tag}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => onSelectFormula(item.formula)}
                  className="px-2.5 py-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg transition-colors flex items-center gap-1"
                  title="Carregar esta fórmula de volta no teclado"
                >
                  <RotateCcw className="w-3 h-3 text-indigo-400" />
                  <span>Reutilizar</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyResult(item.id, item.result)}
                  className="px-2.5 py-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg transition-colors flex items-center gap-1"
                  title="Copiar resultado para a área de transferência"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400" />
                  )}
                  <span>{copiedId === item.id ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Educational Footer on Python Lists */}
      <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 font-mono gap-1">
        <span>Estrutura no Python: <code className="text-indigo-400">historico = []</code> com <code className="text-indigo-400">.append()</code></span>
        <span>Persistência local ativa (LocalStorage)</span>
      </div>
    </section>
  );
};
