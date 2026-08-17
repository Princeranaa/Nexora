import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../../../Shared/State/ThemSlice';


const Home = () => {

    const dispatch  = useDispatch();
    const handleClick = ()=>{
      dispatch(toggleTheme())
    }


  return (
    <>
    <h1>Hello i am home</h1>
    <button onClick={handleClick}>Changes</button>
    </>
    
  )
}


export default Home