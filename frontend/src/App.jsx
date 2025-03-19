import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Dashboard from './pages/dashboard';
import Test from './pages/test';
import Login from './pages/login';
import SignUp from './pages/signUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* <Route path="" element={<Navigate to="/doc/map" />} /> */}

          {/* <Route path="hardware" element={<HardwareNew />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
