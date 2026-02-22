import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useUser();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) {
    const defaultPath = user.role === 'teacher' ? '/teacher' : user.role === 'mentor' ? '/mentor' : '/student';
    return <Navigate to={defaultPath} />;
  }

  return children;
};

const getRedirectPath = (role) => {
  if (role === 'teacher') return '/teacher';
  if (role === 'mentor') return '/mentor';
  return '/student';
};

function AppContent() {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to={getRedirectPath(user.role)} />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to={getRedirectPath(user.role)} />} />

      <Route path="/student/*" element={
        <ProtectedRoute role="student">
          <StudentDashboard />
        </ProtectedRoute>
      } />

      <Route path="/teacher/*" element={
        <ProtectedRoute role="teacher">
          <StaffDashboard />
        </ProtectedRoute>
      } />

      <Route path="/mentor/*" element={
        <ProtectedRoute role="mentor">
          <StaffDashboard />
        </ProtectedRoute>
      } />

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
