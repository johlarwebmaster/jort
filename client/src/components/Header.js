import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import GoogleAuth from './GoogleAuth';
import logo from '../logo.png';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed="top" className="shadow p-3 mb-5 bg-body rounded">
        <Navbar.Brand href="/list">
            <img src={logo} height="60" width="auto" alt="Junk or Treasures" />&nbsp;&nbsp;
            <span className="text-primary title-text">Junk or Treasures</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="d-flex flex-row-reverse">
            <GoogleAuth />
            <Form inline>
                <FormControl type="text" placeholder="Quick Search" className="ml-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
