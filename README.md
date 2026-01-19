# Diagnóstico Financeiro - MVP

Sistema web para análise financeira de empresas baseado exclusivamente em extratos bancários.

## 🚀 Como Usar

### Opção 1: Abrir Diretamente (RECOMENDADO)
1. Navegue até a pasta `diagnostico-financeiro`
2. Dê um duplo clique no arquivo `index.html`
3. O sistema abrirá no seu navegador padrão
4. Pronto para usar!

### Opção 2: Usar um Servidor Local
Se preferir usar um servidor local:
```bash
cd diagnostico-financeiro
python -m http.server 8000
```
Depois acesse: `http://localhost:8000`

## 📋 Passo a Passo de Uso

### 1. Preparar o Extrato Bancário
Crie um arquivo Excel (.xlsx) com estas colunas:
- **Data**: Data da movimentação
- **Descrição**: Descrição da transação
- **Valor**: Valor (positivo para entradas, negativo para saídas)

Exemplo:
```
Data       | Descrição           | Valor
01/11/2023 | Venda Cliente X     | 5000
02/11/2023 | Aluguel            | -3000
03/11/2023 | Salários           | -8000
```

### 2. Upload do Arquivo
- Clique no botão de upload
- Selecione seu arquivo Excel
- O sistema processará automaticamente

### 3. Classificar Movimentações
Classifique cada **SAÍDA** em uma das 4 categorias:

- **OPERAÇÃO**: Despesas para a empresa funcionar
  - Aluguel, funcionários, fornecedores, internet, sistemas
  
- **PRÓ-LABORE**: Dinheiro que foi para o dono/família
  - PIX, transferências, saques para sócios
  
- **IMPOSTOS**: Pagamentos ao governo
  - DAS, ISS, ICMS, INSS
  
- **DÍVIDAS**: Empréstimos e financiamentos
  - Parcelas de empréstimos, cartão parcelado

### 4. Calcular Pulmão Financeiro
Informe:
- **Custo Fixo Mensal**: Despesas que acontecem TODO MÊS
- **Caixa Disponível**: Saldo atual menos dívidas vencidas

### 5. Baixar Relatório
O sistema gera uma planilha Excel com 6 abas:
1. MOVIMENTAÇÕES - Dados originais do extrato
2. CLASSIFICAÇÃO - Movimentações classificadas
3. RESUMO CAIXA - Análise de entradas e saídas
4. PULMÃO FINANCEIRO - Cálculo de sobrevivência
5. ANOMALIAS - Problemas detectados
6. PLANO DE AÇÃO - Para preenchimento manual

## 🎯 Interpretação dos Resultados

### Pulmão Financeiro
- **< 1 mês**: 🔴 CRÍTICO - Risco imediato
- **1-3 meses**: 🟡 ESTÁVEL - Ainda é risco
- **> 3 meses**: 🟢 SAUDÁVEL - Situação confortável

### Resultado do Caixa
- **Positivo**: Empresa está sobrando dinheiro ✅
- **Zero**: Empresa está empatando ⚖️
- **Negativo**: Empresa está queimando caixa ❌

## ⚠️ Regras Importantes

1. **Apenas Extrato Bancário**
   - Não use balanço, DRE ou relatório do contador
   - Se não passou pelo banco, não existe

2. **4 Categorias Apenas**
   - Não crie categorias novas
   - Use SOMENTE as 4 categorias fornecidas

3. **Custo Fixo Mensal**
   - Apenas despesas RECORRENTES todo mês
   - Não inclua compras pontuais ou equipamentos

## 🔧 Arquivos do Sistema

```
diagnostico-financeiro/
├── index.html    → Página principal
├── app.js        → Lógica do sistema
└── README.md     → Este arquivo
```

## 📦 Tecnologias Utilizadas

- React 18
- Tailwind CSS
- SheetJS (xlsx) para Excel
- 100% client-side (dados não saem do seu computador)

## 🔒 Segurança

- **Todos os dados permanecem no seu computador**
- Nada é enviado para servidores externos
- Processamento 100% local no navegador

## 💡 Dicas

1. **Classificação Manual**: Em caso de dúvida, pergunte ao dono da empresa
2. **Pró-labore**: Qualquer transferência para sócio, mesmo com nome diferente
3. **Impostos Atrasados**: Múltiplos pagamentos indicam possível atraso
4. **Dívidas**: Identifique todas para calcular o pulmão corretamente

## ❓ Suporte

Em caso de dúvidas sobre como usar o sistema, consulte o Manual Operacional incluído na pasta CLAUDE.

---

**Versão**: 1.0  
**Última Atualização**: Janeiro 2026
