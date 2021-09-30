import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PrivacyContent from "./PrivacyContent";
import BuyerContent from "./BuyerContent";
import SellerTutorial from "./SellerTutorial";
import BuyerTutorial from "./BuyerTutorial";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
      width: 100%;
    }

  .nav_button {
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0D0C1D;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`

const Menu = ({ open }) => {
  const history = useHistory();
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [seller, setSeller] = useState(false);
  const [buyer, setBuyer] = useState(false);

  return (
    <div>
      <StyledMenu className="bg-secondary" open={open}>
        <button className="nav_button" onClick={() => history.push("/")}>Home</button>
        <button className="nav_button" onClick={() => history.push("/list")}>Items</button>
        <button className="nav_button" onClick={() => history.push("/seller")}>Seller</button>
        <button className="nav_button" onClick={() => setPrivacy(true)}>Privacy</button>
        <button className="nav_button" onClick={() => setTerms(true)}>Terms of<br />Service</button>
        <button className="nav_button" onClick={() => setSeller(true)}>Seller Tutorial</button>
        <button className="nav_button" onClick={() => setBuyer(true)}>Buyer Tutorial</button>
      </StyledMenu>

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
    </div>
  )
}

const StyledBurger = styled.button`
  position: absolute;
  bottom: 5%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => open ? '#0D0C1D' : '#0D0C1D'};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

const MobileNav = () => {
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();

  return (
    <div>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </div>
  )  
};

export default MobileNav;

const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  },
  [ref, handler],
  );
};