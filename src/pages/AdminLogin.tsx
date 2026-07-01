import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';

export const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isAuthenticated = sessionStorage.getItem('admin_auth') === 'true';

  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === 'admin123') {
      sessionStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('密码错误，请重试');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-apple-dark flex items-center justify-center p-4">
      <div className="bg-apple-black rounded-2xl p-8 w-full max-w-md border border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-apple-blue/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-apple-blue" />
          </div>
          <h1 className="text-2xl font-semibold text-white">管理后台登录</h1>
          <p className="text-gray-400 text-sm mt-2">请输入密码登录管理后台</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">密码</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-apple-blue transition-colors"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-apple-blue text-white font-medium rounded-lg hover:bg-apple-blue-hover transition-colors"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
};
