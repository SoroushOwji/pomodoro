import React, { useState, useEffect } from "react";
import { VscDebugStart } from 'react-icons/vsc';

import './timer.scss';

function getSeconds(sec) {
  if(sec % 60 < 10) {
    return '0' + (sec % 60);
  }
  else return `${sec % 60}`
}
function getMinutes(sec) {
  return Math.floor(sec/60)
}

export default function Timer() {
  const [seconds, setSeconds] = useState(25 * 60)
  let reference;
  function handleStartTimer() {
    reference = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000)
  }
  useEffect(() => {
    return clearInterval(reference);
  }, [reference])

  useEffect(() => {
    document.title = `${getMinutes(seconds)}:${getSeconds(seconds)}`
  }, [seconds])


  return (
    <div className="timer">
      <h1 className="timer__counter">{getMinutes(seconds)}:{getSeconds(seconds)}</h1>
      <button onClick={handleStartTimer} className="timer__button"><VscDebugStart /></button>
    </div>
  )
}