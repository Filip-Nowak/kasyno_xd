import React, { useEffect, useState } from 'react'
import { getQuestions } from '../ustils/http';
import styles from './gamePage.module.css';
export default function GamePage() {
  const [questions, setQuestions] = useState([]);
  const [cash, setCash] = useState(1000);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [submited, setSubmited] = useState(false);
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
    if(submited){
      return;
    }
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
    if(submited){
      return;
    }
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
  const handleSubmit = () => {
    setSubmited(true);
    setCash(
      questions[questionNumber].answers[questions[questionNumber].correctAnswer].cash
    );
}
const handleNext = () => {
  if(questionNumber+1<questions.length){
    setQuestionNumber(prevState=>{
      return prevState+1;
    });
    setSubmited(false);
  }
  else{
    console.log("end");
  }
}
const handleReturn = () => { 
}
  return questions.length===0?<div>loading...</div>:(
    <div>
      <div className={styles.userCash}>Cash: {cash}</div>
      <h2>Question Number: {questionNumber+1}/10</h2>
      <div className={styles.questionBox}>
        <h1>{questions[questionNumber].question}</h1>
        <div className={styles.totalCashBet}>total cash bet: {
          questions[questionNumber].answers.reduce((acc,answer)=>{
            return acc+answer.cash;
          },0)
        }
        </div>
        <div className={styles.answerBox}>
        {
          questions[questionNumber].answers.map((answer,answerIndex) => (
            <div 
            className={styles.answer + " " + (submited?questions[questionNumber].correctAnswer===answerIndex?styles.correct:styles.wrong:null)}
            key={answer.name}>
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
        {
          submited?
          (
            cash===0?(
              <button className={styles.submitButton} onClick={handleReturn}>
                Return to home page
              </button>
            ):
          (
            <div>
                <div className={styles.savedCashInfo}>
                  saved cash:  {
                    questions[questionNumber].answers[questions[questionNumber].correctAnswer].cash
                  }
              </div>
              <button className={styles.submitButton} onClick={handleNext}>Next</button>


              </div>
          )
        ):
          <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>

}

      </div>
    </div>
  )
}
