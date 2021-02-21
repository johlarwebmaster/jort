import React from 'react';
import ItemCard from '../components/ItemCard';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';

class ItemList extends React.Component {
    componentDidMount() {
        this.props.fetchItems();
    }

    render() {
        return (
            <Container fluid className="App">
                {this.props.items.map(item => {
                    return (
                        <Row className="my-2" key={item.id}>
                            <Col md={3}>
                                <img src={item.imagepath} width="100%" alt={item.imagealt} />
                            </Col>
                            <Col md={9}>
                                <ItemCard
                                    title={item.title}
                                    desc={item.shortdesc}
                                    progress={90}
                                    variant="success"
                                    time="9:00"
                                    img={item.img}
                                    ldesc={item.description}
                                    itemId={item.id}
                                />
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
        currentUserId: state.auth.userId
    }
};

export default connect(mapStateToProps, { fetchItems })(ItemList);
