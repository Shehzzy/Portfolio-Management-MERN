import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import '../assets/style.css';
import FlashOn from '../assets/flash.png';
import FlashOff from '../assets/flash_off.png';
import User from '../assets/user.png';
import Work from '../assets/work.png';
import Footer from '../Components/Footer';
import ProjectCards from '../Components/ProjectCards';


function Home() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className='main-body'>
        <div className="container-fluid p-5">
          <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='card profile-card d-flex justify-content-center align-items-center'>
                <h3 className="mt-2 homepage-h3 mb-3">Welcome to Trackfolio - Your all in one <br /> portfolio management tool!</h3>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='card profile-card-2 d-flex justify-content-center align-items-center'>
                <div className='card-logo d-flex justify-content-center align-items-center'>
                  <img src={User} />
                </div>
                <h3 className='homepage-h3 mt-2'>Aban Ali</h3>
                <ul>
                  <li>Laravel Developer |</li>
                  <li>Flutter Developer |</li>
                  <li>Full Stack Developer</li>
                </ul>
                <p>Student - Aptech Metro Stargate</p>
                <p>Karachi, Pakistan</p>
                <p className="text-capitalize">A project for managing my portfolio projects.</p>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <ProjectCards imgSrc={FlashOn} projectHeading={"Active Projects"} projectNumbers={0} />
            <ProjectCards imgSrc={FlashOff} projectHeading={"In-Active Projects"} projectNumbers={0} />
            <ProjectCards imgSrc={Work} projectHeading={"All Projects"} projectNumbers={0} />


          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home