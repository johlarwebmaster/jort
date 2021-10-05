import React, { useEffect, useState ,useRef} from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import ReactTimerStopwatch from "./TimeWatch/ReactTimerStopwatch";
import { connect } from "react-redux";
import { fetchItem, bidItem } from "../actions";
import BidButton from "./BidButton";
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'


const ItemCard = (props) => {
  const { fetchItem } = props;
  const [bidCount, setBidCount] = useState(null);
  const [ready,setReady] = useState(null);
  const maxTime = useRef(null);
  const [text, setText] = useState("");
  let stopWatch;
  
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


  const bidItem = (id, payload) => {
    return firebase.update(`items/${id}`, payload)
  }



  const bidClick = (id, newBid, username, email, userid) => {
    if(bidCount>0){
      clearInterval(stopWatch)
      maxTime.current=Date.now()+20000
    }
    if(userid !== props.item.value.buyerId && userid !== props.item.value.sellerId){
      
      bidItem(id, { currentBid: newBid,buyerName: username, buyerEmail: email, buyerId: userid })

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


function handleFinish(){
    setBidCount(bidCount+1)
  }

  function counter(){
    //add 1 millisecond to offset calculation time
    let delta=maxTime.current-Date.now()+1000
    //Give 3 seconds for last minute bid to be processed 
     if(delta<-3000){
      clearInterval(stopWatch)
      handleFinish()
      return
    }
    else if(delta<0){
      setText("00:00:00")
      setReady(null)
      return      
  }
    delta = new Date(delta)
    setText(`${returnTimeString(delta.getUTCHours())}:${returnTimeString(delta.getUTCMinutes())}:${returnTimeString(delta.getUTCSeconds())}`);

}


useEffect(() => {
  fetchItem(props.item.value.id);
  setBidCount(0)
  // console.log(props.item.value)
 }, []);

 useEffect(() => {
   if(bidCount==0){
    maxTime.current=Date.now()+20000
    stopWatch=setInterval(counter)
    setReady(true)
   }
    else if(bidCount<3){
    maxTime.current=Date.now()+20000
    stopWatch=setInterval(counter)
    setReady(true)
      }
    else{
      setReady(false)
    }
 }, []);

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
          {/* <Button
            variant="primary"
            className="btn-block text-center increase-bid"
            onClick={bidClick}
          >
            Next Bid: ${props.item.value.newBid}<br />
            Currently at ${props.item.value.currentBid}
          </Button> */}
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

const mapStateToProps = (state, ownProps) => {
  return {
    item: ownProps.item,
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    email: state.auth.email,
    imageUrl: state.auth.imageUrl,
  };
};

export default connect(mapStateToProps, { fetchItem, bidItem })(ItemCard);
