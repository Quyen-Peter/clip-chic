
import React from "react";
import ScrollToTop from "../routes/ScrollToTop";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Footer from "../component/Footer";
import About from "../screens/About";
import Header from "../component/Header";
import Productions from "../screens/Productions";
import Customization from "../screens/Customization";
import Blindbox from "../screens/Blindbox";
import Account from "../screens/Account";
import Cart from "../screens/Cart";
import Sidebar from "../component/Sidebar";
import Customizer from '../features/customizer/pages/CustomizerPage.jsx';
import ProductDetail from "../screens/ProductDetail";
import BlindboxDetail from "../screens/BlindboxDetail";
import SidebarProfile from "../component/SidebarProfile";


import Profile from "../screens/account/Profile";
import MyDesign from "../screens/account/MyDesign";
import OrderHistory from "../screens/account/OrderHistory";
import TrackShipping from "../screens/account/TrackShipping";
import PrivacyHelp from "../screens/account/PrivacyHelp";
import LoginUser from "../screens/account/Login";
import CreateLogin from "../screens/account/CreateLogin";
import OrderDetail from "../screens/account/OrderDetail";

const AppRouter = () => {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/About" element={<About />} />
      <Route path="/Production" element={<Productions />} />
      <Route path="/Customization" element={<Customization />} />
      <Route path="/Blindbox" element={<Blindbox />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Customizer" element={<Customizer/>} />
      <Route path="/productdetail/:productId" element={<ProductDetail/>} />
      <Route path="/blindboxDetail/:blindboxId" element={<BlindboxDetail/>} />
      <Route path="/SidebarProfile" element={<SidebarProfile />} />


      <Route path="/Account/*" element={<Account />} >
        <Route index element={<Profile />} />               
        <Route path="MyDesign" element={<MyDesign />} />            
        <Route path="TrackShipping" element={<TrackShipping />} />  
        <Route path="OrderHistory" element={<OrderHistory />} />     
        <Route path="Privacy" element={<PrivacyHelp />} />  
        <Route path="Login" element={<LoginUser />} /> 
        <Route path="Create" element={<CreateLogin />} />
        <Route path="OrderDtail/:OrderId" element={<OrderDetail/>} />
      </Route>

    </Routes>
    </>
  );
};

export default AppRouter;
