import { Alert, Audit, FinancialMetric, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Creator',
  avatarUrl: 'https://picsum.photos/100/100',
  role: 'creator',
  tier: 'pro'
};

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    type: 'violation',
    severity: 'critical',
    title: '2 Vídeos com Risco de Remoção',
    description: 'Detectadas palavras-chave proibidas em "Viral Dance Challenge" e "Review de Produto X".',
    actionLabel: 'Corrigir Agora'
  },
  {
    id: 'a2',
    type: 'policy_change',
    severity: 'medium',
    title: 'Nova Política: Alegações de Saúde',
    description: 'Diretrizes atualizadas sobre alegações de suplementos válidas imediatamente.',
    actionLabel: 'Ler Mais'
  }
];

export const FINANCIAL_METRICS: FinancialMetric[] = [
  {
    label: 'GMV (30 Dias)',
    value: 'R$ 12.450,00',
    trend: { value: 12.5, direction: 'up' },
    type: 'currency'
  },
  {
    label: 'Comissões',
    value: 'R$ 1.340,20',
    trend: { value: 8.1, direction: 'up' },
    type: 'currency'
  },
  {
    label: 'Taxa de Conversão',
    value: '4.2%',
    trend: { value: 1.5, direction: 'down' },
    type: 'percent'
  }
];

export const RECENT_AUDITS: Audit[] = [
  {
    id: 'audit-1',
    title: 'Review Coleção de Verão',
    contentType: 'video',
    healthScore: 45,
    riskLevel: 'critical',
    violations: [
      { id: 'v1', guidelineRef: 'Bens Regulamentados', severity: 'critical', description: 'Exibição de substância restrita.' },
      { id: 'v2', guidelineRef: 'Copyright de Música', severity: 'high', description: 'Trilha de fundo sem licença.' }
    ],
    createdAt: '2023-10-27T10:00:00Z',
    thumbnailUrl: 'https://picsum.photos/id/10/300/200'
  },
  {
    id: 'audit-2',
    title: 'Roteiro de Skincare',
    contentType: 'script',
    healthScore: 72,
    riskLevel: 'warning',
    violations: [
      { id: 'v3', guidelineRef: 'Alegações Enganosas', severity: 'medium', description: 'Promessa de resultados exagerados.' }
    ],
    createdAt: '2023-10-26T14:30:00Z'
  },
  {
    id: 'audit-3',
    title: 'Anúncio de Flash Sale',
    contentType: 'video',
    healthScore: 95,
    riskLevel: 'safe',
    violations: [],
    createdAt: '2023-10-25T09:15:00Z',
    thumbnailUrl: 'https://picsum.photos/id/20/300/200'
  },
  {
    id: 'audit-4',
    title: 'Unboxing de Gadget',
    contentType: 'video',
    healthScore: 88,
    riskLevel: 'safe',
    violations: [
      { id: 'v4', guidelineRef: 'Segurança', severity: 'low', description: 'Equipamento de proteção faltando.' }
    ],
    createdAt: '2023-10-24T16:45:00Z',
    thumbnailUrl: 'https://picsum.photos/id/30/300/200'
  }
];
