import React, { useEffect, useReducer } from "react";
import { VscDebugStart, VscDebugStop, VscDebugPause } from 'react-icons/vsc';

import { useStopwatch, getMinutes, getSeconds, isEven } from "./utils";
import IconButton from "../IconButton";

import './timer.scss';

const DONE_CYCLE = 'DONE_CYCLE';
const UPDATE_WORK = 'UPDATE_WORK';
const UPDATE_SHORT = 'UPDATE_SHORT';
const UPDATE_LONG = 'UPDATE_LONG';

const initialState = {
  cycles: 0,
  short: 5,
  long: 20,
  work: 25,
  type: 'work',
  done: 0,
}

function reducer(state, { type, payload }) {
  switch (type) {
    case DONE_CYCLE: {
      const cycles = state.cycles + 1
      if(cycles % 8 === 7) {
        return { ...state, type: 'long', cycles, done: state.done + 1 }
      } else if (isEven(cycles)) {
        return { ...state, type: 'short', cycles, done: state.done + 1 }
      } else {
        return { ...state, type: 'work', cycles }
      }
    }
    case UPDATE_WORK : return { ...state, work: payload.min }
    case UPDATE_LONG : return { ...state, long: payload.min }
    case UPDATE_SHORT : return { ...state, short: payload.min }
    default: return { ...state }
  }
}

function init(initialState) {
  return {
    ...initialState
  }
}

export default function Timer() {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const [timer, start, stop, reset, pending, set] = useStopwatch(25);

  useEffect(() => {
    return stop();
  }, [stop])

  const readableTime = `${getMinutes(timer)}:${getSeconds(timer)}`

  useEffect(() => {
    document.title = readableTime;
    if(timer === 0) {
      dispatch({ type: DONE_CYCLE });
    }
  }, [readableTime, reset, timer])

  useEffect(() => {
    set(state[state.type])
  }, [set, state, state.type])

  const actions = pending
    ? (
      <div className="timer__actions">
        <IconButton onClick={stop}><VscDebugPause /></IconButton>
        <IconButton onClick={reset}><VscDebugStop /></IconButton>
      </div>
    )
    : (
      <div className="timer__actions">
        <IconButton onClick={start}><VscDebugStart /></IconButton>
      </div>
    )

  return (
    <div className="timer">
      <div className="timer__header">
        <h6 className="timer__done">today done: {state.done}</h6>
      </div>
      <div className="timer__main">
        <h1 className="timer__counter">{readableTime}</h1>
        <h3>{state.type} {isEven(state.cycles) ? 'break' : 'time'}</h3>
      </div>
      {actions}
    </div>
  )
}
