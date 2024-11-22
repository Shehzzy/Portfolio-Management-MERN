import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import '../assets/style.css';
import FlashOn from '../assets/flash.png';
import FlashOff from '../assets/flash_off.png';
import Work from '../assets/work.png';
import Footer from '../Components/Footer';
import ProjectCards from '../Components/ProjectCards';


function Home() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = month + "/" + date + "/" + year;
  
  return (
    <>
      <Navbar />
      <Sidebar />

      {/* Cards  */}

      <div className="container-fluid p-5">
        <h3 className="mt-2 homepage-h3 mb-3">Welcome to Trackfolio - Your all in one <br /> portfolio management tool!</h3>
        <p>Current date and time is is {currentDate}</p>
        <div className="row">
          <ProjectCards imgSrc={FlashOn} projectHeading={"Active Projects"} projectNumbers={0} />
          <ProjectCards imgSrc={FlashOff} projectHeading={"In-Active Projects"} projectNumbers={0} />
          <ProjectCards imgSrc={Work} projectHeading={"All Projects"} projectNumbers={0} />



        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home