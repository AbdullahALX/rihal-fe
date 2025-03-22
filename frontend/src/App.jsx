import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';

import Dashboard from './pages/dashboard';
import Test from './pages/test';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signUp';
import { auth } from './config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  // authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  return (
    <Router>
      <Routes>
        {/* Protected route */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        {/* Public routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/sign-up"
          element={!user ? <SignUp /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
