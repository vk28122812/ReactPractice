import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, idx) => answer === QUESTIONS[idx].answers[0]
  );
  const wrongAnswers = userAnswers.length - skippedAnswers.length - correctAnswers.length;
  const skippedAnswersShare = Math.round(skippedAnswers.length / userAnswers.length * 100);
  const correctAnswersShare = Math.round(correctAnswers.length / userAnswers.length * 100);
  const wrongAnswersShare = Math.round(wrongAnswers / userAnswers.length * 100);
  return (
    <div id="summary">
      <img src={quizComplete} alt="Quiz over" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">Answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((ans, idx) => {
          let cssClass = "user-answer";
          if (ans === null) {
            cssClass += " skipped";
          } else if (ans === QUESTIONS[idx].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={idx}>
              <h3>{idx + 1}</h3>
              <p className="question">{QUESTIONS[idx].text}</p>
              <p className={cssClass}>{ans ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Summary;
