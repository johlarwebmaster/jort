import React, { useState } from 'react';
import { Container, Row, Form, InputGroup } from 'react-bootstrap';

const ItemPage = () => {
    const [itemName, setItemName] = useState();
    const [itemType, setItemType] = useState(null)
    const [shortDesc, setShortDesc] = useState();
    const [longDesc, setLongDesc] = useState();
    const [openingBid, setOpeningBid] = useState();
    const [bidIncrement, setBidIncrement] = useState();

    return (
        <Container className="App">
            <h2>What are You Looking to Sell?</h2>
            <Row>
                <Form>
                    <Form.Group>
                        <Form.Label>Name of Item</Form.Label>
                        <Form.Control type="text" name="itemName" id="itemName" bsSize="lg" required value={itemName} onChange={e => setItemName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Type of Item</Form.Label>
                        <Form.Control as="select" name="itemType" id="itemType" bsSize="lg" required value={itemType} onChange={e => setItemType(e.target.value)}>
                            <option default value={null}>Select One</option>
                            <option value="furniture">Furniture</option>
                            <option value="electronics">Electronics</option>
                            <option value="automotive">Automotive</option>
                            <option value="clothing">Clothing</option>
                            <option value="services">Services</option>
                            <option value="other">Other</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control type="textarea" style={{height: '200px'}} name="itemShtDesc" id="itemShtDesc" bsSize="lg" required value={shortDesc} onChange={e => setShortDesc(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Long Description</Form.Label>
                        <Form.Control type="textarea" style={{height: '200px'}} name="itemLngDesc" id="itemLngDesc" bsSize="lg" required value={longDesc} onChange={e => setLongDesc(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Opening Bid</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" name="openingBid" id="openingBid" bsSize="lg" required value={openingBid} onChange={e => setOpeningBid(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bid Increments (How much for each bid increase)</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" name="bidIncrement" id="bidIncrement" bsSize="lg" required value={bidIncrement} onChange={e => setBidIncrement(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.File
                            id="product-img"
                            label="Images"
                        />
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    );
};

export default ItemPage;