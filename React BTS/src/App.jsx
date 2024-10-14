import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import CounterConfigure from './components/Counter/CounterConfigure.jsx';
import { log } from './log.js';

function App() {
  log('<App /> rendered');

  
  const [chosenCount, setChosenCount] = useState(0);

  

  function handleSetClick(enteredNumber) {
    setChosenCount(enteredNumber);
  }

  return (
    <>
      <Header />
      <main>
        <CounterConfigure onSet={handleSetClick}/>
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
