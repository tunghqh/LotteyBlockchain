import {BrowserRouter ,Route , Routes,Switch} from 'react-router-dom'
import './App.css';
import Lottery from './components/Home/Lottery';
import MyTicket from './components/MyTicket/MyTicket';
import Navbar  from './components/Header/Navbar';
import Fotter from './components/Footer/Fotter';
import Home from './components/Home/Home';
import About from './components/About/About';
import Game from './components/Game/Game';
import Admin from './components/Admin/Admin';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
            <Navbar />  
            <Routes>
              <Route path='/' element={<Home />} exact></Route>
              <Route path='/lottery' element={<Lottery />}></Route>
              <Route path='myticket' element={<MyTicket />}></Route>
              <Route path='about' element={<About />}></Route>
              <Route path='minigame' element={<Game/>}></Route>
              <Route path='admin' element={<Admin/>}></Route>
            </Routes>   
            <Fotter/> 
        </div>

        </BrowserRouter>
 
    </div>
  );
}

export default App;
