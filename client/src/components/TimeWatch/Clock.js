import React, { useEffect, useState ,useRef} from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import ReactTimerStopwatch from "./TimeWatch/ReactTimerStopwatch";
import BidButton from "./BidButton";
import {useFirebase } from 'react-redux-firebase'


export default function Clock(){
  const { fetchItem } = props;
  const [ready,setReady] = useState(null);
  const [text, setText] = useState("");
  /*init information sent from parent to itemcard initial information
  * fetch item id
  * fetch inital time
Example Variables being passed as props currently

bidCount: 0
bidTimer: 100
buyerEmail: "johlarinc@gmail.com"
buyerId: "116797558973696757598"
buyerImage: "https://lh3.googleusercontent.com/a/AATXAJwrq27_CVXVbPc5PjZpHz3Z_vqNFQOIg2gVyvXt=s96-c"
buyerName: "John"
category: "select"
currentBid: "5.00"

//should probably add something about current finish time
// Decide how we want to calcuate the other finish times

  */

  const firebase = useFirebase()
  const maxTime=props.item.value.sellTimer
  const bidCount=props.item.value.bidCount
  // We need to apply some useeffects, only when the value changes and not when
  // it is intialized
  const bidCountBool=useRef(false)
  const stopWatch=useRef()
  // just for testing
  const bidMax=40



  const bidItem = (id, payload) => {
    return firebase.update(`items/${id}`, payload)
  }
  
  


  const bidClick = (id, newBid, username, email, userid) => {
    if(userid !== props.item.value.buyerId && userid !== props.item.value.sellerId){
      bidItem(id, { currentBid: newBid,buyerName: username, buyerEmail: email, buyerId: userid,bidCount:1,sellTimer:firebase.database.ServerValue.TIMESTAMP.increment(20000)})
    }
 
    else{
          
      if(userid == props.item.value.buyerId){
        
        alert("you are currently the highest bidder");
      
      }

      else{
        
        alert("You can't bid on an item you are selling");
      
      }
    }
  }
  //Closes Timer Resets Clock
  function clearTimer(){
    setText("00:00:00")
    clearInterval(stopWatch.current)
  }



  function counter(){
    //add 1 millisecond to offset calculation time
    let delta=new Date(maxTime).getTime()-Date.now()+1000
    //Give 3 seconds for last minute bid to be processed 
     if(delta<-3000){
      clearTimer()
      return
    }
    if (delta<0){
      setText("00:00:00")
      return
    }
    delta = new Date(delta)
    setText(`${returnTimeString(delta.getUTCHours())}:${returnTimeString(delta.getUTCMinutes())}:${returnTimeString(delta.getUTCSeconds())}`);

}


useEffect(() => {
  fetchItem(props.item.value.id);
 }, []);

 useEffect(() => {
   if(bidCount>0 && bidCount<bidMax){
    stopWatch.current=setInterval(counter)
    setReady(true)
   }
   // Do something for other timers
    else{
      setReady(false)
    }
 }, []);


 useEffect(() => {
   console.log(bidCount,ready,props.item.value.id)
   //skips initialization of bidCounter
   if (bidCountBool.current==false){
    bidCountBool.current=true
    return
   }
  
   // close timer
  if(bidCount>=bidMax && bidCountBool.current){
    clearTimer()
    setReady(false)
  }
  else if(bidCount>0 && bidCount<bidMax && bidCountBool.current){
    console.log("tatt",stopWatch)
    clearTimer()
    console.log(maxTime,stopWatch)
    stopWatch.current=setInterval(counter)
  }

}, [bidCount]);


  const getNextBid = () =>{
    return `${Number(props.item.value.currentBid) + Number(props.item.value.increment)}.00`
  }


function returnTimeString(number){
  if(number>=10){
      return `${number}`
  }
  return `0${number}`
}


  return (
    <div>
      <Card>
        <Card.Header as="h4" className="bg-secondary item-title">
          {props.item.value.title}
        </Card.Header>
        <Card.Body className="px-0">
          {props.item.file1 ?
            <img src={props.item.file1} alt={props.item.title} width="100%" height="200" />
          : <img src="https://jortinc.com/img/1200px-No-Image-Placeholder.svg.png" alt="placeholder" width="100%" height="200" /> }
          <br /><br />
          <Card.Text className="px-4">{props.item.shortdesc}</Card.Text>
          <BidButton
          ready={ready}
          variant="primary"
          className="btn-block text-center increase-bid"
          onClick={() => bidClick(props.item.value.id, getNextBid(), props.firstName, props.email, props.currentUserId)}
          nextBid={getNextBid()}
          currentBid={props.item.value.currentBid}
          >
            
          </BidButton>
          <Row>
            <Col md={6}>
        
              <ReactTimerStopwatch className="react-stopwatch-timer__table" color="green" hintColor="red"  index={props.index} text={text}>
                {props.item.value.timerSet === false ?
                  <div>Time until<br />prebid ends</div>
                : <div>Time<br />remaining</div>
                }
              </ReactTimerStopwatch>
            </Col>
            {props.item.value.buyerId &&
              <Col md={6}>
                <img src={props.item.buyerImage} width="50" height="50" />&nbsp;&nbsp;
                {props.item.buyerName} is winning!
              </Col>
            }
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}



