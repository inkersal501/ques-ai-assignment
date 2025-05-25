import { useSelector } from 'react-redux';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Project from './pages/Project';
import ReloadDetect from './components/ReloadDetect';
import Profile from './pages/Profile';
import Transcript from './pages/Transcript';

function App() { 
  const user = useSelector((state) => state.auth?.user);

  return (
    <BrowserRouter>
      <ReloadDetect />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} /> 
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />}  />
        <Route path="/home/:projectName" element={<Project />}  />
        <Route path="/home/:projectName/:transcript" element={<Transcript />}  />
        <Route path="/profile" element={<Profile />}  />
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>     
    </BrowserRouter>
  )
}
 
export default App
