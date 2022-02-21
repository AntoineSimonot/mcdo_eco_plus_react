import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import '../Style/Timer.css';

export default function Timer({ expiryTimestamp }) {
  const [expired, setExpired ] = useState(false);
  const {
    seconds,
    minutes,
  } = useTimer({ expiryTimestamp, onExpire: () => setExpired(true) });


  return (
    <div className={ expired === true ? "red timer" : "green timer"}>
      <p>Timer</p>
      <div style={{fontSize: '30px'}}>
        <span>0{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  )
}

