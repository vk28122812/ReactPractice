import { useState } from "react"; 
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";

function Question({
  index,
  onSelectAnswer,
  onSkipAnswer
}) {

  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  function handleSelectAnswer(ans){
    setAnswer( prevAnswer => ({
      ...prevAnswer,
      selectedAnswer : ans
    }));

    setTimeout(()=>{
      setAnswer( prevAnswer => ({
        ...prevAnswer,
        isCorrect: QUESTIONS[index].answers[0] === ans
      }));
      setTimeout(()=>{
        onSelectAnswer(ans);
      },2000);
    }, 1000);
  }

  let answerState = '';
  if(answer.selectedAnswer  && answer.isCorrect !== null  ){
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  }else if(answer.selectedAnswer){
    answerState = 'answered';
  }

  let timer = 2000;

  if(answerState.selectedAnswer){
    timer = 1000;
  }

  if(answer.isCorrect !== null){
    timer = 2000;
  }

  return (
    <div id="question">
      <QuestionTimer 
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer ==='' ? onSkipAnswer : null}
        mode={answerState}
      />
      <div id="question">
        <h2>{QUESTIONS[index].text}</h2>
      </div>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

export default Question;
