
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Home from './components/Home';

function App() {
  let quantity=0;
  function Handler(total){
    quantity=total
  }
  return (
    <div>
          
      <Routes>
        <Route  exact path='/cart' element={<Cart quantityHandler={Handler}/>}/>
        <Route  exact path='/' element={<Home quantity={quantity}/>}/>
      </Routes>
         
    </div>
  );
}

export default App;
