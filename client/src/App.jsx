import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import { UserProvider } from './components/Context';
import MyGames from './components/MyGames';




function App() {
  return (
    <UserProvider>

 
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game-details/:id" element={<GamePage />} />
        <Route path='/login' element= {<Login />}/>
        <Route path='/register' element={<CreateAccount />}/>
        <Route path='/MyGames' element={<MyGames />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}




export default App
