const { useState } = React;

// Ícones SVG
const UploadIcon = () => (
  <svg className="w-12 h-12 text-indigo-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-16 h-16 text-indigo-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const DiagnosticoFinanceiro = () => {
  const [step, setStep] = useState(1);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [classificadas, setClassificadas] = useState([]);
  const [custoFixoMensal, setCustoFixoMensal] = useState(0);
  const [caixaDisponivel, setCaixaDisponivel] = useState(0);

  const categorias = ['OPERAÇÃO', 'PRÓ-LABORE', 'IMPOSTOS', 'DÍVIDAS'];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const processadas = jsonData.map((row, idx) => {
        const valor = parseFloat(row.Valor || row.valor || 0);
        return {
          id: idx,
          data: row.Data || row.data || '',
          descricao: row.Descrição || row.Descricao || row.descricao || '',
          valor: valor,
          tipo: valor >= 0 ? 'Entrada' : 'Saída',
          categoria: ''
        };
      });

      setMovimentacoes(processadas);
      setClassificadas(processadas);
      setStep(2);
    };
    reader.readAsBinaryString(file);
  };

  const updateCategoria = (id, categoria) => {
    setClassificadas(prev => 
      prev.map(mov => mov.id === id ? { ...mov, categoria } : mov)
    );
  };

  const calcularResumo = () => {
    const entradas = classificadas
      .filter(m => m.tipo === 'Entrada')
      .reduce((acc, m) => acc + m.valor, 0);

    const categorizado = {
      'OPERAÇÃO': 0,
      'PRÓ-LABORE': 0,
      'IMPOSTOS': 0,
      'DÍVIDAS': 0
    };

    classificadas
      .filter(m => m.tipo === 'Saída')
      .forEach(m => {
        if (m.categoria && categorizado[m.categoria] !== undefined) {
          categorizado[m.categoria] += Math.abs(m.valor);
        }
      });

    const totalSaidas = Object.values(categorizado).reduce((a, b) => a + b, 0);
    const resultado = entradas - totalSaidas;

    return { entradas, categorizado, totalSaidas, resultado };
  };

  const calcularPulmao = () => {
    if (custoFixoMensal <= 0) return 0;
    return (caixaDisponivel / custoFixoMensal).toFixed(2);
  };

  const detectarAnomalias = () => {
    const resumo = calcularResumo();
    const anomalias = [];

    if (resumo.categorizado['PRÓ-LABORE'] > resumo.resultado && resumo.resultado > 0) {
      anomalias.push('Pró-labore maior que o lucro');
    }

    const dividas = classificadas.filter(m => m.categoria === 'DÍVIDAS' && m.tipo === 'Saída');
    if (dividas.length > 0) {
      anomalias.push('Dívidas detectadas no período');
    }

    const impostos = classificadas.filter(m => m.categoria === 'IMPOSTOS' && m.tipo === 'Saída');
    if (impostos.length > 3) {
      anomalias.push('Múltiplos pagamentos de impostos (possível atraso)');
    }

    return anomalias;
  };

  const exportarPlanilha = () => {
    const wb = XLSX.utils.book_new();

    const wsMovimentacoes = XLSX.utils.json_to_sheet(
      movimentacoes.map(m => ({
        Data: m.data,
        Descrição: m.descricao,
        Valor: m.valor,
        Tipo: m.tipo
      }))
    );
    XLSX.utils.book_append_sheet(wb, wsMovimentacoes, 'MOVIMENTAÇÕES');

    const wsClassificacao = XLSX.utils.json_to_sheet(
      classificadas.map(m => ({
        Data: m.data,
        Descrição: m.descricao,
        Valor: m.valor,
        'Entrada ou Saída': m.tipo,
        Categoria: m.categoria || 'NÃO CLASSIFICADO'
      }))
    );
    XLSX.utils.book_append_sheet(wb, wsClassificacao, 'CLASSIFICAÇÃO');

    const resumo = calcularResumo();
    const wsResumo = XLSX.utils.json_to_sheet([
      { Item: 'Entradas Totais (60 dias)', Valor: resumo.entradas.toFixed(2) },
      { Item: 'Saídas - OPERAÇÃO', Valor: resumo.categorizado['OPERAÇÃO'].toFixed(2) },
      { Item: 'Saídas - PRÓ-LABORE', Valor: resumo.categorizado['PRÓ-LABORE'].toFixed(2) },
      { Item: 'Saídas - IMPOSTOS', Valor: resumo.categorizado['IMPOSTOS'].toFixed(2) },
      { Item: 'Saídas - DÍVIDAS', Valor: resumo.categorizado['DÍVIDAS'].toFixed(2) },
      { Item: 'Total Saídas', Valor: resumo.totalSaidas.toFixed(2) },
      { Item: '', Valor: '' },
      { Item: 'Resultado Real', Valor: resumo.resultado.toFixed(2) }
    ]);
    XLSX.utils.book_append_sheet(wb, wsResumo, 'RESUMO CAIXA');

    const pulmao = calcularPulmao();
    const classificacaoPulmao = pulmao < 1 ? 'CRÍTICO' : pulmao < 3 ? 'ESTÁVEL' : 'SAUDÁVEL';
    const wsPulmao = XLSX.utils.json_to_sheet([
      { Item: 'Custo Fixo Mensal', Valor: custoFixoMensal.toFixed(2) },
      { Item: 'Caixa Disponível', Valor: caixaDisponivel.toFixed(2) },
      { Item: '', Valor: '' },
      { Item: 'Pulmão Financeiro (meses)', Valor: pulmao },
      { Item: 'Classificação', Valor: classificacaoPulmao }
    ]);
    XLSX.utils.book_append_sheet(wb, wsPulmao, 'PULMÃO FINANCEIRO');

    const anomalias = detectarAnomalias();
    const wsAnomalias = XLSX.utils.json_to_sheet(
      anomalias.length > 0 
        ? anomalias.map(a => ({ Anomalia: a }))
        : [{ Anomalia: 'Nenhuma anomalia detectada' }]
    );
    XLSX.utils.book_append_sheet(wb, wsAnomalias, 'ANOMALIAS');

    const wsPlano = XLSX.utils.json_to_sheet([
      { Ação: 'Digite aqui', 'Impacto Estimado': 'R$ 0,00', Responsável: 'Nome', Prazo: '7 dias' },
      { Ação: '', 'Impacto Estimado': '', Responsável: '', Prazo: '' },
      { Ação: '', 'Impacto Estimado': '', Responsável: '', Prazo: '' }
    ]);
    XLSX.utils.book_append_sheet(wb, wsPlano, 'PLANO DE AÇÃO');

    const dataAtual = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `Diagnostico_Financeiro_${dataAtual}.xlsx`);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <FileIcon />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Diagnóstico Financeiro - MVP
              </h1>
              <p className="text-gray-600">
                Análise baseada apenas em extrato bancário
              </p>
            </div>

            <div className="border-2 border-dashed border-indigo-300 rounded-lg p-12 text-center hover:border-indigo-500 transition">
              <UploadIcon />
              <label className="cursor-pointer">
                <span className="text-lg text-gray-700 font-medium">
                  Clique para fazer upload do extrato bancário
                </span>
                <p className="text-sm text-gray-500 mt-2">
                  Formatos aceitos: Excel (.xlsx, .xls) ou CSV
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Colunas necessárias: Data, Descrição, Valor
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <AlertIcon />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">REGRA DO JOGO:</p>
                  <p>Aqui não fazemos contabilidade. Olhamos apenas para o dinheiro que entrou e saiu do banco.</p>
                  <p className="mt-2">Se não passou pelo banco, não existe para este trabalho.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const naoClassificadas = classificadas.filter(m => !m.categoria && m.tipo === 'Saída').length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Passo 2: Classificar Movimentações
            </h2>
            <p className="text-gray-600 mb-6">
              Classifique cada SAÍDA em uma das 4 categorias. Entradas não precisam ser classificadas.
            </p>

            <div className="mb-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">
                Total de movimentações: <span className="font-bold">{classificadas.length}</span> | 
                Saídas não classificadas: <span className={`font-bold ${naoClassificadas > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {naoClassificadas}
                </span>
              </div>
              <button
                onClick={() => setStep(3)}
                disabled={naoClassificadas > 0}
                className={`px-6 py-2 rounded-lg transition ${
                  naoClassificadas > 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Próximo: Pulmão Financeiro →
              </button>
            </div>

            {naoClassificadas > 0 && (
              <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
                <p className="text-sm text-yellow-800">
                  ⚠️ Classifique todas as saídas antes de continuar
                </p>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Data</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Descrição</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Valor</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Tipo</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Categoria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {classificadas.map((mov) => (
                    <tr key={mov.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">{mov.data}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{mov.descricao}</td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${
                        mov.tipo === 'Entrada' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        R$ {Math.abs(mov.valor).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          mov.tipo === 'Entrada' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {mov.tipo}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {mov.tipo === 'Saída' ? (
                          <select
                            value={mov.categoria}
                            onChange={(e) => updateCategoria(mov.id, e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 ${
                              !mov.categoria ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Selecione...</option>
                            {categorias.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-sm text-blue-800 font-semibold mb-2">Como classificar:</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li><strong>OPERAÇÃO:</strong> Despesas para a empresa funcionar (aluguel, funcionários, fornecedores)</li>
                <li><strong>PRÓ-LABORE:</strong> Dinheiro que foi para o dono ou família</li>
                <li><strong>IMPOSTOS:</strong> Qualquer pagamento para o governo (DAS, ISS, ICMS, INSS)</li>
                <li><strong>DÍVIDAS:</strong> Empréstimos, financiamentos, cartão parcelado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    const pulmao = calcularPulmao();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Passo 3: Calcular Pulmão Financeiro
            </h2>
            <p className="text-gray-600 mb-6">
              O pulmão financeiro mostra por quantos meses a empresa consegue sobreviver sem novas entradas.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  1. Custo Fixo Mensal Real (R$)
                </label>
                <input
                  type="number"
                  value={custoFixoMensal || ''}
                  onChange={(e) => setCustoFixoMensal(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
                  placeholder="Ex: 85000"
                />
                <p className="text-xs text-gray-600 mt-2">
                  💡 Considere apenas despesas que acontecem <strong>TODO MÊS</strong>: aluguel, funcionários, sistemas
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2. Caixa Disponível de Verdade (R$)
                </label>
                <input
                  type="number"
                  value={caixaDisponivel || ''}
                  onChange={(e) => setCaixaDisponivel(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
                  placeholder="Ex: 42500"
                />
                <p className="text-xs text-gray-600 mt-2">
                  💡 Saldo atual menos impostos vencidos e parcelas de dívidas
                </p>
              </div>
            </div>

            {custoFixoMensal > 0 && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8 mb-8 border-2 border-indigo-200">
                <h3 className="text-lg font-semibold text-indigo-900 mb-6 text-center">Resultado</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-indigo-700 mb-2">Pulmão Financeiro</p>
                    <p className="text-5xl font-bold text-indigo-900">{pulmao}</p>
                    <p className="text-lg text-indigo-700 mt-1">meses</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-700 mb-2">Classificação</p>
                    <p className={`text-2xl font-bold px-4 py-2 rounded-lg inline-block ${
                      pulmao < 1 ? 'bg-red-100 text-red-800' : 
                      pulmao < 3 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {pulmao < 1 ? 'CRÍTICO' : pulmao < 3 ? 'ESTÁVEL' : 'SAUDÁVEL'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
              >
                ← Voltar
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={custoFixoMensal <= 0}
                className={`flex-1 px-6 py-3 rounded-lg ${
                  custoFixoMensal <= 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Próximo: Resumo →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 4) {
    const resumo = calcularResumo();
    const pulmao = calcularPulmao();
    const anomalias = detectarAnomalias();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Resumo do Diagnóstico
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Análise completa baseada nos últimos 60 dias
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Resumo do Caixa</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entradas:</span>
                    <span className="font-bold text-green-600">R$ {resumo.entradas.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operação:</span>
                    <span className="font-semibold text-red-600">R$ {resumo.categorizado['OPERAÇÃO'].toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pró-labore:</span>
                    <span className="font-semibold text-red-600">R$ {resumo.categorizado['PRÓ-LABORE'].toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impostos:</span>
                    <span className="font-semibold text-red-600">R$ {resumo.categorizado['IMPOSTOS'].toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dívidas:</span>
                    <span className="font-semibold text-red-600">R$ {resumo.categorizado['DÍVIDAS'].toFixed(2)}</span>
                  </div>
                  <hr className="border-2" />
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-800">Resultado:</span>
                    <span className={`font-bold ${resumo.resultado >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      R$ {resumo.resultado.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🫁 Pulmão Financeiro</h3>
                <div className="text-center">
                  <p className="text-6xl font-bold text-indigo-600 mb-2">{pulmao}</p>
                  <p className="text-gray-600 mb-4">meses</p>
                  <p className={`inline-block px-4 py-2 rounded-full font-semibold ${
                    pulmao < 1 ? 'bg-red-100 text-red-800' : 
                    pulmao < 3 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {pulmao < 1 ? 'CRÍTICO' : pulmao < 3 ? 'ESTÁVEL' : 'SAUDÁVEL'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">⚠️ Anomalias Detectadas</h3>
              {anomalias.length > 0 ? (
                <ul className="space-y-2">
                  {anomalias.map((a, idx) => (
                    <li key={idx} className="flex items-start">
                      <AlertIcon />
                      <span className="text-sm text-yellow-800">{a}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center text-green-700">
                  <CheckIcon />
                  <span>Nenhuma anomalia detectada</span>
                </div>
              )}
            </div>

            <button
              onClick={exportarPlanilha}
              className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-semibold mb-4"
            >
              <DownloadIcon />
              Baixar Planilha Completa (6 abas)
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Nova Análise
            </button>
          </div>
        </div>
      </div>
    );
  }
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<DiagnosticoFinanceiro />);
