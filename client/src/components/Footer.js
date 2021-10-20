import React, { useState, useEffect } from "react";
import { Navbar, Nav, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PrivacyContent from "./PrivacyContent";
import BuyerContent from "./BuyerContent";
import SellerTutorial from "./SellerTutorial";
import BuyerTutorial from "./BuyerTutorial";
import Commission from "./Commission";

const Footer = () => {
  const history = useHistory();
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [seller, setSeller] = useState(false);
  const [buyer, setBuyer] = useState(false);
  const [commission, setCommission] = useState(false);

  return (
    <div>
      <Navbar fixed="bottom" className="border-top bg-white">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link onClick={() => history.push("/list")}>Items</Nav.Link>
          <Nav.Link onClick={() => history.push("/seller")}>Seller</Nav.Link>
          <Nav.Link onClick={() => setPrivacy(true)}>Privacy</Nav.Link>
          <Nav.Link onClick={() => setTerms(true)}>Terms of Service</Nav.Link>
          <Nav.Link onClick={() => setSeller(true)}>Seller Tutorial</Nav.Link>
          <Nav.Link onClick={() => setBuyer(true)}>Buyer Tutorial</Nav.Link>
          <Nav.Link onClick={() => setCommission(true)}>Commission</Nav.Link>
        </Nav>
      </Navbar>

      <Modal
        show={privacy}
        onHide={() => setPrivacy(false)}
        backdrop="static"
        size="lg"
      >
        <PrivacyContent handlePrivacyModal={() => setPrivacy(!privacy)} />
      </Modal>

      <Modal
        show={terms}
        onHide={() => setTerms(false)}
        backdrop="static"
        size="lg"
      >
        <BuyerContent handleBuyerModal={() => setTerms(!terms)} />
      </Modal>

      <Modal
        show={seller}
        onHide={() => setSeller(false)}
        backdrop="static"
        size="lg"
      >
        <SellerTutorial handleSellerModal={() => setSeller(!seller)} />
      </Modal>

      <Modal
        show={buyer}
        onHide={() => setBuyer(false)}
        backdrop="static"
        size="lg"
      >
        <BuyerTutorial handleBuyerModal={() => setBuyer(!buyer)} />
      </Modal>

      <Modal
        show={commission}
        onHide={() => setCommission(false)}
        backdrop="static"
        size="lg"
      >
        <Commission handleBuyerModal={() => setCommission(!commission)} />
      </Modal>
    </div>
  );
};

export default Footer;
