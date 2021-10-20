import React, { useEffect, useState ,useRef} from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import ReactTimerStopwatch from "./TimeWatch/ReactTimerStopwatch";
import { connect } from "react-redux";
import { fetchItem } from "../actions";
import BidButton from "./BidButton";
import BidMessage from "./BidMessage";
import {useFirebase } from 'react-redux-firebase'



const ItemCard = (props) => {
  const { fetchItem } = props;
  const [ready,setReady] = useState(null);
  const [bidstatus,setBidStatus] = useState(0);

  const firebase = useFirebase()
  const offset=2000

  let normalTimer=props.item.value.normalTimer
  let quickTimer=props.item.value.quickTimer




 const bidItem = (id, payload) => {
    return firebase.update(`items/${id}`, payload)
  }



  const bidClick = (id, newBid, username, email, userid) => {
    let timer=whichTimer()[0]
   
    
    //test variables
    let buyerId="Test200"
    userid="test2020"
    if(userid !== props.item.value.buyerId && userid !== props.item.value.sellerId){
      if(timer=="normal"){
        bidItem(id, { currentBid: newBid,buyerName: username, buyerEmail: email, buyerId: userid,bidCount:props.item.value.bidCount+1})
      }
      else if(timer==null){
        alert("Bidding has Ended")
      }
      // For some reason this needs a delay, otherwise new value is too high
      else{
        
        bidItem(id, { currentBid: newBid,buyerName: username, buyerEmail: email, buyerId: userid,bidCount:props.item.value.bidCount+1,quickTimer:firebase.database.ServerValue.increment(60000-(quickTimer-Date.now())-2000)})

      }
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

  function whichTimer(){
    let normal=normalTimer-Date.now()+offset
    let quick=quickTimer-Date.now()+offset
    if(normal>0){
     return ["normal",normalTimer+offset]
    }
    else if(quick>40000){
      setBidStatus(1)
      return ["quick",quickTimer-40000+offset]

    }

    else if(quick<=40000 && quick>20000){
      setBidStatus(2)
      return ["quick",quickTimer-20000+offset]
    
    }

    else if(quick<20000 && quick>0){
      setBidStatus(3)
      return ["quick",quickTimer+offset]
    
    }
    else{
      setBidStatus(0)
      return [null,quickTimer]
    }

  }





  useEffect(() => {
    if(whichTimer()[1]-Date.now()+offset>0){
     setReady(true)
    }
    else{
     setReady(false)
    }
     
  }, []);

useEffect(() => {
  fetchItem(props.item.value.id);
 }, []);


 //temporary alerts
 



  const getNextBid = () =>{
    return `${Number(props.item.value.currentBid) + Number(props.item.value.increment)}.00`
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
          
    
              <ReactTimerStopwatch className="react-stopwatch-timer__table" color="green" hintColor="red"  index={props.index}  normalTimer={props.item.value.normalTimer} quickTimer={props.item.value.quickTimer} whichTimer={whichTimer} setBidStatus={setBidStatus}>
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
          <Row>
         {bidstatus!=0 && <BidMessage bidstatus={bidstatus}></BidMessage>}
       
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

export default connect(mapStateToProps, { fetchItem })(ItemCard);
