import React, { useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import { Row, Col, Container } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const ItemList = props => {
    useFirebaseConnect([
        'items'
    ])
    
    const items = useSelector((state) => state.firebase.ordered.items)

    if (!isLoaded(items)) {
        return (
            <Container className="App">
                <Row className="flex-center">
                    <img src="assets/boat-wave.gif" alt="loading" />
                </Row>
            </Container>
        )
    }

    if (isEmpty(items)) {
        return <div>Todos List Is Empty</div>
    }

    return (
        <Container className="App">
            <Row>
                {Object.keys(items).map( (key, id) => {
                    return (
                        <Col md={6} key={key} className="my-2">
                            <ItemCard id={id} item={items[key]} />
                        </Col>
                    )
                })}
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

export default connect(mapStateToProps)(ItemList);
