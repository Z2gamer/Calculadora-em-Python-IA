import React, { useState } from 'react';
import { 
  X, 
  GitBranch, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  FolderTree, 
  Lightbulb, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface GitHubGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubGuideModal: React.FC<GitHubGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const gitCommands = [
    { title: '1. Iniciar o repositório Git local', cmd: 'git init' },
    { title: '2. Adicionar todos os arquivos organizados', cmd: 'git add .' },
    { title: '3. Criar o primeiro commit explicativo', cmd: 'git commit -m "feat: calculadora em python com formulas e historico"' },
    { title: '4. Renomear o branch padrão para main', cmd: 'git branch -M main' },
    { title: '5. Conectar com seu repositório no GitHub', cmd: 'git remote add origin https://github.com/SEU-USUARIO/calculadora-python.git' },
    { title: '6. Enviar os arquivos para o GitHub', cmd: 'git push -u origin main' }
  ];

  const allCommandsText = gitCommands.map(c => c.cmd).join('\n');

  const copyCommand = async (cmd: string, index: number) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      setCopiedIndex(null);
    }
  };

  const copyAllCommands = async () => {
    try {
      await navigator.clipboard.writeText(allCommandsText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      setCopiedAll(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Guia de Publicação no GitHub
              </h2>
              <p className="text-xs text-slate-400">
                Passo a passo organizado para iniciantes subirem o repositório
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
            title="Fechar guia"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs text-slate-300">
          {/* Organization overview card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-indigo-400" />
              Como Organizamos os Arquivos Para Facilitar
            </h3>
            <p className="leading-relaxed text-slate-300">
              Separamos o repositório em duas partes claras para quem visitar seu perfil no GitHub:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-[11px]">
              <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg space-y-1">
                <span className="text-indigo-400 font-bold block">📁 /python_scripts/</span>
                <span className="text-slate-400 block font-sans">
                  Contém os 4 arquivos <code>.py</code> independentes que qualquer pessoa pode rodar diretamente com <code>python3</code> no terminal.
                </span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg space-y-1">
                <span className="text-emerald-400 font-bold block">📁 /src/ & README.md</span>
                <span className="text-slate-400 block font-sans">
                  Contém o app interativo React + Vite, a documentação com badges e a licença aberta MIT pronta.
                </span>
              </div>
            </div>
          </div>

          {/* Step 1: Create Repo on GitHub */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
              Criar o Repositório no Site do GitHub
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1 leading-relaxed">
              <li>Acesse <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-0.5">github.com/new <ExternalLink className="w-3 h-3" /></a>.</li>
              <li>Defina o nome do repositório (ex.: <code className="text-slate-200">calculadora-python</code>).</li>
              <li>Marque como <strong>Public</strong> (Público).</li>
              <li>
                <strong className="text-amber-300">Importante:</strong> Não marque "Add a README" nem ".gitignore", pois já criamos arquivos completos e configurados para você.
              </li>
              <li>Clique em <strong>Create repository</strong>.</li>
            </ol>
          </div>

          {/* Step 2: Terminal Commands Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
                Comandos Git para Enviar do Terminal
              </h3>
              <button
                type="button"
                onClick={copyAllCommands}
                className="flex items-center gap-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors"
              >
                {copiedAll ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedAll ? 'Todos Copiados!' : 'Copiar Todos'}</span>
              </button>
            </div>

            <div className="space-y-2 font-mono">
              {gitCommands.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-3 group hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <span className="text-[10px] text-slate-500 font-sans block">{item.title}</span>
                    <span className="text-indigo-300 text-xs block truncate selection:bg-indigo-600/30">{item.cmd}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyCommand(item.cmd, idx)}
                    className="p-1.5 text-slate-400 hover:text-slate-100 bg-slate-900 border border-slate-800 rounded-md transition-colors shrink-0"
                    title="Copiar comando"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips for GitHub */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              Dicas de Ouro para o seu Portfólio
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>README de Destaque:</strong> Já deixamos o <code>README.md</code> da raiz configurado com badges visuais, tabela de conceitos e guia de execução para impressionar recrutadores.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Segurança com .gitignore:</strong> Configuramos o <code>.gitignore</code> para ignorar a pasta <code>node_modules/</code> e arquivos temporários do Python (<code>__pycache__/</code>). Nunca suba pastas pesadas desnecessárias!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Licença MIT Inclusa:</strong> O arquivo <code>LICENSE</code> incluído permite que outros usem e estudem seu código livremente, o padrão dos projetos open-source.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">
            Repositório pronto para Git & GitHub
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
