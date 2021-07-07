import React from 'react';
import ItemCard from '../components/ItemCard';
import FooterMessage from '../components/FooterMessage';
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
                                &nbsp;
                            </Col>
                            <Col md={9}>
                                <ItemCard
                                    title={item.title}
                                    desc={item.shortdesc}
                                    progress={90}
                                    variant="success"
                                    time="9:00"
                                    ldesc={item.description}
                                    itemId={item.id}
                                    price={item.openingBid}
                                />
                            </Col>
                        </Row>
                    )
                })}
                <FooterMessage heading={"TERMS AND CONDITIONS"} message={"Every item, product, and service sold on JORT is subject to our Terms of Service. Please review our terms and conditions if you have any questions."} buttonLink={"terms"} />
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
