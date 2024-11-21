import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import '../assets/style.css';
import Footer from '../Components/Footer';


function Home() {
  return (
   <>
   <Navbar />
   <Sidebar />  
   <Footer />
   </>
  )
}

export default Home