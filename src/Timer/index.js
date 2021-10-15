import React, {useEffect, useState} from "react";
import { VscDebugStart, VscDebugStop, VscDebugPause } from 'react-icons/vsc';

import { useStopwatch, getMinutes, getSeconds } from "./utils";

import './timer.scss';

export default function Timer() {
  const [timer, start, stop, reset, pending] = useStopwatch(25);
  const [cycles, setCycle] = useState(0);

  useEffect(() => {
    return stop();
  }, [stop])

  useEffect(() => {
    document.title = `${getMinutes(timer)}:${getSeconds(timer)}`
    if(timer === 0) {
      setCycle(cycles => cycles + 1)
    }
  }, [timer])


  const actions = pending
    ? <div>
      <button onClick={stop} className="timer__button"><VscDebugPause /></button>
      <button onClick={reset} className="timer__button"><VscDebugStop /></button>
    </div>
    : <button onClick={start} className="timer__button"><VscDebugStart /></button>

  return (
    <div className="timer">
      <h1 className="timer__counter">{getMinutes(timer)}:{getSeconds(timer)}</h1>
      <h2>{cycles}</h2>
      {actions}
    </div>
  )
}