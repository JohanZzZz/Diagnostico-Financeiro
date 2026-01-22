const { useState, useEffect } = React;

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
  
  const colors = ['#6366F1', '#F59E0B', '#10B981', '#EF4444'];
  let currentAngle = 0;
  
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="w-32 h-32">
        {data.filter(d => d.value > 0).map((item, idx) => {
          const percentage = item.value / total;
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
              key={idx}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={colors[idx % colors.length]}
              stroke={darkMode ? '#1F2937' : 'white'}
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <div className="text-xs space-y-1">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[idx % colors.length] }} />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              {item.label}: {total > 0 ? ((item.value / total) * 100).toFixed(0) : 0}%
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
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
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
  
  // NOVOS CAMPOS: Taxas de Vendas (T1, T2)
  const [receitaBruta, setReceitaBruta] = useState(0);
  const [valorLiquidoRecebido, setValorLiquidoRecebido] = useState(0);
  const [taxasCartao, setTaxasCartao] = useState(0);
  
  // NOVOS CAMPOS: Taxas Ocultas Bancárias (T3)
  const [tarifasBancarias, setTarifasBancarias] = useState(0);
  const [jurosBancarios, setJurosBancarios] = useState(0);
  const [iofBancario, setIofBancario] = useState(0);
  const [multasBancarias, setMultasBancarias] = useState(0);
  
  // Campo para comparação: Banco > Dono
  const [proLabore, setProLabore] = useState(0);
  
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [mesReferencia, setMesReferencia] = useState('');

  const categoriasSaida = ['OPERAÇÃO', 'PRÓ-LABORE', 'IMPOSTOS', 'DÍVIDAS'];
  const categoriasEntrada = ['OPERACIONAL', 'NÃO OPERACIONAL'];

  // Persistir tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('diagnostico-theme');
    if (savedTheme) setDarkMode(savedTheme === 'dark');
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
    setClassificadas(prev => prev.map(mov => mov.id === id ? { ...mov, categoria } : mov));
  };

  const calcularResumo = () => {
    // Entradas separadas por tipo
    const entradasOperacionais = classificadas
      .filter(m => m.tipo === 'Entrada' && m.categoria === 'OPERACIONAL')
      .reduce((acc, m) => acc + m.valor, 0);
    const entradasNaoOperacionais = classificadas
      .filter(m => m.tipo === 'Entrada' && m.categoria === 'NÃO OPERACIONAL')
      .reduce((acc, m) => acc + m.valor, 0);
    const entradas = entradasOperacionais + entradasNaoOperacionais;

    // Percentual de entradas operacionais
    const percentualOperacional = entradas > 0 ? (entradasOperacionais / entradas) * 100 : 0;

    const categorizado = { 'OPERAÇÃO': 0, 'PRÓ-LABORE': 0, 'IMPOSTOS': 0, 'DÍVIDAS': 0 };

    classificadas.filter(m => m.tipo === 'Saída').forEach(m => {
      if (m.categoria && categorizado[m.categoria] !== undefined) {
        categorizado[m.categoria] += Math.abs(m.valor);
      }
    });

    const totalSaidas = Object.values(categorizado).reduce((a, b) => a + b, 0);
    const resultado = entradas - totalSaidas;

    return {
      entradas,
      entradasOperacionais,
      entradasNaoOperacionais,
      percentualOperacional,
      categorizado,
      totalSaidas,
      resultado
    };
  };

  const calcularPulmaoFinanceiro = () => {
    const cld = caixaAtual - contasPagar30d - impostosProvisionados - parcelasDivida;
    const pulmãoDias = comr > 0 ? (cld / comr) * 30 : 0;
    const pulmãoMeses = pulmãoDias / 30;
    
    let classificacao = '', cor = '', mensagem = '';
    
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
    
    return { cld: cld.toFixed(2), dias: pulmãoDias.toFixed(0), meses: pulmãoMeses.toFixed(2), classificacao, cor, mensagem };
  };

  // NOVOS CÁLCULOS: T1, T2, T3
  const calcularCustosFinanceiros = () => {
    // T1 - Taxa real de vendas
    const taxaRealVendas = receitaBruta > 0 ? ((taxasCartao / receitaBruta) * 100) : 0;
    
    // T2 - Custo da antecipação
    const custoAntecipacao = receitaBruta - valorLiquidoRecebido - taxasCartao;
    const percentualAntecipacao = receitaBruta > 0 ? ((custoAntecipacao / receitaBruta) * 100) : 0;
    
    // T3 - Custo financeiro oculto total
    const custoFinanceiroOculto = tarifasBancarias + jurosBancarios + iofBancario + multasBancarias;
    const percentualCustoOculto = receitaBruta > 0 ? ((custoFinanceiroOculto / receitaBruta) * 100) : 0;
    
    // Banco > Dono
    const resumo = calcularResumo();
    const bancoMaiorQueDono = custoFinanceiroOculto > proLabore;
    const bancoMaiorQueLucro = custoFinanceiroOculto > resumo.resultado && resumo.resultado > 0;
    
    return {
      t1: { taxa: taxaRealVendas.toFixed(2), valor: taxasCartao },
      t2: { custo: custoAntecipacao > 0 ? custoAntecipacao.toFixed(2) : '0.00', percentual: percentualAntecipacao.toFixed(2) },
      t3: { total: custoFinanceiroOculto.toFixed(2), percentual: percentualCustoOculto.toFixed(2), tarifas: tarifasBancarias, juros: jurosBancarios, iof: iofBancario, multas: multasBancarias },
      bancoMaiorQueDono,
      bancoMaiorQueLucro
    };
  };

  const detectarAnomalias = () => {
    const resumo = calcularResumo();
    const custos = calcularCustosFinanceiros();
    const anomalias = [];

    // A1 - Caixa negativo com resultado positivo
    const variacaoCaixa = resumo.entradas - resumo.totalSaidas;
    if (resumo.resultado > 0 && variacaoCaixa < 0) {
      anomalias.push({
        codigo: 'A1', titulo: 'Caixa negativo com resultado positivo',
        descricao: 'Resultado operacional positivo mas variação de caixa negativa.',
        criticidade: 'ALTA', impacto: `Variação: R$ ${variacaoCaixa.toFixed(2)}`,
        recomendacao: 'Revise os prazos de recebimento e pagamento.'
      });
    }

    // A2 - Oscilação anormal de caixa
    const mediaMovimentacao = (resumo.entradas + resumo.totalSaidas) / 2;
    const oscilacao = Math.abs(resumo.entradas - resumo.totalSaidas);
    const percentualOscilacao = mediaMovimentacao > 0 ? (oscilacao / mediaMovimentacao) * 100 : 0;
    
    if (percentualOscilacao > 30) {
      anomalias.push({
        codigo: 'A2', titulo: 'Oscilação anormal de caixa',
        descricao: 'Desvio mensal maior que 30% da média.',
        criticidade: 'MÉDIA', impacto: `Oscilação: ${percentualOscilacao.toFixed(1)}%`,
        recomendacao: 'Crie uma reserva de estabilização.'
      });
    }

    // A3 - Caixa sustentado por exceção (entradas não operacionais)
    if (resumo.entradas > 0 && resumo.entradasNaoOperacionais > 0) {
      const percentualNaoOperacional = (resumo.entradasNaoOperacionais / resumo.entradas) * 100;
      if (percentualNaoOperacional > 20) {
        anomalias.push({
          codigo: 'A3', titulo: 'Caixa sustentado por exceção',
          descricao: 'Entradas não operacionais (aportes, empréstimos, vendas de ativos) representam mais de 20% das entradas.',
          criticidade: percentualNaoOperacional > 40 ? 'ALTA' : 'MÉDIA',
          impacto: `${percentualNaoOperacional.toFixed(1)}% das entradas são não operacionais (R$ ${resumo.entradasNaoOperacionais.toFixed(2)})`,
          recomendacao: 'Foque em aumentar receita operacional. A dependência de receitas não recorrentes é insustentável.'
        });
      }
    }

    // T1 - Taxa real de vendas alta
    if (parseFloat(custos.t1.taxa) > 5) {
      anomalias.push({
        codigo: 'T1', titulo: 'Taxa real de vendas elevada',
        descricao: 'Taxa de cartão/gateway acima de 5% da receita.',
        criticidade: parseFloat(custos.t1.taxa) > 8 ? 'ALTA' : 'MÉDIA',
        impacto: `${custos.t1.taxa}% da receita`,
        recomendacao: 'Renegocie taxas com operadoras ou considere outras formas de pagamento.'
      });
    }

    // T2 - Antecipação mascarada
    if (parseFloat(custos.t2.percentual) > 2) {
      anomalias.push({
        codigo: 'T2', titulo: 'Antecipação mascarada de margem',
        descricao: 'O custo da antecipação está consumindo parte significativa da receita.',
        criticidade: parseFloat(custos.t2.percentual) > 5 ? 'ALTA' : 'MÉDIA',
        impacto: `R$ ${custos.t2.custo} (${custos.t2.percentual}% da receita)`,
        recomendacao: 'Evite antecipar recebíveis. Negocie taxas melhores ou busque capital de giro mais barato.'
      });
    }

    // T3 - Juros pulverizados
    if (parseFloat(custos.t3.percentual) > 3) {
      anomalias.push({
        codigo: 'T3', titulo: 'Juros pulverizados',
        descricao: 'Custos financeiros ocultos estão consumindo mais de 3% da receita.',
        criticidade: parseFloat(custos.t3.percentual) > 6 ? 'ALTA' : 'MÉDIA',
        impacto: `R$ ${custos.t3.total} (${custos.t3.percentual}% da receita)`,
        recomendacao: 'Revise seu pacote bancário. Considere bancos digitais com tarifas menores.'
      });
    }

    // Banco > Dono
    if (custos.bancoMaiorQueDono && proLabore > 0) {
      anomalias.push({
        codigo: 'B3', titulo: 'Banco lucrando mais que o dono',
        descricao: 'Despesas financeiras superam o pró-labore.',
        criticidade: 'ALTA',
        impacto: `Banco: R$ ${custos.t3.total} vs Pró-labore: R$ ${proLabore.toFixed(2)}`,
        recomendacao: 'Urgente: renegocie dívidas e reduza custos bancários.'
      });
    }

    // B1 - Pró-labore maior que lucro
    if (proLabore > resumo.resultado && resumo.resultado > 0) {
      anomalias.push({
        codigo: 'B1', titulo: 'Pró-labore maior que o lucro',
        descricao: 'Retirada dos sócios excede o resultado operacional.',
        criticidade: 'ALTA',
        impacto: `Diferença: R$ ${(proLabore - resumo.resultado).toFixed(2)}`,
        recomendacao: 'Reduza o pró-labore para um valor sustentável.'
      });
    }

    return anomalias;
  };

  const gerarRecomendacoes = () => {
    const pulmao = calcularPulmaoFinanceiro();
    const resumo = calcularResumo();
    const custos = calcularCustosFinanceiros();
    const recomendacoes = [];

    if (parseFloat(pulmao.dias) < 30) {
      recomendacoes.push({
        prioridade: 'URGENTE', titulo: 'Aumentar reserva de emergência',
        descricao: 'Seu pulmão está crítico.',
        acao: 'Separe 10% de toda entrada para reserva até atingir 30 dias.'
      });
    }

    if (resumo.categorizado['OPERAÇÃO'] > resumo.entradas * 0.7) {
      recomendacoes.push({
        prioridade: 'ALTA', titulo: 'Custos operacionais muito altos',
        descricao: 'A operação consome mais de 70% das entradas.',
        acao: 'Revise contratos e elimine desperdícios.'
      });
    }

    if (resumo.resultado < 0) {
      recomendacoes.push({
        prioridade: 'URGENTE', titulo: 'Resultado negativo',
        descricao: 'A empresa está operando no vermelho.',
        acao: 'Corte despesas não essenciais imediatamente.'
      });
    }

    if (parseFloat(custos.t3.percentual) > 3) {
      recomendacoes.push({
        prioridade: 'ALTA', titulo: 'Reduzir custos bancários',
        descricao: `Você está perdendo ${custos.t3.percentual}% da receita com o banco.`,
        acao: 'Migre para um banco digital ou renegocie tarifas.'
      });
    }

    return recomendacoes;
  };

  const calcularIndicadoresSaude = () => {
    const pulmao = calcularPulmaoFinanceiro();
    const resumo = calcularResumo();
    const anomalias = detectarAnomalias();
    const custos = calcularCustosFinanceiros();

    return {
      pulmao: parseFloat(pulmao.dias) >= 60 ? 'good' : parseFloat(pulmao.dias) >= 30 ? 'warning' : 'danger',
      resultado: resumo.resultado > 0 ? 'good' : resumo.resultado === 0 ? 'warning' : 'danger',
      anomalias: anomalias.length === 0 ? 'good' : anomalias.some(a => a.criticidade === 'ALTA') ? 'danger' : 'warning',
      custos: parseFloat(custos.t3.percentual) <= 3 ? 'good' : parseFloat(custos.t3.percentual) <= 6 ? 'warning' : 'danger'
    };
  };

  // Função para abrir relatório em nova aba
  const abrirRelatorioNovaAba = () => {
    const resumo = calcularResumo();
    const pulmao = calcularPulmaoFinanceiro();
    const custos = calcularCustosFinanceiros();
    const anomalias = detectarAnomalias();
    const recomendacoes = gerarRecomendacoes();
    const saude = calcularIndicadoresSaude();

    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório - ${nomeEmpresa || 'Empresa'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; padding: 20px; background: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 3px solid #4F46E5; }
    .header h1 { font-size: 26px; color: #1F2937; margin-bottom: 8px; }
    .header h2 { font-size: 18px; color: #4F46E5; margin-bottom: 5px; }
    .header p { color: #6B7280; }
    .section { margin-bottom: 25px; }
    .section h3 { font-size: 16px; font-weight: bold; color: #1F2937; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #E5E7EB; }
    .indicadores { display: flex; gap: 12px; margin-bottom: 20px; }
    .indicador { flex: 1; padding: 12px; border-radius: 8px; text-align: center; }
    .indicador.good { background: #D1FAE5; }
    .indicador.warning { background: #FEF3C7; }
    .indicador.danger { background: #FEE2E2; }
    .indicador .icon { width: 24px; height: 24px; border-radius: 50%; margin: 0 auto 6px; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; }
    .indicador.good .icon { background: #10B981; }
    .indicador.warning .icon { background: #F59E0B; }
    .indicador.danger .icon { background: #EF4444; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card { background: #F9FAFB; padding: 15px; border-radius: 8px; }
    .card-title { font-weight: bold; margin-bottom: 10px; color: #374151; }
    .row { display: flex; justify-content: space-between; margin-bottom: 6px; }
    .row span:last-child { font-weight: bold; }
    .green { color: #10B981; }
    .red { color: #EF4444; }
    .yellow { color: #F59E0B; }
    .resultado-box { background: #EEF2FF; padding: 15px; border-radius: 8px; border: 2px solid #818CF8; margin-top: 12px; }
    .pulmao-box { background: #EEF2FF; padding: 20px; border-radius: 8px; text-align: center; }
    .pulmao-dias { font-size: 42px; font-weight: bold; color: #312E81; }
    .badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 11px; margin-top: 10px; }
    .badge.red { background: #FEE2E2; color: #991B1B; }
    .badge.yellow { background: #FEF3C7; color: #92400E; }
    .badge.green { background: #D1FAE5; color: #065F46; }
    .anomalia { padding: 12px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid; }
    .anomalia.alta { background: #FEE2E2; border-color: #DC2626; }
    .anomalia.media { background: #FEF3C7; border-color: #F59E0B; }
    .anomalia-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
    .anomalia-title { font-weight: bold; font-size: 12px; }
    .anomalia-badge { font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
    .anomalia.alta .anomalia-badge { background: #FCA5A5; color: #7F1D1D; }
    .anomalia.media .anomalia-badge { background: #FCD34D; color: #78350F; }
    .recomendacao { padding: 12px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid; }
    .recomendacao.urgente { background: #FEF2F2; border-color: #DC2626; }
    .recomendacao.alta { background: #F0FDF4; border-color: #16A34A; }
    .tip { font-size: 10px; background: #D1FAE5; color: #065F46; padding: 6px; border-radius: 4px; margin-top: 6px; }
    .action { font-size: 10px; background: #DBEAFE; color: #1E40AF; padding: 6px; border-radius: 4px; margin-top: 6px; }
    .footer { margin-top: 25px; padding-top: 12px; border-top: 1px solid #E5E7EB; text-align: center; font-size: 10px; color: #9CA3AF; }
    .custos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
    .custo-card { background: white; padding: 10px; border-radius: 6px; text-align: center; }
    .custo-card p:first-child { font-size: 10px; color: #6B7280; margin-bottom: 4px; }
    .custo-card p:last-child { font-size: 16px; font-weight: bold; }
    .progress-bar { height: 8px; background: #E5E7EB; border-radius: 4px; margin-top: 4px; margin-bottom: 8px; }
    .progress-fill { height: 100%; border-radius: 4px; }
    .progress-fill.op { background: #6366F1; }
    .progress-fill.pl { background: #F59E0B; }
    .progress-fill.im { background: #10B981; }
    .progress-fill.di { background: #EF4444; }
    .print-btn { position: fixed; top: 20px; right: 20px; background: #4F46E5; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; }
    .print-btn:hover { background: #4338CA; }
    @media print { .print-btn { display: none; } body { background: white; } .container { box-shadow: none; } }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ Imprimir / Salvar PDF</button>
  <div class="container">
    <div class="header">
      <h1>Diagnóstico Financeiro</h1>
      <h2>${nomeEmpresa || 'Empresa'}</h2>
      <p>${mesReferencia || 'Período'} | Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
    </div>

    <div class="indicadores">
      <div class="indicador ${saude.pulmao}">
        <div class="icon">${saude.pulmao === 'good' ? '✓' : saude.pulmao === 'warning' ? '!' : '✗'}</div>
        <p><strong>Pulmão</strong></p>
      </div>
      <div class="indicador ${saude.resultado}">
        <div class="icon">${saude.resultado === 'good' ? '✓' : saude.resultado === 'warning' ? '!' : '✗'}</div>
        <p><strong>Resultado</strong></p>
      </div>
      <div class="indicador ${saude.anomalias}">
        <div class="icon">${saude.anomalias === 'good' ? '✓' : saude.anomalias === 'warning' ? '!' : '✗'}</div>
        <p><strong>Anomalias</strong></p>
      </div>
      <div class="indicador ${saude.custos}">
        <div class="icon">${saude.custos === 'good' ? '✓' : saude.custos === 'warning' ? '!' : '✗'}</div>
        <p><strong>Custos</strong></p>
      </div>
    </div>

    <div class="grid">
      <div class="section">
        <h3>1. Resumo do Caixa</h3>
        <div class="card">
          <div class="row"><span>Entradas Operacionais:</span><span class="green">R$ ${resumo.entradasOperacionais?.toFixed(2) || resumo.entradas.toFixed(2)}</span></div>
          <div class="row"><span>Entradas Não Operacionais:</span><span class="yellow">R$ ${resumo.entradasNaoOperacionais?.toFixed(2) || '0.00'}</span></div>
          <div class="row"><span>Total Entradas:</span><span class="green">R$ ${resumo.entradas.toFixed(2)}</span></div>
          <div class="row"><span>Total Saídas:</span><span class="red">R$ ${resumo.totalSaidas.toFixed(2)}</span></div>
        </div>
        <div class="card" style="margin-top: 10px;">
          <div class="card-title">Distribuição de Saídas</div>
          <div class="row"><span>OPERAÇÃO</span><span>R$ ${resumo.categorizado['OPERAÇÃO'].toFixed(2)}</span></div>
          <div class="progress-bar"><div class="progress-fill op" style="width: ${resumo.totalSaidas > 0 ? (resumo.categorizado['OPERAÇÃO'] / resumo.totalSaidas * 100) : 0}%"></div></div>
          <div class="row"><span>PRÓ-LABORE</span><span>R$ ${resumo.categorizado['PRÓ-LABORE'].toFixed(2)}</span></div>
          <div class="progress-bar"><div class="progress-fill pl" style="width: ${resumo.totalSaidas > 0 ? (resumo.categorizado['PRÓ-LABORE'] / resumo.totalSaidas * 100) : 0}%"></div></div>
          <div class="row"><span>IMPOSTOS</span><span>R$ ${resumo.categorizado['IMPOSTOS'].toFixed(2)}</span></div>
          <div class="progress-bar"><div class="progress-fill im" style="width: ${resumo.totalSaidas > 0 ? (resumo.categorizado['IMPOSTOS'] / resumo.totalSaidas * 100) : 0}%"></div></div>
          <div class="row"><span>DÍVIDAS</span><span>R$ ${resumo.categorizado['DÍVIDAS'].toFixed(2)}</span></div>
          <div class="progress-bar"><div class="progress-fill di" style="width: ${resumo.totalSaidas > 0 ? (resumo.categorizado['DÍVIDAS'] / resumo.totalSaidas * 100) : 0}%"></div></div>
        </div>
        <div class="resultado-box">
          <div class="row"><span><strong>Resultado:</strong></span><span class="${resumo.resultado >= 0 ? 'green' : 'red'}" style="font-size: 18px;">R$ ${resumo.resultado.toFixed(2)}</span></div>
        </div>
      </div>

      <div class="section">
        <h3>2. Pulmão Financeiro</h3>
        <div class="pulmao-box">
          <p class="pulmao-dias">${pulmao.dias}</p>
          <p style="color: #6B7280;">dias (${pulmao.meses} meses)</p>
          <span class="badge ${pulmao.cor}">${pulmao.classificacao}</span>
          <p style="font-size: 11px; color: #6B7280; margin-top: 12px;">CLD: R$ ${pulmao.cld}</p>
        </div>
        ${receitaBruta > 0 ? `
        <div style="margin-top: 15px;">
          <div class="card-title">Custos Financeiros</div>
          <div class="custos-grid">
            <div class="custo-card">
              <p>T1 - Taxa Vendas</p>
              <p class="${parseFloat(custos.t1.taxa) > 5 ? 'red' : 'green'}">${custos.t1.taxa}%</p>
            </div>
            <div class="custo-card">
              <p>T2 - Antecipação</p>
              <p class="${parseFloat(custos.t2.percentual) > 2 ? 'red' : 'green'}">R$ ${custos.t2.custo}</p>
            </div>
            <div class="custo-card">
              <p>T3 - Custos Ocultos</p>
              <p class="${parseFloat(custos.t3.percentual) > 3 ? 'red' : 'green'}">R$ ${custos.t3.total}</p>
            </div>
          </div>
        </div>
        ` : ''}
      </div>
    </div>

    ${anomalias.length > 0 ? `
    <div class="section">
      <h3>3. Anomalias Detectadas (${anomalias.length})</h3>
      ${anomalias.map(a => `
        <div class="anomalia ${a.criticidade === 'ALTA' ? 'alta' : 'media'}">
          <div class="anomalia-header">
            <span class="anomalia-title">${a.codigo} - ${a.titulo}</span>
            <span class="anomalia-badge">${a.criticidade}</span>
          </div>
          <p style="font-size: 11px; color: #4B5563;">${a.descricao}</p>
          <p style="font-size: 10px; color: #6B7280;">Impacto: ${a.impacto}</p>
          ${a.recomendacao ? `<div class="tip">💡 ${a.recomendacao}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : `
    <div class="section">
      <h3>3. Anomalias Detectadas</h3>
      <div style="background: #D1FAE5; padding: 15px; border-radius: 8px; text-align: center;">
        <p style="color: #065F46; font-weight: 600;">✓ Nenhuma anomalia detectada</p>
      </div>
    </div>
    `}

    ${recomendacoes.length > 0 ? `
    <div class="section">
      <h3>4. Recomendações</h3>
      ${recomendacoes.map(rec => `
        <div class="recomendacao ${rec.prioridade === 'URGENTE' ? 'urgente' : 'alta'}">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span class="anomalia-badge" style="background: ${rec.prioridade === 'URGENTE' ? '#FCA5A5' : '#86EFAC'}; color: ${rec.prioridade === 'URGENTE' ? '#7F1D1D' : '#14532D'};">${rec.prioridade}</span>
            <span style="font-weight: bold; font-size: 12px;">${rec.titulo}</span>
          </div>
          <p style="font-size: 11px; color: #4B5563;">${rec.descricao}</p>
          <div class="action">🎯 ${rec.acao}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <div class="footer">
      <p>Documento confidencial | Gerado automaticamente pelo Sistema de Diagnóstico Financeiro</p>
    </div>
  </div>
</body>
</html>
    `;

    const novaAba = window.open('', '_blank');
    novaAba.document.write(htmlContent);
    novaAba.document.close();
  };

  // ============================================
  // STEP 1: Upload
  // ============================================
  if (step === 1) {
    return (
      <div className={`min-h-screen ${themeClasses.bg} p-8 transition-colors duration-300`}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-4xl mx-auto">
          <div className={`${themeClasses.card} rounded-xl shadow-lg p-8`}>
            <div className="text-center mb-8">
              <div className={darkMode ? 'text-indigo-400' : ''}><FileIcon /></div>
              <h1 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>Diagnóstico Financeiro</h1>
              <p className={themeClasses.textSecondary}>Análise completa baseada em extrato bancário</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Nome da Empresa</label>
                <input type="text" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${themeClasses.input} ${themeClasses.inputFocus}`}
                  placeholder="Ex: Minha Empresa Ltda" />
              </div>
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Mês de Referência</label>
                <input type="text" value={mesReferencia} onChange={(e) => setMesReferencia(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${themeClasses.input} ${themeClasses.inputFocus}`}
                  placeholder="Ex: Janeiro/2025" />
              </div>
            </div>

            <div className={`border-2 border-dashed ${darkMode ? 'border-indigo-500' : 'border-indigo-300'} rounded-lg p-12 text-center hover:border-indigo-400 transition`}>
              <UploadIcon />
              <label className="cursor-pointer">
                <span className={`text-lg ${themeClasses.text} font-medium`}>Clique para fazer upload do extrato bancário</span>
                <p className={`text-sm ${themeClasses.textSecondary} mt-2`}>Formatos: Excel (.xlsx, .xls) ou CSV</p>
                <input type="file" className="hidden" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} />
              </label>
            </div>

            <div className={`mt-8 ${themeClasses.warning} border-l-4 p-4 rounded-r-lg`}>
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
    const saidasNaoClassificadas = classificadas.filter(m => !m.categoria && m.tipo === 'Saída').length;
    const entradasNaoClassificadas = classificadas.filter(m => !m.categoria && m.tipo === 'Entrada').length;
    const totalNaoClassificadas = saidasNaoClassificadas + entradasNaoClassificadas;

    return (
      <div className={`min-h-screen ${themeClasses.bg} p-8`}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-6xl mx-auto">
          <div className={`${themeClasses.card} rounded-xl shadow-lg p-8`}>
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>Passo 2: Classificar Movimentações</h2>
            <p className={`${themeClasses.textSecondary} mb-6`}>Classifique todas as movimentações (entradas e saídas).</p>

            <div className={`mb-6 flex justify-between items-center ${themeClasses.highlight} p-4 rounded-lg`}>
              <div className={`text-sm ${themeClasses.textSecondary}`}>
                Total: <span className="font-bold">{classificadas.length}</span> |
                Entradas pendentes: <span className={`font-bold ${entradasNaoClassificadas > 0 ? 'text-yellow-500' : 'text-green-500'}`}>{entradasNaoClassificadas}</span> |
                Saídas pendentes: <span className={`font-bold ${saidasNaoClassificadas > 0 ? 'text-red-500' : 'text-green-500'}`}>{saidasNaoClassificadas}</span>
              </div>
              <button onClick={() => setStep(3)} disabled={totalNaoClassificadas > 0}
                className={`px-6 py-2 rounded-lg transition ${totalNaoClassificadas > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                Próximo →
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
                      <td className={`px-4 py-3 text-sm text-right font-medium ${mov.tipo === 'Entrada' ? 'text-green-500' : 'text-red-500'}`}>
                        R$ {Math.abs(mov.valor).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 text-xs rounded ${mov.tipo === 'Entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {mov.tipo}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {mov.tipo === 'Saída' ? (
                          <select value={mov.categoria} onChange={(e) => updateCategoria(mov.id, e.target.value)}
                            className={`w-full px-3 py-2 border rounded text-sm ${themeClasses.input} ${!mov.categoria ? 'border-red-400' : ''}`}>
                            <option value="">Selecione...</option>
                            {categoriasSaida.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                          </select>
                        ) : (
                          <select value={mov.categoria} onChange={(e) => updateCategoria(mov.id, e.target.value)}
                            className={`w-full px-3 py-2 border rounded text-sm ${themeClasses.input} ${!mov.categoria ? 'border-yellow-400' : 'border-green-400'}`}>
                            <option value="">Selecione...</option>
                            {categoriasEntrada.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`mt-6 grid grid-cols-2 gap-4`}>
              <div className={`${themeClasses.info} border-l-4 p-4 rounded-r-lg`}>
                <p className={`text-sm ${themeClasses.infoText} font-semibold mb-2`}>📥 Classificação de ENTRADAS:</p>
                <ul className={`text-xs ${themeClasses.infoText} space-y-1`}>
                  <li><strong>OPERACIONAL:</strong> Receitas recorrentes do negócio (vendas, serviços)</li>
                  <li><strong>NÃO OPERACIONAL:</strong> Receitas não recorrentes (venda de ativo, empréstimo recebido, aporte)</li>
                </ul>
              </div>
              <div className={`${themeClasses.warning} border-l-4 p-4 rounded-r-lg`}>
                <p className={`text-sm ${themeClasses.warningText} font-semibold mb-2`}>📤 Classificação de SAÍDAS:</p>
                <ul className={`text-xs ${themeClasses.warningText} space-y-1`}>
                  <li><strong>OPERAÇÃO:</strong> Despesas para a empresa funcionar</li>
                  <li><strong>PRÓ-LABORE:</strong> Dinheiro que foi para o dono ou família</li>
                  <li><strong>IMPOSTOS:</strong> Pagamentos ao governo</li>
                  <li><strong>DÍVIDAS:</strong> Empréstimos e financiamentos</li>
                </ul>
              </div>
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
      <div className={`min-h-screen ${themeClasses.bg} p-8`}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-4xl mx-auto">
          <div className={`${themeClasses.card} rounded-xl shadow-lg p-8`}>
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>Passo 3: Pulmão Financeiro</h2>
            <p className={`${themeClasses.textSecondary} mb-6`}>Preencha os campos para calcular o pulmão financeiro.</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Caixa Atual (R$)', value: caixaAtual, setter: setCaixaAtual, hint: 'Saldo disponível em banco' },
                { label: 'Contas a Pagar 30d (R$)', value: contasPagar30d, setter: setContasPagar30d, hint: 'Contas vencendo em 30 dias' },
                { label: 'Impostos Provisionados (R$)', value: impostosProvisionados, setter: setImpostosProvisionados, hint: 'Impostos a pagar' },
                { label: 'Parcelas de Dívida (R$)', value: parcelasDivida, setter: setParcelasDivida, hint: 'Parcelas de empréstimos' },
              ].map((field, idx) => (
                <div key={idx} className={`${themeClasses.highlight} p-4 rounded-lg`}>
                  <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>{field.label}</label>
                  <input type="number" value={field.value || ''} onChange={(e) => field.setter(parseFloat(e.target.value) || 0)}
                    className={`w-full px-4 py-2 border-2 rounded-lg ${themeClasses.input}`} placeholder="0.00" />
                  <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>{field.hint}</p>
                </div>
              ))}
            </div>

            <div className={`${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'} p-4 rounded-lg mb-6`}>
              <label className={`block text-sm font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-900'} mb-2`}>
                COMR - Custo Operacional Mensal Real (R$)
              </label>
              <input type="number" value={comr || ''} onChange={(e) => setComr(parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'border-indigo-500 bg-gray-700 text-white' : 'border-indigo-300'}`}
                placeholder="0.00" />
              <p className={`text-xs ${darkMode ? 'text-indigo-400' : 'text-indigo-700'} mt-1`}>Despesas fixas mensais</p>
            </div>

            {comr > 0 && (
              <div className={`${darkMode ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50' : 'bg-gradient-to-r from-indigo-50 to-purple-50'} p-6 rounded-lg mb-6 border-2 ${darkMode ? 'border-indigo-500' : 'border-indigo-200'}`}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-900'} mb-4 text-center`}>Resultado</h3>
                <div className="text-center mb-4">
                  <p className={`text-5xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-900'}`}>{pulmao.dias}</p>
                  <p className={`${themeClasses.textSecondary}`}>dias ({pulmao.meses} meses)</p>
                </div>
                <div className="text-center mb-4">
                  <span className={`inline-block px-6 py-2 rounded-full font-bold ${
                    pulmao.cor === 'red' ? 'bg-red-100 text-red-800' :
                    pulmao.cor === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>{pulmao.classificacao}</span>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg text-center`}>
                  <span className={themeClasses.textSecondary}>CLD: </span>
                  <span className={`font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-900'}`}>R$ {pulmao.cld}</span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className={`flex-1 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} px-6 py-3 rounded-lg`}>
                ← Voltar
              </button>
              <button onClick={() => setStep(4)} disabled={comr <= 0}
                className={`flex-1 px-6 py-3 rounded-lg ${comr <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                Próximo: Custos Financeiros →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // STEP 4: Custos Financeiros (T1, T2, T3)
  // ============================================
  if (step === 4) {
    const custos = calcularCustosFinanceiros();
    
    return (
      <div className={`min-h-screen ${themeClasses.bg} p-8`}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-4xl mx-auto">
          <div className={`${themeClasses.card} rounded-xl shadow-lg p-8`}>
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>Passo 4: Custos Financeiros</h2>
            <p className={`${themeClasses.textSecondary} mb-6`}>Analise taxas de vendas e custos bancários ocultos.</p>

            {/* Taxas de Vendas */}
            <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} p-4 rounded-lg mb-6`}>
              <h3 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-4`}>💳 Taxas de Vendas (Cartão/Gateway)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm ${themeClasses.text} mb-1`}>Receita Bruta (R$)</label>
                  <input type="number" value={receitaBruta || ''} onChange={(e) => setReceitaBruta(parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded ${themeClasses.input}`} placeholder="0.00" />
                </div>
                <div>
                  <label className={`block text-sm ${themeClasses.text} mb-1`}>Valor Líquido Recebido (R$)</label>
                  <input type="number" value={valorLiquidoRecebido || ''} onChange={(e) => setValorLiquidoRecebido(parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded ${themeClasses.input}`} placeholder="0.00" />
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm ${themeClasses.text} mb-1`}>Total de Taxas de Cartão/Gateway (R$)</label>
                  <input type="number" value={taxasCartao || ''} onChange={(e) => setTaxasCartao(parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded ${themeClasses.input}`} placeholder="0.00" />
                </div>
              </div>
              
              {receitaBruta > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg`}>
                    <p className={`text-xs ${themeClasses.textSecondary}`}>T1 - Taxa Real de Vendas</p>
                    <p className={`text-xl font-bold ${parseFloat(custos.t1.taxa) > 5 ? 'text-red-500' : 'text-green-500'}`}>{custos.t1.taxa}%</p>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg`}>
                    <p className={`text-xs ${themeClasses.textSecondary}`}>T2 - Custo Antecipação</p>
                    <p className={`text-xl font-bold ${parseFloat(custos.t2.percentual) > 2 ? 'text-red-500' : 'text-green-500'}`}>R$ {custos.t2.custo}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Taxas Ocultas Bancárias */}
            <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} p-4 rounded-lg mb-6`}>
              <h3 className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-800'} mb-4`}>🏦 Taxas Ocultas Bancárias</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Tarifas', value: tarifasBancarias, setter: setTarifasBancarias },
                  { label: 'Juros', value: jurosBancarios, setter: setJurosBancarios },
                  { label: 'IOF', value: iofBancario, setter: setIofBancario },
                  { label: 'Multas', value: multasBancarias, setter: setMultasBancarias },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className={`block text-xs ${themeClasses.text} mb-1`}>{field.label}</label>
                    <input type="number" value={field.value || ''} onChange={(e) => field.setter(parseFloat(e.target.value) || 0)}
                      className={`w-full px-2 py-2 border rounded text-sm ${themeClasses.input}`} placeholder="0" />
                  </div>
                ))}
              </div>
              
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg mt-4`}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${themeClasses.text}`}>T3 - Custo Financeiro Oculto Total:</span>
                  <span className={`text-xl font-bold ${parseFloat(custos.t3.percentual) > 3 ? 'text-red-500' : 'text-green-500'}`}>
                    R$ {custos.t3.total} ({custos.t3.percentual}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Pró-labore para comparação */}
            <div className={`${themeClasses.highlight} p-4 rounded-lg mb-6`}>
              <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>Pró-labore Mensal (R$)</label>
              <input type="number" value={proLabore || ''} onChange={(e) => setProLabore(parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-2 border rounded ${themeClasses.input}`} placeholder="0.00" />
              <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>Para comparar: banco está lucrando mais que você?</p>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(3)} className={`flex-1 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} px-6 py-3 rounded-lg hover:opacity-80`}>
                ← Voltar
              </button>
              <button onClick={() => setStep(5)} className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                Ver Resumo Final →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // STEP 5: Resumo Final + PDF
  // ============================================
  if (step === 5) {
    const resumo = calcularResumo();
    const pulmao = calcularPulmaoFinanceiro();
    const custos = calcularCustosFinanceiros();
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
      <div className={`min-h-screen ${themeClasses.bg} p-8`}>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="max-w-5xl mx-auto">
            <div className={`${themeClasses.card} rounded-xl shadow-lg p-8`}>
              <h2 className={`text-3xl font-bold ${themeClasses.text} mb-4 text-center`}>Resumo do Diagnóstico</h2>
              <p className={`${themeClasses.textSecondary} mb-8 text-center`}>{nomeEmpresa || 'Empresa'} - {mesReferencia || 'Período'}</p>

              {/* Indicadores de Saúde */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <HealthIndicator status={saude.pulmao} label="Pulmão" darkMode={darkMode} />
                <HealthIndicator status={saude.resultado} label="Resultado" darkMode={darkMode} />
                <HealthIndicator status={saude.anomalias} label="Anomalias" darkMode={darkMode} />
                <HealthIndicator status={saude.custos} label="Custos" darkMode={darkMode} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Resumo do Caixa */}
                <div className={`${themeClasses.highlight} rounded-lg p-6`}>
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>📊 Resumo do Caixa</h3>

                  {/* Entradas separadas */}
                  <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <p className={`text-sm font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-2`}>📥 Entradas</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className={themeClasses.textSecondary}>Operacionais:</span>
                        <span className="font-bold text-green-500">R$ {resumo.entradasOperacionais.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={themeClasses.textSecondary}>Não Operacionais:</span>
                        <span className="font-bold text-yellow-500">R$ {resumo.entradasNaoOperacionais.toFixed(2)}</span>
                      </div>
                      <div className={`flex justify-between pt-1 border-t ${themeClasses.border}`}>
                        <span className={`font-semibold ${themeClasses.text}`}>Total:</span>
                        <span className="font-bold text-green-600">R$ {resumo.entradas.toFixed(2)}</span>
                      </div>
                    </div>
                    {resumo.percentualOperacional < 80 && resumo.entradas > 0 && (
                      <p className={`text-xs mt-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                        ⚠️ Apenas {resumo.percentualOperacional.toFixed(0)}% das entradas são operacionais
                      </p>
                    )}
                  </div>

                  <PieChart data={dadosGrafico} darkMode={darkMode} />
                  <div className="mt-4 space-y-2">
                    <ProgressBar value={resumo.categorizado['OPERAÇÃO']} max={resumo.totalSaidas || 1} color="bg-indigo-500" label="Operação" darkMode={darkMode} />
                    <ProgressBar value={resumo.categorizado['PRÓ-LABORE']} max={resumo.totalSaidas || 1} color="bg-amber-500" label="Pró-labore" darkMode={darkMode} />
                    <ProgressBar value={resumo.categorizado['IMPOSTOS']} max={resumo.totalSaidas || 1} color="bg-emerald-500" label="Impostos" darkMode={darkMode} />
                    <ProgressBar value={resumo.categorizado['DÍVIDAS']} max={resumo.totalSaidas || 1} color="bg-red-500" label="Dívidas" darkMode={darkMode} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'} border-2 ${darkMode ? 'border-indigo-500' : 'border-indigo-200'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-bold ${themeClasses.text}`}>Resultado:</span>
                      <span className={`text-xl font-bold ${resumo.resultado >= 0 ? 'text-green-500' : 'text-red-500'}`}>R$ {resumo.resultado.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Pulmão + Custos */}
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'} rounded-lg p-6`}>
                    <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>🫁 Pulmão Financeiro</h3>
                    <div className="text-center">
                      <p className={`text-5xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{pulmao.dias}</p>
                      <p className={themeClasses.textSecondary}>dias ({pulmao.meses} meses)</p>
                      <span className={`inline-block mt-3 px-4 py-2 rounded-full font-semibold ${
                        pulmao.cor === 'red' ? 'bg-red-100 text-red-800' : 
                        pulmao.cor === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>{pulmao.classificacao}</span>
                    </div>
                  </div>

                  {receitaBruta > 0 && (
                    <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} rounded-lg p-6`}>
                      <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>💰 Custos Financeiros</h3>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg`}>
                          <p className={`text-xs ${themeClasses.textSecondary}`}>T1 Taxa</p>
                          <p className={`text-lg font-bold ${parseFloat(custos.t1.taxa) > 5 ? 'text-red-500' : 'text-green-500'}`}>{custos.t1.taxa}%</p>
                        </div>
                        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg`}>
                          <p className={`text-xs ${themeClasses.textSecondary}`}>T2 Antecip.</p>
                          <p className={`text-lg font-bold ${parseFloat(custos.t2.percentual) > 2 ? 'text-red-500' : 'text-green-500'}`}>R$ {custos.t2.custo}</p>
                        </div>
                        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg`}>
                          <p className={`text-xs ${themeClasses.textSecondary}`}>T3 Ocultos</p>
                          <p className={`text-lg font-bold ${parseFloat(custos.t3.percentual) > 3 ? 'text-red-500' : 'text-green-500'}`}>R$ {custos.t3.total}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Anomalias */}
              {anomalias.length > 0 && (
                <div className={`${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} rounded-lg p-6 mb-8`}>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-yellow-300' : 'text-yellow-900'} mb-4`}>⚠️ Anomalias ({anomalias.length})</h3>
                  <div className="space-y-3">
                    {anomalias.map((a, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                        a.criticidade === 'ALTA' ? `${darkMode ? 'bg-red-900/30' : 'bg-red-50'} border-red-500` :
                        `${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'} border-yellow-500`
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <p className={`font-bold ${themeClasses.text} text-sm`}>{a.codigo} - {a.titulo}</p>
                          <span className={`text-xs px-2 py-1 rounded font-semibold ${
                            a.criticidade === 'ALTA' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                          }`}>{a.criticidade}</span>
                        </div>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>{a.impacto}</p>
                        {a.recomendacao && <p className={`text-xs mt-2 ${darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'} p-2 rounded`}>💡 {a.recomendacao}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recomendações */}
              {recomendacoes.length > 0 && (
                <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-lg p-6 mb-8`}>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-4`}>📋 Recomendações</h3>
                  <div className="space-y-3">
                    {recomendacoes.map((rec, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                        rec.prioridade === 'URGENTE' ? `${darkMode ? 'bg-red-900/30' : 'bg-red-50'} border-red-500` :
                        `${darkMode ? 'bg-green-900/30' : 'bg-green-50'} border-green-500`
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-1 rounded font-semibold ${
                            rec.prioridade === 'URGENTE' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                          }`}>{rec.prioridade}</span>
                          <p className={`font-bold ${themeClasses.text} text-sm`}>{rec.titulo}</p>
                        </div>
                        <p className={`text-xs ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'} p-2 rounded`}>🎯 {rec.acao}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={abrirRelatorioNovaAba}
                className={`w-full px-6 py-4 rounded-lg flex items-center justify-center gap-2 font-semibold mb-4 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}>
                <DownloadIcon />
                Gerar Relatório PDF
              </button>

              <div className="flex gap-4">
                <button onClick={() => setStep(4)} className={`flex-1 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} px-6 py-2 rounded-lg hover:opacity-80`}>
                  ← Voltar
                </button>
                <button onClick={() => setStep(1)} className={`flex-1 ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-800'} px-6 py-2 rounded-lg hover:opacity-80`}>
                  Nova Análise
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<DiagnosticoFinanceiro />);
