import { useState, useEffect } from "react";

const useCountdownTimer = (initialTime, callback) => {
  const [timeStart, setTimeStart] = useState(initialTime);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let timer;
    if (isCounting && timeStart > 0) {
      timer = setTimeout(() => setTimeStart(timeStart - 1), 1000);
    } else if (timeStart === 0) {
      setIsCounting(false);
      callback();
    }
    return () => clearTimeout(timer);
  }, [isCounting, timeStart, callback]);

  const startCountdown = () => {
    setTimeStart(initialTime);
    setIsCounting(true);
  };

  return { timeStart, isCounting, startCountdown };
};

export default useCountdownTimer;
