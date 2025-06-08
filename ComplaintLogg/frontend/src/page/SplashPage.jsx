import React from 'react'
import image from '../assets/Design.png'
import { useNavigate } from 'react-router-dom'

const SplashPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <img src={image} alt="Logo" className="w-32 h-32 mb-4" />
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Raise Your Voice</h1>
      <button
        onClick={handleClick}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Get Started
      </button>
    </div>
  )
}

export default SplashPage
