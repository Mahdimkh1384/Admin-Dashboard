import './App.css';
import React, { useEffect, useState } from 'react';
import SideBar from './Components/SideBar/SideBar';
import Header from './Components/Header/Header';
import routes from './Routes';
import { useRoutes } from 'react-router-dom';

function App() {

  const router = useRoutes(routes);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isMobile && <SideBar />}

      <div className='main'>
        <Header />
        {router}
      </div>
    </>
  );
}

export default App;