import { useCallback, useRef, useState, useEffect } from "react";

export function getSeconds(sec) {
  if(sec % 60 < 10) {
    return '0' + (sec % 60);
  }
  return `${sec % 60}`
}
export function getMinutes(sec) {
  if(sec / 60 < 10) {
    return '0' + Math.floor(sec/60)
  }
  return Math.floor(sec/60)
}

export function useStopwatch(min) {
  const [seconds, setSeconds] = useState(60 * min);
  const [pending, setPending] = useState(false);
  let reference = useRef(null);


  const stop = useCallback(function () {
    clearInterval(reference.current)
    setPending(false);
  }, [])

  const start = useCallback( function () {
    setPending(true);
    reference.current = setInterval(() => {
      if(seconds > 0) {
        setSeconds(prev => prev - 1);
      } else {
        stop();
      }
    }, 1000)
  }, [seconds, stop])
  
  const reset = useCallback(function () {
   stop();
   setSeconds(min * 60);
  }, [min, stop])

  useEffect(function () {
    if(seconds === 0) {
      reset();
    }
  }, [reset, seconds])

  return [seconds, start, stop, reset, pending]
}