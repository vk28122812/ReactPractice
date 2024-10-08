import { useState, useEffect } from "react";
const TIMER = 3000;
function ProgressBar() {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Interval running");
      setRemainingTime((prevTime) => prevTime - 10);

      return () => {
        clearInterval(interval);
      };
    }, 10);
  }, []);

  return <progress value={remainingTime} max={TIMER} />;
}

export default ProgressBar;
