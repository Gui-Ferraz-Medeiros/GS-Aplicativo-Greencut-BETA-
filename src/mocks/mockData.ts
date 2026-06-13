import type { Highway, Sensor, Notification } from '../app/App';

export interface Occurrence {
  id: string;
  highwayId: string;
  km: number;
  category: 'vegetation' | 'inspection' | 'equipment';
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  status: 'open' | 'in-progress' | 'closed';
  reportedAt: string;
}

export interface Intervention {
  id: string;
  sensorId?: string;
  highwayId: string;
  km: number;
  date: string;
  team: string;
  action: string;
  result: string;
  status: 'completed' | 'scheduled' | 'pending';
  beforeHeight?: number;
  afterHeight?: number;
}

export const highways: Highway[] = [
  {
    id: 'autoban',
    name: 'Autoban',
    region: 'SP',
    roads: 'SP-330, SP-348, SP-300, SPI-102/330',
    avgHeight: 24,
    criticalCount: 2,
    warningCount: 3,
    totalSensors: 12,
    position: { top: '45%', left: '35%' }
  },
  {
    id: 'riosp',
    name: 'RioSP',
    region: 'SP/RJ',
    roads: 'BR-116, BR-101',
    avgHeight: 28,
    criticalCount: 3,
    warningCount: 2,
    totalSensors: 10,
    position: { top: '55%', left: '65%' }
  },
  {
    id: 'rodoanel',
    name: 'RodoAnel',
    region: 'SP',
    roads: 'SP-021',
    avgHeight: 18,
    criticalCount: 0,
    warningCount: 1,
    totalSensors: 8,
    position: { top: '50%', left: '40%' }
  },
  {
    id: 'sorocabana',
    name: 'Motiva Sorocabana',
    region: 'SP',
    roads: 'SP-270, SP-280, SP-075, SP-160/250, SP-103/079',
    avgHeight: 22,
    criticalCount: 1,
    warningCount: 2,
    totalSensors: 15,
    position: { top: '60%', left: '30%' }
  },
  {
    id: 'spvias',
    name: 'SPVias',
    region: 'SP',
    roads: 'SP-280, SP-270, SP-255, SP-258, SP-127',
    avgHeight: 19,
    criticalCount: 1,
    warningCount: 1,
    totalSensors: 11,
    position: { top: '40%', left: '45%' }
  },
  {
    id: 'vialagos',
    name: 'ViaLagos',
    region: 'RJ',
    roads: 'RJ-124',
    avgHeight: 16,
    criticalCount: 0,
    warningCount: 0,
    totalSensors: 6,
    position: { top: '45%', left: '75%' }
  },
  {
    id: 'renovias',
    name: 'Renovias',
    region: 'SP',
    roads: 'SP-340, SP-215, SP-342, SP-344, SP-350',
    avgHeight: 21,
    criticalCount: 1,
    warningCount: 3,
    totalSensors: 14,
    position: { top: '35%', left: '50%' }
  },
  {
    id: 'viario',
    name: 'ViaRio',
    region: 'RJ',
    roads: 'RJ-106, RJ-124, RJ-142',
    avgHeight: 17,
    criticalCount: 0,
    warningCount: 1,
    totalSensors: 7,
    position: { top: '60%', left: '70%' }
  },
  {
    id: 'minas-sp',
    name: 'Motiva Minas_SP',
    region: 'SP/MG',
    roads: 'BR-381',
    avgHeight: 26,
    criticalCount: 2,
    warningCount: 2,
    totalSensors: 9,
    position: { top: '30%', left: '25%' }
  }
];

export const sensorsByHighway: Record<string, Sensor[]> = {
  autoban: [
    {
      id: 's1',
      name: 'Sensor KM 45',
      km: 45.2,
      side: 'Norte',
      height: 32,
      lastMowing: '2026-04-25',
      status: 'critical',
      lat: -22.1149,
      lng: -47.3201,
      growthRate: 2.5,
      requestedBy: 'Mário Silva'
    },
    {
      id: 's2',
      name: 'Sensor KM 47',
      km: 47.8,
      side: 'Sul',
      height: 18,
      lastMowing: '2026-05-01',
      status: 'normal',
      lat: -22.1165,
      lng: -47.3302,
      growthRate: 2.0
    },
    {
      id: 's3',
      name: 'Sensor KM 52',
      km: 52.1,
      side: 'Norte',
      height: 25,
      lastMowing: '2026-04-28',
      status: 'warning',
      lat: -22.1223,
      lng: -47.3421,
      growthRate: 2.2
    },
    {
      id: 's4',
      name: 'Sensor KM 58',
      km: 58.5,
      side: 'Sul',
      height: 15,
      lastMowing: '2026-05-05',
      status: 'normal',
      lat: -22.1301,
      lng: -47.3527,
      growthRate: 1.8
    },
    {
      id: 's5',
      name: 'Sensor KM 63',
      km: 63.0,
      side: 'Norte',
      height: 0,
      lastMowing: '2026-05-09',
      status: 'maintenance',
      lat: -22.1388,
      lng: -47.3609,
      growthRate: 2.3,
      requestedBy: 'Mário Silva'
    },
    {
      id: 's6',
      name: 'Sensor KM 70',
      km: 70.3,
      side: 'Sul',
      height: 28,
      lastMowing: '2026-04-27',
      status: 'warning',
      lat: -22.1456,
      lng: -47.3705,
      growthRate: 2.4
    }
  ],
  riosp: [
    {
      id: 's7',
      name: 'Sensor KM 110',
      km: 110.4,
      side: 'Norte',
      height: 31,
      lastMowing: '2026-04-22',
      status: 'critical',
      lat: -23.1234,
      lng: -44.9876,
      growthRate: 2.7
    },
    {
      id: 's8',
      name: 'Sensor KM 118',
      km: 118.7,
      side: 'Sul',
      height: 26,
      lastMowing: '2026-04-30',
      status: 'warning',
      lat: -23.1305,
      lng: -44.9954,
      growthRate: 2.3
    },
    {
      id: 's9',
      name: 'Sensor KM 125',
      km: 125.2,
      side: 'Norte',
      height: 29,
      lastMowing: '2026-05-02',
      status: 'warning',
      lat: -23.1378,
      lng: -45.0041,
      growthRate: 2.6
    },
    {
      id: 's10',
      name: 'Sensor KM 133',
      km: 133.3,
      side: 'Sul',
      height: 17,
      lastMowing: '2026-05-05',
      status: 'normal',
      lat: -23.1450,
      lng: -45.0129,
      growthRate: 1.9
    }
  ],
  sorocabana: [
    {
      id: 's11',
      name: 'Sensor KM 240',
      km: 240.1,
      side: 'Norte',
      height: 21,
      lastMowing: '2026-04-29',
      status: 'warning',
      lat: -23.5400,
      lng: -49.1800,
      growthRate: 2.1
    },
    {
      id: 's12',
      name: 'Sensor KM 257',
      km: 257.7,
      side: 'Sul',
      height: 33,
      lastMowing: '2026-04-24',
      status: 'critical',
      lat: -23.5500,
      lng: -49.2000,
      growthRate: 2.8,
      requestedBy: 'Carlos Mendes'
    },
    {
      id: 's13',
      name: 'Sensor KM 271',
      km: 271.2,
      side: 'Norte',
      height: 19,
      lastMowing: '2026-05-04',
      status: 'normal',
      lat: -23.5600,
      lng: -49.2150,
      growthRate: 1.7
    },
    {
      id: 's14',
      name: 'Sensor KM 282',
      km: 282.0,
      side: 'Sul',
      height: 24,
      lastMowing: '2026-04-27',
      status: 'warning',
      lat: -23.5700,
      lng: -49.2300,
      growthRate: 2.2
    }
  ],
  'minas-sp': [
    {
      id: 's15',
      name: 'Sensor KM 382',
      km: 382.6,
      side: 'Norte',
      height: 30,
      lastMowing: '2026-04-20',
      status: 'critical',
      lat: -19.6000,
      lng: -43.9500,
      growthRate: 3.0
    },
    {
      id: 's16',
      name: 'Sensor KM 398',
      km: 398.2,
      side: 'Sul',
      height: 27,
      lastMowing: '2026-04-29',
      status: 'warning',
      lat: -19.6100,
      lng: -43.9600,
      growthRate: 2.5
    },
    {
      id: 's17',
      name: 'Sensor KM 405',
      km: 405.4,
      side: 'Norte',
      height: 23,
      lastMowing: '2026-05-01',
      status: 'warning',
      lat: -19.6200,
      lng: -43.9700,
      growthRate: 2.1
    },
    {
      id: 's18',
      name: 'Sensor KM 418',
      km: 418.8,
      side: 'Sul',
      height: 16,
      lastMowing: '2026-05-06',
      status: 'normal',
      lat: -19.6300,
      lng: -43.9800,
      growthRate: 1.8
    }
  ]
};

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    sensorId: 's1',
    sensorName: 'Sensor KM 45',
    message: 'Altura crítica atingida: 32cm no trecho Autoban.',
    timestamp: '2026-05-10T08:30:00',
    read: false,
    type: 'critical'
  },
  {
    id: 'n2',
    sensorId: 's12',
    sensorName: 'Sensor KM 257',
    message: 'Trecho Sorocabana em atenção: 33cm detectados.',
    timestamp: '2026-05-10T07:15:00',
    read: false,
    type: 'warning'
  },
  {
    id: 'n3',
    sensorId: 's10',
    sensorName: 'Sensor KM 133',
    message: 'Sensor em crescimento acelerado: planejamento recomendado.',
    timestamp: '2026-05-09T16:45:00',
    read: true,
    type: 'warning'
  }
];

export const mockOccurrences: Occurrence[] = [
  {
    id: 'o1',
    highwayId: 'sorocabana',
    km: 257,
    category: 'vegetation',
    title: 'Vegetação acima do limite de segurança',
    description: 'Trecho apresenta mata com mais de 30cm, reduzindo visibilidade lateral.',
    severity: 'critical',
    status: 'open',
    reportedAt: '2026-05-10T08:00:00'
  },
  {
    id: 'o2',
    highwayId: 'autoban',
    km: 45,
    category: 'inspection',
    title: 'Inspeção de rotina agendada',
    description: 'Equipe de campo programada para verificar condições do trecho.',
    severity: 'info',
    status: 'in-progress',
    reportedAt: '2026-05-09T09:30:00'
  },
  {
    id: 'o3',
    highwayId: 'minas-sp',
    km: 382,
    category: 'equipment',
    title: 'Roçadeira com manutenção pendente',
    description: 'Equipamento solicitado para roçada no trecho de BR-381.',
    severity: 'warning',
    status: 'pending',
    reportedAt: '2026-05-08T14:15:00'
  },
  {
    id: 'o4',
    highwayId: 'riosp',
    km: 118,
    category: 'vegetation',
    title: 'Atenção no canteiro devido ao crescimento',
    description: 'Sensores indicam vegetação entre 25 e 28cm.',
    severity: 'warning',
    status: 'open',
    reportedAt: '2026-05-09T11:40:00'
  }
];

export const mockInterventions: Intervention[] = [
  {
    id: 'i1',
    sensorId: 's1',
    highwayId: 'autoban',
    km: 45,
    date: '2026-05-11',
    team: 'Equipe Norte 1',
    action: 'Roçada preventiva no trecho de mata lateral',
    result: 'Programada para 11/05',
    status: 'scheduled',
    beforeHeight: 32
  },
  {
    id: 'i2',
    sensorId: 's12',
    highwayId: 'sorocabana',
    km: 257,
    date: '2026-05-09',
    team: 'Equipe Sul 2',
    action: 'Roçada emergencial após alerta crítico',
    result: 'Concluída com sucesso',
    status: 'completed',
    beforeHeight: 33,
    afterHeight: 9
  },
  {
    id: 'i3',
    sensorId: 's15',
    highwayId: 'minas-sp',
    km: 382,
    date: '2026-05-12',
    team: 'Equipe Central',
    action: 'Verificação de máquina e logística de deslocamento',
    result: 'Aguardando liberação',
    status: 'pending'
  }
];
