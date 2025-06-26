import './App.css';
import SideBar from './Components/SideBar/SideBar';
import Header from './Components/Header/Header';
import routes from './Routes';
import { useRoutes } from 'react-router-dom';

function App() {

  const router = useRoutes(routes)
  return (
    <>
      <SideBar />

      <div className='main'>
        <Header />
        {router}
      </div>
    </>
  );
}

export default App;
