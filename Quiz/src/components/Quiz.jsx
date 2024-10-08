import { useState, useCallback, useRef, act } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";
function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionIndex = answers.length; 

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    },
    []
  );

  const skipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  if (quizIsComplete) {
    return (
      <Summary userAnswers={answers}/>
    );
  }

  return (
    <div id="quiz"> 
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={skipAnswer}
      />
    </div>
  );
}

export default Quiz;
