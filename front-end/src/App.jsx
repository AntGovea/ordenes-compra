import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Entradas from "./components/Entradas";
import { LandingPage } from "./components/LandingPage";
import { NavbarComponent } from './components/Navbar';
import { Listado } from './components/Listado';

function App() {
  return (
    <>
    <NavbarComponent/>
     <Router basename="/">
        <Routes>
          <Route path="/" element={<LandingPage/>} /> 
          <Route path="/save" element={<Entradas/>} /> 
          <Route path="/show" element={<Listado/>} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
