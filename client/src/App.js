
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  let quantity=0;
  const Handler=(total)=>{
    console.log("apptotal",total);
    quantity=total;
    console.log("quantity",quantity);
  }
  console.log(quantity);
  return (
    <div>
      <Routes>
        <Route  exact path='/cart' element={<Cart quantityHandler={Handler}/>}/>
        <Route  exact path='/' element={<Home cartQuantity={quantity}/>}/>
      </Routes>
         
    </div>
  );
}

export default App;
