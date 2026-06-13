import { ArrowLeft, Download, AlertTriangle, TrendingUp, MapPin } from 'lucide-react';
import type { Sensor } from '../App';
import type { Occurrence, Intervention } from '../../mocks/mockData';

interface ReportScreenProps {
  sensors: Sensor[];
  occurrences: Occurrence[];
  interventions: Intervention[];
  onBack: () => void;
  onSensorClick: (sensor: Sensor) => void;
}

export default function ReportScreen({ sensors, occurrences, interventions, onBack, onSensorClick }: ReportScreenProps) {
  // Ordenar sensores por prioridade (crítico > warning > normal > manutenção)
  const priorityOrder = { critical: 0, warning: 1, normal: 2, maintenance: 3 };
  const sortedSensors = [...sensors].sort((a, b) =>
    priorityOrder[a.status] - priorityOrder[b.status] || b.height - a.height
  );

  const criticalSensors = sortedSensors.filter(s => s.status === 'critical');
  const warningSensors = sortedSensors.filter(s => s.status === 'warning');
  const normalSensors = sortedSensors.filter(s => s.status === 'normal');

  const avgHeight = sensors.reduce((sum, s) => sum + s.height, 0) / sensors.length;
  const avgGrowthRate = sensors.reduce((sum, s) => sum + s.growthRate, 0) / sensors.length;

  return (
    <div className="h-full bg-background flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-[#5b2c83] text-white px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-3 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl mb-1">Relatório de Priorização</h2>
            <p className="text-sm opacity-90">Gerado em {new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <button className="bg-white text-[#5b2c83] px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Resumo Geral */}
        <div className="bg-white rounded-xl border-2 border-border p-4 shadow-sm">
          <h3 className="font-bold mb-3">Resumo Geral</h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Total de Sensores</p>
              <p className="text-2xl font-bold text-foreground">{sensors.length}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Altura Média</p>
              <p className="text-2xl font-bold text-foreground">{avgHeight.toFixed(1)}cm</p>
            </div>

            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
              <p className="text-xs text-red-800 mb-1">Trechos Críticos</p>
              <p className="text-2xl font-bold text-red-600">{criticalSensors.length}</p>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-xs text-amber-800 mb-1">Trechos em Atenção</p>
              <p className="text-2xl font-bold text-amber-600">{warningSensors.length}</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Crescimento médio:</span>
              <span className="font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                {avgGrowthRate.toFixed(1)} cm/semana
              </span>
            </div>
          </div>
        </div>

        {/* Trechos Críticos */}
        {criticalSensors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-red-900">Ação Imediata Necessária ({criticalSensors.length})</h3>
            </div>

            <div className="space-y-2">
              {criticalSensors.map((sensor) => (
                <button
                  key={sensor.id}
                  onClick={() => onSensorClick(sensor)}
                  className="w-full bg-red-50 border-2 border-red-600 rounded-xl p-3 hover:bg-red-100 transition-colors text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-red-900">{sensor.name}</h4>
                      <p className="text-sm text-red-800">KM {sensor.km} - Pista {sensor.side}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">{sensor.height}cm</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-red-800">
                    <span>🌱 {sensor.growthRate} cm/sem</span>
                    <span>📅 {Math.floor((new Date().getTime() - new Date(sensor.lastMowing).getTime()) / (1000 * 60 * 60 * 24))} dias</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trechos em Atenção */}
        {warningSensors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-900">Requer Atenção ({warningSensors.length})</h3>
            </div>

            <div className="space-y-2">
              {warningSensors.map((sensor) => (
                <button
                  key={sensor.id}
                  onClick={() => onSensorClick(sensor)}
                  className="w-full bg-amber-50 border-2 border-amber-500 rounded-xl p-3 hover:bg-amber-100 transition-colors text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-amber-900">{sensor.name}</h4>
                      <p className="text-sm text-amber-800">KM {sensor.km} - Pista {sensor.side}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-600">{sensor.height}cm</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-amber-800">
                    <span>🌱 {sensor.growthRate} cm/sem</span>
                    <span>📅 {Math.floor((new Date().getTime() - new Date(sensor.lastMowing).getTime()) / (1000 * 60 * 60 * 24))} dias</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trechos Normais (resumido) */}
        {normalSensors.length > 0 && (
          <div>
            <h3 className="font-bold text-green-900 mb-2">Trechos Normais ({normalSensors.length})</h3>

            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-sm text-green-800">
                {normalSensors.length} trecho{normalSensors.length > 1 ? 's' : ''} com vegetação em altura adequada (&lt; 20cm).
                Nenhuma ação imediata necessária.
              </p>

              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-xs font-medium text-green-900 mb-2">Trechos:</p>
                <div className="flex flex-wrap gap-2">
                  {normalSensors.map((sensor) => (
                    <button
                      key={sensor.id}
                      onClick={() => onSensorClick(sensor)}
                      className="px-2 py-1 bg-white border border-green-300 rounded text-xs hover:bg-green-100 transition-colors"
                    >
                      KM {sensor.km} ({sensor.height}cm)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ocorrências Relevantes */}
        <div className="bg-white rounded-xl border-2 border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg">Ocorrências Registradas</h3>
              <p className="text-sm text-muted-foreground">Dados mockados para simular o histórico de problemas e alertas.</p>
            </div>
            <span className="text-xs text-muted-foreground">{occurrences.length} itens</span>
          </div>

          {occurrences.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma ocorrência registrada no momento.</p>
          ) : (
            <div className="space-y-3">
              {occurrences.map((item) => (
                <div key={item.id} className="rounded-xl border border-border p-3 bg-gray-50">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.category.toUpperCase()} • KM {item.km}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                      item.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      item.severity === 'warning' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.severity === 'critical' ? 'Crítico' : item.severity === 'warning' ? 'Atenção' : 'Info'}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Status: {item.status.replace('-', ' ')}</span>
                    <span>Reportado em {new Date(item.reportedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Intervenções Planejadas */}
        <div className="bg-white rounded-xl border-2 border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg">Intervenções de Campo</h3>
              <p className="text-sm text-muted-foreground">Simulação de equipe, ação e status de execução.</p>
            </div>
            <span className="text-xs text-muted-foreground">{interventions.length} registros</span>
          </div>

          {interventions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma intervenção planejada.</p>
          ) : (
            <div className="space-y-3">
              {interventions.map((item) => (
                <div key={item.id} className="rounded-xl border border-border p-3 bg-gray-50">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <p className="font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground">KM {item.km} • Time: {item.team}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                      item.status === 'completed' ? 'bg-green-100 text-green-700' :
                      item.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status === 'completed' ? 'Concluído' : item.status === 'scheduled' ? 'Agendado' : 'Pendente'}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 mb-2">{item.result}</p>
                  {(item.beforeHeight !== undefined || item.afterHeight !== undefined) && (
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div className="rounded-lg bg-gray-100 p-3 border border-gray-200">
                        <span className="block font-medium text-slate-700 mb-1">Altura antes</span>
                        <span className="text-sm font-semibold text-slate-900">
                          {item.beforeHeight !== undefined ? `${item.beforeHeight}cm` : '—'}
                        </span>
                      </div>
                      <div className="rounded-lg bg-gray-100 p-3 border border-gray-200">
                        <span className="block font-medium text-slate-700 mb-1">Altura após</span>
                        <span className="text-sm font-semibold text-slate-900">
                          {item.afterHeight !== undefined ? `${item.afterHeight}cm` : 'Aguardando preenchimento'}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">Data: {new Date(item.date).toLocaleDateString('pt-BR')}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recomendações */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-bold text-blue-900 mb-2">Recomendações</h3>

          <ul className="space-y-2 text-sm text-blue-800">
            {criticalSensors.length > 0 && (
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Priorize o envio de equipes para os {criticalSensors.length} trecho{criticalSensors.length > 1 ? 's' : ''} crítico{criticalSensors.length > 1 ? 's' : ''} imediatamente.</span>
              </li>
            )}

            {warningSensors.length > 0 && (
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Planeje roçada para os {warningSensors.length} trecho{warningSensors.length > 1 ? 's' : ''} em atenção nos próximos 3-5 dias.</span>
              </li>
            )}

            <li className="flex items-start gap-2">
              <span className="flex-shrink-0">•</span>
              <span>Taxa média de crescimento: {avgGrowthRate.toFixed(1)}cm/semana - considere esta informação ao planejar o cronograma de manutenção.</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="flex-shrink-0">•</span>
              <span>Otimize rotas de equipe agrupando trechos próximos geograficamente para reduzir custos de deslocamento.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
