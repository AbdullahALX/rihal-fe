import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Create AuthContext
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // load user from localStorage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        localStorage.setItem('user', JSON.stringify(authUser)); // Save user to localStorage
      } else {
        setUser(null);
        localStorage.removeItem('user'); // Remove user on logout
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth in components
export function useAuth() {
  return useContext(AuthContext);
}
