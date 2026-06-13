import { X, Bell, AlertTriangle, Clock, Info } from 'lucide-react';
import type { Notification } from '../App';

interface NotificationsPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkRead: (notificationId: string) => void;
  onNotificationClick: (sensorId: string) => void;
}

export default function NotificationsPanel({
  notifications,
  onClose,
  onMarkRead,
  onNotificationClick
}: NotificationsPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const typeConfig = {
    critical: {
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200'
    },
    warning: {
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    info: {
      icon: Info,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays === 1) return 'Ontem';
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="absolute top-16 right-0 left-0 bg-white shadow-2xl z-40 max-h-[80vh] flex flex-col border-b border-border md:left-auto md:right-4 md:w-96 md:rounded-lg md:border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gray-50">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#5b2c83]" />
          <h3 className="font-bold">Notificações</h3>
          {unreadCount > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {unreadCount}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Nenhuma notificação</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;

              return (
                <button
                  key={notification.id}
                  onClick={() => {
                    onMarkRead(notification.id);
                    onNotificationClick(notification.sensorId);
                  }}
                  className={`w-full p-4 hover:bg-gray-50 transition-colors text-left ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 ${config.bg} rounded-full flex items-center justify-center border ${config.border}`}>
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-sm">{notification.sensorName}</p>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2 mt-1.5"></span>
                        )}
                      </div>

                      <p className="text-sm text-foreground/80 mb-1">
                        {notification.message}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-border bg-gray-50">
          <button
            onClick={() => {
              notifications.forEach(n => onMarkRead(n.id));
            }}
            className="w-full text-sm text-[#5b2c83] font-medium hover:underline"
          >
            Marcar todas como lidas
          </button>
        </div>
      )}
    </div>
  );
}
