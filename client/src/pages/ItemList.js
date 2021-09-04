import React, { useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';

const ItemList = props => {
    const { fetchItems } = props;

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Container className="App">
            <Row>
                {props.items.map(i => {
                    if (i.id) return (
                        <Col md={6} key={i.id} className="my-2">
                            <ItemCard item={i} />
                        </Col>
                )})}
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        items: Object.values(state.items),
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        fullName: state.auth.fullName,
        email: state.auth.email,
        imageUrl: state.auth.imageUrl
    }
};

export default connect(mapStateToProps, { fetchItems })(ItemList);
