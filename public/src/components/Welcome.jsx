import React from 'react'
import "./CSS/welcome.css"
import Robot from "../assets/robot.gif"

export default function Welcome({currentUser}) {
  return (
    <div className='welcome_container'>
        <img src={Robot} alt="Robot" />
        <h1>
            Welcome, 
            <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to Start Messaging</h3>
    </div>
    
  )
}
