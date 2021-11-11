import React, {useState,useEffect,useRef} from 'react';
import './ReactTimerStopwatch.css';
import Circle from "./Component/Circle/Circle";
import Time from "./Component/Time/Time";

const ReactTimerStopwatch = (props) => {
  const [text, setText] = useState("")
  const [hint, setHint] = useState(0);    
  
  const offset = 2000
  let normalTimer = props.normalTimer
  let quickTimer = props.quickTimer
  const whichTimer = props.whichTimer
  const stopWatch = useRef()

  const setBidStatus = props.setBidStatus
  let ready = props.ready

  const getHint = (h) => {
    setHint(h);
  };
   
  function counter() {
    let currtime = Date.now()
    let data = whichTimer()
    let delta = data[1] - currtime
    if (delta<0) {
      setText("00:00:00")
    }
    if (data[0] === null) {
      setText("00:00:00")
      clearInterval(stopWatch.current)
      return
    }
    setText(returnTimeString(delta));
  }

  function returnTimeString(number) {
    let hours = Math.floor(number/3600000)
    let minutes = Math.floor((number-(hours*3600000))/60000)
    let seconds = Math.ceil((number-(hours*3600000)-(60000*minutes))/1000)
    return `0${hours}:`.slice(-3)+`0${minutes}:`.slice(-3)+`0${seconds}`.slice(-2)
  }

  useEffect(() => {
    if (ready) {
     stopWatch.current = setInterval(counter,500)
    } else {
      setText("00:00:00")
    }
  }, [ready]);

  //setinterval can't detect changes on its own
  useEffect(() => {
    clearInterval(stopWatch.current)
    stopWatch.current = setInterval(counter,500)
  }, [quickTimer,normalTimer]);

  return (
    <div className="react-stopwatch-timer__table">
      <Time setMaxTime={props.setMaxTime} getMaxTime={props.getMaxTime} onFinsh={props.onFinsh} index={props.index} text={text} />
      <Circle color={props.color} tintColor={props.hintColor} hint={hint} />
    </div>
  );
};

export default ReactTimerStopwatch;
