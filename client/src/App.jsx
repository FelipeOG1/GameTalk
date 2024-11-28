import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import { UserProvider } from './components/Context';
import MyGames from './components/MyGames';
import MyProfile from './pages/MyProfile';
import AvatarPage from './pages/AvatarPage';
import FindGamePage from './pages/FindGamesPage';
import AllReviews from './pages/AllReviews';
import LatestReviewsPage from './pages/LatestReviewsPage';



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
        <Route path='/MyProfile' element={<MyProfile/>}></Route>
        <Route path='/new-avatar-page/:id/:username' element={<AvatarPage state='create' title="Create your own Avatar!"/>}></Route>
        <Route path='/edit-avatar-page/:id/:avatar/:username' element={<AvatarPage state='edit' title="Edit your Current Avatar!"/>}></Route>
        <Route path='/findGame/:game' element={<FindGamePage/>}></Route>
        <Route path='/allReviews/:id/:gameName' element={<AllReviews/>}></Route>
        <Route path='/latestReviewsPage' element={<LatestReviewsPage/>}></Route>
        
       
      </Routes>
    </Router>
    </UserProvider>
  );
}




export default App
