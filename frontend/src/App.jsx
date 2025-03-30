import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';

import Dashboard from './pages/dashboard';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signUp';
import { auth } from './config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Analytics from './pages/analytics';
import Actions from './pages/actions';
import Reports from './pages/reports';
import TheMap from './components/map/map3';
import { getUserData } from './config/firebaseConfig';

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  /* I had to use this approche,https://stackoverflow.com/questions/69357147/why-firebase-authentication-is-slow,
  there is always delays when accessing other pages and it made UX so bad */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        localStorage.setItem('user', JSON.stringify(authUser));
        localStorage.setItem('isAuthenticated', 'true');

        // Fetch user data and store it in localStorage
        try {
          const data = await getUserData();
          localStorage.setItem('userData', JSON.stringify(data)); // Store in localStorage
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData'); // Remove userData on logout
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) return ''; // Show loading screen while checking auth

  return (
    <Router>
      <Routes>
        {/* Protected Dashboard Route with nested routes */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        >
          {/* Nested protected routes under Dashboard */}
          <Route
            path="map"
            element={
              user ? (
                <TheMap
                  userData={JSON.parse(localStorage.getItem('userData'))}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="analytics"
            element={user ? <Analytics /> : <Navigate to="/login" replace />}
          />
          <Route
            path="actions"
            element={user ? <Actions /> : <Navigate to="/login" replace />}
          />
          <Route
            path="reports"
            element={user ? <Reports /> : <Navigate to="/login" replace />}
          />
        </Route>
        {/* Public Routes */}
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
