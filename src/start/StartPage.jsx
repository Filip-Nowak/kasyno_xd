import React, { useContext } from 'react'
import PageContext from '../ustils/PageContext';

export default function StartPage() {
  const context = useContext(PageContext);
  const handleStart = () => {
    const nickname = prompt("Enter your nickname");
    if(nickname){
      console.log(nickname);
    }
    context.startGame(nickname);

  }
  return (
    <div>
      <button onClick={handleStart}>Start</button>
    </div>
  )
}
