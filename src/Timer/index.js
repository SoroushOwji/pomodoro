import React, { useState, useEffect, useCallback, useRef } from "react";
import { VscDebugStart, VscDebugStop } from 'react-icons/vsc';

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

function useStopwatch(min) {
  const [seconds, setSeconds] = useState(60 * min);
  const [pending, setPending] = useState(false);
  let reference = useRef(null);

  const stop = useCallback(function () {
    console.log('stopping')
    clearInterval(reference.current)
    setPending(false);
  }, [])

  const start = useCallback( function () {
    console.log('starting')
    setPending(true);
    reference.current = setInterval(() => {
      if(seconds > 0) {
        setSeconds(prev => prev - 1);
      } else {
        stop();
      }
    }, 1000)
  }, [seconds, stop])

  return [seconds, start, stop, pending]
}

export default function Timer() {
  const [timer, start, stop, pending] = useStopwatch(25);

  useEffect(() => {
    return stop();
  }, [stop])

  useEffect(() => {
    document.title = `${getMinutes(timer)}:${getSeconds(timer)}`
  }, [timer])

  const button = pending
    ? <button onClick={stop} className="timer__button"><VscDebugStop /></button>
    : <button onClick={start} className="timer__button"><VscDebugStart /></button>

  return (
    <div className="timer">
      <h1 className="timer__counter">{getMinutes(timer)}:{getSeconds(timer)}</h1>
      {button}

    </div>
  )
}