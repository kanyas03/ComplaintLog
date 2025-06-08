import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './page/Home.jsx'
import SplashPage from './page/SplashPage.jsx'
import WriteComplaint from './page/AddComplaint.jsx'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/write-complaint" element={<WriteComplaint />} />
      </Routes>

    </BrowserRouter>
    </div>
  )
}

export default App
