import React from 'react';
import { Container, Row, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { addItem } from '../actions';
import { connect } from 'react-redux';

class ItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                title: '',
                description: '',
                shortdesc: '',
                openingBid: '',
                category: 'select',
                sellTimer: Date().toLocaleString(),
                readyToSell: false,
                timerSet: false,
                bidCountdown: 120000,
                bidTime: 0,
                timerUp: false,
                increment: '',
                sellerId: '',
                buyerId: '',
                buyerName: '',
                file1: '',
                file2: '',
                file3: '',
                file4: '',
                file5: '',
                file6: '',
                file7: '',
                file8: '',
                file9: ''
            },
            agreed: false,
            show: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
    };

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ values: { ...this.state.values, sellerId: this.props.currentUserId } });
        this.props.addItem(this.state.values);
    }

    myChangeHandler = (e) => {
        this.setState({
            values: { ...this.state.values, [e.target.name]: e.target.value }
        });
    }

    handleAttachFile = (e) => {
        this.setState({
            values: { ...this.state.values, [e.target.name]: e.target.files }
        });
    }

    handleTosAgreement = (e) => {
        this.setState({
            agreed: !this.state.agreed
        });
    }

    handleModal = (e) => {
        this.setState({
            show: !this.state.show
        })
    }
    
    render() {
        return (
            <Container className="App">
                <h2>What are You Looking to Sell?</h2>
                <Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name of Item</Form.Label>
                            <Form.Control type="text" name="title" id="title" bsSize="lg" required value={this.state.values.title} onChange={this.myChangeHandler} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type of Item</Form.Label>
                            <Form.Control as="select" name="category" id="category" bsSize="lg" required value={this.state.values.category} onChange={this.myChangeHandler}>
                                <option default disabled value={null}>Select One</option>
                                <option value="furniture">Furniture</option>
                                <option value="electronics">Electronics</option>
                                <option value="automotive">Automotive</option>
                                <option value="clothing">Clothing</option>
                                <option value="services">Services</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="textarea" style={{height: '200px'}} name="shortdesc" id="shortdesc" bsSize="lg" required value={this.state.values.shortdesc} onChange={this.myChangeHandler} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Long Description</Form.Label>
                            <Form.Control type="textarea" style={{height: '200px'}} name="description" id="description" bsSize="lg" required value={this.state.values.description} onChange={this.myChangeHandler} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Opening Bid</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="number" name="openingBid" id="openingBid" bsSize="lg" required value={this.state.values.openingBid} onChange={this.myChangeHandler} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bid Increments (How much for each bid increase)</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="number" name="increment" id="increment" bsSize="lg" required value={this.state.values.increment} onChange={this.myChangeHandler} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.File
                                id="file1"
                                label="Featured Image"
                                onChange={this.handleAttachFile}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.File
                                id="file2"
                                label="Image/Video"
                                onChange={this.handleAttachFile}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.File
                                id="file3"
                                label="Image/Video"
                                onChange={this.handleAttachFile}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.File
                                id="file4"
                                label="Image/Video"
                                onChange={this.handleAttachFile}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.File
                                id="file5"
                                label="Image/Video"
                                onChange={this.handleAttachFile}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check type="checkbox">
                                <Form.Check.Input type="checkbox" onChange={this.handleTosAgreement} />
                                <Form.Check.Label>I, {this.props.fullName}, agree that the item or service that I am posting to be sold on JORT meets the <a href="#" onClick={this.handleModal}>Terms and Conditions</a> as outlined by JORT.</Form.Check.Label>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit" disabled={!this.state.agreed}>Submit</Button>
                        </Form.Group>
                    </Form>
                </Row>

                <Modal show={this.state.show} onHide={this.handleModal} backdrop="static" size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Junk Or Treasure Terms and Conditions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Sellers Terms</h3>
                        <ol>
                            <li>
                                As a seller you have the responsibility that what is posted is shipped.
                                <ol>
                                    <li>No fake or counterfeit items. These items will be taken off the site and reported to the proper authorities.</li>
                                    <li>Must ship the same day as the auction.</li>
                                    <li>Item or service must be accurate as described in the pictures and/or videos.</li>
                                </ol>
                            </li>
                            <li>
                                You have the right to cancel and pull your items from the auction at any time while in story mode.
                                <ol>
                                    <li>However, once the item has gone live a sale must be completed.</li>
                                    <li>You can cancel or change anything while in story mode.</li>
                                    <li>If we have 3 cancellations in a 30 day time period you will be removed from selling anything on the site until consulted by one of our professionals.</li>
                                </ol>
                            </li>
                            <li>
                                We ask that you stand behind your products and sell what is posted.
                                <ol>
                                    <li>Each item must have an accurate description.</li>
                                    <li>Clothing must come with a sizing chart.</li>
                                    <li>New items must have a minimum of a 30 day money back guarantee.</li>
                                    <li>We ask that used items are shipped properly and that you stand behind what you sell.</li>
                                    <li>Too many customer complaints will have you removed from the site.</li>
                                </ol>
                            </li>
                            <li>
                                No illegal or pornographic items
                                <ul>
                                    <li>Just be honest, do what you say and say what you do and you will be able to sell a lot more of your items and everyone is happy.</li>
                                </ul>
                            </li>
                        </ol>
                        <h3>Services</h3>
                        <ol>
                            <li>
                                A service is anything that is not a real object can be a doctor, lawyer, dentist, agent, plumber, etc.
                                <ul>
                                    <li>Typically charged by the hour or a part of their business (see example: an electrician can come and inspect the wiring for your home and recommend or offer their first hour at the cost of the auction.)</li>
                                    <li>We ask this is done via zip code for local service industry work, of course unless the company is franchised or national.</li>
                                </ul>
                            </li>
                            <li>
                                When a service is placed in the storybook a video as well as the description is to be as close to possible as what the auction is about. (example: ABC plumbers will come and inspect your valve and pipes for $reserve our normal rate is $$$.)
                            </li>
                            <li>
                                We recommend a reserve rate is added to the description. Although it will be in story mode for 6 hrs before going live so one could always start at $1 and go off pre-bids.
                            </li>
                            <li>
                                All services must be met upon payment made, we recommend that a link is gone onto either an email or website explaining all that your service is and what the customer just bought so they can set up a meeting or appointment.
                            </li>
                            <li>
                                Please keep in mind that all services are helping your business and building it so good customer service is always a plus. We ask for feedback.
                            </li>
                        </ol>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleModal}>
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        message: state.message,
        isSignedIn: state.auth.isSignedIn,
        fullName: state.auth.fullName,
        currentUserId: state.auth.userId
    }
}

export default connect(mapStateToProps, { addItem })(ItemPage);
