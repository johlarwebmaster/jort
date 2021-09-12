import React, {useState,useRef,useEffect} from 'react';




const Time = (props) => {
    let defaultTime=useRef(null);
    let offset=useRef(null)
    let stopWatch
    const [text, setText] = useState("");

    let onFinish=props.onFinsh||function (){
        return null
      }
 
    function counter(){
        //add 1 millisecond to offset calculation time
        let delta=defaultTime.current+offset.current-Date.now()
        console.log(offset.current)
        if(delta<0){
            setText("00:00:00")
            clearInterval(stopWatch)
            return
        }
        delta = new Date(delta)
    
        
        setText(`${returnTimeString(delta.getUTCHours())}:${returnTimeString(delta.getUTCMinutes())}:${returnTimeString(delta.getUTCSeconds())}`);

    }

    function returnTimeString(number){
        if(number>=10){
            return `${number}`
        }
        return `0${number}`
    }
  
    useEffect(() => {
        //this should be a prop and not hardcoded to 15
        defaultTime.current=Date.now()+25000
        //Some of the Later clocks seem to start sooner, adds a higher offset for the earlier indexes.
        offset.current=1000-(250*props.index)
        stopWatch = setInterval(counter, 1000);
      }, []);




   

  

    return(
        <React.Fragment>
            <div>{text}</div>
        </React.Fragment>
    )
};

export default Time;