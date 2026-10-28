import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, StepForward, Terminal, Cpu, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

interface TerminalSimulatorProps {
  onHighlightConcept?: (conceptKey: string) => void;
}

type StepPhase = 
  | 'idle' 
  | 'printing_menu' 
  | 'waiting_option' 
  | 'checking_option' 
  | 'waiting_num1' 
  | 'waiting_num2' 
  | 'calculating' 
  | 'printing_result' 
  | 'finished';

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ onHighlightConcept }) => {
  // Simulator inputs
  const [inputOption, setInputOption] = useState<string>('1');
  const [inputNum1, setInputNum1] = useState<string>('15');
  const [inputNum2, setInputNum2] = useState<string>('27');

  // Execution state
  const [stepPhase, setStepPhase] = useState<StepPhase>('idle');
  const [activeLine, setActiveLine] = useState<number | null>(null);
  
  // Variables in simulated Python memory
  const [vars, setVars] = useState<{
    opcao: string | null;
    num1: number | null;
    num2: number | null;
    resultado: number | string | null;
    status: 'pronto' | 'executando' | 'erro' | 'sucesso';
  }>({
    opcao: null,
    num1: null,
    num2: null,
    resultado: null,
    status: 'pronto'
  });

  // Terminal log lines
  const [terminalLogs, setTerminalLogs] = useState<Array<{ text: string; type: 'cmd' | 'output' | 'input' | 'error' | 'success' }>>([
    { text: 'Python 3.12.2 (main, interactive calc shell)', type: 'cmd' },
    { text: 'Carregando calculadora_simples.py...', type: 'output' },
    { text: 'Clique em "Executar no Terminal" ou escolha um Caso de Teste abaixo.', type: 'output' }
  ]);

  const resetSimulator = () => {
    setStepPhase('idle');
    setActiveLine(null);
    setVars({
      opcao: null,
      num1: null,
      num2: null,
      resultado: null,
      status: 'pronto'
    });
    setTerminalLogs([
      { text: 'Python 3.12.2 (main, interactive calc shell)', type: 'cmd' },
      { text: 'Terminal pronto para nova execução.', type: 'output' }
    ]);
  };

  const runFullExecution = (opt = inputOption, n1Str = inputNum1, n2Str = inputNum2) => {
    const logs: Array<{ text: string; type: 'cmd' | 'output' | 'input' | 'error' | 'success' }> = [
      { text: '$ python3 calculadora_simples.py', type: 'cmd' },
      { text: '--- CALCULADORA SIMPLES EM PYTHON ---', type: 'output' },
      { text: 'Escolha a operação desejada:', type: 'output' },
      { text: '1 - Adição (+)', type: 'output' },
      { text: '2 - Subtração (-)', type: 'output' },
      { text: '3 - Multiplicação (*)', type: 'output' },
      { text: '4 - Divisão (/)', type: 'output' },
      { text: `Digite o número da operação (1/2/3/4): ${opt}`, type: 'input' }
    ];

    if (!['1', '2', '3', '4'].includes(opt)) {
      logs.push({ text: 'Opção inválida! Por favor, escolha um número de 1 a 4.', type: 'error' });
      setVars({
        opcao: opt,
        num1: null,
        num2: null,
        resultado: null,
        status: 'erro'
      });
      setStepPhase('finished');
      setActiveLine(44);
      setTerminalLogs(logs);
      if (onHighlightConcept) onHighlightConcept('condicionais');
      return;
    }

    const n1 = parseFloat(n1Str);
    const n2 = parseFloat(n2Str);

    if (isNaN(n1) || isNaN(n2)) {
      logs.push({ text: 'Erro: Entrada inválida. Digite números válidos.', type: 'error' });
      setVars({
        opcao: opt,
        num1: null,
        num2: null,
        resultado: null,
        status: 'erro'
      });
      setTerminalLogs(logs);
      return;
    }

    logs.push({ text: `Digite o primeiro número: ${n1}`, type: 'input' });
    logs.push({ text: `Digite o segundo número: ${n2}`, type: 'input' });

    let res: number | string = 0;
    let isZeroDiv = false;

    if (opt === '1') {
      res = n1 + n2;
      logs.push({ text: `Resultado: ${n1} + ${n2} = ${res}`, type: 'success' });
      setActiveLine(25);
      if (onHighlightConcept) onHighlightConcept('operadores');
    } else if (opt === '2') {
      res = n1 - n2;
      logs.push({ text: `Resultado: ${n1} - ${n2} = ${res}`, type: 'success' });
      setActiveLine(29);
      if (onHighlightConcept) onHighlightConcept('operadores');
    } else if (opt === '3') {
      res = n1 * n2;
      logs.push({ text: `Resultado: ${n1} * ${n2} = ${res}`, type: 'success' });
      setActiveLine(33);
      if (onHighlightConcept) onHighlightConcept('operadores');
    } else if (opt === '4') {
      if (n2 === 0) {
        isZeroDiv = true;
        res = 'Divisão por Zero';
        logs.push({ text: 'Erro: Não é possível dividir um número por zero!', type: 'error' });
        setActiveLine(38);
        if (onHighlightConcept) onHighlightConcept('divisao_zero');
      } else {
        res = n1 / n2;
        logs.push({ text: `Resultado: ${n1} / ${n2} = ${res}`, type: 'success' });
        setActiveLine(41);
        if (onHighlightConcept) onHighlightConcept('operadores');
      }
    }

    setVars({
      opcao: opt,
      num1: n1,
      num2: n2,
      resultado: res,
      status: isZeroDiv ? 'erro' : 'sucesso'
    });
    setStepPhase('finished');
    setTerminalLogs(logs);
  };

  const applyPreset = (opt: string, n1: string, n2: string) => {
    setInputOption(opt);
    setInputNum1(n1);
    setInputNum2(n2);
    runFullExecution(opt, n1, n2);
  };

  // Step-by-step debugger mechanism
  const nextStep = () => {
    if (stepPhase === 'idle') {
      setStepPhase('printing_menu');
      setActiveLine(6);
      setTerminalLogs([
        { text: '$ python3 calculadora_simples.py', type: 'cmd' },
        { text: '--- CALCULADORA SIMPLES EM PYTHON ---', type: 'output' },
        { text: 'Escolha a operação desejada:', type: 'output' },
        { text: '1 - Adição (+)', type: 'output' },
        { text: '2 - Subtração (-)', type: 'output' },
        { text: '3 - Multiplicação (*)', type: 'output' },
        { text: '4 - Divisão (/)', type: 'output' }
      ]);
      if (onHighlightConcept) onHighlightConcept('print');
    } else if (stepPhase === 'printing_menu') {
      setStepPhase('waiting_option');
      setActiveLine(14);
      setVars(v => ({ ...v, opcao: inputOption, status: 'executando' }));
      setTerminalLogs(prev => [
        ...prev,
        { text: `Digite o número da operação (1/2/3/4): ${inputOption}`, type: 'input' }
      ]);
      if (onHighlightConcept) onHighlightConcept('input');
    } else if (stepPhase === 'waiting_option') {
      setStepPhase('checking_option');
      setActiveLine(17);
      if (!['1', '2', '3', '4'].includes(inputOption)) {
        setTerminalLogs(prev => [
          ...prev,
          { text: 'Opção inválida! Por favor, escolha um número de 1 a 4.', type: 'error' }
        ]);
        setActiveLine(44);
        setVars(v => ({ ...v, status: 'erro' }));
        setStepPhase('finished');
        if (onHighlightConcept) onHighlightConcept('condicionais');
      } else {
        setStepPhase('waiting_num1');
        setActiveLine(19);
        const parsed1 = parseFloat(inputNum1) || 0;
        setVars(v => ({ ...v, num1: parsed1 }));
        setTerminalLogs(prev => [
          ...prev,
          { text: `Digite o primeiro número: ${parsed1}`, type: 'input' }
        ]);
        if (onHighlightConcept) onHighlightConcept('float');
      }
    } else if (stepPhase === 'waiting_num1') {
      setStepPhase('waiting_num2');
      setActiveLine(20);
      const parsed2 = parseFloat(inputNum2) || 0;
      setVars(v => ({ ...v, num2: parsed2 }));
      setTerminalLogs(prev => [
        ...prev,
        { text: `Digite o segundo número: ${parsed2}`, type: 'input' }
      ]);
      if (onHighlightConcept) onHighlightConcept('float');
    } else if (stepPhase === 'waiting_num2') {
      const n1 = vars.num1 ?? parseFloat(inputNum1) ?? 0;
      const n2 = vars.num2 ?? parseFloat(inputNum2) ?? 0;
      setStepPhase('calculating');

      if (inputOption === '1') {
        setActiveLine(24);
        const r = n1 + n2;
        setVars(v => ({ ...v, resultado: r, status: 'sucesso' }));
        setTerminalLogs(prev => [...prev, { text: `Resultado: ${n1} + ${n2} = ${r}`, type: 'success' }]);
        if (onHighlightConcept) onHighlightConcept('operadores');
      } else if (inputOption === '2') {
        setActiveLine(28);
        const r = n1 - n2;
        setVars(v => ({ ...v, resultado: r, status: 'sucesso' }));
        setTerminalLogs(prev => [...prev, { text: `Resultado: ${n1} - ${n2} = ${r}`, type: 'success' }]);
        if (onHighlightConcept) onHighlightConcept('operadores');
      } else if (inputOption === '3') {
        setActiveLine(32);
        const r = n1 * n2;
        setVars(v => ({ ...v, resultado: r, status: 'sucesso' }));
        setTerminalLogs(prev => [...prev, { text: `Resultado: ${n1} * ${n2} = ${r}`, type: 'success' }]);
        if (onHighlightConcept) onHighlightConcept('operadores');
      } else if (inputOption === '4') {
        if (n2 === 0) {
          setActiveLine(38);
          setVars(v => ({ ...v, resultado: 'Erro Div/Zero', status: 'erro' }));
          setTerminalLogs(prev => [...prev, { text: 'Erro: Não é possível dividir um número por zero!', type: 'error' }]);
          if (onHighlightConcept) onHighlightConcept('divisao_zero');
        } else {
          setActiveLine(40);
          const r = n1 / n2;
          setVars(v => ({ ...v, resultado: r, status: 'sucesso' }));
          setTerminalLogs(prev => [...prev, { text: `Resultado: ${n1} / ${n2} = ${r}`, type: 'success' }]);
          if (onHighlightConcept) onHighlightConcept('operadores');
        }
      }
      setStepPhase('finished');
    } else {
      resetSimulator();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1.5 ml-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            simulador_terminal_python3
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Modo Interativo</span>
          <span className="text-slate-600">·</span>
          <span className="text-indigo-400 font-semibold">calculadora_simples.py</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left: Input Controls & Presets (5 cols) */}
        <div className="lg:col-span-5 p-5 space-y-5 bg-slate-900/60">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-tight flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Parâmetros de Entrada (input)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Altere os dados simulados que o Python receberá na execução.
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Opção */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Operação Selecionada (<code className="text-indigo-300">opcao</code>)
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {[
                  { val: '1', label: '1. Soma (+)' },
                  { val: '2', label: '2. Sub (-)' },
                  { val: '3', label: '3. Mult (*)' },
                  { val: '4', label: '4. Div (/)' }
                ].map(op => (
                  <button
                    key={op.val}
                    type="button"
                    onClick={() => setInputOption(op.val)}
                    className={`py-1.5 px-1 text-center text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      inputOption === op.val
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Número 1 e Número 2 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  1º Número (<code className="text-amber-300">num1</code>)
                </label>
                <input
                  type="number"
                  step="any"
                  value={inputNum1}
                  onChange={e => setInputNum1(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Ex: 15"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  2º Número (<code className="text-emerald-300">num2</code>)
                </label>
                <input
                  type="number"
                  step="any"
                  value={inputNum2}
                  onChange={e => setInputNum2(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Ex: 5"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => runFullExecution()}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-medium text-xs py-2.5 px-4 rounded-lg transition-all shadow-md shadow-indigo-600/20 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Executar no Terminal
            </button>

            <button
              type="button"
              onClick={nextStep}
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-slate-200 text-xs font-medium py-2.5 px-3.5 rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
              title="Avança linha por linha para ver o fluxo de execução"
            >
              <StepForward className="w-3.5 h-3.5 text-indigo-400" />
              {stepPhase === 'idle' ? 'Passo a Passo' : 'Próximo Passo'}
            </button>

            <button
              type="button"
              onClick={resetSimulator}
              className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg border border-slate-700 transition-colors"
              title="Limpar terminal e reiniciar variáveis"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Test Presets for Quick Demonstration */}
          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-2">
              Casos de Teste Prontos para Iniciantes
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => applyPreset('1', '15', '27')}
                className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md transition-colors"
              >
                15 + 27
              </button>
              <button
                type="button"
                onClick={() => applyPreset('2', '100', '42.5')}
                className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md transition-colors"
              >
                100 - 42.5
              </button>
              <button
                type="button"
                onClick={() => applyPreset('3', '7.5', '8')}
                className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md transition-colors"
              >
                7.5 * 8
              </button>
              <button
                type="button"
                onClick={() => applyPreset('4', '48', '6')}
                className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md transition-colors"
              >
                48 / 6
              </button>
              <button
                type="button"
                onClick={() => applyPreset('4', '10', '0')}
                className="text-xs bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
              >
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                10 / 0 (Divisão por zero)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('9', '10', '5')}
                className="text-xs bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/60 text-amber-300 px-2.5 py-1 rounded-md transition-colors"
              >
                Opção '9' (Inválida)
              </button>
            </div>
          </div>

          {/* Simulated Memory / Variables Inspector */}
          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-2">
              Inspetor de Variáveis (Memória RAM do Python)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">opcao (str):</span>
                <span className="text-indigo-300 font-semibold">{vars.opcao !== null ? `"${vars.opcao}"` : 'None'}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">num1 (float):</span>
                <span className="text-amber-300 font-semibold">{vars.num1 !== null ? vars.num1 : 'None'}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">num2 (float):</span>
                <span className="text-emerald-300 font-semibold">{vars.num2 !== null ? vars.num2 : 'None'}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">resultado:</span>
                <span className={`font-semibold ${typeof vars.resultado === 'string' ? 'text-rose-400' : 'text-cyan-300'}`}>
                  {vars.resultado !== null ? vars.resultado : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Simulated Terminal Output (7 cols) */}
        <div className="lg:col-span-7 p-5 bg-slate-950 font-mono text-xs flex flex-col justify-between min-h-[380px]">
          <div className="space-y-1.5 overflow-y-auto max-h-[360px] pr-2">
            {terminalLogs.map((log, idx) => {
              if (log.type === 'cmd') {
                return (
                  <div key={idx} className="text-slate-400 flex items-center gap-1.5 pb-1">
                    <span className="text-emerald-400 font-bold">user@python-calc:~$</span>
                    <span className="text-slate-100">{log.text.replace('$ ', '')}</span>
                  </div>
                );
              }
              if (log.type === 'input') {
                return (
                  <div key={idx} className="text-amber-300 flex items-center gap-1 py-0.5">
                    <ChevronRight className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{log.text}</span>
                  </div>
                );
              }
              if (log.type === 'error') {
                return (
                  <div key={idx} className="bg-rose-950/40 border border-rose-900/60 text-rose-300 px-3 py-2 rounded-md my-1.5 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{log.text}</span>
                  </div>
                );
              }
              if (log.type === 'success') {
                return (
                  <div key={idx} className="bg-emerald-950/40 border border-emerald-900/60 text-emerald-300 px-3 py-2 rounded-md my-1.5 flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{log.text}</span>
                  </div>
                );
              }
              return (
                <div key={idx} className="text-slate-300 leading-relaxed">
                  {log.text}
                </div>
              );
            })}

            {/* Blinking terminal cursor */}
            <div className="inline-flex items-center gap-1 text-slate-500 pt-1">
              <span>&gt;</span>
              <span className="w-2 h-4 bg-indigo-400 animate-pulse inline-block"></span>
            </div>
          </div>

          {/* Status footer inside terminal */}
          <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
            <span>Terminal I/O stdout / stdin</span>
            <span>
              {activeLine ? `Linha ativa em execução: #${activeLine}` : 'Pronto'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
