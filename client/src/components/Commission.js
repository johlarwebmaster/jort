import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

const BuyerTutorial = (props) => {
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>Commission base JORTinc.com</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>10/18/2021</h3>
        <p>
          The following is the commission base for JORTinc.com this may change
          with a min of a 30 day written notice to all users that is selling
          items or using their service to post on the website. Also we will
          provide a 30 day notice to the e-commerce venue that is used. These
          numbers are tentative and may change in the first 6 months after the
          site is up and operational.
        </p>
        <p>John Throneberry CEO</p>
        <ListGroup variant="flush">
          <ListGroup.Item>3%-$1.00 to $15 = .03-.45</ListGroup.Item>
          <ListGroup.Item>4%-$15.00 to $25.00 = .64 -$1.00</ListGroup.Item>
          <ListGroup.Item>5%-$26.00 to $50.00 = $1.35-$2.50</ListGroup.Item>
          <ListGroup.Item>6%=$51.00 to $75.00 = $3.06-$4.50</ListGroup.Item>
          <ListGroup.Item>7%-$76.00 to $100.00 = $5.32-$7.00</ListGroup.Item>
          <ListGroup.Item>8%-$101.00 to $150.00 = $8.08-$12.00</ListGroup.Item>
          <ListGroup.Item>9%-$151.00 to $200.00 = $13.59-$18.00</ListGroup.Item>
          <ListGroup.Item>
            10%-$201.00 to $250.00 = $20.10-$25.00
          </ListGroup.Item>
          <ListGroup.Item>
            11%-$251.00 to $350.00 = $27.61-$38.50
          </ListGroup.Item>
          <ListGroup.Item>
            12%-$351.00 to $450.00 = $42.12-$54.00
          </ListGroup.Item>
          <ListGroup.Item>
            13%-$451.00 to $550.00 = $58.63-$71.50
          </ListGroup.Item>
          <ListGroup.Item>
            14%-$551.00 to $700.00 = $77.14-$98.00
          </ListGroup.Item>
          <ListGroup.Item>
            15%-$701.00 to $850.00 = $105.15-$127.50
          </ListGroup.Item>
          <ListGroup.Item>
            16%-$851.00 to $1000.00 = $136.16-$160.00
          </ListGroup.Item>
          <ListGroup.Item>
            17%-$1001.00 to $1250.00 = $170.17-$212.50
          </ListGroup.Item>
          <ListGroup.Item>
            18%-$1251.00 to $2000.00 = $225.18-$360.00
          </ListGroup.Item>
          <ListGroup.Item>
            19%-$2001.00 to $2500.00 = $380.19-$475.00
          </ListGroup.Item>
          <ListGroup.Item>20%-$2500 and up = $500.00 and up. </ListGroup.Item>
        </ListGroup>
        <p>
          We are going to max out at 20% commission so anything above $2500.00
          is going to be charged the 20% commission fee. I think that is fair
          for all party’s to be considered. Now as mentioned in the terms this
          will be part of the terms as well. The commission will be taken out
          before any bank and shipping fees are taken out.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleBuyerModal}>
          Okay
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default BuyerTutorial;
