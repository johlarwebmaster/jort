import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ProgressBar, Row, Col, Button } from 'react-bootstrap';

const ItemCard = (props) => {

    return (
        <Card>
            <Card.Header as="h4" className="bg-secondary title-text">{props.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.desc}
                </Card.Text>
                <Button variant="primary">
                    <Link to={`/items/${props.itemId}`} className="text-white">
                        More Info
                    </Link>
                </Button>
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