import React, { useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import SellerContent from './SellerContent';
import BuyerContent from './BuyerContent';
import PrivacyContent from './PrivacyContent';

const FooterMessage = props => {
    const [show, setShow] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => setShowModal(!showModal);

    return (
        <>
            <Alert show={show} variant="success" className="fixed-bottom">
                <Alert.Heading>
                    {props.heading}
                </Alert.Heading>
                <p>{props.message}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShowModal(true)} variant="outline-success">
                        Learn More
                    </Button>&nbsp;&nbsp;
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        Close
                    </Button>
                </div>
            </Alert>

            <Modal show={showModal} onHide={handleModal} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.buttonLink === 'privacy' ? "Your Privacy is Important" : "Junk or Treasure Terms of Service"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.buttonLink === 'privacy' ?
                        <PrivacyContent />
                        : props.buttonLink === 'seller' ?
                            <SellerContent />
                        : <BuyerContent />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleModal}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FooterMessage;