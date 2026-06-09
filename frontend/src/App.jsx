import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import LoginPage from './modules/Auth/LoginPage';
import SignupPage from './modules/Auth/SignupPage';
import DashboardLayout from './modules/Dashboard/DashboardLayout';
import SettingsPage from './modules/Settings/SettingsPage';
import MemoryPage from './modules/Memory/MemoryPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoadingScreen from './components/LoadingScreen';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '719356288859-0carhvap2epee2gujj21kfna41s7q58u.apps.googleusercontent.com';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            } 
          />
          {/* Settings & Memory Routes */}
          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <SettingsPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route 
            path="/settings/memory" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MemoryPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
