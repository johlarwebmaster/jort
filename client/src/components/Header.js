import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import GoogleAuth from './GoogleAuth';
import logo from '../logo.png';

const Header = () => {
  return (
    <Navbar expand="md" bg="light" variant="light" fixed="top" className="shadow p-3 mb-5 bg-body rounded flex-header">
        <Navbar.Brand href="/">
            <img src={logo} height="60" width="auto" alt="Junk or Treasures" />&nbsp;&nbsp;
            <span className="text-primary title-text">Junk or Treasures</span>
        </Navbar.Brand>
        <GoogleAuth />
    </Navbar>
  );
}

export default Header;
