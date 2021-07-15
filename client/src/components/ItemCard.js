import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ProgressBar, Row, Col, Button } from 'react-bootstrap';

const ItemCard = (props) => {

    const [bid, setBid] = useState(props.price);

    const buttonClick = () => {
        setBid(bid + props.increment);
        console.log(bid);
    }

    return (
        <Card>
            <Card.Header as="h4" className="bg-secondary title-text">{props.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.desc}
                </Card.Text>
                <Row>
                    <Col md={4}>
                        <Button variant="primary">
                            <Link to={`/items/${props.itemId}`} className="text-white">
                                More Info
                            </Link>
                        </Button>
                    </Col>
                    <Col md={6} className="text-right">
                        Current Bid:<br />
                        ${props.price}
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" className="increase-bid" onClick={() => buttonClick}>Bid</Button>
                    </Col>
                </Row>

                <Row>
                    <Col>&nbsp;</Col>
                </Row>
                <Card.Footer>
                    <Row>
                        <Col md={9}>
                            <ProgressBar animated variant={props.variant} now={props.progress} />
                        </Col>
                        <Col md={3}>
                            {props.time}
                        </Col>
                    </Row>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default ItemCard;