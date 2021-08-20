import React, { useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';
import { FirebaseDatabaseNode } from '@react-firebase/database';

const ItemList = props => {
    const { fetchItems } = props;

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Container fluid className="App">
            <FirebaseDatabaseNode path="items/">
                {data => {
                    const { value } = data;
                    if (value === null || typeof value === "undefined") return null;
                    const keys = Object.keys(value);
                    const values = Object.values(value);
                    return values.map((value, i) => (
                        <Row className="my-2" key={keys[i]}>
                            <Col md={3}>
                                &nbsp;
                            </Col>
                            <Col md={9}>
                                <ItemCard item={keys[i]} />
                            </Col>
                        </Row>
                    ))
                }}
            </FirebaseDatabaseNode>
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
