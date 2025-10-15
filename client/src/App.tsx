import { Routes,Route } from 'react-router-dom';

import './App.css'
import JobTrackerDashboard from './pages/Jobs'
import Login from './pages/Login';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<JobTrackerDashboard />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
