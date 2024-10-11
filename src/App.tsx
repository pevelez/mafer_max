import { Route, Routes, HashRouter } from 'react-router-dom';
import Home from './Home/Home';
import Boda from './Boda/Boda';
import FotosSubidas from './FotosSubidas/FotosSubidas';
import MediaGallery from './FotosSubidas/MediaGallery/MediaGallery';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/subir' element={<Boda/>}/>
        <Route path='/fotos' element={<FotosSubidas/>}/>
        <Route path='/test' element={<MediaGallery/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
