import React, { useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';

const ItemList = props => {
    const { fetchItems } = props;

    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <Container fluid className="App">
            {props.items.map(item => (
                <Row className="my-2" key={item.id}>
                    <Col md={3}>
                        &nbsp;
                    </Col>
                    <Col md={9}>
                        <ItemCard item={item.id} />
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        items: Object.values(state.items),
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId,
        firstName: state.auth.firstName
    }
};

export default connect(mapStateToProps, { fetchItems })(ItemList);
