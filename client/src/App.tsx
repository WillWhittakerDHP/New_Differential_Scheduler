import { Outlet } from 'react-router-dom';
import Nav from './components/Navbar.tsx';


const App = () => {
  return (
    <div>
      <Nav />
      <div className="main-content">
        <Outlet /> {/* This will render the child routes */}
      </div>
    </div>
  );
};

export default App;
