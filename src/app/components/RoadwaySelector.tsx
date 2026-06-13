import { MapPin, ChevronRight, AlertTriangle, TrendingUp } from 'lucide-react';

export interface Highway {
  id: string;
  name: string;
  region: string;
  roads: string;
  avgHeight: number; // média de altura da vegetação
  criticalCount: number;
  warningCount: number;
  totalSensors: number;
  position: { top: string; left: string }; // posição no mapa
}

interface RoadwaySelectorProps {
  highways: Highway[];
  onSelectHighway: (highway: Highway) => void;
}

export default function RoadwaySelector({ highways, onSelectHighway }: RoadwaySelectorProps) {
  const getStatusColor = (avgHeight: number) => {
    if (avgHeight >= 30) return { color: '#DC2626', label: 'Crítico' };
    if (avgHeight >= 20) return { color: '#F59E0B', label: 'Atenção' };
    return { color: '#10B981', label: 'Normal' };
  };

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[#5b2c83] text-white px-4 py-4">
        <h1 className="font-bold text-xl mb-1">Selecione a Rodovia</h1>
        <p className="text-sm opacity-90">Região Sudeste - Concessionárias Motiva</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Map Visual */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 min-h-[300px] relative">
          <div className="text-center mb-4">
            <h2 className="font-bold text-lg text-[#5b2c83]">🗺️ Mapa de Situação - Sudeste</h2>
            <p className="text-xs text-muted-foreground">Clique em uma rodovia ou veja a lista abaixo</p>
          </div>

          {/* Simplified Map Container */}
          <div className="relative w-full max-w-md mx-auto h-[250px] bg-white/50 rounded-xl border-2 border-[#5b2c83]/20 overflow-hidden">
            {/* Map markers */}
            {highways.map((highway) => {
              const status = getStatusColor(highway.avgHeight);
              return (
                <button
                  key={highway.id}
                  onClick={() => onSelectHighway(highway)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    top: highway.position.top,
                    left: highway.position.left
                  }}
                >
                  <div className="relative">
                    {/* Pulse animation for critical */}
                    {highway.criticalCount > 0 && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-75"
                        style={{ backgroundColor: status.color }}
                      ></div>
                    )}

                    {/* Marker */}
                    <div
                      className="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center relative z-10 group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: status.color }}
                    >
                      <span className="text-white text-xs font-bold">
                        {highway.criticalCount > 0 ? highway.criticalCount : '✓'}
                      </span>
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      <div className="bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                        {highway.name}
                        <div className="text-[10px] opacity-75">Altura média: {highway.avgHeight}cm</div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Estado labels */}
            <div className="absolute top-2 left-2 text-xs font-bold text-gray-400">SP</div>
            <div className="absolute top-2 right-2 text-xs font-bold text-gray-400">RJ</div>
            <div className="absolute bottom-2 left-2 text-xs font-bold text-gray-400">MG</div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span>≥30cm</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>20-29cm</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span>&lt;20cm</span>
            </div>
          </div>
        </div>

        {/* Highway List */}
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-sm text-muted-foreground mb-2">TODAS AS RODOVIAS</h3>

          {highways
            .sort((a, b) => b.avgHeight - a.avgHeight) // ordenar por criticidade
            .map((highway) => {
              const status = getStatusColor(highway.avgHeight);

              return (
                <button
                  key={highway.id}
                  onClick={() => onSelectHighway(highway)}
                  className="w-full bg-white border-2 border-border rounded-xl p-4 hover:border-[#5b2c83] transition-all text-left shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{highway.name}</h3>
                        <div
                          className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: status.color }}
                        ></div>
                      </div>

                      <p className="text-xs text-muted-foreground mb-2">{highway.roads}</p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span>Média: <span className="font-bold">{highway.avgHeight}cm</span></span>
                        </div>

                        {highway.criticalCount > 0 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-bold">{highway.criticalCount}</span>
                          </div>
                        )}

                        <span className="text-muted-foreground text-xs">
                          {highway.totalSensors} sensores
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-[#5b2c83] flex-shrink-0" />
                  </div>

                  {/* Status bar */}
                  <div className="mt-3 flex gap-1 h-1.5 rounded-full overflow-hidden bg-gray-100">
                    <div
                      className="bg-green-600"
                      style={{
                        width: `${((highway.totalSensors - highway.criticalCount - highway.warningCount) / highway.totalSensors) * 100}%`
                      }}
                    ></div>
                    <div
                      className="bg-amber-500"
                      style={{
                        width: `${(highway.warningCount / highway.totalSensors) * 100}%`
                      }}
                    ></div>
                    <div
                      className="bg-red-600"
                      style={{
                        width: `${(highway.criticalCount / highway.totalSensors) * 100}%`
                      }}
                    ></div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
