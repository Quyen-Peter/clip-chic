import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../screens/Home';
import Footer from '../component/Footer';
import About from '../screens/About';
import Header from '../component/Header';
import Productions from '../screens/Productions';
import Customization from '../screens/Customization';
import Blindbox from '../screens/Blindbox';
import Account from '../screens/Account';
import Cart from '../screens/Cart';
import Sidebar from '../component/Sidebar';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Productions />} />
      <Route path="/About" element={<About />} />
      <Route path='/Production' element={<Productions/>} />
      <Route path='/Customization' element={<Customization/>} />
      <Route path='/Blindbox' element={<Blindbox/>} />
      <Route path='/Account' element={<Account/>} />
      <Route path='/Cart' element={<Cart/>} />
    </Routes>
  );
};

export default AppRouter;
