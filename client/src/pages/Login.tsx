import { Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Login() {
  const handleGoogleLogin = () => {
    console.log('Initiating Google login...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Features */}
        <div className="hidden md:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 rounded-xl p-3">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">ApplAi</h1>
            </div>
            <p className="text-xl text-gray-600">
              Organize your job search journey in one place
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Track Applications</h3>
                <p className="text-gray-600">Keep all your job applications organized with status updates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">AI Insights</h3>
                <p className="text-gray-600">Get intelligent recommendations for your applications</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Never Miss a Deadline</h3>
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

            <Button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

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