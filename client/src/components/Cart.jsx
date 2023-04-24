import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CartPrice from './CartPrice';
import '../css/cart.css'
import CartSave from './CartSave';
import Navbar from './Navbar';
import {useDispatch,connect, useSelector} from 'react-redux';
import * as actionCreators from '../store/actions/index'
function Cart(props) {

  var carts=useSelector((state)=>state.carts)
  const  [cartItems,setCartItems]=useState([])
  let total=0;
  
  useEffect(()=>{
    const fetchdata=async()=>{
    await dispatch(actionCreators.loadCarts())
    }
    fetchdata();
  },[])

  useEffect(()=>{
    if(carts)
    setCartItems(carts)
  },[carts])

  const dispatch=useDispatch();




  const addHandler=(ele,index)=>{
    
  const Fetchdata=debounce(function(){
    let item=cartItems[index]
      let updateItem={...item,quantity:item.quantity+1}
      
      let updateItems=[...cartItems]
     
      updateItems.splice(index,1)
  
      updateItems.splice(index,0,updateItem)
    
      
      updateItems.map(ele=>{
        total=total+ele.quantity
      })
     
      props.quantityHandler(total)
      dispatch(actionCreators.cartHandler({id:ele.id,sign:1}))
      setCartItems(updateItems)
    })
    Fetchdata();
      
  }

  function debounce(addHandler){
    let timeout;
    return ()=>{
      clearTimeout(timeout);
      timeout=setTimeout(()=>{
        addHandler()
      },700)
    }
  }
  

  const minusHandler=(ele,index)=>{
   
  const FetchData=debounce(function(){
    let item=cartItems[index]
  let updateItem={...item,quantity:item.quantity-1}
  console.log("updateitem",updateItem);
  let updateItems=[...cartItems]
  console.log(updateItems);
  updateItems.splice(index,1)
  console.log("updateItems before",updateItems);
  updateItems.splice(index,0,updateItem)
  console.log("updateItems",updateItems);
  if(updateItem.quantity>0)
  setCartItems(updateItems)
  updateItems.map(ele=>{
    total=total+ele.quantity
  })
  props.quantityHandler(total)
  dispatch(actionCreators.cartHandler({id:ele.id,sign:-1}))
  if(updateItem.quantity>0)
  setCartItems(updateItems)
  })
  
    FetchData();
    
  }

  const deleteHandler=(ele,index)=>{
 
    let updateItems=[...cartItems]
    console.log(updateItems);
    updateItems.splice(index,1)
    console.log(updateItems);
    setCartItems(updateItems)
    dispatch(actionCreators.cartHandler({id:ele.id,sign:2}))
  }

  const saveForLaterHandler=(ele,index)=>{
    setCartItems(cartItems.splice(index,1));
    dispatch(actionCreators.cartSave(ele))
  }

 
    
    var quantity=0;
    const a=[];
    cartItems.map((ele,index)=>{
      a.push(
      <div className='cartProduct'>
          <img key={index} className="productImage" src={ele.image}/>
          <div className='cartDescription'>
            <p>{ele.description}</p>
            <p className='priceBold'>Rs {ele.price}</p>
            <button className='handlerBtn' onClick={()=>{minusHandler(ele,index)}}>-</button>
            <h5 className='quantityBtn'>{ele.quantity}</h5>
            <button className='handlerBtn' onClick={()=>{addHandler(ele,index)}}>+</button>
            <button className='handlerBtn' onClick={()=>{deleteHandler(ele,index)}}>Delete</button>
            <button className='handlerBtn' onClick={()=>{saveForLaterHandler(ele,index)}}>Save for later</button>
          </div>
      </div>)
        quantity=quantity+ele.quantity
      })

  return (
    <div>
    <Navbar/>
    <div className='cartGrid'>
      <div className='cartContainer'>
        <div className='cartWrapper'>
        {(a.length>0)&&<h1>My Cart ({quantity})</h1>}
          {a}
        </div>
        <div className='cartWrapper'>
          <CartSave/>
        </div>
      </div>
      <CartPrice cart={cartItems}/>
    </div>
    </div>
  )
}

export default (Cart)
