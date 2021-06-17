import React from 'react';
import { connect } from 'react-redux';
import { fetchItem } from '../actions';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

class ItemPage extends React.Component {

    componentDidMount() {
        this.props.fetchItem(this.props.match.params.id);
    }

    render() {
        console.log(this.props)
        if (!this.props.item) {
            return <div>Loading...</div>
        }
        
        return (
            <Container className="App">
                <Row>
                    <Col md={3}>
                        <img src={this.props.item.imagepath} width="100%" alt={this.props.item.imagealt} />
                    </Col>
                    <Col md={9}>
                        <h2 className="bg-primary">{this.props.item.title}</h2>
                        <p>{this.props.item.description}</p>
                        <h5 className="text-secondary">${this.props.item.price}</h5>
                        <ProgressBar animated variant="success" now={90} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
        item: state.items[ownProps.match.params.id],
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchItem })(ItemPage);
