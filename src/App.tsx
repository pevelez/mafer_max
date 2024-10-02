import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Boda from './Boda/Boda';
import FotosSubidas from './FotosSubidas/FotosSubidas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/subir' element={<Boda/>}/>
        <Route path='/fotos' element={<FotosSubidas/>}/>
      </Routes>
    </Router>
  );
}

export default App;
