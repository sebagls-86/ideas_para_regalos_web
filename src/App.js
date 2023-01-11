import React from 'react';
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from './pages/homePage/HomePage';
import ComponentesPage from './pages/componentesPage/ComponentesPage';
import NotFoundPage from './pages/notFoundPage/NotFound';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/componentes" element={<ComponentesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
