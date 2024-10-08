import { useRef } from "react";

function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef();
  
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = answers;
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((ans) => {
        const isSelected = selectedAnswer === ans;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }else if(isSelected){
          cssClass = answerState;
        }
        
        return (
          <li className="answer" key={ans}>
            <button className={cssClass} onClick={() => onSelect(ans)} disabled={answerState != ''}>
              {ans}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Answers;
