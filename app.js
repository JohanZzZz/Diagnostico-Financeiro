const { useState, useRef, useEffect } = React;

// ============================================
// ÍCONES SVG
// ============================================
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

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

// ============================================
// COMPONENTE DE TOGGLE DE TEMA
// ============================================
const ThemeToggle = ({ darkMode, setDarkMode }) => (
  <button
    onClick={() => setDarkMode(!darkMode)}
    className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
        : 'bg-white text-gray-700 hover:bg-gray-100'
    }`}
    title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
  >
    {darkMode ? <SunIcon /> : <MoonIcon />}
  </button>
);

// ============================================
// COMPONENTE DE GRÁFICO DE PIZZA (SVG)
// ============================================
const PieChart = ({ data, darkMode }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return null;
  
  let currentAngle = 0;
  const colors = ['#6366F1', '#F59E0B', '#10B981', '#EF4444'];
  
  const createSlice = (value, index) => {
    const percentage = value / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;
    
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    return (
      <path
        key={index}
        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
        fill={colors[index % colors.length]}
        stroke={darkMode ? '#1F2937' : 'white'}
        strokeWidth="2"
      />
    );
  };
  
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="w-32 h-32">
        {data.filter(d => d.value > 0).map((item, idx) => createSlice(item.value, idx))}
      </svg>
      <div className="text-xs space-y-1">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: colors[idx % colors.length] }}
            />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              {item.label}: {((item.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// COMPONENTE DE BARRA DE PROGRESSO
// ============================================
const ProgressBar = ({ value, max, color, label, darkMode }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{label}</span>
        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{percentage.toFixed(0)}%</span>
      </div>
      <div className={`h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// ============================================
// COMPONENTE DE INDICADOR DE SAÚDE
// ============================================
const HealthIndicator = ({ status, label, darkMode }) => {
  const configs = {
    good: { color: 'bg-green-500', icon: '✓', text: 'text-green-600' },
    warning: { color: 'bg-yellow-500', icon: '!', text: 'text-yellow-600' },
    danger: { color: 'bg-red-500', icon: '✗', text: 'text-red-600' }
  };
  const config = configs[status] || configs.warning;
  
  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className={`w-6 h-6 rounded-full ${config.color} flex items-center justify-center text-white text-xs font-bold`}>
        {config.icon}
      </div>
      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
    </div>
  );
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const DiagnosticoFinanceiro = () => {
  const [step, setStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [classificadas, setClassificadas] = useState([]);
  
  // Campos do Pulmão Financeiro
  const [caixaAtual, setCaixaAtual] = useState(0);
  const [contasPagar30d, setContasPagar30d] = useState(0);
  const [impostosProvisionados, setImpostosProvisionados] = useState(0);
  const [parcelasDivida, setParcelasDivida] = useState(0);
  const [comr, setComr] = useState(0);
  
  // Campos para análise avançada
  const [receitaBruta, setReceitaBruta] = useState(0);
  const [valorLiquidoRecebido, setValorLiquidoRecebido] = useState(0);
  
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [mesReferencia, setMesReferencia] = useState('');
  const [gerandoPDF, setGerandoPDF] = useState(false);
  
  const reportRef = useRef();
  const categorias = ['OPERAÇÃO', 'PRÓ-LABORE', 'IMPOSTOS', 'DÍVIDAS'];

  // Persistir tema no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('diagnostico-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('diagnostico-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Classes dinâmicas baseadas no tema
  const themeClasses = {
    bg: darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100',
    card: darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white',
    text: darkMode ? 'text-gray-100' : 'text-gray-800',
    textSecondary: darkMode ? 'text-gray-400' : 'text-gray-600',
    input: darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900',
    inputFocus: darkMode ? 'focus:ring-indigo-400 focus:border-indigo-400' : 'focus:ring-indigo-500 focus:border-indigo-500',
    table: darkMode ? 'bg-gray-700' : 'bg-gray-100',
    tableRow: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    highlight: darkMode ? 'bg-gray-700' : 'bg-gray-50',
    warning: darkMode ? 'bg-yellow-900/30 border-yellow-600' : 'bg-yellow-50 border-yellow-400',
    warningText: darkMode ? 'text-yellow-300' : 'text-yellow-800',
    info: darkMode ? 'bg-blue-900/30 border-blue-600' : 'bg-blue-50 border-blue-400',
    infoText: darkMode ? 'text-blue-300' : 'text-blue-800',
  };

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

    classificadas.filter(m => m.tipo === 'Saída').forEach(m => {
      if (m.categoria && categorizado[m.categoria] !== undefined) {
        categorizado[m.categoria] += Math.abs(m.valor);
      }
    });

    const totalSaidas = Object.values(categorizado).reduce((a, b) => a + b, 0);
    const resultado = entradas - totalSaidas;

    return { entradas, categorizado, totalSaidas, resultado };
  };

  const calcularPulmaoFinanceiro = () => {
    const cld = caixaAtual - contasPagar30d - impostosProvisionados - parcelasDivida;
    const pulmãoDias = comr > 0 ? (cld / comr) * 30 : 0;
    const pulmãoMeses = pulmãoDias / 30;
    
    let classificacao = '';
    let cor = '';
    let mensagem = '';
    
    if (pulmãoDias < 30) {
      classificacao = 'RISCO OPERACIONAL';
      cor = 'red';
      mensagem = 'Pulmão abaixo de 30 dias';
    } else if (pulmãoDias >= 30 && pulmãoDias < 60) {
      classificacao = 'ZONA DE ALERTA';
      cor = 'yellow';
      mensagem = 'Pulmão entre 30 e 60 dias';
    } else {
      classificacao = 'ESTABILIDADE MÍNIMA';
      cor = 'green';
      mensagem = 'Pulmão acima de 60 dias';
    }
    
    return {
      cld: cld.toFixed(2),
      dias: pulmãoDias.toFixed(0),
      meses: pulmãoMeses.toFixed(2),
      classificacao,
      cor,
      mensagem
    };
  };

  const detectarAnomalias = () => {
    const resumo = calcularResumo();
    const anomalias = [];

    // A1 - Caixa negativo com resultado positivo
    const variacaoCaixa = resumo.entradas - resumo.totalSaidas;
    if (resumo.resultado > 0 && variacaoCaixa < 0) {
      anomalias.push({
        codigo: 'A1',
        titulo: 'Caixa negativo com resultado positivo',
        descricao: 'Resultado operacional positivo mas variação de caixa negativa. Indica descasamento de prazo, crescimento sem capital de giro ou antecipação excessiva.',
        criticidade: 'ALTA',
        impacto: `Variação: R$ ${variacaoCaixa.toFixed(2)}`,
        recomendacao: 'Revise os prazos de recebimento e pagamento. Considere renegociar prazos com fornecedores ou antecipar menos recebíveis.'
      });
    }

    // A2 - Oscilação anormal de caixa
    const mediaMovimentacao = (resumo.entradas + resumo.totalSaidas) / 2;
    const oscilacao = Math.abs(resumo.entradas - resumo.totalSaidas);
    const percentualOscilacao = mediaMovimentacao > 0 ? (oscilacao / mediaMovimentacao) * 100 : 0;
    
    if (percentualOscilacao > 30) {
      anomalias.push({
        codigo: 'A2',
        titulo: 'Oscilação anormal de caixa',
        descricao: 'Caixa "sanfona" - entra muito, sai muito, nunca estabiliza. Desvio mensal maior que 30% da média.',
        criticidade: 'MÉDIA',
        impacto: `Oscilação: ${percentualOscilacao.toFixed(1)}%`,
        recomendacao: 'Crie uma reserva de estabilização. Padronize datas de pagamento e busque previsibilidade nas entradas.'
      });
    }

    // A3 - Caixa sustentado por exceção
    const entradasNaoRecorrentes = resumo.categorizado['DÍVIDAS'];
    if (resumo.entradas > 0) {
      const percentualNaoRecorrente = (entradasNaoRecorrentes / resumo.entradas) * 100;
      
      if (percentualNaoRecorrente > 20) {
        anomalias.push({
          codigo: 'A3',
          titulo: 'Caixa sustentado por exceção',
          descricao: 'Entradas não recorrentes (empréstimos, aportes) representam mais de 20% das entradas totais.',
          criticidade: 'ALTA',
          impacto: `${percentualNaoRecorrente.toFixed(1)}% das entradas`,
          recomendacao: 'A empresa está dependente de capital externo. Foque em aumentar receita operacional e reduzir custos.'
        });
      }
    }

    // B1 - Pró-labore maior que o lucro
    if (resumo.categorizado['PRÓ-LABORE'] > resumo.resultado && resumo.resultado > 0) {
      anomalias.push({
        codigo: 'B1',
        titulo: 'Pró-labore maior que o lucro',
        descricao: 'Retirada dos sócios excede o resultado operacional.',
        criticidade: 'ALTA',
        impacto: `Diferença: R$ ${(resumo.categorizado['PRÓ-LABORE'] - resumo.resultado).toFixed(2)}`,
        recomendacao: 'Reduza o pró-labore para um valor sustentável ou encontre formas de aumentar o faturamento.'
      });
    }

    // B2 - Endividamento elevado
    const dividas = classificadas.filter(m => m.categoria === 'DÍVIDAS' && m.tipo === 'Saída');
    if (dividas.length > 0) {
      const totalDividas = dividas.reduce((acc, m) => acc + Math.abs(m.valor), 0);
      if (resumo.resultado > 0 && totalDividas > resumo.resultado * 0.3) {
        anomalias.push({
          codigo: 'B2',
          titulo: 'Endividamento elevado',
          descricao: 'Parcelas de dívidas representam mais de 30% do resultado.',
          criticidade: 'MÉDIA',
          impacto: `R$ ${totalDividas.toFixed(2)} (${((totalDividas/resumo.resultado)*100).toFixed(1)}%)`,
          recomendacao: 'Avalie renegociação de dívidas para prazos maiores ou taxas menores. Evite novos empréstimos.'
        });
      }
    }

    return anomalias;
  };

  // Gerar recomendações baseadas na análise
  const gerarRecomendacoes = () => {
    const pulmao = calcularPulmaoFinanceiro();
    const resumo = calcularResumo();
    const recomendacoes = [];

    // Recomendações baseadas no pulmão
    if (parseFloat(pulmao.dias) < 30) {
      recomendacoes.push({
        prioridade: 'URGENTE',
        titulo: 'Aumentar reserva de emergência',
        descricao: 'Seu pulmão está crítico. Priorize a construção de uma reserva de pelo menos 30 dias de operação.',
        acao: 'Separe 10% de toda entrada para reserva até atingir a meta.'
      });
    }

    // Recomendações baseadas nas categorias
    if (resumo.categorizado['OPERAÇÃO'] > resumo.entradas * 0.7) {
      recomendacoes.push({
        prioridade: 'ALTA',
        titulo: 'Custos operacionais muito altos',
        descricao: 'A operação consome mais de 70% das entradas.',
        acao: 'Revise contratos, renegocie com fornecedores e elimine desperdícios.'
      });
    }

    if (resumo.resultado < 0) {
      recomendacoes.push({
        prioridade: 'URGENTE',
        titulo: 'Resultado negativo',
        descricao: 'A empresa está operando no vermelho.',
        acao: 'Corte despesas não essenciais imediatamente e revise a precificação.'
      });
    }

    if (resumo.categorizado['IMPOSTOS'] > resumo.entradas * 0.15) {
      recomendacoes.push({
        prioridade: 'MÉDIA',
        titulo: 'Carga tributária elevada',
        descricao: 'Impostos representam mais de 15% do faturamento.',
        acao: 'Consulte um contador para avaliar enquadramento tributário mais vantajoso.'
      });
    }

    return recomendacoes;
  };

  // Calcular indicadores de saúde
  const calcularIndicadoresSaude = () => {
    const pulmao = calcularPulmaoFinanceiro();
    const resumo = calcularResumo();
    const anomalias = detectarAnomalias();

    return {
      pulmao: parseFloat(pulmao.dias) >= 60 ? 'good' : parseFloat(pulmao.dias) >= 30 ? 'warning' : 'danger',
      resultado: resumo.resultado > 0 ? 'good' : resumo.resultado === 0 ? 'warning' : 'danger',
      anomalias: anomalias.length === 0 ? 'good' : anomalias.some(a => a.criticidade === 'ALTA') ? 'danger' : 'warning',
      operacao: resumo.categorizado['OPERAÇÃO'] <= resumo.entradas * 0.6 ? 'good' : 
                resumo.categorizado['OPERAÇÃO'] <= resumo.entradas * 0.8 ? 'warning' : 'danger'
    };
  };

  const gerarPDF = async () => {
    setGerandoPDF(true);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const element = reportRef.current;
    element.style.position = 'static';
    element.style.left = '0';
    element.style.top = '0';
    
    const opt = {
      margin: 10,
      filename: `Diagnostico_${nomeEmpresa || 'Empresa'}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Veja o console para mais detalhes.');
    } finally {
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      setGerandoPDF(false);
    }
  };

  // ============================================
  // STEP 1: Upload
  // ============================================
  if (step === 1) {
    return (
      <div className={`min-h-screen ${themeClasses.bg} p-8 transition-colors duration-300`}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-4xl mx-auto">
          <div className={`${themeClasses.card} rounded-xl shadow-lg p-8 transition-colors duration-300`}>
            <div className="text-center mb-8">
              <div className={darkMode ? 'text-indigo-400' : ''}>
                <FileIcon />
              </div>
              <h1 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>
                Diagnóstico Financeiro
              </h1>
              <p className={themeClasses.textSecondary}>
                Análise baseada em extrato bancário
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={nomeEmpresa}
                  onChange={(e) => setNomeEmpresa(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${themeClasses.input} ${themeClasses.inputFocus} transition-colors duration-300`}
                  placeholder="Ex: Minha Empresa Ltda"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  Mês de Referência
                </label>
                <input
                  type="text"
                  value={mesReferencia}
                  onChange={(e) => setMesReferencia(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${themeClasses.input} ${themeClasses.inputFocus} transition-colors duration-300`}
                  placeholder="Ex: Janeiro/2025"
                />
              </div>
            </div>

            <div className={`border-2 border-dashed ${darkMode ? 'border-indigo-500 hover:border-indigo-400' : 'border-indigo-300 hover:border-indigo-500'} rounded-lg p-12 text-center transition-colors duration-300`}>
              <UploadIcon />
              <label className="cursor-pointer">
                <span className={`text-lg ${themeClasses.text} font-medium`}>
                  Clique para fazer upload do extrato bancário
                </span>
                <p className={`text-sm ${themeClasses.textSecondary} mt-2`}>
                  Formatos aceitos: Excel (.xlsx, .xls) ou CSV
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <div className={`mt-8 ${themeClasses.warning} border-l-4 p-4 rounded-r-lg transition-colors duration-300`}>
              <div className="flex">
                <AlertIcon />
                <div className={`text-sm ${themeClasses.warningText}`}>
                  <p className="font-semibold mb-1">REGRA DO JOGO:</p>
                  <p>Aqui não fazemos contabilidade. Olhamos apenas para o dinheiro que entrou e saiu do banco.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // STEP 2: Classificação
  // ============================================
  if (step === 2) {
    const naoClassificadas = classificadas.filter(m => !m.categoria && m.tipo === 'Saída').length;
    
    return (
      <div className={`min-h-screen ${themeClasses.bg} p-8 transition-colors duration-300`}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-6xl mx-auto">
          <div className={`${themeClasses.card} rounded-xl shadow-lg p-8 transition-colors duration-300`}>
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>
              Passo 2: Classificar Movimentações
            </h2>
            <p className={`${themeClasses.textSecondary} mb-6`}>
              Classifique cada SAÍDA em uma das 4 categorias.
            </p>

            <div className={`mb-6 flex justify-between items-center ${themeClasses.highlight} p-4 rounded-lg transition-colors duration-300`}>
              <div className={`text-sm ${themeClasses.textSecondary}`}>
                Total: <span className="font-bold">{classificadas.length}</span> | 
                Não classificadas: <span className={`font-bold ${naoClassificadas > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {naoClassificadas}
                </span>
              </div>
              <button
                onClick={() => setStep(3)}
                disabled={naoClassificadas > 0}
                className={`px-6 py-2 rounded-lg transition ${
                  naoClassificadas > 0 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Próximo: Pulmão Financeiro →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={themeClasses.table}>
                  <tr>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${themeClasses.text}`}>Data</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${themeClasses.text}`}>Descrição</th>
                    <th className={`px-4 py-3 text-right text-xs font-semibold ${themeClasses.text}`}>Valor</th>
                    <th className={`px-4 py-3 text-center text-xs font-semibold ${themeClasses.text}`}>Tipo</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${themeClasses.text}`}>Categoria</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${themeClasses.border}`}>
                  {classificadas.map((mov) => (
                    <tr key={mov.id} className={themeClasses.tableRow}>
                      <td className={`px-4 py-3 text-sm ${themeClasses.text}`}>{mov.data}</td>
                      <td className={`px-4 py-3 text-sm ${themeClasses.text}`}>{mov.descricao}</td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${
                        mov.tipo === 'Entrada' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        R$ {Math.abs(mov.valor).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 text-xs rounded ${
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
                            className={`w-full px-3 py-2 border rounded text-sm ${themeClasses.input} ${
                              !mov.categoria ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''
                            }`}
                          >
                            <option value="">Selecione...</option>
                            {categorias.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        ) : (
                          <span className={`text-sm ${themeClasses.textSecondary}`}>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`mt-6 ${themeClasses.info} border-l-4 p-4 rounded-r-lg transition-colors duration-300`}>
              <p className={`text-sm ${themeClasses.infoText} font-semibold mb-2`}>Como classificar:</p>
              <ul className={`text-xs ${themeClasses.infoText} space-y-1`}>
                <li><strong>OPERAÇÃO:</strong> Despesas para a empresa funcionar</li>
                <li><strong>PRÓ-LABORE:</strong> Dinheiro que foi para o dono ou família</li>
                <li><strong>IMPOSTOS:</strong> Pagamentos ao governo</li>
                <li><strong>DÍVIDAS:</strong> Empréstimos e financiamentos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // STEP 3: Pulmão Financeiro
  // ============================================
  if (step === 3) {
    const pulmao = calcularPulmaoFinanceiro();
    
    return (
      <div className={`min-h-screen ${themeClasses.bg} p-8 transition-colors duration-300`}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-4xl mx-auto">
          <div className={`${themeClasses.card} rounded-xl shadow-lg p-8 transition-colors duration-300`}>
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>
              Passo 3: Cálculo do Pulmão Financeiro
            </h2>
            <p className={`${themeClasses.textSecondary} mb-6`}>
              Preencha os campos abaixo para calcular o pulmão financeiro real da empresa.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className={`${themeClasses.highlight} p-4 rounded-lg transition-colors duration-300`}>
                <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>
                  Caixa Atual (R$)
                </label>
                <input
                  type="number"
                  value={caixaAtual || ''}
                  onChange={(e) => setCaixaAtual(parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-2 border-2 rounded-lg ${themeClasses.input} ${themeClasses.inputFocus}`}
                  placeholder="0.00"
                />
                <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>Saldo disponível em banco</p>
              </div>

              <div className={`${themeClasses.highlight} p-4 rounded-lg transition-colors duration-300`}>
                <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>
                  Contas a Pagar (30 dias) (R$)
                </label>
                <input
                  type="number"
                  value={contasPagar30d || ''}
                  onChange={(e) => setContasPagar30d(parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-2 border-2 rounded-lg ${themeClasses.input} ${themeClasses.inputFocus}`}
                  placeholder="0.00"
                />
                <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>Contas vencendo nos próximos 30 dias</p>
              </div>

              <div className={`${themeClasses.highlight} p-4 rounded-lg transition-colors duration-300`}>
                <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>
                  Impostos Provisionados (R$)
                </label>
                <input
                  type="number"
                  value={impostosProvisionados || ''}
                  onChange={(e) => setImpostosProvisionados(parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-2 border-2 rounded-lg ${themeClasses.input} ${themeClasses.inputFocus}`}
                  placeholder="0.00"
                />
                <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>Impostos a pagar no mês</p>
              </div>

              <div className={`${themeClasses.highlight} p-4 rounded-lg transition-colors duration-300`}>
                <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>
                  Parcelas de Dívida (R$)
                </label>
                <input
                  type="number"
                  value={parcelasDivida || ''}
                  onChange={(e) => setParcelasDivida(parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-2 border-2 rounded-lg ${themeClasses.input} ${themeClasses.inputFocus}`}
                  placeholder="0.00"
                />
                <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>Parcelas de empréstimos/financiamentos</p>
              </div>

              <div className={`${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'} p-4 rounded-lg col-span-2 transition-colors duration-300`}>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-900'} mb-2`}>
                  COMR - Custo Operacional Mensal Real (R$)
                </label>
                <input
                  type="number"
                  value={comr || ''}
                  onChange={(e) => setComr(parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-2 border-2 ${darkMode ? 'border-indigo-500 bg-gray-700 text-white' : 'border-indigo-300 bg-white'} rounded-lg`}
                  placeholder="0.00"
                />
                <p className={`text-xs ${darkMode ? 'text-indigo-400' : 'text-indigo-700'} mt-1`}>Despesas fixas mensais da operação</p>
              </div>
            </div>

            {/* RESULTADO DO CÁLCULO */}
            {comr > 0 && (
              <div className={`${darkMode ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-500' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'} p-8 rounded-lg mb-8 border-2 transition-colors duration-300`}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-900'} mb-6 text-center`}>Resultado do Pulmão Financeiro</h3>
                
                <div className="text-center mb-6">
                  <p className={`text-sm ${themeClasses.textSecondary} mb-2`}>Seu pulmão hoje:</p>
                  <p className={`text-6xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-900'} mb-2`}>{pulmao.dias}</p>
                  <p className={`text-xl ${themeClasses.text} mb-1`}>dias</p>
                  <p className={`text-lg ${themeClasses.textSecondary}`}>({pulmao.meses} meses)</p>
                </div>

                <div className="text-center mb-6">
                  <p className={`inline-block px-8 py-3 rounded-full text-lg font-bold ${
                    pulmao.cor === 'red' ? 'bg-red-100 text-red-800' :
                    pulmao.cor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {pulmao.classificacao}
                  </p>
                  <p className={`text-sm ${themeClasses.textSecondary} mt-2`}>{pulmao.mensagem}</p>
                </div>

                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg transition-colors duration-300`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Caixa Líquido Disponível (CLD):</span>
                    <span className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-900'}`}>R$ {pulmao.cld}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className={`flex-1 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} px-6 py-3 rounded-lg transition-colors duration-300`}
              >
                ← Voltar
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={comr <= 0}
                className={`flex-1 px-6 py-3 rounded-lg transition-colors duration-300 ${
                  comr <= 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
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

  // ============================================
  // STEP 4: Resumo + PDF
  // ============================================
  if (step === 4) {
    const resumo = calcularResumo();
    const pulmao = calcularPulmaoFinanceiro();
    const anomalias = detectarAnomalias();
    const recomendacoes = gerarRecomendacoes();
    const saude = calcularIndicadoresSaude();
    
    const dadosGrafico = [
      { label: 'Operação', value: resumo.categorizado['OPERAÇÃO'] },
      { label: 'Pró-labore', value: resumo.categorizado['PRÓ-LABORE'] },
      { label: 'Impostos', value: resumo.categorizado['IMPOSTOS'] },
      { label: 'Dívidas', value: resumo.categorizado['DÍVIDAS'] }
    ];

    return (
      <>
        {/* CONTEÚDO PARA PDF (OCULTO) */}
        <div ref={reportRef} style={{ position: 'absolute', left: '-9999px', width: '190mm', backgroundColor: 'white' }}>
          <div style={{ padding: '15px', backgroundColor: 'white', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
            {/* CAPA */}
            <div style={{ textAlign: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '3px solid #4F46E5' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '15px' }}>
                Relatório de Diagnóstico Financeiro
              </h1>
              <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#4F46E5', marginBottom: '8px' }}>
                {nomeEmpresa || 'Empresa'}
              </h2>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                {mesReferencia || 'Período de Análise'}
              </p>
              <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '20px' }}>
                Documento confidencial e de uso exclusivo do cliente
              </p>
              <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '5px' }}>
                Gerado em {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>

            {/* INDICADORES DE SAÚDE */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px', borderBottom: '2px solid #D1D5DB', paddingBottom: '6px' }}>
                Painel de Saúde Financeira
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
                {[
                  { label: 'Pulmão', status: saude.pulmao },
                  { label: 'Resultado', status: saude.resultado },
                  { label: 'Anomalias', status: saude.anomalias },
                  { label: 'Operação', status: saude.operacao }
                ].map((item, idx) => (
                  <div key={idx} style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    textAlign: 'center',
                    backgroundColor: item.status === 'good' ? '#D1FAE5' : item.status === 'warning' ? '#FEF3C7' : '#FEE2E2'
                  }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      margin: '0 auto 8px',
                      backgroundColor: item.status === 'good' ? '#10B981' : item.status === 'warning' ? '#F59E0B' : '#EF4444',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {item.status === 'good' ? '✓' : item.status === 'warning' ? '!' : '✗'}
                    </div>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#374151' }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RESUMO DO CAIXA COM GRÁFICO */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px', borderBottom: '2px solid #D1D5DB', paddingBottom: '6px' }}>
                1. Resumo do Caixa
              </h3>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                {/* Valores */}
                <div style={{ flex: '1' }}>
                  <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>Entradas Totais:</span>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#10B981' }}>R$ {resumo.entradas.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>Saídas Totais:</span>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#EF4444' }}>R$ {resumo.totalSaidas.toFixed(2)}</span>
                    </div>
                  </div>

                  {['OPERAÇÃO', 'PRÓ-LABORE', 'IMPOSTOS', 'DÍVIDAS'].map((cat, idx) => (
                    <div key={cat} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                        <span>{cat}</span>
                        <span>R$ {resumo.categorizado[cat].toFixed(2)} ({resumo.totalSaidas > 0 ? ((resumo.categorizado[cat] / resumo.totalSaidas) * 100).toFixed(0) : 0}%)</span>
                      </div>
                      <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${resumo.totalSaidas > 0 ? (resumo.categorizado[cat] / resumo.totalSaidas) * 100 : 0}%`,
                          backgroundColor: ['#6366F1', '#F59E0B', '#10B981', '#EF4444'][idx],
                          borderRadius: '4px'
                        }} />
                      </div>
                    </div>
                  ))}

                  <div style={{ padding: '12px', backgroundColor: '#EEF2FF', border: '2px solid #818CF8', borderRadius: '4px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '13px' }}>Resultado Real:</span>
                      <span style={{ fontWeight: 'bold', fontSize: '18px', color: resumo.resultado >= 0 ? '#10B981' : '#EF4444' }}>
                        R$ {resumo.resultado.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Gráfico de Pizza (SVG simples) */}
                <div style={{ width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 100 100" style={{ width: '120px', height: '120px' }}>
                    {(() => {
                      const total = resumo.totalSaidas;
                      if (total === 0) return <circle cx="50" cy="50" r="40" fill="#E5E7EB" />;
                      
                      const colors = ['#6366F1', '#F59E0B', '#10B981', '#EF4444'];
                      const values = [resumo.categorizado['OPERAÇÃO'], resumo.categorizado['PRÓ-LABORE'], resumo.categorizado['IMPOSTOS'], resumo.categorizado['DÍVIDAS']];
                      let currentAngle = -90;
                      
                      return values.map((value, idx) => {
                        if (value === 0) return null;
                        const percentage = value / total;
                        const angle = percentage * 360;
                        const startAngle = currentAngle;
                        const endAngle = currentAngle + angle;
                        currentAngle = endAngle;
                        
                        const startRad = startAngle * Math.PI / 180;
                        const endRad = endAngle * Math.PI / 180;
                        
                        const x1 = 50 + 40 * Math.cos(startRad);
                        const y1 = 50 + 40 * Math.sin(startRad);
                        const x2 = 50 + 40 * Math.cos(endRad);
                        const y2 = 50 + 40 * Math.sin(endRad);
                        
                        const largeArc = angle > 180 ? 1 : 0;
                        
                        return (
                          <path
                            key={idx}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={colors[idx]}
                            stroke="white"
                            strokeWidth="1"
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div style={{ marginTop: '10px', fontSize: '9px' }}>
                    {[
                      { label: 'Operação', color: '#6366F1' },
                      { label: 'Pró-labore', color: '#F59E0B' },
                      { label: 'Impostos', color: '#10B981' },
                      { label: 'Dívidas', color: '#EF4444' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                        <div style={{ width: '8px', height: '8px', backgroundColor: item.color, borderRadius: '2px' }} />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PULMÃO FINANCEIRO */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px', borderBottom: '2px solid #D1D5DB', paddingBottom: '6px' }}>
                2. Pulmão Financeiro
              </h3>
              <div style={{ background: 'linear-gradient(to right, #EEF2FF, #F5F3FF)', padding: '25px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>Seu pulmão hoje:</p>
                <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#312E81', margin: '8px 0' }}>{pulmao.dias}</p>
                <p style={{ fontSize: '16px', color: '#4B5563', marginBottom: '4px' }}>dias</p>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '15px' }}>({pulmao.meses} meses)</p>
                <div style={{ display: 'inline-block', padding: '10px 30px', borderRadius: '9999px', fontWeight: 'bold', fontSize: '14px',
                  backgroundColor: pulmao.cor === 'red' ? '#FEE2E2' : pulmao.cor === 'yellow' ? '#FEF3C7' : '#D1FAE5',
                  color: pulmao.cor === 'red' ? '#991B1B' : pulmao.cor === 'yellow' ? '#92400E' : '#065F46'
                }}>
                  {pulmao.classificacao}
                </div>
                <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '10px' }}>{pulmao.mensagem}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <div style={{ backgroundColor: '#F9FAFB', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '9px', color: '#6B7280', marginBottom: '3px' }}>Caixa Atual</p>
                  <p style={{ fontSize: '14px', fontWeight: '600' }}>R$ {caixaAtual.toFixed(2)}</p>
                </div>
                <div style={{ backgroundColor: '#F9FAFB', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '9px', color: '#6B7280', marginBottom: '3px' }}>Contas a Pagar (30d)</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#EF4444' }}>R$ {contasPagar30d.toFixed(2)}</p>
                </div>
                <div style={{ backgroundColor: '#F9FAFB', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '9px', color: '#6B7280', marginBottom: '3px' }}>Impostos Provisionados</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#EF4444' }}>R$ {impostosProvisionados.toFixed(2)}</p>
                </div>
                <div style={{ backgroundColor: '#F9FAFB', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '9px', color: '#6B7280', marginBottom: '3px' }}>Parcelas de Dívida</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#EF4444' }}>R$ {parcelasDivida.toFixed(2)}</p>
                </div>
              </div>
              <div style={{ backgroundColor: '#DBEAFE', padding: '12px', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', color: '#1E3A8A', fontSize: '12px' }}>Caixa Líquido Disponível (CLD):</span>
                  <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#1E3A8A' }}>R$ {pulmao.cld}</span>
                </div>
              </div>
            </div>

            {/* ANOMALIAS */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px', borderBottom: '2px solid #D1D5DB', paddingBottom: '6px' }}>
                3. Anomalias Detectadas
              </h3>
              {anomalias.length > 0 ? (
                <div>
                  {anomalias.map((a, idx) => (
                    <div key={idx} style={{ 
                      padding: '12px', 
                      backgroundColor: a.criticidade === 'ALTA' ? '#FEE2E2' : a.criticidade === 'MÉDIA' ? '#FEF3C7' : '#DBEAFE',
                      borderLeft: `4px solid ${a.criticidade === 'ALTA' ? '#DC2626' : a.criticidade === 'MÉDIA' ? '#F59E0B' : '#3B82F6'}`,
                      borderRadius: '4px', 
                      marginBottom: '10px' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '12px', color: '#1F2937' }}>
                          {a.codigo} - {a.titulo}
                        </p>
                        <span style={{ 
                          fontSize: '9px', 
                          padding: '3px 8px', 
                          borderRadius: '4px', 
                          fontWeight: 'bold',
                          backgroundColor: a.criticidade === 'ALTA' ? '#FCA5A5' : a.criticidade === 'MÉDIA' ? '#FCD34D' : '#93C5FD',
                          color: a.criticidade === 'ALTA' ? '#7F1D1D' : a.criticidade === 'MÉDIA' ? '#78350F' : '#1E3A8A'
                        }}>
                          {a.criticidade}
                        </span>
                      </div>
                      <p style={{ fontSize: '10px', color: '#4B5563', marginBottom: '4px', lineHeight: '1.4' }}>{a.descricao}</p>
                      <p style={{ fontSize: '9px', color: '#6B7280', fontWeight: 'bold', marginBottom: '4px' }}>Impacto: {a.impacto}</p>
                      {a.recomendacao && (
                        <p style={{ fontSize: '9px', color: '#065F46', backgroundColor: '#D1FAE5', padding: '6px', borderRadius: '4px' }}>
                          💡 {a.recomendacao}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '18px', backgroundColor: '#D1FAE5', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ color: '#065F46', fontWeight: '600', fontSize: '13px' }}>✓ Nenhuma anomalia crítica detectada</p>
                </div>
              )}
            </div>

            {/* RECOMENDAÇÕES */}
            {recomendacoes.length > 0 && (
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px', borderBottom: '2px solid #D1D5DB', paddingBottom: '6px' }}>
                  4. Recomendações
                </h3>
                {recomendacoes.map((rec, idx) => (
                  <div key={idx} style={{ 
                    padding: '12px', 
                    backgroundColor: rec.prioridade === 'URGENTE' ? '#FEF2F2' : rec.prioridade === 'ALTA' ? '#FFF7ED' : '#F0FDF4',
                    borderLeft: `4px solid ${rec.prioridade === 'URGENTE' ? '#DC2626' : rec.prioridade === 'ALTA' ? '#EA580C' : '#16A34A'}`,
                    borderRadius: '4px', 
                    marginBottom: '10px' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ 
                        fontSize: '9px', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontWeight: 'bold',
                        backgroundColor: rec.prioridade === 'URGENTE' ? '#FCA5A5' : rec.prioridade === 'ALTA' ? '#FDBA74' : '#86EFAC',
                        color: rec.prioridade === 'URGENTE' ? '#7F1D1D' : rec.prioridade === 'ALTA' ? '#7C2D12' : '#14532D'
                      }}>
                        {rec.prioridade}
                      </span>
                      <p style={{ fontWeight: 'bold', fontSize: '12px', color: '#1F2937' }}>{rec.titulo}</p>
                    </div>
                    <p style={{ fontSize: '10px', color: '#4B5563', marginBottom: '6px' }}>{rec.descricao}</p>
                    <p style={{ fontSize: '10px', color: '#1E40AF', backgroundColor: '#DBEAFE', padding: '6px', borderRadius: '4px' }}>
                      🎯 <strong>Ação:</strong> {rec.acao}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* RODAPÉ */}
            <div style={{ marginTop: '30px', paddingTop: '15px', borderTop: '2px solid #D1D5DB', textAlign: 'center', fontSize: '10px', color: '#9CA3AF' }}>
              <p>Relatório gerado em {new Date().toLocaleDateString('pt-BR')}</p>
              <p style={{ marginTop: '5px' }}>Documento confidencial e de uso exclusivo do cliente</p>
            </div>
          </div>
        </div>

        {/* TELA VISÍVEL */}
        <div className={`min-h-screen ${themeClasses.bg} p-8 transition-colors duration-300`}>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="max-w-5xl mx-auto">
            <div className={`${themeClasses.card} rounded-xl shadow-lg p-8 transition-colors duration-300`}>
              <h2 className={`text-3xl font-bold ${themeClasses.text} mb-4 text-center`}>
                Resumo do Diagnóstico Financeiro
              </h2>
              <p className={`${themeClasses.textSecondary} mb-8 text-center`}>
                {nomeEmpresa || 'Empresa'} - {mesReferencia || 'Período de Análise'}
              </p>

              {/* INDICADORES DE SAÚDE */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <HealthIndicator status={saude.pulmao} label="Pulmão" darkMode={darkMode} />
                <HealthIndicator status={saude.resultado} label="Resultado" darkMode={darkMode} />
                <HealthIndicator status={saude.anomalias} label="Anomalias" darkMode={darkMode} />
                <HealthIndicator status={saude.operacao} label="Operação" darkMode={darkMode} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* RESUMO DO CAIXA */}
                <div className={`${themeClasses.highlight} rounded-lg p-6 transition-colors duration-300`}>
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>📊 Resumo do Caixa</h3>
                  
                  <div className="mb-4">
                    <PieChart data={dadosGrafico} darkMode={darkMode} />
                  </div>

                  <div className="space-y-2">
                    <ProgressBar 
                      value={resumo.categorizado['OPERAÇÃO']} 
                      max={resumo.totalSaidas || 1} 
                      color="bg-indigo-500" 
                      label="Operação" 
                      darkMode={darkMode}
                    />
                    <ProgressBar 
                      value={resumo.categorizado['PRÓ-LABORE']} 
                      max={resumo.totalSaidas || 1} 
                      color="bg-amber-500" 
                      label="Pró-labore" 
                      darkMode={darkMode}
                    />
                    <ProgressBar 
                      value={resumo.categorizado['IMPOSTOS']} 
                      max={resumo.totalSaidas || 1} 
                      color="bg-emerald-500" 
                      label="Impostos" 
                      darkMode={darkMode}
                    />
                    <ProgressBar 
                      value={resumo.categorizado['DÍVIDAS']} 
                      max={resumo.totalSaidas || 1} 
                      color="bg-red-500" 
                      label="Dívidas" 
                      darkMode={darkMode}
                    />
                  </div>

                  <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-indigo-900/30 border-indigo-500' : 'bg-indigo-50 border-indigo-200'} border-2`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-bold ${themeClasses.text}`}>Resultado:</span>
                      <span className={`text-xl font-bold ${resumo.resultado >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        R$ {resumo.resultado.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PULMÃO FINANCEIRO */}
                <div className={`${darkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'} rounded-lg p-6 transition-colors duration-300`}>
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>🫁 Pulmão Financeiro</h3>
                  <div className="text-center">
                    <p className={`text-6xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-2`}>{pulmao.dias}</p>
                    <p className={`${themeClasses.textSecondary} mb-4`}>dias ({pulmao.meses} meses)</p>
                    <p className={`inline-block px-4 py-2 rounded-full font-semibold ${
                      pulmao.cor === 'red' ? 'bg-red-100 text-red-800' : 
                      pulmao.cor === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {pulmao.classificacao}
                    </p>
                    <p className={`text-xs ${themeClasses.textSecondary} mt-3`}>CLD: R$ {pulmao.cld}</p>
                  </div>
                </div>
              </div>

              {/* ANOMALIAS */}
              <div className={`${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} rounded-lg p-6 mb-8 transition-colors duration-300`}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-yellow-300' : 'text-yellow-900'} mb-4`}>⚠️ Anomalias Detectadas</h3>
                {anomalias.length > 0 ? (
                  <ul className="space-y-3">
                    {anomalias.map((a, idx) => (
                      <li key={idx} className={`p-4 rounded-lg border-l-4 ${
                        a.criticidade === 'ALTA' ? `${darkMode ? 'bg-red-900/30' : 'bg-red-50'} border-red-500` :
                        a.criticidade === 'MÉDIA' ? `${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'} border-yellow-500` :
                        `${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} border-blue-500`
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <p className={`font-bold ${themeClasses.text} text-sm`}>{a.codigo} - {a.titulo}</p>
                          <span className={`text-xs px-2 py-1 rounded font-semibold ${
                            a.criticidade === 'ALTA' ? 'bg-red-200 text-red-800' :
                            a.criticidade === 'MÉDIA' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-blue-200 text-blue-800'
                          }`}>
                            {a.criticidade}
                          </span>
                        </div>
                        <p className={`text-sm ${themeClasses.textSecondary} mb-2`}>{a.descricao}</p>
                        <p className={`text-xs ${themeClasses.textSecondary} font-semibold mb-2`}>Impacto: {a.impacto}</p>
                        {a.recomendacao && (
                          <p className={`text-xs ${darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'} p-2 rounded`}>
                            💡 {a.recomendacao}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={`flex items-center ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                    <CheckIcon />
                    <span>Nenhuma anomalia detectada</span>
                  </div>
                )}
              </div>

              {/* RECOMENDAÇÕES */}
              {recomendacoes.length > 0 && (
                <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-lg p-6 mb-8 transition-colors duration-300`}>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-4`}>📋 Recomendações</h3>
                  <ul className="space-y-3">
                    {recomendacoes.map((rec, idx) => (
                      <li key={idx} className={`p-4 rounded-lg border-l-4 ${
                        rec.prioridade === 'URGENTE' ? `${darkMode ? 'bg-red-900/30' : 'bg-red-50'} border-red-500` :
                        rec.prioridade === 'ALTA' ? `${darkMode ? 'bg-orange-900/30' : 'bg-orange-50'} border-orange-500` :
                        `${darkMode ? 'bg-green-900/30' : 'bg-green-50'} border-green-500`
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-1 rounded font-semibold ${
                            rec.prioridade === 'URGENTE' ? 'bg-red-200 text-red-800' :
                            rec.prioridade === 'ALTA' ? 'bg-orange-200 text-orange-800' :
                            'bg-green-200 text-green-800'
                          }`}>
                            {rec.prioridade}
                          </span>
                          <p className={`font-bold ${themeClasses.text} text-sm`}>{rec.titulo}</p>
                        </div>
                        <p className={`text-sm ${themeClasses.textSecondary} mb-2`}>{rec.descricao}</p>
                        <p className={`text-xs ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'} p-2 rounded`}>
                          🎯 <strong>Ação:</strong> {rec.acao}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={gerarPDF}
                disabled={gerandoPDF}
                className={`w-full px-6 py-4 rounded-lg flex items-center justify-center gap-2 font-semibold mb-4 ${
                  gerandoPDF 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white transition-colors duration-300`}
              >
                {gerandoPDF ? (
                  <>
                    <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gerando PDF...
                  </>
                ) : (
                  <>
                    <DownloadIcon />
                    Baixar Relatório em PDF
                  </>
                )}
              </button>

              <button
                onClick={() => setStep(1)}
                className={`w-full ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} px-6 py-2 rounded-lg transition-colors duration-300`}
              >
                Nova Análise
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<DiagnosticoFinanceiro />);
