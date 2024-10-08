import {useState, useEffect} from 'react';

function QuestionTimer({timeout,  onTimeout, mode}) {

    const [remainingTime, setRemainingTime] = useState(timeout);
    
    useEffect( ()=>{
        console.log("Set the timer");
        const timer = setTimeout( onTimeout, timeout);
        return () => clearTimeout(timer); 
    }, [timeout, onTimeout])

    useEffect( ()=>{
        console.log("Set the interval");
        const intervalId = setInterval(()=>{
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        },100)
        return () => clearInterval(intervalId);
    }, [])

  return (
    <progress className={mode} id="question-time" max={timeout} value={remainingTime}/>
  )
}

export default QuestionTimer