import { useState, useEffect } from 'react';
import { Bell, MapPin, AlertTriangle, CheckCircle, Clock, Menu, LogOut, FileText, Leaf } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import LoginScreen from './components/LoginScreen';
import RoadwaySelector, { type Highway } from './components/RoadwaySelector';
import Dashboard from './components/Dashboard';
import SensorDetails from './components/SensorDetails';
import ReportScreen from './components/ReportScreen';
import NotificationsPanel from './components/NotificationsPanel';
import OperatorDashboard from './components/OperatorDashboard';
import OperatorWorkScreen, { type WorkCompletionData } from './components/OperatorWorkScreen';
import {
  highways,
  sensorsByHighway,
  mockNotifications,
  mockOccurrences,
  mockInterventions
} from '../mocks/mockData';
import type { Occurrence, Intervention } from '../mocks/mockData';

export type SensorStatus = 'critical' | 'warning' | 'normal' | 'maintenance';
export type UserRole = 'gestor' | 'operador';

export interface Sensor {
  id: string;
  name: string;
  km: number;
  side: 'Norte' | 'Sul';
  height: number; // em cm
  lastMowing: string;
  status: SensorStatus;
  lat: number;
  lng: number;
  growthRate: number; // cm por semana
  assignedTo?: string; // nome do operador
  requestedBy?: string; // nome do gestor
}

export interface Notification {
  id: string;
  sensorId: string;
  sensorName: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'critical' | 'warning' | 'info';
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('gestor');
  const [currentScreen, setCurrentScreen] = useState<'highway-select' | 'dashboard' | 'details' | 'report' | 'operator-work'>('highway-select');
  const [selectedHighway, setSelectedHighway] = useState<Highway | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({ name: 'Mário Silva', role: 'Supervisor de Operações' });

  // Usamos um módulo de mocks dedicado para representar cenários reais de rodovias Motiva

  const [sensorsByHighwayState, setSensorsByHighwayState] = useState<Record<string, Sensor[]>>(sensorsByHighway);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [occurrences, setOccurrences] = useState<Occurrence[]>(mockOccurrences);
  const [interventions, setInterventions] = useState<Intervention[]>(mockInterventions);

  const getSensorsForHighway = (highwayId: string): Sensor[] => {
    return sensorsByHighwayState[highwayId] ?? [];
  };

  const getAllSensors = (): Sensor[] => {
    return Object.values(sensorsByHighwayState).flat();
  };

  const displayHighways = highways.map((highway) => {
    const currentSensors = getSensorsForHighway(highway.id);
    const criticalCount = currentSensors.filter((s) => s.status === 'critical').length;
    const warningCount = currentSensors.filter((s) => s.status === 'warning').length;
    const totalSensors = currentSensors.length || highway.totalSensors;
    const avgHeight = currentSensors.length > 0
      ? Math.round(currentSensors.reduce((sum, sensor) => sum + sensor.height, 0) / currentSensors.length)
      : highway.avgHeight;

    return {
      ...highway,
      criticalCount,
      warningCount,
      totalSensors,
      avgHeight
    };
  });

  const getSensorById = (sensorId: string): Sensor | undefined => {
    return getAllSensors().find((sensor) => sensor.id === sensorId);
  };

  const getHighwayIdBySensorId = (sensorId: string): string | undefined => {
    return Object.entries(sensorsByHighwayState).find(([, list]) =>
      list.some((sensor) => sensor.id === sensorId)
    )?.[0];
  };

  const updateSensorById = (sensorId: string, updates: Partial<Sensor>) => {
    setSensorsByHighwayState((prev) => {
      let changed = false;
      const next: Record<string, Sensor[]> = {};

      for (const [key, list] of Object.entries(prev)) {
        const updatedList = list.map((sensor) => {
          if (sensor.id !== sensorId) return sensor;
          changed = true;
          return { ...sensor, ...updates };
        });

        next[key] = updatedList;
      }

      return changed ? next : prev;
    });
  };

  // Simulação de notificação push
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        const criticalSensors = sensors.filter(s => s.status === 'critical');
        if (criticalSensors.length > 0) {
          toast.error(`${criticalSensors.length} trecho(s) com altura crítica!`, {
            description: 'Clique para ver detalhes',
            duration: 5000,
          });
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, sensors]);

  useEffect(() => {
    if (userRole === 'gestor' && selectedHighway) {
      setSensors(getSensorsForHighway(selectedHighway.id));
    }

    if (userRole === 'operador') {
      setSensors(getAllSensors());
    }
  }, [userRole, selectedHighway, sensorsByHighwayState]);

  const handleLogin = (username: string, password: string, role: UserRole) => {
    // Simulação de autenticação
    if (username && password) {
      setIsAuthenticated(true);
      setUserRole(role);

      if (role === 'gestor') {
        setUser({ name: username, role: 'Supervisor de Operações' });
        setCurrentScreen('highway-select');
      } else {
        setUser({ name: username, role: 'Operador de Campo' });
        if (!selectedHighway) {
          setSelectedHighway(highways[0]); // primeira rodovia por padrão apenas se ainda não houver seleção
        }
        setSensors(getAllSensors());
        setCurrentScreen('dashboard');
      }

      toast.success(`Login realizado como ${role === 'gestor' ? 'Gestor' : 'Operador'}!`);
    }
  };

  const handleSelectHighway = (highway: Highway) => {
    setSelectedHighway(highway);
    setSensors(getSensorsForHighway(highway.id));
    setCurrentScreen('dashboard');
    toast.success(`Rodovia selecionada: ${highway.name}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('highway-select');
    setSelectedSensor(null);
    toast.info('Sessão encerrada');
  };

  const handleSensorClick = (sensor: Sensor) => {
    setSelectedSensor(sensor);
    setCurrentScreen('details');
  };

  const handleUpdateSensorStatus = (sensorId: string, newStatus: SensorStatus) => {
    const sensor = getSensorById(sensorId);
    const highwayId = getHighwayIdBySensorId(sensorId);

    updateSensorById(sensorId, {
      status: newStatus,
      assignedTo: newStatus === 'maintenance' ? 'Operador de Campo' : undefined,
      requestedBy: newStatus === 'maintenance' ? user.name : undefined
    });

    setSensors(prev =>
      prev.map(s => s.id === sensorId ? {
        ...s,
        status: newStatus,
        assignedTo: newStatus === 'maintenance' ? 'Operador de Campo' : s.assignedTo,
        requestedBy: newStatus === 'maintenance' ? user.name : s.requestedBy
      } : s)
    );

    if (newStatus === 'maintenance' && sensor) {
      setInterventions(prev => [
        ...prev,
        {
          id: `i-${Date.now()}`,
          sensorId,
          highwayId: highwayId ?? 'unknown',
          km: sensor.km,
          date: new Date().toISOString().split('T')[0],
          team: 'Equipe Operacional',
          action: 'Roçada designada pelo gestor',
          result: 'Aguardando execução',
          status: 'scheduled',
          beforeHeight: sensor.height
        }
      ]);

      setNotifications(prev => [
        ...prev,
        {
          id: `n-${Date.now()}`,
          sensorId,
          sensorName: sensor.name,
          message: `Tarefa de roçada designada para ${sensor.name}.`,
          timestamp: new Date().toISOString(),
          read: false,
          type: 'info'
        }
      ]);
    }

    toast.success('Status atualizado com sucesso!');
  };

  const handleWorkCompletion = (data: WorkCompletionData) => {
    const sensor = getSensorById(data.sensorId);

    updateSensorById(data.sensorId, {
      status: 'normal',
      height: data.heightAfter,
      lastMowing: new Date().toISOString().split('T')[0],
      assignedTo: undefined
    });
    setSensors(prev =>
      prev.map(s => s.id === data.sensorId ? {
        ...s,
        status: 'normal',
        height: data.heightAfter,
        lastMowing: new Date().toISOString().split('T')[0],
        assignedTo: undefined
      } : s)
    );

    setInterventions(prev => prev.map((item) =>
      item.sensorId === data.sensorId
        ? {
            ...item,
            status: 'completed',
            result: `Concluído pelo operador: ${data.comments || 'sem observações'}`,
            afterHeight: data.heightAfter,
            beforeHeight: data.heightBefore
          }
        : item
    ));

    if (sensor) {
      setNotifications(prev => [
        ...prev,
        {
          id: `n-${Date.now()}`,
          sensorId: data.sensorId,
          sensorName: sensor.name,
          message: `Trabalho concluído no ${sensor.name}. Altura final: ${data.heightAfter}cm.`,
          timestamp: new Date().toISOString(),
          read: false,
          type: 'info'
        }
      ]);
    }

    setCurrentScreen('dashboard');
  };

  const handleMarkNotificationRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      <Toaster position="top-center" richColors />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full flex flex-col"
          >
            <div className="h-full w-full flex flex-col overflow-hidden">

      {/* Header */}
      {currentScreen !== 'highway-select' && (
        <header className="bg-[#5b2c83] text-white px-4 py-3 shadow-lg flex items-center justify-between">
          <button
            onClick={() => {
              if (userRole === 'gestor' && currentScreen === 'dashboard') {
                setCurrentScreen('highway-select');
                setSelectedHighway(null);
              }
            }}
            className={`flex items-center gap-3 ${userRole === 'gestor' && currentScreen === 'dashboard' ? 'hover:opacity-80 transition-opacity' : ''}`}
          >
            <Leaf className="w-6 h-6" />
            <div className="text-left">
              <h1 className="font-bold leading-tight">Motiva Greencut</h1>
              <p className="text-xs opacity-90">
                {selectedHighway ? selectedHighway.name : 'Monitoramento Inteligente'}
              </p>
            </div>
          </button>

        <div className="flex items-center gap-2">
          {userRole === 'gestor' && (
            <>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </>
          )}

          {userRole === 'operador' && (
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
        </header>
      )}

      {/* Menu Dropdown */}
      {showMenu && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-2xl z-50 min-w-[200px] border border-border">
          <div className="p-3 border-b border-border">
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
          {currentScreen !== 'highway-select' && (
            <button
              onClick={() => {
                setCurrentScreen('highway-select');
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
            >
              <MapPin className="w-4 h-4" />
              Trocar Rodovia
            </button>
          )}
          <button
            onClick={() => {
              setCurrentScreen('dashboard');
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
          >
            <MapPin className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => {
              setCurrentScreen('report');
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
          >
            <FileText className="w-4 h-4" />
            Relatório
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              handleLogout();
            }}
            className="w-full px-4 py-2 text-left hover:bg-destructive/10 text-destructive flex items-center gap-2 text-sm border-t border-border"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkRead={handleMarkNotificationRead}
          onNotificationClick={(sensorId) => {
            const sensor = sensors.find(s => s.id === sensorId);
            if (sensor) {
              handleSensorClick(sensor);
              setShowNotifications(false);
            }
          }}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === 'highway-select' && userRole === 'gestor' && (
            <motion.div
              key="highway-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <RoadwaySelector
                highways={displayHighways}
                onSelectHighway={handleSelectHighway}
              />
            </motion.div>
          )}

          {currentScreen === 'dashboard' && userRole === 'gestor' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Dashboard
                sensors={sensors}
                onSensorClick={handleSensorClick}
              />
            </motion.div>
          )}

          {currentScreen === 'dashboard' && userRole === 'operador' && (
            <motion.div
              key="operator-dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <OperatorDashboard
                sensors={sensors}
                operatorName={user.name}
                onWorkClick={(sensor) => {
                  setSelectedSensor(sensor);
                  setCurrentScreen('operator-work');
                }}
              />
            </motion.div>
          )}

          {currentScreen === 'details' && selectedSensor && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <SensorDetails
                sensor={selectedSensor}
                onBack={() => setCurrentScreen('dashboard')}
                onUpdateStatus={handleUpdateSensorStatus}
              />
            </motion.div>
          )}

          {currentScreen === 'report' && (
            <motion.div
              key="report"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <ReportScreen
                sensors={sensors}
                occurrences={occurrences}
                interventions={interventions}
                onBack={() => setCurrentScreen('dashboard')}
                onSensorClick={handleSensorClick}
              />
            </motion.div>
          )}

          {currentScreen === 'operator-work' && selectedSensor && (
            <motion.div
              key="operator-work"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <OperatorWorkScreen
                sensor={selectedSensor}
                onBack={() => setCurrentScreen('dashboard')}
                onComplete={handleWorkCompletion}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
