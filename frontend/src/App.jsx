import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from '@heroui/react';
import Dashboard from './pages/dashboard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* <Route path="" element={<Navigate to="/doc/map" />} /> */}

          {/* <Route path="hardware" element={<HardwareNew />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
