import React from 'react';
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from './pages/homePage/HomePage';
import MyAccountPage from './pages/myAccountPage/MyAccountPage';
import ComponentesPage from './pages/componentesPage/ComponentesPage';
import ExplorarPage from './pages/explorarPage/ExplorarPage'; 
import ProductsByCategory from './pages/explorarPage/ProductsByCategory'; 
import ProductsByEvent from './pages/explorarPage/ProductsByEvent';
import NotFoundPage from './pages/notFoundPage/NotFound';
import CategoryPage from './pages/categoryPage/CategoryPage';
import UsersPage from './pages/usersPage/UsersPage';
import NuevoRegaloPage from './pages/nuevoRegaloPage/NuevoRegaloPage';
import ForumsPage from './pages/forums/ForumsPage';
import FaqPage from './pages/faqPage/FaqPage';
import AboutUsPage from './pages/aboutUsPage/AboutUsPage';
import EventsPage from './pages/eventsPage/EventsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/perfil/:user_id" element={<MyAccountPage />} />
        <Route path="/forums/:forum_id" element={<ForumsPage />} />
        <Route path="/componentes" element={<ComponentesPage />} />
        <Route path="/explorar" element={<ExplorarPage />} />
        <Route path="/explorar/eventos/:eventId" element={<ProductsByEvent />} />
        <Route path="/explorar/categorias/:categoryId" element={<ProductsByCategory />} />
        <Route path="/explorar/:category" element={<CategoryPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/nuevoRegalo" element={<NuevoRegaloPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/preguntasFrecuentes" element={<FaqPage />} />
        <Route path="/nosotros" element={<AboutUsPage />} />
        <Route path="/eventos" element={<EventsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
