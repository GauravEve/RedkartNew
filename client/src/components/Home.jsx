import React from 'react'
import Navbar from './Navbar'
import Grid from './Grid'

function Home(props) {
  return (
    <div>
        <Navbar quantity={props.quantity}/>
        <Grid/> 
    </div>
  )
}

export default Home