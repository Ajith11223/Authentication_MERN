import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
  const {user} = useSelector((state)=>({...state}))
  const dispatch = useDispatch()

  const logout = ()=>{
    
    dispatch({ type: "LOGOUT"})
    navigate('/login')
    
  }
  
  return (
    <div className="main">
      <nav className="nav">
      <div className="left">
        
          <h3>Home</h3>
          <h3>About</h3>
          <h3>Contact</h3>
        
      </div>
      <div className="right">
        <h3>{user.state.json.fullName}</h3>
        <h2 onClick={logout}>Logout</h2>
      </div>
      </nav>
    </div>
  )
}

export default Home