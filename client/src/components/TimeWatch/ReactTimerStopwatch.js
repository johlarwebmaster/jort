import React, {useState} from 'react';
import './ReactTimerStopwatch.css';
import Circle from "./Component/Circle/Circle";
import Time from "./Component/Time/Time";

const ReactTimerStopwatch = (props) => {

    const [hint, setHint] = useState(0);
    const getHint = (h) => {
        setHint(h);
    };

    return (
        <div className="react-stopwatch-timer__table">
            <Time setMaxTime={props.setMaxTime} getMaxTime={props.getMaxTime} onFinsh={props.onFinsh} index={props.index} text={props.text}/>
                   <Circle color={props.color} tintColor={props.hintColor} hint={hint}/> 
        </div>
    );
};

export default ReactTimerStopwatch;
