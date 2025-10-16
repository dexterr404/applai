import { Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../api/authService';
import { useUser } from '../hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../hooks/useToken';

import Logo from '../assets/applai-logo.svg'

export default function Login() {
  const navigate = useNavigate();
  const token = useToken();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && (token || user)) {
      navigate("/", { replace: true });
    }
  }, [token, user, isLoading, navigate]);

  const handleLoginSuccess = async(credentialResponse: any) => {
    try {
        const googleToken = credentialResponse.credential;
        const res = await googleAuth(googleToken);

        if (!res || !res.token) {
          alert("Login failed. Please try again.");
          return;
        }

        // Store token and user
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        
        // Force full page reload to pick up new token
        window.location.href = '/';
    } catch (error) {
        console.log("Error in login success", error);
        alert("Login failed. Please try again.");
    }
  }

  const handleLoginError = () => {
    console.log("Google Login Failed");
    alert("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-inherit h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Features */}
        <div className="hidden md:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={Logo} className="size-12"/>
              <h1 className="text-3xl font-bold text-gray-900">ApplAi</h1>
            </div>
            <p className="text-xl text-gray-600 text-left">
              Organize your job search journey in one place
            </p>
          </div>

          <div className="space-y-4 flex flex-col items-start">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 text-left">Track Applications</h3>
                <p className="text-gray-600">Keep all your job applications organized with status updates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 text-left">AI Insights</h3>
                <p className="text-gray-600">Get intelligent recommendations for your applications</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 text-left">Never Miss a Deadline</h3>
                <p className="text-gray-600">Stay on top of interviews and follow-ups</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Pro Tip</span>
            </div>
            <p className="text-indigo-50">
              Track your applications from day one to maximize your chances of landing your dream job
            </p>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="md:hidden flex justify-center mb-4">
                <div className="bg-indigo-600 rounded-xl p-3">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600">
                Sign in to continue tracking your job applications
              </p>
            </div>
            <div className='flex justify-center w-full'>
              <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError}/>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Privacy Policy
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            New to ApplAi? Sign in with Google to get started
          </p>
        </div>
      </div>
    </div>
  );
};