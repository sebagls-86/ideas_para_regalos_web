import React from 'react';
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from './pages/homePage/HomePage';
import UsersPage from './pages/usersPage/UsersPage';
import ComponentesPage from './pages/componentesPage/ComponentesPage';
import ExplorarPage from './pages/explorarPage/ExplorarPage'; 
import NotFoundPage from './pages/notFoundPage/NotFound';
import CategoryPage from './pages/categoryPage/CategoryPage';
import NotificationsPage from './pages/notificationsPage/NotificationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/perfil/:userName" element={<UsersPage />} />
        <Route path="/componentes" element={<ComponentesPage />} />
        <Route path="/explorar" element={<ExplorarPage />} />
        <Route path="/explorar/:category" element={<CategoryPage />} />
        <Route path="/notificaciones" element={<NotificationsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
