import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, Lock, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import GlassCard from '../components/ui/GlassCard';

const Login = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.phone, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-150"></div>
      </div>

      {/* Main Login Container */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-xl hover:scale-105 transition-transform">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-3">TemariLink</h1>
          <p className="text-lg text-gray-600 font-medium">Welcome back to your dashboard</p>
        </div>

        {/* Login Form */}
        <GlassCard variant="default" padding="xl" className="shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-3">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number Input */}
            <div>
              <label className="form-label flex items-center gap-2 text-base font-semibold">
                <Phone className="w-5 h-5 text-blue-500" />
                Phone Number
              </label>
              <div className="relative mt-2">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-glass pl-12 pr-4 py-4 w-full text-base"
                  placeholder="+251 9XX XXX XXX"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="form-label flex items-center gap-2 text-base font-semibold">
                <Lock className="w-5 h-5 text-blue-500" />
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-glass pl-12 pr-14 py-4 w-full text-base"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-4 text-lg font-semibold"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  Sign In
                  <Shield className="w-5 h-5" />
                </span>
              )}
            </button>
          </form>

          {/* Additional Options */}
          <div className="mt-8 flex items-center justify-between text-sm">
            <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Forgot password?
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Need help?
            </button>
          </div>
        </GlassCard>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-base">
            Don't have an account?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
              Contact Administrator
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-xs text-gray-500">
          <p>© 2024 TemariLink. All rights reserved.</p>
          <div className="flex items-center justify-center gap-6 mt-3">
            <button className="hover:text-blue-600 transition-colors">Privacy</button>
            <span className="text-gray-400">•</span>
            <button className="hover:text-blue-600 transition-colors">Terms</button>
            <span className="text-gray-400">•</span>
            <button className="hover:text-blue-600 transition-colors">Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
