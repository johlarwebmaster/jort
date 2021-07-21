import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, ProgressBar, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchItems, bidItem } from '../actions';

class ItemList extends React.Component {
    componentDidMount() {
        this.props.fetchItems();
    }

    bidClick = (id, open, bid, user, userName) => {
        const newBid = parseFloat(open) + parseFloat(bid);
        this.props.bidItem(id, {openingBid: newBid.toFixed(2), buyerId: user, buyerName: userName });
    }

    render() {
        return (
            <Container fluid className="App">
                {this.props.items.map(item => {
                    return (
                        <Row className="my-2" key={item.id}>
                            <Col md={3}>
                                &nbsp;
                            </Col>
                            <Col md={9}>
                                <Card>
                                    <Card.Header as="h4" className="bg-secondary title-text">{item.title}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {item.shortDesc}
                                        </Card.Text>
                                        <Row>
                                            <Col md={4}>
                                                <Link to={`/items/${item.id}`} className="text-white">
                                                    <Button variant="primary">
                                                        More Info
                                                    </Button>
                                                </Link>
                                            </Col>
                                            <Col md={6} className="text-right">
                                                {item.buyerName &&
                                                    <div className="float-left">
                                                        {item.buyerName} is winning!
                                                    </div>
                                                }
                                                <div className="float-right">
                                                    Current Bid:<br />
                                                    ${item.openingBid}
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                {item.sellerId === this.props.currentUserId ?
                                                    <Button disabled>Bid</Button> :
                                                    <Button variant="primary" className="increase-bid" onClick={() => this.bidClick(item.id, item.openingBid, item.increment, this.props.currentUserId, this.props.firstName)}>
                                                        Bid
                                                    </Button>
                                                }
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>&nbsp;</Col>
                                        </Row>
                                        <Card.Footer>
                                            <Row>
                                                <Col>
                                                    <ProgressBar animated now={100} />
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: Object.values(state.items),
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId,
        firstName: state.auth.firstName
    }
};

export default connect(mapStateToProps, { fetchItems, bidItem })(ItemList);
