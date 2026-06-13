import { useState } from 'react';
import { Leaf, Lock, User, Briefcase, HardHat } from 'lucide-react';
import type { UserRole } from '../App';

interface LoginScreenProps {
  onLogin: (username: string, password: string, role: UserRole) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('gestor');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password, selectedRole);
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5b2c83] via-[#7a4ba3] to-[#5b2c83] bg-[length:200%_100%] animate-[wave_8s_ease-in-out_infinite]"></div>

      <style>{`
        @keyframes wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <div className="w-full max-w-md relative z-10">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
            <Leaf className="w-10 h-10 text-[#5b2c83]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Motiva Greencut</h1>
          <p className="text-white/90">Monitoramento Inteligente de Vegetação</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6 space-y-5">
          {/* Role Selection */}
          <div>
            <label className="block text-sm mb-3 text-foreground font-medium">
              Modo de Acesso
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('gestor')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRole === 'gestor'
                    ? 'border-[#5b2c83] bg-[#5b2c83] text-white'
                    : 'border-border bg-background hover:border-[#5b2c83]/50'
                }`}
              >
                <Briefcase className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Gestor</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('operador')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRole === 'operador'
                    ? 'border-[#5b2c83] bg-[#5b2c83] text-white'
                    : 'border-border bg-background hover:border-[#5b2c83]/50'
                }`}
              >
                <HardHat className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Operador</span>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm mb-2 text-foreground">
              Usuário
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-[#5b2c83] transition-colors bg-background"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-2 text-foreground">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-[#5b2c83] transition-colors bg-background"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5b2c83] hover:bg-[#4a2269] text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Entrar
          </button>

          <div className="text-center pt-2 space-y-2">
            <p className="text-xs text-muted-foreground">
              Acesso restrito a funcionários autorizados
            </p>
            <a
              href="https://www.motiva.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#5b2c83] hover:underline font-medium inline-block"
            >
              🌐 www.motiva.com.br
            </a>
          </div>
        </form>

        {/* Demo Info */}
        <div className="mt-6 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
            <p className="font-medium mb-1">Demo - Use qualquer credencial</p>
            <p className="text-xs opacity-90">Ex: admin / admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
