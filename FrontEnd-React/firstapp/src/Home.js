import React from 'react'
import Navbar from './Components/Navbar'; 
import Footer from './Components/Footer' ;
import HeroSection from './Components/HeroSection';
import Hero2 from './Components/Hero2';
import Hero3 from './Components/Hero3';
// import Hero3 from './Component/Hero3'
import { useEffect } from 'react';
import { getRoleFromToken } from './authUtils';

const Home = () => {

    useEffect(() => {
        const role = getRoleFromToken();
        console.log("User role:", role);
    }, []);
  return (
    <div id='root'>
      {/* <Navbar/> */}
      <main>
      <HeroSection/>
      <Hero2/>
      <Hero3/>
      </main>

      {/* <Footer/> */}
    </div>
  )
}

export default Home
