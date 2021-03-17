import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { Container, Row, Col, Form } from 'react-bootstrap';

class Profile extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '274457437956-76ugng8lf8rkae8u037blhuj802113ma.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId(), this.auth.currentUser.get().getBasicProfile().getGivenName(), this.auth.currentUser.get().getBasicProfile().getFamilyName(), this.auth.currentUser.get().getBasicProfile().getName());
        } else {
            this.props.signOut();
        }
    };

    render() {
        return (
            <Container className="App">
                <h2>Edit Profile</h2>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId, firstName: state.auth.firstName, lastName: state.auth.lastName, fullName: state.auth.fullName };
};

export default connect(mapStateToProps, { signIn, signOut })(Profile);