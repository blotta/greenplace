import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TopBar from './components/TopBar';
import CartPage from './pages/CartPage';

import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<CartPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
