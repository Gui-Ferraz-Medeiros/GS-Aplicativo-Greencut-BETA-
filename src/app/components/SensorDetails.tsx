import { ArrowLeft, MapPin, Calendar, TrendingUp, Settings, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import type { Sensor, SensorStatus } from '../App';

interface SensorDetailsProps {
  sensor: Sensor;
  onBack: () => void;
  onUpdateStatus: (sensorId: string, newStatus: SensorStatus) => void;
}

export default function SensorDetails({ sensor, onBack, onUpdateStatus }: SensorDetailsProps) {
  const statusColors = {
    critical: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-600' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-500' },
    normal: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-600' },
    maintenance: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-500' }
  };

  const colors = statusColors[sensor.status];

  // Calcular previsão de próxima roçada necessária
  const daysUntilCritical = Math.ceil((30 - sensor.height) / (sensor.growthRate / 7));
  const nextMowingDate = new Date();
  nextMowingDate.setDate(nextMowingDate.getDate() + daysUntilCritical);

  const daysSinceLastMowing = Math.floor(
    (new Date().getTime() - new Date(sensor.lastMowing).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="h-full bg-background flex flex-col overflow-y-auto">
      {/* Header */}
      <div className={`${colors.bg} ${colors.text} px-4 py-4 border-b-4 ${colors.border}`}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-3 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar</span>
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-xl mb-1">{sensor.name}</h2>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <MapPin className="w-4 h-4" />
              <span>KM {sensor.km} - Pista {sensor.side}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-4xl font-bold">{sensor.height}cm</div>
            <div className="text-sm opacity-90">Altura atual</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Status Card */}
        <div className="bg-white rounded-xl border-2 border-border p-4 shadow-sm">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Informações do Sensor
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status atual:</span>
              <span className={`px-3 py-1 rounded-full font-medium text-sm ${colors.bg} ${colors.text} border ${colors.border}`}>
                {sensor.status === 'critical' && 'Crítico'}
                {sensor.status === 'warning' && 'Atenção'}
                {sensor.status === 'normal' && 'Normal'}
                {sensor.status === 'maintenance' && 'Manutenção'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Taxa de crescimento:</span>
              <span className="font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                {sensor.growthRate} cm/semana
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Coordenadas:</span>
              <span className="font-medium text-sm font-mono">
                {sensor.lat.toFixed(4)}, {sensor.lng.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Histórico */}
        <div className="bg-white rounded-xl border-2 border-border p-4 shadow-sm">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Histórico de Manutenção
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Última roçada:</span>
              <span className="font-medium">
                {new Date(sensor.lastMowing).toLocaleDateString('pt-BR')}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Dias desde última roçada:</span>
              <span className="font-medium">{daysSinceLastMowing} dias</span>
            </div>

            {sensor.status !== 'maintenance' && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Previsão próxima roçada:</span>
                <span className="font-medium">
                  {daysUntilCritical > 0
                    ? `${daysUntilCritical} dias (${nextMowingDate.toLocaleDateString('pt-BR')})`
                    : 'Imediata'
                  }
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Análise */}
        {sensor.status === 'critical' && (
          <div className="bg-red-50 border-2 border-red-600 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-900 mb-1">Ação Imediata Necessária</h4>
                <p className="text-sm text-red-800">
                  A altura da vegetação excedeu 30cm. Recomenda-se designar equipe de roçada para este trecho o mais breve possível para manter a segurança e visibilidade da rodovia.
                </p>
              </div>
            </div>
          </div>
        )}

        {sensor.status === 'warning' && (
          <div className="bg-amber-50 border-2 border-amber-500 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Atenção Requerida</h4>
                <p className="text-sm text-amber-800">
                  A vegetação está entre 20-29cm. Recomenda-se planejar roçada nos próximos dias para evitar que atinja nível crítico.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <h3 className="font-medium mb-2">Ações Disponíveis</h3>

          <button
            onClick={() => onUpdateStatus(sensor.id, 'maintenance')}
            disabled={sensor.status === 'maintenance'}
            className="w-full bg-[#5b2c83] hover:bg-[#4a2269] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            Designar Equipe para Roçada
          </button>

          {sensor.status === 'maintenance' && (
            <button
              onClick={() => onUpdateStatus(sensor.id, 'normal')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Marcar como Concluída
            </button>
          )}

          <button
            onClick={() => {
              const googleMapsUrl = `https://www.google.com/maps?q=${sensor.lat},${sensor.lng}`;
              window.open(googleMapsUrl, '_blank');
            }}
            className="w-full border-2 border-[#5b2c83] bg-white hover:bg-[#5b2c83] hover:text-white text-[#5b2c83] py-3 rounded-lg font-medium transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            Ver no Mapa Externo
          </button>
        </div>

        {/* Info adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900">
          <p className="font-medium mb-1">💡 Dica</p>
          <p className="text-xs">
            Os dados são atualizados em tempo real via sensores ESP32 instalados ao longo da rodovia.
            Considere as condições climáticas ao planejar a manutenção.
          </p>
        </div>
      </div>
    </div>
  );
}
