import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import ReactTimerStopwatch from "react-stopwatch-timer";
import { connect } from "react-redux";
import { bidItem, fetchItem } from "../actions";

const ItemCard = (props) => {
  const { fetchItem, bidItem } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchItem(props.item.id);
  }, []);

  const prebidTime = new Date(props.item.sellTimer);
  prebidTime.setHours(prebidTime.getHours() + 6);
  const nowTime = new Date().getTime();
  const timeRemaining = prebidTime - nowTime;

  const preHours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const preMins = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const preSecs = Math.floor((timeRemaining / 1000) % 60);

  const bidTime = new Date(props.item.timerBid);
  bidTime.setSeconds(bidTime.getSeconds() + 20);
  const bidTimeRemaining = bidTime - nowTime;
  console.log(bidTimeRemaining)

  const bidSecs = Math.floor((bidTimeRemaining / 1000) % 60);

  const fromTime = (props.item.timerSet !== true) ? new Date(0, 0, 0, preHours, preMins, preSecs) : new Date(0, 0, 0, 0, 0, bidSecs);

  if (timeRemaining <= 0 && props.item.timerSet === false) {
    bidItem(props.item.id, { timerSet: true, timerBid: new Date().toLocaleString() })
  }

  if (props.item.timerSet === true && props.item.timerBid <= 0) {
    if (props.item.bidCounter > 2) {
      bidItem(props.item.id, { timerBid: new Date().toLocaleString(), bidCounter: props.item.bidCounter + 1 })
    } else {
      bidItem(props.item.id, { itemSold: true })
    }
  }

  const bidClick = (id, increment, newBid, buyerId, buyerName, buyerEmail, buyerImage) => {
    if (timeRemaining <= 0) {
      bidItem(id, {
        timerSet: true,
        timerBid: new Date().toLocaleString()
      })
    } else if (timeRemaining > false) {
      bidItem(id, {
        timerSet: false,
        emails: {...props.item.emails, buyerEmail},
      })
    }
    bidItem(id, {
      currentBid: newBid,
      newBid: (parseFloat(newBid) + parseFloat(increment)).toFixed(2),
      buyerId: buyerId,
      buyerName: buyerName,
      buyerEmail: buyerEmail,
      buyerImage: buyerImage,
    })
  }

  return (
    <div>
      <Card>
        <Card.Header as="h4" className="bg-secondary title-text">
          {props.item.title}
        </Card.Header>
        <Card.Body className="px-0">
          <img src="" alt="placeholder" width="100%" height="200" /><br /><br />
          <Card.Text className="px-4">{props.item.shortdesc}</Card.Text>
          <Button
            variant="primary"
            className="btn-block text-center increase-bid"
            onClick={() => bidClick(
              props.item.id,
              props.item.increment,
              props.item.newBid,
              props.currentUserId,
              props.firstName,
              props.email,
              props.imageUrl
            )}
          >
            Next Bid: ${props.item.newBid}<br />
            Currently at ${props.item.currentBid}
          </Button>
          <Row>
            <Col md={6}>
              <ReactTimerStopwatch isOn={true} className="react-stopwatch-timer__table" watchType="timer" displayCircle={true} color="green" hintColor="red" fromTime={fromTime}>
                {props.item.timerSet === false ?
                  <div>Time until<br />prebid ends</div>
                : <div>Time<br />remaining</div>
                }
              </ReactTimerStopwatch>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              &nbsp;
            </Col>
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