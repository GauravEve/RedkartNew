import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Grid from './Grid'
import {useSelector} from 'react-redux';

function Home(props) {
  let carts=useSelector(state=>state.carts)
  let total=0;
  carts.map((ele)=>{
    total=total+ele.quantity
  })
  console.log(props.cartQuantity);
  return (
    <div>
        <Navbar quantity={total}/>
        <Grid/> 
    </div>
  )
}

export default Home