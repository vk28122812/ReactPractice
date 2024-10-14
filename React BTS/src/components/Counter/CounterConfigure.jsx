import {useState} from 'react'

function CounterConfigure({onSet}) {

    const [enteredNumber, setEnteredNumber] = useState(0); 

    function handleChange(event) {
        setEnteredNumber(+event.target.value);
    }
    function handleClick(){
        onSet(enteredNumber);
        setEnteredNumber(0);
    }
  return (
    <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleClick}>Set</button>
    </section>
  )
}

export default CounterConfigure