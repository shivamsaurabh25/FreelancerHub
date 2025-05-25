import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import FreelancerDashboard from './pages/FreelancerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import BrowseFreelancers from './pages/BrowseFreelancers';
import BrowseJobs from './pages/BrowseJobs';
import Profile from './pages/Profile';
import JobDetail from './pages/JobDetail';
import FreelancerDetail from './pages/FreelancerDetail';
import CreateJob from './pages/CreateJob';
import LoadingSpinner from './components/LoadingSpinner';

// Protected route component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userData?.userType !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Public route component (redirects authenticated users)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Dashboard redirect component
const DashboardRedirect = () => {
  const { userData, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (userData?.userType === 'freelancer') {
    return <Navigate to="/freelancer-dashboard" replace />;
  } else if (userData?.userType === 'client') {
    return <Navigate to="/client-dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

function AppContent() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/browse-freelancers" element={<BrowseFreelancers />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/freelancer/:id" element={<FreelancerDetail />} />
        <Route path="/job/:id" element={<JobDetail />} />

        {/* Auth routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/freelancer-dashboard"
          element={
            <ProtectedRoute requiredRole="freelancer">
              <FreelancerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-job"
          element={
            <ProtectedRoute requiredRole="client">
              <CreateJob />
            </ProtectedRoute>
          }
        />

        {/* 404 route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
