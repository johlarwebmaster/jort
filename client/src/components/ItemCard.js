import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ProgressBar, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchItem, bidItem } from '../actions';

const ItemCard = props => {
    const { fetchItem, bidItem } = props;
    
    useEffect(() => {
        fetchItem(props.item.id);
        if (props.item.bidTimer && props.item.bidTimer > 0) {
            const interval = setInterval(() => bidItem(props.item.id, {bidTimer: props.item.bidTimer - 1}), 100);
            return () => clearInterval(interval);
        } else {
            if (props.item.bidCount < 2) {
                bidItem(props.item.id, {bidTimer: 100, bidCount: props.item.bidCount + 1});
            } else if (props.item.bidCount === 2 && props.item.buyerId) {
                bidItem(props.item.id, {itemSold: true});
            }
        }
    }, [props.item.bidTimer])

    const bidClick = (id, currBid, prevBid, newBid, buyer, buyerName) => {
        if (currBid) {
            bidItem(id, {newBid: (parseFloat(currBid) + parseFloat(newBid)).toFixed(2), buyerId: buyer, buyerName: buyerName, bidTimer: 100, bidCount: 0 });
        } else if (prevBid) {
            bidItem(id, {currentBid: parseFloat(prevBid).toFixed(2), newBid: (parseFloat(prevBid) + parseFloat(newBid)).toFixed(2), buyerId: buyer, buyerName: buyerName, bidTimer: 100, bidCount: 0 });
        }
    }

    return (
        <Card>
            <Card.Header as="h4" className="bg-secondary title-text">{props.item.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.item.shortDesc}
                </Card.Text>
                <Row>
                    <Col md={4}>
                        <Link to="/" className="text-white">
                            <Button variant="primary">
                                More Info
                            </Button>
                        </Link>
                    </Col>
                    <Col md={6} className="text-right">
                        {props.item.buyerName &&
                            <div className="float-left">
                                {props.item.buyerName} is winning!
                            </div>
                        }
                        <div className="float-right">
                            Current Bid:<br />
                            {props.item.newBid ?
                                <span>{props.item.newBid}</span> :
                                <span>{props.item.currentBid}</span>
                            }
                        </div>
                    </Col>
                    <Col md={2}>
                        {props.item.sellerId !== props.currentUserId ?
                            <div>
                                {props.item.newBid ?
                                    <Button variant="primary" className="increase-bid" onClick={() => bidClick(props.item.id, null, props.item.newBid, props.item.increment, props.currentUserId, props.firstName, props.item.bidTimer, props.item.bidCount)}>
                                        Bid
                                    </Button> :
                                    <Button variant="primary" className="increase-bid" onClick={() => bidClick(props.item.id, props.item.currentBid, null, props.item.increment, props.currentUserId, props.firstName, props.item.bidTimer, props.item.bidCount)}>
                                        Bid
                                    </Button>
                                }
                            </div> :
                            <Button disabled>Bid</Button>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>&nbsp;</Col>
                </Row>
                <Card.Footer>
                    <Row>
                        {props.item.bidCount &&
                            <Col>
                                <ProgressBar animated now={props.item.bidTimer} />
                            </Col>
                        }
                    </Row>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: state.items[ownProps.item],
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId,
        firstName: state.auth.firstName
    }
};

export default connect(mapStateToProps, { fetchItem, bidItem })(ItemCard);
