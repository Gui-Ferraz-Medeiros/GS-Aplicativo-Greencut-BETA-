import { MapPin, AlertTriangle, CheckCircle, Clock, Wrench } from 'lucide-react';
import type { Sensor } from '../App';

interface DashboardProps {
  sensors: Sensor[];
  onSensorClick: (sensor: Sensor) => void;
}

const statusConfig = {
  critical: {
    color: '#DC2626',
    bgColor: '#FEE2E2',
    borderColor: '#DC2626',
    label: 'Crítico',
    icon: AlertTriangle
  },
  warning: {
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    borderColor: '#F59E0B',
    label: 'Atenção',
    icon: Clock
  },
  normal: {
    color: '#10B981',
    bgColor: '#D1FAE5',
    borderColor: '#10B981',
    label: 'Normal',
    icon: CheckCircle
  },
  maintenance: {
    color: '#6B7280',
    bgColor: '#F3F4F6',
    borderColor: '#6B7280',
    label: 'Manutenção',
    icon: Wrench
  }
};

export default function Dashboard({ sensors, onSensorClick }: DashboardProps) {
  const criticalCount = sensors.filter(s => s.status === 'critical').length;
  const warningCount = sensors.filter(s => s.status === 'warning').length;
  const normalCount = sensors.filter(s => s.status === 'normal').length;
  const maintenanceCount = sensors.filter(s => s.status === 'maintenance').length;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Stats Cards */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-red-50 border-2 border-red-600 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-900 font-medium">Crítico</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
        </div>

        <div className="bg-amber-50 border-2 border-amber-500 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-amber-600" />
            <span className="text-sm text-amber-900 font-medium">Atenção</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{warningCount}</p>
        </div>

        <div className="bg-green-50 border-2 border-green-600 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-900 font-medium">Normal</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{normalCount}</p>
        </div>

        <div className="bg-gray-50 border-2 border-gray-500 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-900 font-medium">Manutenção</span>
          </div>
          <p className="text-2xl font-bold text-gray-600">{maintenanceCount}</p>
        </div>
      </div>

      {/* Map Simulation */}
      <div className="flex-1 px-4 pb-4 overflow-hidden">
        <div className="bg-[#E5E3DF] rounded-xl h-full relative overflow-y-auto shadow-inner">
          {/* Rodovia - representação visual */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full max-w-2xl">
              {/* Pista Norte */}
              <div className="mb-8">
                <div className="text-center mb-2">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    Pista Norte
                  </span>
                </div>
                <div className="bg-[#4B5563] h-16 rounded-lg relative shadow-md">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-white/30"></div>
                  </div>
                  {sensors
                    .filter(s => s.side === 'Norte')
                    .map((sensor, index) => {
                      const config = statusConfig[sensor.status];
                      const Icon = config.icon;
                      const position = (index / sensors.filter(s => s.side === 'Norte').length) * 90 + 5;

                      return (
                        <button
                          key={sensor.id}
                          onClick={() => onSensorClick(sensor)}
                          className="absolute -bottom-8 transform -translate-x-1/2 transition-all hover:scale-110 active:scale-95"
                          style={{ left: `${position}%` }}
                        >
                          <div className="relative">
                            <MapPin
                              className="w-10 h-10 drop-shadow-lg"
                              style={{ color: config.color }}
                              fill={config.color}
                            />
                            <span className="absolute top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-white">
                              {sensor.height}
                            </span>
                          </div>
                          <div className="mt-1 bg-white px-2 py-0.5 rounded shadow-sm text-xs font-medium whitespace-nowrap">
                            KM {sensor.km}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Pista Sul */}
              <div className="mt-16">
                <div className="bg-[#4B5563] h-16 rounded-lg relative shadow-md">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-white/30"></div>
                  </div>
                  {sensors
                    .filter(s => s.side === 'Sul')
                    .map((sensor, index) => {
                      const config = statusConfig[sensor.status];
                      const Icon = config.icon;
                      const position = (index / sensors.filter(s => s.side === 'Sul').length) * 90 + 5;

                      return (
                        <button
                          key={sensor.id}
                          onClick={() => onSensorClick(sensor)}
                          className="absolute -top-8 transform -translate-x-1/2 transition-all hover:scale-110 active:scale-95"
                          style={{ left: `${position}%` }}
                        >
                          <div className="mb-1 bg-white px-2 py-0.5 rounded shadow-sm text-xs font-medium whitespace-nowrap">
                            KM {sensor.km}
                          </div>
                          <div className="relative">
                            <MapPin
                              className="w-10 h-10 drop-shadow-lg"
                              style={{ color: config.color }}
                              fill={config.color}
                            />
                            <span className="absolute top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-white">
                              {sensor.height}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                </div>
                <div className="text-center mt-2">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    Pista Sul
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 pb-4">
        <div className="bg-[#5b2c83] text-white rounded-xl p-4 shadow-lg">
          <p className="font-bold mb-3 text-sm">📊 Legenda de Status:</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
              <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-sm"></div>
              <span className="font-medium">≥ 30cm (Crítico)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
              <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-sm"></div>
              <span className="font-medium">20-29cm (Atenção)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
              <div className="w-4 h-4 rounded-full bg-green-600 border-2 border-white shadow-sm"></div>
              <span className="font-medium">&lt; 20cm (Normal)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
              <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-white shadow-sm"></div>
              <span className="font-medium">Manutenção</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
