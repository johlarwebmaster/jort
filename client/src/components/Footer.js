import React, { useState } from 'react';
import { Navbar, Nav, Modal } from 'react-bootstrap';
import PrivacyContent from './PrivacyContent';
import BuyerContent from './BuyerContent';

const Footer = () => {
    const [privacy, setPrivacy] = useState(false);
    const [terms, setTerms] = useState(false);

    return (
        <div>
            <Navbar fixed="bottom" className="border-top bg-white">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/list">Items</Nav.Link>
                    <Nav.Link href="/seller">Seller</Nav.Link>
                    <Nav.Link onClick={() => setPrivacy(true)}>Privacy</Nav.Link>
                    <Nav.Link onClick={() => setTerms(true)}>Terms of Service</Nav.Link>
                    <Nav.Link href="#">Tutorial</Nav.Link>
                </Nav>
            </Navbar>
            <Modal show={privacy} onHide={() => setPrivacy(false)} backdrop="static" size="lg">
                <PrivacyContent handlePrivacyModal={() => setPrivacy(!privacy)} />
            </Modal>
            <Modal show={terms} onHide={() => setTerms(false)} backdrop="static" size="lg">
                <BuyerContent handleBuyerModal={() => setTerms(!terms)} />
            </Modal>
        </div>
    );
};

export default Footer;