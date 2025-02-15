import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StartPage from './start/StartPage';
import PageContext from './ustils/PageContext';
import GamePage from './game/GamePage';
import EndingPage from './end/EndingPage';

function App() {
  const pages = ["start","game","end"];
  const [page, setPage] = useState("start");
  const startGame= (nickname) => {
    console.log(nickname);
    setPage("game");
  }
  return (
    <PageContext.Provider value={{
      startGame:startGame
    }}
    >
    <div>
      {
        page === "start"? (
          <StartPage />
        ):
        page === "game"? (
          <GamePage />
        ):
        page === "end"? (
          <EndingPage/>
        ):
        null
      }
    </div>
  
  </PageContext.Provider>
)}

export default App
