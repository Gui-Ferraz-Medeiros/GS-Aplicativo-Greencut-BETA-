import { MapPin, Clock, User, ChevronRight } from 'lucide-react';
import type { Sensor } from '../App';

interface OperatorDashboardProps {
  sensors: Sensor[];
  operatorName: string;
  onWorkClick: (sensor: Sensor) => void;
}

export default function OperatorDashboard({ sensors, operatorName, onWorkClick }: OperatorDashboardProps) {
  // Filtrar apenas sensores em manutenção (trabalhos designados)
  const assignedWork = sensors.filter(s => s.status === 'maintenance');
  const pendingWork = assignedWork.filter(
    (s) => !s.assignedTo || s.assignedTo === operatorName || s.assignedTo === 'Operador de Campo'
  );

  return (
    <div className="h-full bg-background flex flex-col overflow-y-auto">
      {/* Header Info */}
      <div className="bg-[#5b2c83] text-white p-4">
        <h2 className="font-bold text-xl mb-1">Trabalhos Designados</h2>
        <p className="text-sm opacity-90">Operador: {operatorName}</p>
      </div>

      {/* Work List */}
      <div className="flex-1 p-4 space-y-3">
        {pendingWork.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-bold text-lg mb-2">Nenhum trabalho pendente</h3>
            <p className="text-sm text-muted-foreground">
              Aguardando designação de trabalho pelo gestor
            </p>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-900">
                <span className="font-bold">{pendingWork.length}</span> trabalho{pendingWork.length > 1 ? 's' : ''} aguardando execução
              </p>
            </div>

            {pendingWork.map((sensor) => (
              <button
                key={sensor.id}
                onClick={() => onWorkClick(sensor)}
                className="w-full bg-white border-2 border-[#5b2c83] rounded-xl p-4 hover:bg-[#5b2c83]/5 transition-colors text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-[#5b2c83]">{sensor.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>KM {sensor.km} - Pista {sensor.side}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#5b2c83]" />
                </div>

                <div className="flex items-center gap-2 text-sm mb-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">
                    Solicitado por: <span className="font-medium">{sensor.requestedBy || 'Mário Silva'}</span>
                  </span>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-sm">
                  <p className="text-amber-900">
                    <span className="font-medium">Altura detectada:</span> {sensor.height}cm
                  </p>
                </div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
