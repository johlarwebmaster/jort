import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import logo from '../logo.png';

const Home = () => {
  const history = useHistory();
  const handleBuy = () => history.push('/list');
  const handleSell = () => history.push('/seller');

  return (
    <Container fluid className="App">
      <h1 className="h1 text-center">
        <img src={logo} width="20%" alt="Junk or Treasures" /><br />
        Are you a?
      </h1>
      <Row>
        <Col md={6} sm={6} xs={6}>
          <Card style={{ width: '100%' }}>
            <Button variant="primary" className="text-center py-3"><h2 className="h1 title-text" onClick={handleBuy}>Buyer</h2></Button>
            <Card.Text className="text-center">Select this option if you are in the market to buy items or services.</Card.Text>
          </Card>
        </Col>
        <Col md={6} sm={6} xs={6}>
          <Card style={{ width: '100%' }}>
            <Button variant="secondary" className="text-center py-3"><h2 className="h1 title-text" onClick={handleSell}>Seller</h2></Button>
            <Card.Text className="text-center">Select this option if you are looking to sell items or services.</Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
