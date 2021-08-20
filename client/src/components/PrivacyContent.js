import React from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';

const PrivacyContent = props => {
    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1>Your Privacy is Important</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Privacy Policy</h3>
                <p>This privacy notice discloses the privacy practices for Junk or Treasure Inc., Johlar Inc., our partner websites and any businesses we are associated with. This privacy notice applies solely to information collected by this website. It will notify you of the following:</p>
                <ListGroup variant="flush">
                    <ListGroup.Item>What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</ListGroup.Item>
                    <ListGroup.Item>What choices are available to you regarding the use of your data.</ListGroup.Item>
                    <ListGroup.Item>The security procedures in place to protect the misuse of your information.</ListGroup.Item>
                    <ListGroup.Item>How you can correct any inaccuracies in the information.</ListGroup.Item>
                </ListGroup>
                <h5>Information Collection, Use, and Sharing</h5>
                <p>We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.</p>
                <p>We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.</p>
                <p>Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.</p>
                <h5>Your Access to and Control Over Information</h5>
                <p>You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:</p>
                <ListGroup variant="flush">
                    <ListGroup.Item>See what data we have about you, if any.</ListGroup.Item>
                    <ListGroup.Item>Change/correct any data we have about you.</ListGroup.Item>
                    <ListGroup.Item>Have us delete any data we have about you.</ListGroup.Item>
                    <ListGroup.Item>Express any concern you have about our use of your data.</ListGroup.Item>
                </ListGroup>
                <h5>Security</h5>
                <p>We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.</p>
                <p>While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.</p>
                <p>If you feel that we are not abiding by this privacy policy, you should contact us immediately <a href="mailto:johlarinc@gmail.com">via email</a>.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handlePrivacyModal}>
                    Okay
                </Button>
            </Modal.Footer>
        </div>
    )
}

export default PrivacyContent;