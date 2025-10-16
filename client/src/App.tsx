import { Routes,Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import JobTrackerDashboard from './pages/Jobs'
import Login from './pages/Login';

import ProtectedRoute from './routes/ProtectedRoute';
import { useToken } from './hooks/useToken';

const queryClient = new QueryClient();

function App() {
  const token = useToken();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<ProtectedRoute token={token}><JobTrackerDashboard /></ProtectedRoute>}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
