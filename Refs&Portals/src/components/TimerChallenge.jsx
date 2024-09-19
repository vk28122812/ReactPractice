import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
   
  const [timeRemaining, setRemainingTime] = useState(targetTime*1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

  if(timeRemaining <= 0){
    clearInterval(timer.current);
    dialog.current.open(); 
  }
  
  function resetTimeRemaining(){
    setRemainingTime(targetTime * 1000);
  }
  
  function handleStart() {
    timer.current = setInterval(() => {
      setRemainingTime( prevTimeRemaining => prevTimeRemaining - 10);
    },10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal ref={dialog} reset={resetTimeRemaining} targetTime={targetTime} remainingTime={timeRemaining} result="lost"/>
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running out!" : "Timer Inactive "}
        </p>
      </section>
    </>
  );
}

export default TimerChallenge;
