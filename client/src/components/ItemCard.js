

import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
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
  const [itemImage, setItemImage] = useState("https://jortinc.com/img/1200px-No-Image-Placeholder.svg.png");
  const [itemImageAlt, setItemImageAlt] = useState("No image available");

  const firebase = useFirebase()
  const offset=2000

  let normalTimer=props.item.value.normalTimer
  let quickTimer=props.item.value.quickTimer

 const bidItem = (id, payload) => {
    return firebase.update(`items/${id}`, payload)
  }

  const bidClick = (id, newBid, username, email, userid, image) => {
    let timer=whichTimer()[0]
   
    
    //test variables
    if((userid !== props.item.value.buyerId && userid !== props.item.value.sellerId) || !props.item.value.buyerId) {
      if(timer=="normal"){
        bidItem(id, { currentBid: newBid, buyerName: username, buyerEmail: email, buyerId: userid, bidCount:props.item.value.bidCount+1, buyerImage: image})
      }
      else if(timer==null){
        alert("Bidding has Ended")
        if (userid === props.item.value.buyerId) {
          alert("You won!")
        }
      }
      // For some reason this needs a delay, otherwise new value is too high
      else{
        
        bidItem(id, { currentBid: newBid,buyerName: username, buyerEmail: email, buyerId: userid,bidCount:props.item.value.bidCount+1, buyerImage: image, quickTimer:firebase.database.ServerValue.increment(60000-(quickTimer-Date.now())-2000)})

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
    console.log(normal,quick)
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
      setReady(false)
      return [null,quickTimer]
    }

  }

useEffect(() => {
  fetchItem(props.item.value.id);
  if (props.item.value.file1) {
    setItemImage(props.item.value.file1);
    setItemImageAlt(props.item.value.title);
  }
 }, []);

  useEffect(() => {
    console.log(whichTimer()[1]-Date.now()+offset>0)
    if(whichTimer()[1]-Date.now()+offset>0){
     setReady(true)
    }
    else{
     setReady(false)
    }
     
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
          <div className="card-img-holder">
            <img src={itemImage} alt={itemImageAlt} className="card-img" />
          </div>
          {props.item.value.file1 &&
            <Container className="img-prev-holder">
              <Row>
                <Col className="col-2">
                  <a onMouseEnter={() => setItemImage(props.item.value.file1)} onClick={() => setItemImage(props.item.value.file1)}>
                    <img src={props.item.value.file1} alt="Click to see this image" className="img-thumbnail" />
                  </a>
                </Col>
                {props.item.value.file2 &&
                  <Col className="col-2">
                    <a onMouseEnter={() => setItemImage(props.item.value.file2)} onClick={() => setItemImage(props.item.value.file2)}>
                      <img src={props.item.value.file2} alt="Click to see this image" className="img-thumbnail" />
                    </a>
                  </Col>
                }
                {props.item.value.file3 &&
                  <Col className="col-2">
                    <a onMouseEnter={() => setItemImage(props.item.value.file3)} onClick={() => setItemImage(props.item.value.file3)}>
                      <img src={props.item.value.file3} alt="Click to see this image" className="img-thumbnail" />
                    </a>
                  </Col>
                }
                {props.item.value.file4 &&
                  <Col className="col-2">
                    <a onMouseEnter={() => setItemImage(props.item.value.file4)} onClick={() => setItemImage(props.item.value.file4)}>
                      <img src={props.item.value.file4} alt="Click to see this image" className="img-thumbnail" />
                    </a>
                  </Col>
                }
                {props.item.value.file5 &&
                  <Col className="col-2">
                    <a onMouseEnter={() => setItemImage(props.item.value.file5)} onClick={() => setItemImage(props.item.value.file5)}>
                      <img src={props.item.value.file5} alt="Click to see this image" className="img-thumbnail" />
                    </a>
                  </Col>
                }
                {props.item.value.file6 &&
                  <Col className="col-2">
                    <a onMouseEnter={() => setItemImage(props.item.value.file6)} onClick={() => setItemImage(props.item.value.file6)}>
                      <img src={props.item.value.file6} alt="Click to see this image" className="img-thumbnail" />
                    </a>
                  </Col>
                }
              </Row>
            </Container>
          }
          <Card.Text className="px-4">{props.item.value.shortdesc}</Card.Text>
          <BidButton
          ready={ready}
          variant="primary"
          className="btn-block text-center increase-bid"
          onClick={() => bidClick(props.item.value.id, getNextBid(), props.firstName, props.email, props.currentUserId, props.imageUrl)}
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
            {props.item.value.buyerName &&
              <Col md={6}>
                <img src={props.item.value.buyerImage} width="50" height="50" />&nbsp;&nbsp;
                {props.item.value.buyerName} is winning!
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
