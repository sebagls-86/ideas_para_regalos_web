import React from 'react';
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from './pages/homePage/HomePage';
import UsersPage from './pages/usersPage/UsersPage';
import ComponentesPage from './pages/componentesPage/ComponentesPage';
import NotFoundPage from './pages/notFoundPage/NotFound';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:userName" element={<UsersPage />} />
        <Route path="/componentes" element={<ComponentesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
