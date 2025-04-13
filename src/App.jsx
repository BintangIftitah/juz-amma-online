import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SurahList from './pages/SurahList';
import SurahDetail from './pages/SurahDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Pastikan file CSS untuk custom styles diimpor

function App() {
  return (
    <Router>
      <div className="App bg-purple-100">  {/* Menambahkan kelas untuk latar belakang ungu-pink */}
        <Navbar />  {/* Navbar yang akan selalu tampil */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route untuk halaman Home */}
          <Route path="/surah-list" element={<SurahList />} /> {/* Route untuk halaman SurahList */}
          <Route path="/surah/:id" element={<SurahDetail />} /> {/* FIXED: param URL pakai 'id' */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
