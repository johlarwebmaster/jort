import React, { useEffect, useState } from "react";
import { Row, Col, ProgressBar, Card, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchItem, bidItem } from "../actions";
import PopUp from "./PopUp";

const ItemCard = (props) => {
  const { fetchItem, bidItem } = props;
  const [show, setShow] = useState(false);
  const [pop, setPop] = useState(false);

    const handleClose = () => setShow(false);
    
    useEffect(() => {
        fetchItem(props.item.id);
        const currentDate = new Date();
        const postDate = new Date(props.item.sellTimer);
        var hours = Math.floor(Math.abs(currentDate - postDate) / 36e5);
        if (hours >= 6) {
            bidItem(props.item.id, {timerSet: true});
        }
        if (props.item.timerSet === true && props.item.bidTimer > 0) {
            const interval = setInterval(() => {
                bidItem(props.item.id, {bidTimer: props.item.bidTimer - 1});
            }, 100);
            return () => clearInterval(interval);
        } else {
            if (props.item.bidCount < 2) {
                bidItem(props.item.id, {bidTimer: 100, bidCount: props.item.bidCount + 1});
            } else if (props.item.bidCount === 2 && props.item.buyerId) {
                bidItem(props.item.id, {itemSold: true});
                if (props.currentUserId === props.item.buyerId) {
                    setShow(true);
                }
            }
        }
    }, [props.item.bidTimer])

  useEffect(() => {
    fetchItem(props.item.id);
    if (props.item.bidTimer && props.item.bidTimer > 0) {
      const interval = setInterval(
        () => bidItem(props.item.id, { bidTimer: props.item.bidTimer - 1 }),
        100
      );
      return () => clearInterval(interval);
    } else {
      if (props.item.bidCount < 2) {
        bidItem(props.item.id, {
          bidTimer: 100,
          bidCount: props.item.bidCount + 1,
        });
      } else if (props.item.bidCount === 2 && props.item.buyerId) {
        bidItem(props.item.id, { itemSold: true });
        if (props.currentUserId === props.item.buyerId) {
          setShow(true);
        }
      }
    }
  }, [props.item.bidTimer]);

  const bidClick = (id, currBid, prevBid, newBid, buyer, buyerName) => {
    if (currBid) {
      bidItem(id, {
        newBid: (parseFloat(currBid) + parseFloat(newBid)).toFixed(2),
        buyerId: buyer,
        buyerName: buyerName,
        bidTimer: 100,
        bidCount: 0,
      });
    } else if (prevBid) {
      bidItem(id, {
        currentBid: parseFloat(prevBid).toFixed(2),
        newBid: (parseFloat(prevBid) + parseFloat(newBid)).toFixed(2),
        buyerId: buyer,
        buyerName: buyerName,
        bidTimer: 100,
        bidCount: 0,
      });
    }
  };

  const togglePop = () => {
    pop ? setPop(false) : setPop(true);
  };

  return (
    <>
      <Card>
        <Card.Header as="h4" className="bg-secondary title-text">
          {props.item.title}
        </Card.Header>
        {props.item.itemSold !== true ? (
          <Card.Body>
            <Card.Text>{props.item.shortDesc}</Card.Text>
            <Row>
              <Col md={4}>
                <div>
                  <div className="btn" onClick={togglePop}>
                    <Button variant="primary">More Info</Button>
                  </div>
                  {pop ? (
                    <PopUp
                      toggle={togglePop}
                      description={props.item.description}
                    />
                  ) : null}
                </div>
              </Col>
              <Col md={6} className="text-right">
                {props.item.buyerName && (
                  <div className="float-left">
                    {props.item.buyerName} is winning!
                  </div>
                )}
                <div className="float-right">
                  Current Bid:
                  <br />
                  {props.item.newBid ? (
                    <span>{props.item.newBid}</span>
                  ) : (
                    <span>{props.item.currentBid}</span>
                  )}
                </div>
              </Col>
              <Col md={2}>
                {props.item.sellerId !== props.currentUserId ? (
                  <div>
                    {props.item.newBid ? (
                      <Button
                        variant="primary"
                        className="increase-bid"
                        onClick={() =>
                          bidClick(
                            props.item.id,
                            null,
                            props.item.newBid,
                            props.item.increment,
                            props.currentUserId,
                            props.firstName,
                            props.item.bidTimer,
                            props.item.bidCount
                          )
                        }
                      >
                        Bid
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="increase-bid"
                        onClick={() =>
                          bidClick(
                            props.item.id,
                            props.item.currentBid,
                            null,
                            props.item.increment,
                            props.currentUserId,
                            props.firstName,
                            props.item.bidTimer,
                            props.item.bidCount
                          )
                        }
                      >
                        Bid
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button disabled>Bid</Button>
                )}
              </Col>
            </Row>
            <Row>
              <Col>&nbsp;</Col>
            </Row>
            <Card.Footer>
              <Row>
                <Col>
                  {props.item.bidCount === 0 && (
                    <ProgressBar
                      animated
                      variant="success"
                      now={props.item.bidTimer}
                      label="A new bidder has emerged"
                    />
                  )}
                  {props.item.bidCount === 1 && (
                    <ProgressBar
                      animated
                      variant="warning"
                      now={props.item.bidTimer}
                      label="Going once..."
                    />
                  )}
                  {props.item.bidCount === 2 && (
                    <ProgressBar
                      animated
                      variant="danger"
                      now={props.item.bidTimer}
                      label="GOING TWICE..."
                    />
                  )}
                </Col>
              </Row>
            </Card.Footer>
          </Card.Body>
        ) : (
          <Card.Body>
            <h1 className="display-1 text-center">This item is sold</h1>
          </Card.Body>
        )}
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName="modal-90w"
      >
        <h1 className="text-center">You won!</h1>
        <h3 className="text-center">
          Please fill out the information below to claim your treasure!
        </h3>
      </Modal>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
    return {
        item: state.items[ownProps.item],
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        email: state.auth.email,
        imageUrl: state.auth.imageUrl
    }
};

export default connect(mapStateToProps, { fetchItem, bidItem })(ItemCard);
