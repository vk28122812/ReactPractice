import { useState } from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import Results from "./components/Results";
function App() {

  const [userInput, setUserInput] = useState({
    initialInvestment: 1550,
    annualInvestment: 1220,
    expectedReturn: 6,
    duration: 10,
  });

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevInputs) => ({
      ...prevInputs,
      [inputIdentifier]: +newValue,
    }));
  }

  const inputIsValid = userInput.duration > 0;
  
  return (
    <>
      <Header />
      <InputSection userInput={userInput} onChange={handleChange}/>
      {!inputIsValid && <p className= "center">Please enter a duration greater than 0</p>} 
      {inputIsValid && <Results userInput={userInput}/>} 
    </>
  )
}

export default App
