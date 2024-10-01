import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Boda from './Boda/Boda';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/boda' element={<Boda/>}/>
      </Routes>
    </Router>
  );
}

export default App;
