import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

const CountdownTimer = ({ requestDate, duration, reqtype }) => {
  const [countdownTime, setCountdownTime] = useState(0);
  // const duration = 20 * 60 * 60 * 1000;

  useEffect(() => {
    const updateCountdown = () => {
      const requestDateInMs = new Date(requestDate).getTime() + duration;
      const currentTime = new Date().getTime();
      let timeDifference = requestDateInMs - currentTime;

      if (timeDifference <= 0) {
        setCountdownTime(0);
        return;
      }
      timeDifference = Math.round(timeDifference / 1000) * 1000;

      setCountdownTime(timeDifference);
    };

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [requestDate, duration]);

  return (
    <Countdown
      date={Date.now() + countdownTime}
      renderer={({ hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span>00:00:00</span>;
        } else if (reqtype) {
          const paddedHours = String(hours).padStart(2, '0');
          const paddedMinutes = String(minutes).padStart(2, '0');
          return (
            <span>
              {paddedHours}h:{paddedMinutes}m
            </span>
          );
        } else {
          const paddedHours = String(hours).padStart(2, '0');
          const paddedMinutes = String(minutes).padStart(2, '0');
          const paddedSeconds = String(seconds).padStart(2, '0');
          return (
            <span>
              {paddedHours}:{paddedMinutes}:{paddedSeconds}
            </span>
          );
        }
      }}
    />
  );
};

export default CountdownTimer;
