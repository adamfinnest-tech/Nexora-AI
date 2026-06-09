import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import InputField from './components/InputField';
import multiSphere from '../../assets/multiSphere.png';
import sphere from '../../assets/sphere.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-[#F3F0FF] bg-[radial-gradient(at_0%_0%,_#FCE7EC_0px,_transparent_50%),radial-gradient(at_100%_0%,_#E6D8FA_0px,_transparent_50%),radial-gradient(at_0%_100%,_#CDE4FF_0px,_transparent_50%),radial-gradient(at_100%_100%,_#ECC2DF_0px,_transparent_50%)]">
      {/* Background Decorative Spheres */}
      <img src={sphere} alt="" className="absolute top-[15%] right-[25%] w-24 h-24 object-cover blur-[2px] opacity-70" />
      <img src={sphere} alt="" className="absolute top-[35%] left-[40%] w-20 h-20 object-cover blur-[3px] opacity-60" />
      <img src={sphere} alt="" className="absolute top-[-10%] right-[10%] w-60 h-60 object-cover blur-[3px] opacity-60" />
      <img src={sphere} alt="" className="absolute bottom-[20%] right-[10%] w-32 h-32 object-cover blur-md opacity-50" />
      <img src={sphere} alt="" className="absolute top-[0%] left-[8%] w-48 h-48 object-cover blur-[1px] opacity-80" />


      {/* Main MultiSphere */}
      <img
        src={multiSphere}
        alt="Decorative Spheres"
        className="absolute bottom-[-18%] left-[-2%] w-[1100px] h-auto object-contain drop-shadow-2xl z-0 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between p-6 sm:p-12 lg:p-24 h-screen">

        {/* Left Side Branding */}
        <div className="flex-1 h-full w-full text-center lg:text-left mb-12 lg:mb-0 lg:pr-12 pt-20 lg:pt-0">
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-outfit font-extrabold tracking-tight mb-6 bg-gradient-to-r from-[#1b1238] via-[#3c2a63] to-[#1b1238] bg-clip-text text-transparent">
            Nexora AI
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed font-sans max-w-lg mx-auto lg:mx-0">
            Your Intelligent Conversation Partner. <br className="hidden lg:block" />
            Experience the future of dialogue.
          </p>
        </div>

        {/* Right Side Glassmorphism Panel */}
        <div className="w-full max-w-md lg:mr-12">
          <div className="bg-white/20 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">

            {/* Subtle top glare/gradient for glass effect */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              {/* Header Badges */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-inner">
                    <span className="text-white font-semibold text-sm tracking-wide">AI</span>
                  </div>
                  <span className="text-gray-800 font-medium text-[15px]">Smart Chat with Nexora AI</span>
                </div>
                <div className="flex items-center gap-4">
                  {/* <div className="w-11 h-11 rounded-full border-2 border-white/60 overflow-hidden shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                      alt="Alex"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-gray-800 font-medium text-[15px]">Welcome back, Alex</span> */}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100/80 backdrop-blur-sm border border-red-200 text-red-600 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email Address"
                />

                <InputField
                  icon={Lock}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 mt-2 bg-[#362758] hover:bg-[#251a3d] text-white rounded-full font-medium transition-colors shadow-lg disabled:opacity-70 flex justify-center items-center"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In with Email'}
                </button>
              </form>

              {/* Social Login Options */}
              <div className="mt-4 space-y-3 flex flex-col items-center">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      await loginWithGoogle(credentialResponse.credential);
                      navigate('/');
                    } catch (err) {
                      setError(err.response?.data?.message || 'Google login failed');
                    }
                  }}
                  onError={() => setError('Google login failed')}
                  theme="outline"
                  size="large"
                  width="100%"
                />
              </div>

              {/* Footer Links */}
              <div className="mt-8 flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600 px-1">
                <a href="#" className="hover:text-gray-900 transition-colors">Forgot Password?</a>
                <div>
                  Don't have an account? <Link to="/signup" className="text-[#362758] hover:underline">Sign Up</Link>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
