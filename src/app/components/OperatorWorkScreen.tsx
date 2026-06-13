import { useState } from 'react';
import { ArrowLeft, MapPin, User, CheckCircle, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { Sensor } from '../App';

interface OperatorWorkScreenProps {
  sensor: Sensor;
  onBack: () => void;
  onComplete: (data: WorkCompletionData) => void;
}

export interface WorkCompletionData {
  sensorId: string;
  heightBefore: number;
  heightAfter: number;
  comments: string;
  fieldData: { [key: string]: string };
}

const roadLocations = [
  'CANT. DISPOSITIVO EXT',
  'CANT. MARGINAL EXTERNA',
  'MARGINAL EXTERNA',
  'CANT. LATERAL EXTERNA',
  'PISTA EXTERNA',
  'CANT. CENTRAL EXTERNA',
  'CANT. CENTRAL INTERNA',
  'PISTA INTERNA',
  'CANT. LATERAL INTERNA',
  'MARGINAL INTERNA',
  'CANT. MARGINAL INTERNA',
  'CANT. DISPOSITIVO INT'
];

export default function OperatorWorkScreen({ sensor, onBack, onComplete }: OperatorWorkScreenProps) {
  const [heightBefore, setHeightBefore] = useState('');
  const [heightAfter, setHeightAfter] = useState('');
  const [comments, setComments] = useState('');
  const [fieldData, setFieldData] = useState<{ [key: string]: string }>({});

  const handleCellChange = (location: string, value: string) => {
    if (value === '' || value === '1' || value === '2' || value === '3' || value === 'X') {
      setFieldData(prev => ({ ...prev, [location]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!heightBefore || !heightAfter) {
      toast.error('Preencha as alturas antes e depois da roçada');
      return;
    }

    onComplete({
      sensorId: sensor.id,
      heightBefore: parseFloat(heightBefore),
      heightAfter: parseFloat(heightAfter),
      comments,
      fieldData
    });

    toast.success('Trabalho concluído com sucesso!');
  };

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

        <div>
          <h2 className="font-bold text-xl mb-1">{sensor.name}</h2>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <MapPin className="w-4 h-4" />
            <span>KM {sensor.km} - Pista {sensor.side}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-4">
        {/* Info Card */}
        <div className="bg-white rounded-xl border-2 border-border p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-[#5b2c83]" />
            <span className="font-medium">Solicitado por: {sensor.requestedBy || 'Mário Silva'}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Altura detectada pelo sensor: <span className="font-medium text-foreground">{sensor.height}cm</span>
          </p>
        </div>

        {/* Measurement Form */}
        <div className="bg-white rounded-xl border-2 border-border p-4 shadow-sm">
          <h3 className="font-bold mb-4">📏 Medições de Campo</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="heightBefore" className="block text-sm font-medium mb-2">
                Altura da mata ANTES da roçada (cm):
              </label>
              <input
                id="heightBefore"
                type="number"
                value={heightBefore}
                onChange={(e) => setHeightBefore(e.target.value)}
                placeholder="Ex: 35"
                className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-[#5b2c83] transition-colors bg-background"
                required
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label htmlFor="heightAfter" className="block text-sm font-medium mb-2">
                Altura da mata APÓS a roçada (cm):
              </label>
              <input
                id="heightAfter"
                type="number"
                value={heightAfter}
                onChange={(e) => setHeightAfter(e.target.value)}
                placeholder="Ex: 8"
                className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-[#5b2c83] transition-colors bg-background"
                required
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium mb-2">
                Comentários adicionais:
              </label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Descreva observações, dificuldades encontradas, etc..."
                className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-[#5b2c83] transition-colors bg-background resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Field Survey Table */}
        <div className="bg-white rounded-xl border-2 border-border p-4 shadow-sm overflow-x-auto">
          <h3 className="font-bold mb-3">📋 Levantamento de Campo - KM {sensor.km}</h3>

          {/* Legend */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#90EE90] border border-gray-300 rounded flex items-center justify-center font-bold">1</div>
              <span>h &lt; 10 cm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FFD700] border border-gray-300 rounded flex items-center justify-center font-bold">2</div>
              <span>10 cm ≤ h ≤ 30 cm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FFA500] border border-gray-300 rounded flex items-center justify-center font-bold">3</div>
              <span>h &gt; 30 cm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black text-white border border-gray-300 rounded flex items-center justify-center font-bold">X</div>
              <span>N/A</span>
            </div>
          </div>

          {/* Table */}
          <div className="space-y-2">
            {roadLocations.map((location) => (
              <div key={location} className="flex items-center gap-2">
                <label className="text-xs font-medium min-w-[160px] text-left">
                  {location}
                </label>
                <input
                  type="text"
                  value={fieldData[location] || ''}
                  onChange={(e) => handleCellChange(location, e.target.value.toUpperCase())}
                  placeholder="1, 2, 3 ou X"
                  maxLength={1}
                  className="w-16 px-2 py-2 border-2 border-border rounded text-center font-bold focus:outline-none focus:border-[#5b2c83] transition-colors"
                  style={{
                    backgroundColor:
                      fieldData[location] === '1' ? '#90EE90' :
                      fieldData[location] === '2' ? '#FFD700' :
                      fieldData[location] === '3' ? '#FFA500' :
                      fieldData[location] === 'X' ? '#000000' : '#ffffff',
                    color: fieldData[location] === 'X' ? '#ffffff' : '#000000'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 text-lg"
        >
          <CheckCircle className="w-6 h-6" />
          Concluir Trabalho
        </button>
      </form>
    </div>
  );
}
