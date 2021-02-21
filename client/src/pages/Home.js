import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import logo from '../logo.png';

const Home = () => {
  const history = useHistory();
  const handleBuy = () => history.push('/list');

  return (
    <Container fluid className="App">
      <h1 className="h1 text-center">
        <img src={logo} width="20%" alt="Junk or Treasures" /><br />
        Are you a?
      </h1>
      <Row>
        <Col md={6} sm={6} xs={6}>
          <Card style={{ width: '100%' }}>
            <Card.Title className="bg-primary text-center py-3 title-text"><h2>Buyer</h2></Card.Title>
            <Card.Text className="text-center">Select this option if you are in the market to buy items or services.</Card.Text>
            <Button variant="primary" onClick={handleBuy}>Buy</Button>
          </Card>
        </Col>
        <Col md={6} sm={6} xs={6}>
          <Card style={{ width: '100%' }}>
            <Card.Title className="bg-secondary text-center py-3 title-text"><h2>Seller</h2></Card.Title>
            <Card.Text className="text-center">Select this option if you are looking to sell items or services.</Card.Text>
            <Button variant="secondary">Sell</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
