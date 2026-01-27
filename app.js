const { useState, useEffect } = React;

// ============================================
// ÍCONES SVG
// ============================================
const UploadIcon = () => (
  <svg className="w-12 h-12 text-emerald-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-16 h-16 text-emerald-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
// COMPONENTE DE GAUGE DO PULMÃO FINANCEIRO
// ============================================
const PulmaoGauge = ({ dias, darkMode }) => {
  const maxDias = 90; // Escala máxima do gráfico
  const idealDias = 60; // Linha ideal
  const alertaDias = 30; // Linha de alerta

  const atual = Math.min(Math.max(dias, 0), maxDias);
  const percentAtual = (atual / maxDias) * 100;
  const percentIdeal = (idealDias / maxDias) * 100;
  const percentAlerta = (alertaDias / maxDias) * 100;

  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs mb-2">
        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>0 dias</span>
        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{maxDias} dias</span>
      </div>

      {/* Barra de fundo com zonas coloridas */}
      <div className="relative h-8 rounded-lg overflow-hidden">
        {/* Zona vermelha (0-30) */}
        <div
          className="absolute h-full bg-red-400/30"
          style={{ left: 0, width: `${percentAlerta}%` }}
        />
        {/* Zona amarela (30-60) */}
        <div
          className="absolute h-full bg-yellow-400/30"
          style={{ left: `${percentAlerta}%`, width: `${percentIdeal - percentAlerta}%` }}
        />
        {/* Zona verde (60+) */}
        <div
          className="absolute h-full bg-emerald-400/30"
          style={{ left: `${percentIdeal}%`, width: `${100 - percentIdeal}%` }}
        />

        {/* Barra do valor atual */}
        <div
          className={`absolute h-full rounded-lg transition-all duration-700 ${
            dias < 30 ? 'bg-red-500' : dias < 60 ? 'bg-yellow-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${percentAtual}%` }}
        />

        {/* Linha do ideal (60 dias) */}
        <div
          className="absolute h-full w-0.5 bg-emerald-700"
          style={{ left: `${percentIdeal}%` }}
        />

        {/* Linha de alerta (30 dias) */}
        <div
          className="absolute h-full w-0.5 bg-yellow-600"
          style={{ left: `${percentAlerta}%` }}
        />
      </div>

      {/* Legenda */}
      <div className="flex justify-between mt-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Risco (&lt;30d)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Alerta (30-60d)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Ideal (60d+)</span>
        </div>
      </div>

      {/* Comparação atual vs ideal */}
      <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="flex justify-between items-center">
          <div>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Seu pulmão</p>
            <p className={`text-lg font-bold ${dias < 30 ? 'text-red-500' : dias < 60 ? 'text-yellow-500' : 'text-emerald-500'}`}>
              {dias} dias
            </p>
          </div>
          <div className={`text-2xl ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>vs</div>
          <div className="text-right">
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ideal</p>
            <p className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>60 dias</p>
          </div>
        </div>
        {dias < 60 && (
          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Faltam <span className="font-semibold">{60 - dias} dias</span> para atingir o ideal
          </p>
        )}
        {dias >= 60 && (
          <p className={`text-xs mt-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            Parabéns! Você está {dias - 60} dias acima do ideal
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================
// COMPONENTE DE GRÁFICO DE BARRAS HORIZONTAIS
// ============================================
const HorizontalBarChart = ({ data, darkMode, formatValue }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const colors = ['#34D399', '#10B981', '#059669', '#047857'];

  return (
    <div className="space-y-3">
      {data.map((item, idx) => {
        const percentage = (item.value / maxValue) * 100;
        return (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item.label}</span>
              <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {formatValue ? formatValue(item.value) : item.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
              </span>
            </div>
            <div className={`h-6 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
              <div
                className="h-full rounded transition-all duration-500 flex items-center justify-end pr-2"
                style={{
                  width: `${Math.max(percentage, 5)}%`,
                  backgroundColor: colors[idx % colors.length]
                }}
              >
                {percentage > 15 && (
                  <span className="text-xs font-medium text-white">
                    {percentage.toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// COMPONENTE DE GRÁFICO DE PIZZA (SVG)
// ============================================
const PieChart = ({ data, darkMode }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return null;

  const colors = ['#34D399', '#10B981', '#059669', '#047857'];
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
  const [darkMode, setDarkMode] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
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
  
  // NOVOS CAMPOS: Maquininhas - Taxa Efetiva
  const [vendasMaquininha, setVendasMaquininha] = useState([]);
  const [novaVenda, setNovaVenda] = useState({
    dataVenda: '', valorBruto: '', dataDeposito: '', valorRecebido: '', bandeira: 'Visa - Crédito'
  });

  // Campos de inputs diretos (Step 2 simplificado)
  const [inputProLabore, setInputProLabore] = useState(0);
  const [inputImpostos, setInputImpostos] = useState(0);
  const [inputDividas, setInputDividas] = useState(0);
  const [inputEntradasNaoOp, setInputEntradasNaoOp] = useState(0);
  const [mostrarTransacoes, setMostrarTransacoes] = useState(false);

  // Campo para comparação: Banco > Dono (usa inputProLabore)
  const proLabore = inputProLabore;

  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [mesReferencia, setMesReferencia] = useState('');

  // Calculados automaticamente do extrato
  const totalEntradas = classificadas.filter(m => m.valor >= 0).reduce((acc, m) => acc + m.valor, 0);
  const totalSaidas = Math.abs(classificadas.filter(m => m.valor < 0).reduce((acc, m) => acc + m.valor, 0));

  // Persistir tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('diagnostico-theme');
    if (savedTheme) setDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('diagnostico-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Classes dinâmicas baseadas no tema - Verde claro (#34D399) com preto
  const themeClasses = {
    bg: darkMode ? 'bg-gray-950' : 'bg-gradient-to-br from-gray-50 to-emerald-50',
    card: darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white',
    text: darkMode ? 'text-gray-100' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-400' : 'text-gray-600',
    input: darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900',
    inputFocus: darkMode ? 'focus:ring-emerald-400 focus:border-emerald-400' : 'focus:ring-emerald-500 focus:border-emerald-500',
    table: darkMode ? 'bg-gray-800' : 'bg-gray-100',
    tableRow: darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
    border: darkMode ? 'border-gray-800' : 'border-gray-200',
    highlight: darkMode ? 'bg-gray-800' : 'bg-gray-50',
    warning: darkMode ? 'bg-yellow-900/30 border-yellow-600' : 'bg-yellow-50 border-yellow-400',
    warningText: darkMode ? 'text-yellow-300' : 'text-yellow-800',
    info: darkMode ? 'bg-emerald-900/30 border-emerald-600' : 'bg-emerald-50 border-emerald-400',
    infoText: darkMode ? 'text-emerald-300' : 'text-emerald-800',
    accent: darkMode ? 'bg-emerald-500' : 'bg-emerald-400',
    accentHover: darkMode ? 'hover:bg-emerald-600' : 'hover:bg-emerald-500',
    accentText: darkMode ? 'text-emerald-400' : 'text-emerald-600',
  };

  // ============ SISTEMA DE DETECÇÃO AUTOMÁTICA DE COLUNAS ============

  // Converte valor brasileiro "4.200,00" ou "-25,00" para número
  const parseValorBR = (valor) => {
    if (valor === null || valor === undefined || valor === '') return 0;
    // Se já for número, retorna direto
    if (typeof valor === 'number') return valor;
    const str = String(valor)
      .replace(/[R$\s]/g, '')      // Remove R$ e espaços
      .replace(/\./g, '')          // Remove pontos (separador de milhar)
      .replace(',', '.');          // Vírgula -> ponto decimal
    return parseFloat(str) || 0;
  };

  // Detecta se uma string é um valor monetário
  const isValorMonetario = (valor) => {
    if (valor === null || valor === undefined) return false;
    if (typeof valor === 'number') return true;
    const str = String(valor).trim();
    if (!str) return false;
    // Padrões: 1234.56, 1.234,56, -25,00, R$ 100,00, 1234, -1.000,00
    return /^-?\s*R?\$?\s*\d{1,3}([.,]\d{3})*([.,]\d{1,2})?$/.test(str) ||
           /^-?\d+([.,]\d{1,2})?$/.test(str) ||
           /^-?\d{1,3}(\.\d{3})*(,\d{2})?$/.test(str);
  };

  // Detecta se uma string é uma data válida
  const isData = (valor) => {
    if (!valor) return false;
    const str = String(valor).trim();
    // DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD, YYYY/MM/DD
    return /^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/.test(str) ||
           /^\d{4}[\/\-]\d{2}[\/\-]\d{2}$/.test(str);
  };

  // Detecta se é uma linha de saldo/cabeçalho que deve ser ignorada
  const isLinhaIgnoravel = (texto) => {
    if (!texto) return false;
    const str = String(texto).toLowerCase();
    const ignorar = ['saldo anterior', 'saldo do dia', 'saldo final', 'saldo inicial',
                     'total', 'subtotal', 'resumo', 'header', 'cabeçalho'];
    return ignorar.some(s => str.includes(s));
  };

  // Lista de nomes conhecidos para fallback
  const NOMES_VALOR = ['valor', 'value', 'amount', 'vlr', 'quantia', 'montante', 'débito', 'debito', 'crédito', 'credito'];
  const NOMES_DATA = ['data', 'date', 'dt', 'data mov', 'data movimento', 'data lançamento', 'data lancamento', 'dt lancamento', 'dt lanc'];
  const NOMES_DESCRICAO = ['descrição', 'descricao', 'description', 'desc', 'histórico', 'historico', 'lançamento', 'lancamento', 'memo', 'detalhe', 'detalhes', 'observação', 'observacao', 'obs'];

  // Detecta automaticamente as colunas do extrato
  const detectarColunas = (jsonData) => {
    if (!jsonData || jsonData.length === 0) return { colunaValor: null, colunaData: null, colunasDescricao: [] };

    const colunas = Object.keys(jsonData[0] || {});
    const amostra = jsonData.slice(0, Math.min(30, jsonData.length));

    let colunaValor = null;
    let colunaData = null;
    let colunasDescricao = [];

    // PRIORIDADE 1: Busca por nome da coluna (mais confiável)
    colunaValor = colunas.find(col => NOMES_VALOR.some(n => col.toLowerCase().includes(n)));
    colunaData = colunas.find(col => NOMES_DATA.some(n => col.toLowerCase() === n || col.toLowerCase().startsWith(n)));

    // PRIORIDADE 2: Se não encontrou por nome, detecta por padrão dos dados
    if (!colunaValor || !colunaData) {
      let melhorScoreValor = 0;
      let melhorScoreData = 0;

      for (const col of colunas) {
        const valores = amostra.map(row => row[col]).filter(v => v !== null && v !== undefined && v !== '');
        if (valores.length === 0) continue;

        // Para VALOR: prioriza colunas que têm números negativos (típico de extrato)
        const temNegativos = valores.some(v => String(v).includes('-'));
        const temDecimais = valores.some(v => String(v).includes(',') || (typeof v === 'number' && v % 1 !== 0));
        const matchValor = valores.filter(v => isValorMonetario(v)).length;
        const percentValor = matchValor / valores.length;
        // Score maior se tem negativos E decimais (características de extrato)
        const scoreValor = percentValor + (temNegativos ? 0.3 : 0) + (temDecimais ? 0.2 : 0);

        // Para DATA: percentual simples
        const matchData = valores.filter(v => isData(v)).length;
        const percentData = matchData / valores.length;

        // Seleciona coluna de valor (se ainda não encontrou por nome)
        if (!colunaValor && percentValor > 0.6 && scoreValor > melhorScoreValor) {
          melhorScoreValor = scoreValor;
          colunaValor = col;
        }

        // Seleciona coluna de data (se ainda não encontrou por nome)
        if (!colunaData && percentData > 0.6 && percentData > melhorScoreData) {
          melhorScoreData = percentData;
          colunaData = col;
        }
      }
    }

    // Fallback final por nome se ainda não detectou
    if (!colunaValor) {
      colunaValor = colunas.find(col => NOMES_VALOR.some(n => col.toLowerCase().includes(n)));
    }
    if (!colunaData) {
      colunaData = colunas.find(col => NOMES_DATA.some(n => col.toLowerCase().includes(n)));
    }

    // Colunas de descrição = todas as outras colunas de texto (exceto valor e data)
    for (const col of colunas) {
      if (col === colunaValor || col === colunaData) continue;
      const valores = amostra.map(row => row[col]).filter(v => v !== null && v !== undefined && v !== '');
      // Se a maioria é texto (não é valor nem data), considera como descrição
      const isTexto = valores.filter(v => !isValorMonetario(v) && !isData(v) && String(v).length > 2).length;
      if (isTexto / valores.length > 0.5) {
        colunasDescricao.push(col);
      }
    }

    // Fallback por nome se não encontrou descrição
    if (colunasDescricao.length === 0) {
      const descFallback = colunas.find(col => NOMES_DESCRICAO.some(n => col.toLowerCase().includes(n)));
      if (descFallback) colunasDescricao.push(descFallback);
    }

    console.log('Colunas detectadas:', { colunaValor, colunaData, colunasDescricao });
    return { colunaValor, colunaData, colunasDescricao };
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

      // Detecta automaticamente as colunas
      const { colunaValor, colunaData, colunasDescricao } = detectarColunas(jsonData);

      const processadas = jsonData
        .filter(row => {
          const valor = colunaValor ? row[colunaValor] : null;
          const dataVal = colunaData ? row[colunaData] : null;
          // Ignora linhas de saldo
          const textoLinha = colunasDescricao.map(col => row[col]).join(' ');
          if (isLinhaIgnoravel(textoLinha)) return false;
          // Ignora datas inválidas
          if (dataVal === '00/00/0000' || (!dataVal && colunaData)) return false;
          // Ignora se não tem valor
          if (valor === null || valor === undefined || valor === '') return false;
          // Ignora valores zerados (saldos)
          const valorNum = parseValorBR(valor);
          if (valorNum === 0) return false;
          return true;
        })
        .map((row, idx) => {
          const valor = parseValorBR(colunaValor ? row[colunaValor] : 0);
          const descricao = colunasDescricao
            .map(col => row[col])
            .filter(v => v && String(v).trim())
            .join(' - ')
            .trim() || 'Sem descrição';

          return {
            id: idx,
            data: colunaData ? row[colunaData] : '',
            descricao: descricao,
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

  const calcularResumo = () => {
    // Entradas: total do extrato menos as não operacionais informadas
    const entradas = totalEntradas;
    const entradasOperacionais = totalEntradas - inputEntradasNaoOp;
    const entradasNaoOperacionais = inputEntradasNaoOp;

    // Percentual de entradas operacionais
    const percentualOperacional = entradas > 0 ? (entradasOperacionais / entradas) * 100 : 0;

    // Saídas: usa os inputs diretos, o resto é operacional
    const saidasOperacionais = Math.max(0, totalSaidas - inputProLabore - inputImpostos - inputDividas);

    const categorizado = {
      'OPERAÇÃO': saidasOperacionais,
      'PRÓ-LABORE': inputProLabore,
      'IMPOSTOS': inputImpostos,
      'DÍVIDAS': inputDividas
    };

    const totalSaidasCalc = Object.values(categorizado).reduce((a, b) => a + b, 0);
    const resultado = entradas - totalSaidasCalc;

    return {
      entradas,
      entradasOperacionais,
      entradasNaoOperacionais,
      percentualOperacional,
      categorizado,
      totalSaidas: totalSaidasCalc,
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

  // CÁLCULO: Taxa Efetiva das Maquininhas
  const calcularTaxaEfetiva = () => {
    if (vendasMaquininha.length === 0) return { vendas: [], mediaEfetiva: 0, diasMedio: 0, porBandeira: {} };

    let somaValorBruto = 0;
    let somaDiferenca = 0;
    let somaDias = 0;
    const porBandeira = {};

    const vendas = vendasMaquininha.map(v => {
      const taxaEfetiva = v.valorBruto > 0 ? ((v.valorBruto - v.valorRecebido) / v.valorBruto) * 100 : 0;
      const d1 = new Date(v.dataVenda);
      const d2 = new Date(v.dataDeposito);
      const diasReceber = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));

      somaValorBruto += v.valorBruto;
      somaDiferenca += (v.valorBruto - v.valorRecebido);
      somaDias += diasReceber;

      if (!porBandeira[v.bandeira]) {
        porBandeira[v.bandeira] = { totalBruto: 0, totalRecebido: 0, count: 0, diasTotal: 0 };
      }
      porBandeira[v.bandeira].totalBruto += v.valorBruto;
      porBandeira[v.bandeira].totalRecebido += v.valorRecebido;
      porBandeira[v.bandeira].count += 1;
      porBandeira[v.bandeira].diasTotal += diasReceber;

      return { ...v, taxaEfetiva: taxaEfetiva.toFixed(2), diasReceber };
    });

    Object.keys(porBandeira).forEach(b => {
      const d = porBandeira[b];
      d.taxaMedia = d.totalBruto > 0 ? (((d.totalBruto - d.totalRecebido) / d.totalBruto) * 100).toFixed(2) : '0.00';
      d.diasMedio = d.count > 0 ? Math.round(d.diasTotal / d.count) : 0;
    });

    const mediaEfetiva = somaValorBruto > 0 ? ((somaDiferenca / somaValorBruto) * 100).toFixed(2) : '0.00';
    const diasMedio = vendasMaquininha.length > 0 ? Math.round(somaDias / vendasMaquininha.length) : 0;

    // Var taxa: contar variações de taxa no trimestre
    const vendasOrdenadas = [...vendas].sort((a, b) => new Date(a.dataVenda) - new Date(b.dataVenda));
    let variacoes = 0;
    for (let i = 1; i < vendasOrdenadas.length; i++) {
      if (vendasOrdenadas[i].taxaEfetiva !== vendasOrdenadas[i - 1].taxaEfetiva) {
        variacoes++;
      }
    }

    // Taxa média por trimestre
    const porTrimestre = {};
    vendas.forEach(v => {
      const data = new Date(v.dataVenda);
      const trimestre = `${data.getFullYear()}-T${Math.ceil((data.getMonth() + 1) / 3)}`;
      if (!porTrimestre[trimestre]) {
        porTrimestre[trimestre] = { totalBruto: 0, totalRecebido: 0, count: 0, taxas: [] };
      }
      porTrimestre[trimestre].totalBruto += v.valorBruto;
      porTrimestre[trimestre].totalRecebido += v.valorRecebido;
      porTrimestre[trimestre].count += 1;
      porTrimestre[trimestre].taxas.push(parseFloat(v.taxaEfetiva));
    });

    Object.keys(porTrimestre).forEach(t => {
      const d = porTrimestre[t];
      d.taxaMedia = d.totalBruto > 0 ? (((d.totalBruto - d.totalRecebido) / d.totalBruto) * 100).toFixed(2) : '0.00';
      // Variações dentro do trimestre
      let varTrimestre = 0;
      for (let i = 1; i < d.taxas.length; i++) {
        if (d.taxas[i] !== d.taxas[i - 1]) varTrimestre++;
      }
      d.variacoes = varTrimestre;
    });

    return { vendas, mediaEfetiva, diasMedio, porBandeira, variacoes, porTrimestre };
  };

  const adicionarVendaMaquininha = () => {
    if (!novaVenda.dataVenda || !novaVenda.valorBruto || !novaVenda.dataDeposito || !novaVenda.valorRecebido) return;
    setVendasMaquininha([...vendasMaquininha, {
      ...novaVenda,
      valorBruto: parseFloat(novaVenda.valorBruto),
      valorRecebido: parseFloat(novaVenda.valorRecebido)
    }]);
    setNovaVenda({ dataVenda: '', valorBruto: '', dataDeposito: '', valorRecebido: '', bandeira: 'Visa - Crédito' });
  };

  const removerVendaMaquininha = (index) => {
    setVendasMaquininha(vendasMaquininha.filter((_, i) => i !== index));
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

    // T4 - Taxa efetiva maquininha elevada
    const taxaEfetiva = calcularTaxaEfetiva();
    if (vendasMaquininha.length > 0 && parseFloat(taxaEfetiva.mediaEfetiva) > 5) {
      anomalias.push({
        codigo: 'T4', titulo: 'Taxa efetiva de maquininha elevada',
        descricao: 'A taxa efetiva real (incluindo custo do tempo) está acima de 5%.',
        criticidade: parseFloat(taxaEfetiva.mediaEfetiva) > 8 ? 'ALTA' : 'MÉDIA',
        impacto: `${taxaEfetiva.mediaEfetiva}% de taxa efetiva | ${taxaEfetiva.diasMedio} dias para receber`,
        recomendacao: 'Renegocie com a operadora. Compare com outras maquininhas. Avalie se a antecipação está embutida na taxa.'
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
      custos: (() => {
        const te = calcularTaxaEfetiva();
        const t3Ruim = parseFloat(custos.t3.percentual) > 6;
        const t3Medio = parseFloat(custos.t3.percentual) > 3;
        const teRuim = vendasMaquininha.length > 0 && parseFloat(te.mediaEfetiva) > 8;
        const teMedio = vendasMaquininha.length > 0 && parseFloat(te.mediaEfetiva) > 5;
        if (t3Ruim || teRuim) return 'danger';
        if (t3Medio || teMedio) return 'warning';
        return 'good';
      })()
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
    .header { text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 3px solid #10B981; }
    .header h1 { font-size: 26px; color: #1F2937; margin-bottom: 8px; }
    .header h2 { font-size: 18px; color: #10B981; margin-bottom: 5px; }
    .header p { color: #6B7280; }
    .section { margin-bottom: 25px; }
    .section h3 { font-size: 16px; font-weight: bold; color: #1F2937; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #E5E7EB; }
    .indicadores { display: flex; gap: 12px; margin-bottom: 20px; }
    .indicador { flex: 1; padding: 12px; border-radius: 8px; text-align: center; border: 1px solid #E5E7EB; }
    .indicador.good { background: #F9FAFB; }
    .indicador.warning { background: #F9FAFB; }
    .indicador.danger { background: #F9FAFB; }
    .indicador .icon { width: 24px; height: 24px; border-radius: 50%; margin: 0 auto 6px; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; }
    .indicador.good .icon { background: #059669; }
    .indicador.warning .icon { background: #D97706; }
    .indicador.danger .icon { background: #DC2626; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card { background: #F9FAFB; padding: 15px; border-radius: 8px; border: 1px solid #E5E7EB; }
    .card-title { font-weight: bold; margin-bottom: 10px; color: #374151; }
    .row { display: flex; justify-content: space-between; margin-bottom: 6px; }
    .row span:last-child { font-weight: bold; }
    .green { color: #059669; }
    .red { color: #DC2626; }
    .yellow { color: #D97706; }
    .resultado-box { background: #F9FAFB; padding: 15px; border-radius: 8px; border: 2px solid #6B7280; margin-top: 12px; }
    .pulmao-box { background: #F9FAFB; padding: 20px; border-radius: 8px; border: 1px solid #E5E7EB; }
    .pulmao-dias { font-size: 42px; font-weight: bold; color: #1F2937; text-align: center; }
    .pulmao-gauge { height: 20px; border-radius: 10px; margin: 15px 0; position: relative; overflow: hidden; }
    .pulmao-gauge-bg { position: absolute; width: 100%; height: 100%; display: flex; }
    .pulmao-gauge-red { background: rgba(239, 68, 68, 0.3); flex: 1; }
    .pulmao-gauge-yellow { background: rgba(245, 158, 11, 0.3); flex: 1; }
    .pulmao-gauge-green { background: rgba(16, 185, 129, 0.3); flex: 1; }
    .pulmao-gauge-fill { position: absolute; height: 100%; border-radius: 10px; }
    .pulmao-legend { display: flex; justify-content: space-between; font-size: 9px; margin-top: 8px; }
    .pulmao-legend span { display: flex; align-items: center; gap: 4px; }
    .pulmao-legend .dot { width: 8px; height: 8px; border-radius: 2px; }
    .pulmao-comparison { display: flex; justify-content: space-around; margin-top: 15px; padding: 10px; background: white; border-radius: 6px; }
    .badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 11px; margin-top: 10px; }
    .badge.red { background: #F3F4F6; color: #DC2626; border: 1px solid #DC2626; }
    .badge.yellow { background: #F3F4F6; color: #D97706; border: 1px solid #D97706; }
    .badge.green { background: #F3F4F6; color: #059669; border: 1px solid #059669; }
    .anomalia { padding: 12px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid; background: #F9FAFB; }
    .anomalia.alta { border-color: #DC2626; }
    .anomalia.media { border-color: #D97706; }
    .anomalia-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
    .anomalia-title { font-weight: bold; font-size: 12px; }
    .anomalia-badge { font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
    .anomalia.alta .anomalia-badge { background: #F3F4F6; color: #DC2626; }
    .anomalia.media .anomalia-badge { background: #F3F4F6; color: #D97706; }
    .recomendacao { padding: 12px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid; background: #F9FAFB; }
    .recomendacao.urgente { border-color: #DC2626; }
    .recomendacao.alta { border-color: #059669; }
    .tip { font-size: 10px; background: #F3F4F6; color: #374151; padding: 6px; border-radius: 4px; margin-top: 6px; }
    .action { font-size: 10px; background: #F3F4F6; color: #374151; padding: 6px; border-radius: 4px; margin-top: 6px; }
    .footer { margin-top: 25px; padding-top: 12px; border-top: 1px solid #E5E7EB; text-align: center; font-size: 10px; color: #9CA3AF; }
    .custos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
    .custo-card { background: white; padding: 10px; border-radius: 6px; text-align: center; border: 1px solid #E5E7EB; }
    .custo-card p:first-child { font-size: 10px; color: #6B7280; margin-bottom: 4px; }
    .custo-card p:last-child { font-size: 16px; font-weight: bold; }
    .progress-bar { height: 8px; background: #E5E7EB; border-radius: 4px; margin-top: 4px; margin-bottom: 8px; }
    .progress-fill { height: 100%; border-radius: 4px; }
    .progress-fill.op { background: #34D399; }
    .progress-fill.pl { background: #10B981; }
    .progress-fill.im { background: #059669; }
    .progress-fill.di { background: #047857; }
    .print-btn { position: fixed; top: 20px; right: 20px; background: #10B981; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; }
    .print-btn:hover { background: #059669; }
    @media print { .print-btn { display: none; } body { background: white; } .container { box-shadow: none; } }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">Imprimir / Salvar PDF</button>
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
          <p style="color: #6B7280; text-align: center;">dias (${pulmao.meses} meses)</p>

          <!-- Gráfico de Gauge -->
          <div class="pulmao-gauge">
            <div class="pulmao-gauge-bg">
              <div class="pulmao-gauge-red"></div>
              <div class="pulmao-gauge-yellow"></div>
              <div class="pulmao-gauge-green"></div>
            </div>
            <div class="pulmao-gauge-fill" style="width: ${Math.min(Math.max(pulmao.dias, 0), 90) / 90 * 100}%; background: ${pulmao.dias < 30 ? '#EF4444' : pulmao.dias < 60 ? '#F59E0B' : '#10B981'};"></div>
          </div>

          <div class="pulmao-legend">
            <span><div class="dot" style="background: #EF4444;"></div> Risco (&lt;30d)</span>
            <span><div class="dot" style="background: #F59E0B;"></div> Alerta (30-60d)</span>
            <span><div class="dot" style="background: #10B981;"></div> Ideal (60d+)</span>
          </div>

          <div class="pulmao-comparison">
            <div style="text-align: center;">
              <p style="font-size: 10px; color: #6B7280;">Seu pulmão</p>
              <p style="font-size: 18px; font-weight: bold; color: ${pulmao.dias < 30 ? '#DC2626' : pulmao.dias < 60 ? '#D97706' : '#059669'};">${pulmao.dias} dias</p>
            </div>
            <div style="font-size: 18px; color: #D1D5DB; display: flex; align-items: center;">vs</div>
            <div style="text-align: center;">
              <p style="font-size: 10px; color: #6B7280;">Ideal</p>
              <p style="font-size: 18px; font-weight: bold; color: #059669;">60 dias</p>
            </div>
          </div>

          <p style="font-size: 10px; color: #6B7280; margin-top: 10px; text-align: center;">
            ${pulmao.dias < 60 ? `Faltam <strong>${60 - pulmao.dias} dias</strong> para atingir o ideal` : `Parabéns! Você está ${pulmao.dias - 60} dias acima do ideal`}
          </p>
          <p style="font-size: 10px; color: #9CA3AF; margin-top: 8px; text-align: center;">CLD: R$ ${pulmao.cld}</p>
        </div>
        ${receitaBruta > 0 || vendasMaquininha.length > 0 ? `
        <div style="margin-top: 15px;">
          <div class="card-title">Custos Financeiros</div>
          <div class="custos-grid" style="${vendasMaquininha.length > 0 ? 'grid-template-columns: repeat(4, 1fr);' : ''}">
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
            ${vendasMaquininha.length > 0 ? `
            <div class="custo-card">
              <p>T4 - Taxa Efetiva</p>
              <p class="${parseFloat(calcularTaxaEfetiva().mediaEfetiva) > 5 ? 'red' : 'green'}">${calcularTaxaEfetiva().mediaEfetiva}%</p>
              <p style="font-size: 9px; color: #6B7280;">${calcularTaxaEfetiva().diasMedio}d médio</p>
            </div>
            ` : ''}
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
          ${a.recomendacao ? `<div class="tip">Dica: ${a.recomendacao}</div>` : ''}
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
          <div class="action">Ação: ${rec.acao}</div>
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
              <div className={darkMode ? 'text-emerald-400' : ''}><FileIcon /></div>
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
                <input type="month" value={mesReferencia} onChange={(e) => setMesReferencia(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${themeClasses.input} ${themeClasses.inputFocus}`} />
              </div>
            </div>

            <label
              className={`block border-2 border-dashed ${isDragging ? 'border-emerald-500 bg-emerald-500/10' : darkMode ? 'border-emerald-500' : 'border-emerald-400'} rounded-lg p-12 text-center hover:border-emerald-400 transition cursor-pointer`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload({ target: { files: [file] } });
              }}
            >
              <UploadIcon />
              <span className={`text-lg ${themeClasses.text} font-medium block`}>Clique ou arraste o extrato bancário aqui</span>
              <p className={`text-sm ${themeClasses.textSecondary} mt-2`}>Formatos: Excel (.xlsx, .xls) ou CSV</p>
              <input type="file" className="hidden" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} />
            </label>

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
    const saldoPeriodo = totalEntradas - totalSaidas;
    const somaInputsSaidas = inputProLabore + inputImpostos + inputDividas;
    const erroSomaExcede = somaInputsSaidas > totalSaidas;
    const erroEntradasExcede = inputEntradasNaoOp > totalEntradas;

    return (
      <div className={`min-h-screen ${themeClasses.bg} p-8`}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-4xl mx-auto">
          <div className={`${themeClasses.card} rounded-xl shadow-lg p-8`}>
            <button onClick={() => setStep(1)} className={`mb-4 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} flex items-center gap-2 transition`}>
              ← Voltar ao início
            </button>
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>Passo 2: Resumo do Extrato</h2>
            <p className={`${themeClasses.textSecondary} mb-6`}>Confira o resumo automático e informe os valores específicos do mês.</p>

            {/* Resumo Automático */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className={`${themeClasses.highlight} p-6 rounded-xl text-center`}>
                <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Total Entradas</p>
                <p className="text-2xl font-bold text-green-500">R$ {totalEntradas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>{classificadas.filter(m => m.valor >= 0).length} transações</p>
              </div>
              <div className={`${themeClasses.highlight} p-6 rounded-xl text-center`}>
                <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Total Saídas</p>
                <p className="text-2xl font-bold text-red-500">R$ {totalSaidas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>{classificadas.filter(m => m.valor < 0).length} transações</p>
              </div>
              <div className={`${themeClasses.highlight} p-6 rounded-xl text-center`}>
                <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Saldo do Período</p>
                <p className={`text-2xl font-bold ${saldoPeriodo >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  R$ {saldoPeriodo.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </p>
                <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>{classificadas.length} transações total</p>
              </div>
            </div>

            {/* Formulário de Inputs */}
            <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-emerald-50'} p-6 rounded-xl mb-6`}>
              <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Informe os valores específicos do mês</h3>
              <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>
                Estes valores serão separados das saídas operacionais para o diagnóstico.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-1`}>Pró-labore (retirada dos sócios)</label>
                  <div className="relative">
                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${themeClasses.textSecondary}`}>R$</span>
                    <input type="number" value={inputProLabore || ''} onChange={(e) => setInputProLabore(parseFloat(e.target.value) || 0)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg ${themeClasses.input}`} placeholder="0,00" />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-1`}>Impostos pagos no mês</label>
                  <div className="relative">
                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${themeClasses.textSecondary}`}>R$</span>
                    <input type="number" value={inputImpostos || ''} onChange={(e) => setInputImpostos(parseFloat(e.target.value) || 0)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg ${themeClasses.input}`} placeholder="0,00" />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-1`}>Parcelas de dívidas/financiamentos</label>
                  <div className="relative">
                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${themeClasses.textSecondary}`}>R$</span>
                    <input type="number" value={inputDividas || ''} onChange={(e) => setInputDividas(parseFloat(e.target.value) || 0)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg ${themeClasses.input}`} placeholder="0,00" />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-1`}>Entradas não operacionais (opcional)</label>
                  <div className="relative">
                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${themeClasses.textSecondary}`}>R$</span>
                    <input type="number" value={inputEntradasNaoOp || ''} onChange={(e) => setInputEntradasNaoOp(parseFloat(e.target.value) || 0)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg ${themeClasses.input}`} placeholder="0,00" />
                  </div>
                  <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>Ex: empréstimos recebidos, venda de ativos, aportes</p>
                </div>
              </div>

              {/* Validações */}
              {erroSomaExcede && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded-lg">
                  <p className="text-sm text-red-700">
                    A soma de Pró-labore + Impostos + Dívidas (R$ {somaInputsSaidas.toLocaleString('pt-BR', {minimumFractionDigits: 2})})
                    não pode exceder o total de saídas (R$ {totalSaidas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}).
                  </p>
                </div>
              )}
              {erroEntradasExcede && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded-lg">
                  <p className="text-sm text-red-700">
                    Entradas não operacionais não pode exceder o total de entradas.
                  </p>
                </div>
              )}

              {/* Cálculo automático das saídas operacionais */}
              {!erroSomaExcede && (
                <div className={`mt-4 p-3 ${darkMode ? 'bg-gray-600' : 'bg-white'} rounded-lg`}>
                  <p className={`text-sm ${themeClasses.text}`}>
                    <strong>Saídas Operacionais (calculado):</strong> R$ {Math.max(0, totalSaidas - somaInputsSaidas).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                  </p>
                  <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>
                    = Total Saídas - Pró-labore - Impostos - Dívidas
                  </p>
                </div>
              )}
            </div>

            {/* Botão para ver transações */}
            <div className="mb-6">
              <button onClick={() => setMostrarTransacoes(!mostrarTransacoes)}
                className={`w-full py-3 px-4 rounded-lg border ${themeClasses.border} ${themeClasses.text} hover:opacity-80 transition flex items-center justify-center gap-2`}>
                {mostrarTransacoes ? '▲ Ocultar' : '▼ Ver'} todas as {classificadas.length} transações
              </button>

              {mostrarTransacoes && (
                <div className={`mt-4 max-h-96 overflow-y-auto rounded-lg border ${themeClasses.border}`}>
                  <table className="w-full">
                    <thead className={`${themeClasses.table} sticky top-0`}>
                      <tr>
                        <th className={`px-4 py-2 text-left text-xs font-semibold ${themeClasses.text}`}>Data</th>
                        <th className={`px-4 py-2 text-left text-xs font-semibold ${themeClasses.text}`}>Descrição</th>
                        <th className={`px-4 py-2 text-right text-xs font-semibold ${themeClasses.text}`}>Valor</th>
                        <th className={`px-4 py-2 text-center text-xs font-semibold ${themeClasses.text}`}>Tipo</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${themeClasses.border}`}>
                      {classificadas.map((mov) => (
                        <tr key={mov.id} className={themeClasses.tableRow}>
                          <td className={`px-4 py-2 text-sm ${themeClasses.text}`}>{mov.data}</td>
                          <td className={`px-4 py-2 text-sm ${themeClasses.text}`}>{mov.descricao}</td>
                          <td className={`px-4 py-2 text-sm text-right font-medium ${mov.tipo === 'Entrada' ? 'text-green-500' : 'text-red-500'}`}>
                            R$ {Math.abs(mov.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <span className={`px-2 py-1 text-xs rounded ${mov.tipo === 'Entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {mov.tipo}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Navegação */}
            <div className="flex justify-center mt-6">
              <button onClick={() => setStep(3)} disabled={erroSomaExcede || erroEntradasExcede}
                className={`px-8 py-3 rounded-lg transition ${erroSomaExcede || erroEntradasExcede ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                Próximo →
              </button>
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
            <button onClick={() => setStep(2)} className={`mb-4 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} flex items-center gap-2 transition`}>
              ← Voltar
            </button>
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

            <div className={`${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'} p-4 rounded-lg mb-6`}>
              <label className={`block text-sm font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-900'} mb-2`}>
                COMR - Custo Operacional Mensal Real (R$)
              </label>
              <input type="number" value={comr || ''} onChange={(e) => setComr(parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'border-emerald-500 bg-gray-700 text-white' : 'border-emerald-400'}`}
                placeholder="0.00" />
              <p className={`text-xs ${darkMode ? 'text-emerald-400' : 'text-emerald-700'} mt-1`}>Despesas fixas mensais</p>
            </div>

            {comr > 0 && (
              <div className={`${darkMode ? 'bg-gradient-to-r from-emerald-900/50 to-gray-900/50' : 'bg-gradient-to-r from-emerald-50 to-gray-50'} p-6 rounded-lg mb-6 border-2 ${darkMode ? 'border-emerald-500' : 'border-emerald-300'}`}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-900'} mb-4 text-center`}>Resultado</h3>
                <div className="text-center mb-4">
                  <p className={`text-5xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-900'}`}>{pulmao.dias}</p>
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
                  <span className={`font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-900'}`}>R$ {pulmao.cld}</span>
                </div>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button onClick={() => setStep(4)} disabled={comr <= 0}
                className={`px-8 py-3 rounded-lg ${comr <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
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
            <button onClick={() => setStep(3)} className={`mb-4 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} flex items-center gap-2 transition`}>
              ← Voltar
            </button>
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>Passo 4: Custos Financeiros</h2>
            <p className={`${themeClasses.textSecondary} mb-6`}>Analise taxas de vendas e custos bancários ocultos.</p>

            {/* Taxas de Vendas */}
            <div className={`${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'} p-4 rounded-lg mb-6`}>
              <h3 className={`font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-800'} mb-4`}>Taxas de Vendas (Cartão/Gateway)</h3>
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

            {/* Maquininhas - Taxa Efetiva */}
            <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} p-4 rounded-lg mb-6`}>
              <h3 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-4`}>📱 Maquininhas - Taxa Efetiva</h3>
              <p className={`text-xs ${themeClasses.textSecondary} mb-4`}>
                Adicione cada venda para calcular a taxa efetiva real (incluindo custo do tempo de recebimento).
              </p>

              {/* Formulário de nova venda */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg mb-4`}>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  <div>
                    <label className={`block text-xs ${themeClasses.text} mb-1`}>Data Venda</label>
                    <input type="date" value={novaVenda.dataVenda} onChange={(e) => setNovaVenda({...novaVenda, dataVenda: e.target.value})}
                      className={`w-full px-2 py-1 border rounded text-xs ${themeClasses.input}`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${themeClasses.text} mb-1`}>Valor Bruto (R$)</label>
                    <input type="number" value={novaVenda.valorBruto} onChange={(e) => setNovaVenda({...novaVenda, valorBruto: e.target.value})}
                      className={`w-full px-2 py-1 border rounded text-xs ${themeClasses.input}`} placeholder="0.00" />
                  </div>
                  <div>
                    <label className={`block text-xs ${themeClasses.text} mb-1`}>Data Depósito</label>
                    <input type="date" value={novaVenda.dataDeposito} onChange={(e) => setNovaVenda({...novaVenda, dataDeposito: e.target.value})}
                      className={`w-full px-2 py-1 border rounded text-xs ${themeClasses.input}`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${themeClasses.text} mb-1`}>Valor Recebido (R$)</label>
                    <input type="number" value={novaVenda.valorRecebido} onChange={(e) => setNovaVenda({...novaVenda, valorRecebido: e.target.value})}
                      className={`w-full px-2 py-1 border rounded text-xs ${themeClasses.input}`} placeholder="0.00" />
                  </div>
                  <div>
                    <label className={`block text-xs ${themeClasses.text} mb-1`}>Bandeira</label>
                    <select value={novaVenda.bandeira} onChange={(e) => setNovaVenda({...novaVenda, bandeira: e.target.value})}
                      className={`w-full px-2 py-1 border rounded text-xs ${themeClasses.input}`}>
                      <option>Visa - Crédito</option>
                      <option>Visa - Débito</option>
                      <option>Mastercard - Crédito</option>
                      <option>Mastercard - Débito</option>
                      <option>Elo - Crédito</option>
                      <option>Elo - Débito</option>
                      <option>Maestro - Crédito</option>
                      <option>Visa Electron - Débito</option>
                      <option>Outro</option>
                    </select>
                  </div>
                </div>
                <button onClick={adicionarVendaMaquininha}
                  className="bg-green-600 text-white px-4 py-1.5 rounded text-xs hover:bg-green-700 transition">
                  + Adicionar Venda
                </button>
              </div>

              {/* Tabela de vendas */}
              {vendasMaquininha.length > 0 && (() => {
                const resultado = calcularTaxaEfetiva();
                return (
                  <div>
                    <div className="overflow-x-auto mb-4">
                      <table className={`w-full text-xs ${themeClasses.text}`}>
                        <thead>
                          <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <th className="px-2 py-1 text-left">Data Venda</th>
                            <th className="px-2 py-1 text-right">Bruto</th>
                            <th className="px-2 py-1 text-left">Data Depósito</th>
                            <th className="px-2 py-1 text-right">Recebido</th>
                            <th className="px-2 py-1 text-left">Bandeira</th>
                            <th className="px-2 py-1 text-center">Dias</th>
                            <th className="px-2 py-1 text-right">Taxa Efetiva</th>
                            <th className="px-2 py-1 text-center">-</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultado.vendas.map((v, idx) => (
                            <tr key={idx} className={`border-t ${themeClasses.border}`}>
                              <td className="px-2 py-1">{new Date(v.dataVenda + 'T00:00').toLocaleDateString('pt-BR')}</td>
                              <td className="px-2 py-1 text-right">R$ {v.valorBruto.toFixed(2)}</td>
                              <td className="px-2 py-1">{new Date(v.dataDeposito + 'T00:00').toLocaleDateString('pt-BR')}</td>
                              <td className="px-2 py-1 text-right">R$ {v.valorRecebido.toFixed(2)}</td>
                              <td className="px-2 py-1">{v.bandeira}</td>
                              <td className={`px-2 py-1 text-center ${v.diasReceber > 30 ? 'text-red-500 font-bold' : ''}`}>{v.diasReceber}d</td>
                              <td className={`px-2 py-1 text-right font-bold ${parseFloat(v.taxaEfetiva) > 5 ? 'text-red-500' : 'text-green-500'}`}>{v.taxaEfetiva}%</td>
                              <td className="px-2 py-1 text-center">
                                <button onClick={() => removerVendaMaquininha(idx)} className="text-red-400 hover:text-red-600 text-sm">×</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Resumo */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg text-center`}>
                        <p className={`text-xs ${themeClasses.textSecondary}`}>Taxa Efetiva Média</p>
                        <p className={`text-xl font-bold ${parseFloat(resultado.mediaEfetiva) > 5 ? 'text-red-500' : 'text-green-500'}`}>{resultado.mediaEfetiva}%</p>
                      </div>
                      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg text-center`}>
                        <p className={`text-xs ${themeClasses.textSecondary}`}>Dias Médios p/ Receber</p>
                        <p className={`text-xl font-bold ${resultado.diasMedio > 30 ? 'text-red-500' : 'text-green-500'}`}>{resultado.diasMedio} dias</p>
                      </div>
                      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg text-center`}>
                        <p className={`text-xs ${themeClasses.textSecondary}`}>Total Perdido em Taxas</p>
                        <p className="text-xl font-bold text-red-500">
                          R$ {vendasMaquininha.reduce((s, v) => s + (v.valorBruto - v.valorRecebido), 0).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Var Taxa + Taxa Média Trimestral */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg mt-4`}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className={`text-xs font-semibold ${themeClasses.textSecondary} mb-1`}>Var Taxa</p>
                          <p className={`text-2xl font-bold ${resultado.variacoes > 3 ? 'text-red-500' : resultado.variacoes > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                            {resultado.variacoes}
                          </p>
                          <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>
                            Sua taxa teve <strong>{resultado.variacoes}</strong> {resultado.variacoes === 1 ? 'variação' : 'variações'} no período
                          </p>
                        </div>
                        <div className="text-center">
                          <p className={`text-xs font-semibold ${themeClasses.textSecondary} mb-1`}>Taxa Média</p>
                          <p className={`text-2xl font-bold ${parseFloat(resultado.mediaEfetiva) > 5 ? 'text-red-500' : 'text-green-500'}`}>
                            {resultado.mediaEfetiva}%
                          </p>
                          <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>
                            Sua taxa média ficou em <strong>{resultado.mediaEfetiva}%</strong>
                          </p>
                        </div>
                      </div>

                      {/* Detalhamento por trimestre */}
                      {Object.keys(resultado.porTrimestre).length > 0 && (
                        <div className="mt-3 pt-3 border-t" style={{borderColor: darkMode ? '#374151' : '#E5E7EB'}}>
                          <p className={`text-xs font-semibold ${themeClasses.textSecondary} mb-2`}>Por Trimestre:</p>
                          <div className="grid grid-cols-1 gap-1">
                            {Object.entries(resultado.porTrimestre).map(([trimestre, dados]) => (
                              <div key={trimestre} className={`flex justify-between items-center text-xs ${themeClasses.text} px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <span className="font-semibold">{trimestre}</span>
                                <span>
                                  Taxa média: <strong className={parseFloat(dados.taxaMedia) > 5 ? 'text-red-500' : 'text-green-500'}>{dados.taxaMedia}%</strong>
                                  {' | '}{dados.variacoes} {dados.variacoes === 1 ? 'variação' : 'variações'}
                                  {' | '}{dados.count} vendas
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Por bandeira */}
                    {Object.keys(resultado.porBandeira).length > 1 && (
                      <div className="mt-4">
                        <p className={`text-xs font-semibold ${themeClasses.text} mb-2`}>Detalhamento por Bandeira:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(resultado.porBandeira).map(([bandeira, dados]) => (
                            <div key={bandeira} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded text-xs`}>
                              <p className={`font-semibold ${themeClasses.text}`}>{bandeira}</p>
                              <p className={themeClasses.textSecondary}>
                                Taxa: <span className={parseFloat(dados.taxaMedia) > 5 ? 'text-red-500' : 'text-green-500'}>{dados.taxaMedia}%</span>
                                {' | '}{dados.diasMedio}d | {dados.count} vendas
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Taxas Ocultas Bancárias */}
            <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} p-4 rounded-lg mb-6`}>
              <h3 className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-800'} mb-4`}>Taxas Ocultas Bancárias</h3>
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

            {/* Pró-labore para comparação (já preenchido no Step 2) */}
            <div className={`${themeClasses.highlight} p-4 rounded-lg mb-6`}>
              <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>Pró-labore Mensal (R$)</label>
              <input type="number" value={inputProLabore || ''} onChange={(e) => setInputProLabore(parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-2 border rounded ${themeClasses.input}`} placeholder="0.00" />
              <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>Valor informado no passo 2 - pode ajustar se necessário</p>
            </div>

            <div className="flex justify-center mt-6">
              <button onClick={() => setStep(5)} className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
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
              <button onClick={() => setStep(4)} className={`mb-4 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} flex items-center gap-2 transition`}>
                ← Voltar
              </button>
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
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Resumo do Caixa</h3>

                  {/* Entradas separadas */}
                  <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <p className={`text-sm font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-2`}>Entradas</p>
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
                        Atenção: Apenas {resumo.percentualOperacional.toFixed(0)}% das entradas são operacionais
                      </p>
                    )}
                  </div>

                  <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Distribuição de Saídas</p>
                  <HorizontalBarChart
                    data={dadosGrafico}
                    darkMode={darkMode}
                    formatValue={(v) => `R$ ${v.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`}
                  />
                  <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'} border-2 ${darkMode ? 'border-emerald-500' : 'border-emerald-300'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-bold ${themeClasses.text}`}>Resultado:</span>
                      <span className={`text-xl font-bold ${resumo.resultado >= 0 ? 'text-green-500' : 'text-red-500'}`}>R$ {resumo.resultado.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Pulmão + Custos */}
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'} rounded-lg p-6`}>
                    <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Pulmão Financeiro</h3>
                    <PulmaoGauge dias={parseInt(pulmao.dias)} darkMode={darkMode} />
                  </div>

                  {(receitaBruta > 0 || vendasMaquininha.length > 0) && (
                    <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} rounded-lg p-6`}>
                      <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Custos Financeiros</h3>
                      <div className={`grid ${vendasMaquininha.length > 0 ? 'grid-cols-4' : 'grid-cols-3'} gap-3 text-center`}>
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
                        {vendasMaquininha.length > 0 && (() => {
                          const te = calcularTaxaEfetiva();
                          return (
                            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg`}>
                              <p className={`text-xs ${themeClasses.textSecondary}`}>T4 Taxa Efetiva</p>
                              <p className={`text-lg font-bold ${parseFloat(te.mediaEfetiva) > 5 ? 'text-red-500' : 'text-green-500'}`}>{te.mediaEfetiva}%</p>
                              <p className={`text-xs ${themeClasses.textSecondary}`}>{te.diasMedio}d médio</p>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Anomalias */}
              {anomalias.length > 0 && (
                <div className={`${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} rounded-lg p-6 mb-8`}>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-yellow-300' : 'text-yellow-900'} mb-4`}>Anomalias ({anomalias.length})</h3>
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
                <div className={`${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'} rounded-lg p-6 mb-8`}>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-900'} mb-4`}>Recomendações</h3>
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
                        <p className={`text-xs ${darkMode ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-700'} p-2 rounded`}>🎯 {rec.acao}</p>
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

              <div className="flex justify-center">
                <button onClick={() => setStep(1)} className={`${darkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'} px-8 py-2 rounded-lg transition`}>
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
