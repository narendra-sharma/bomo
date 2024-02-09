// CountdownTimer.js
import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

const CountdownTimer = ({ requestDate }) => {
  const [countdownTime, setCountdownTime] = useState(0);
  const duration = 20 * 60 * 60 * 1000;

  useEffect(() => {
    const updateCountdown = () => {
      const requestDateInMs = new Date(requestDate).getTime() + duration;
      const currentTime = new Date().getTime();
      const timeDifference = requestDateInMs - currentTime;

      if (timeDifference > 0) {
        setCountdownTime(timeDifference);
      } else {
        setCountdownTime(0);
      }
    };
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [requestDate]);

  return (
    <Countdown
      date={Date.now() + countdownTime}
      intervalDelay={1000}
      renderer={({ hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span>00:00:00</span>;
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
