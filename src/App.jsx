import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home/Home';
import Menu from './pages/menu/Menu';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';
import ImportExport from './pages/import-export/ImportExport';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/import-export" element={<ImportExport />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;