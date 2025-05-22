import './App.css'
import Home from './pages/Home';
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() { 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="*" element={<Login />} /> 
      </Routes>     
    </BrowserRouter>
  )
}

export default App
