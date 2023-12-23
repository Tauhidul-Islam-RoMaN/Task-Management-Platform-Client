import React, { useEffect } from 'react';
import Home from '../Page/Home/Home';
import NavBar from '../Page/NavBar/NavBar';
import Footer from '../Page/Footer/Footer';
import { Outlet } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';

const MainLayout = () => {


useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;