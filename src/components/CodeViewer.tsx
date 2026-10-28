import React, { useState } from 'react';
import { Copy, Check, Download, Info, Sparkles } from 'lucide-react';
import { CODE_VERSIONS, CodeVersion } from '../data/codeSnippets';

interface CodeViewerProps {
  selectedVersion: CodeVersion;
  onSelectVersion: (version: CodeVersion) => void;
  onSelectConcept: (conceptKey: string) => void;
  highlightedConcept: string | null;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  selectedVersion,
  onSelectVersion,
  onSelectConcept,
  highlightedConcept
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedVersion.rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleDownload = () => {
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

  // Syntax colorizer helper for Python lines
  const formatPythonLine = (code: string) => {
    if (!code) return <span>&nbsp;</span>;

    // Comments
    if (code.trim().startsWith('#')) {
      return <span className="text-slate-400 italic">{code}</span>;
    }

    // Split inline comments
    const hashIndex = code.indexOf('#');
    let codePart = code;
    let commentPart = '';
    if (hashIndex !== -1 && !code.slice(0, hashIndex).includes('"') && !code.slice(0, hashIndex).includes("'")) {
      codePart = code.substring(0, hashIndex);
      commentPart = code.substring(hashIndex);
    }

    // Highlighting tokens
    const highlightedCode = highlightTokens(codePart);

    return (
      <>
        {highlightedCode}
        {commentPart && <span className="text-slate-400 italic">{commentPart}</span>}
      </>
    );
  };

  const highlightTokens = (code: string): React.ReactNode => {
    // Basic regex split tokenization
    const tokens = code.split(/(\b(?:def|return|if|elif|else|while|True|False|break|continue|try|except|isinstance|import|from|in)\b|(?:\b(?:print|input|float|int|str|len|range)\b)|(?:f"[^"]*"|f'[^']*'|"[^"]*"|'[^']*')|\b\d+(?:\.\d+)?\b|[+\-*\/=<>!]+)/g);

    return tokens.map((token, i) => {
      if (!token) return null;

      // Keywords
      if (/^(def|return|if|elif|else|while|True|False|break|continue|try|except|isinstance|import|from|in)$/.test(token)) {
        return <span key={i} className="text-pink-400 font-semibold">{token}</span>;
      }
      // Built-ins
      if (/^(print|input|float|int|str|len|range)$/.test(token)) {
        return <span key={i} className="text-indigo-300 font-semibold">{token}</span>;
      }
      // Strings & F-strings
      if (/^(f?".*"|f?'.*')$/.test(token)) {
        return <span key={i} className="text-emerald-300">{token}</span>;
      }
      // Numbers
      if (/^\d+(\.\d+)?$/.test(token)) {
        return <span key={i} className="text-amber-300">{token}</span>;
      }
      // Operators
      if (/^[+\-*\/=<>!]+$/.test(token)) {
        return <span key={i} className="text-cyan-300 font-medium">{token}</span>;
      }
      return <span key={i} className="text-slate-200">{token}</span>;
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top bar with version tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-3 gap-3">
        {/* Interactive Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CODE_VERSIONS.map(ver => {
            const isActive = selectedVersion.id === ver.id;
            return (
              <button
                key={ver.id}
                type="button"
                onClick={() => onSelectVersion(ver)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{ver.title.split('.')[1]?.trim() || ver.title}</span>
                {isActive && <Sparkles className="w-3 h-3 text-indigo-200" />}
              </button>
            );
          })}
        </div>

        {/* Action buttons: Copy & Download */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              copied
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Código Copiado!' : 'Copiar Código'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 transition-colors"
            title={`Baixar ${selectedVersion.filename}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Version summary & instructional hint */}
      <div className="px-5 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
        <div className="text-slate-300 flex items-center gap-2">
          <span className="font-semibold text-slate-200">{selectedVersion.title}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">{selectedVersion.description}</span>
        </div>
        <div className="text-slate-400 flex items-center gap-1 text-[11px] shrink-0">
          <Info className="w-3.5 h-3.5 text-indigo-400" />
          <span>Dica: Clique nas linhas para ver a explicação detalhada abaixo</span>
        </div>
      </div>

      {/* Code Editor Window */}
      <div className="p-4 bg-slate-950 font-mono text-xs overflow-x-auto max-h-[520px] select-text">
        <table className="w-full border-collapse">
          <tbody>
            {selectedVersion.lines.map((line) => {
              const isHighlighted = highlightedConcept && line.conceptKey === highlightedConcept;

              return (
                <tr
                  key={line.num}
                  onClick={() => line.conceptKey && onSelectConcept(line.conceptKey)}
                  className={`group transition-colors ${
                    line.conceptKey ? 'cursor-pointer hover:bg-indigo-950/30' : ''
                  } ${isHighlighted ? 'bg-indigo-950/50' : ''}`}
                >
                  {/* Line Number */}
                  <td className="w-10 pr-4 text-right select-none text-slate-600 group-hover:text-slate-400 font-mono text-[11px] align-top py-0.5">
                    {line.num}
                  </td>

                  {/* Code Line */}
                  <td className="whitespace-pre font-mono py-0.5 text-slate-200">
                    {formatPythonLine(line.code)}
                  </td>

                  {/* Interactive Indicator */}
                  <td className="w-24 pl-3 text-right select-none text-[10px] text-indigo-400/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {line.conceptKey ? 'Explicar ↗' : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Code Footer */}
      <div className="px-5 py-2.5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
        <span>Arquivo: {selectedVersion.filename} · UTF-8</span>
        <span>Python 3.6+ (Sintaxe compatível)</span>
      </div>
    </div>
  );
};
