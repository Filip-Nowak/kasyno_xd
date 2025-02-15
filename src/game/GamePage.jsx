import React, { useEffect, useState } from 'react'
import { getQuestions } from '../ustils/http';
import styles from './gamePage.module.css';
export default function GamePage() {
  const [questions, setQuestions] = useState([]);
  const [cash, setCash] = useState(1000);
  const [questionNumber, setQuestionNumber] = useState(0);
  useEffect(() => {
    getQuestions().then((data) => {
      console.log(data.answers);
      console.log(data);
      for(let i=0; i<data.length; i++){
        for(let j=0; j<data[i].answers.length; j++){
          const name = data[i].answers[j];
          data[i].answers[j] = {name, cash: 0};
        }
      }
      setQuestions(data);
    }
    )
  }, [])
  const removeCash = (id,questionCash,e) => {
    e.preventDefault();
    if(questions[questionNumber].answers[id].cash<questionCash){
      return;
    }
    setCash(prevState=>{
      return prevState+questionCash;
    });
    questions[questionNumber].answers[id].cash -= questionCash;
    setQuestions(prevState=>{
      return [...prevState];
    });
  }
  const addCash = (id,questionCash) => {
    if(cash<questionCash){
      return;
    }
    setCash(prevState=>{
      return prevState-questionCash;
    });
    questions[questionNumber].answers[id].cash += questionCash;
    setQuestions(prevState=>{
      return [...prevState];
    });
    
  }
  return questions.length===0?<div>loading...</div>:(
    <div>
      <div className={styles.userCash}>Cash: {cash}</div>
      <h2>Question Number: {questionNumber+1}</h2>
      <div>
        <h1>{questions[questionNumber].question}</h1>
        <div className={styles.totalCashBet}>total cash bet: {
          questions[questionNumber].answers.reduce((acc,answer)=>{
            return acc+answer.cash;
          },0)
        }
        </div>
        <div className={styles.answerBox}>
        {
          questions[questionNumber].answers.map((answer) => (
            <div className={styles.answer} key={answer.name}>
              <div className={styles.name}>{answer.name}</div>
              <div className={styles.answerBet}> cash bet: {answer.cash}

                </div>
                <div className={styles.buttons}>
                  <button onClick={
                    () => addCash(questions[questionNumber].answers.indexOf(answer), 10)
                  }
                  onContextMenu={(e)=>{removeCash(questions[questionNumber].answers.indexOf(answer), 10,e)}}
                  >+10</button>
                  <button
                  onClick={
                    () => addCash(questions[questionNumber].answers.indexOf(answer), 50)
                  }
                  onContextMenu={(e)=>{removeCash(questions[questionNumber].answers.indexOf(answer), 50,e)}}

                  >+50</button>
                  <button
                  onClick={
                    () => addCash(questions[questionNumber].answers.indexOf(answer), 100)
                  }
                  onContextMenu={(e)=>{removeCash(questions[questionNumber].answers.indexOf(answer), 100,e)}}

                  >+100</button>
                  </div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  )
}
