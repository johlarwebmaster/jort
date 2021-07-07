import React from 'react';
import { connect } from 'react-redux';
import { Container, Form } from 'react-bootstrap';

class Profile extends React.Component {
    render() {
        return (
            <Container className="App">
                <h2>{this.props.fullName}'s Profile</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder={this.props.firstName} disabled />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder={this.props.lastName} disabled />
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        fullName: state.auth.fullName
    }
}

export default connect(mapStateToProps)(Profile);