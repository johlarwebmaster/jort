import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Alert, Button } from 'react-bootstrap';

const FooterMessage = props => {
    const [show, setShow] = useState(true);
    const {push} = useHistory();

    return (
        <Alert show={show} variant="success" className="fixed-bottom">
            <Alert.Heading>
                {props.heading}
            </Alert.Heading>
            <p>{props.message}</p>
            <hr />
            <div className="d-flex justify-content-end">
                <Button onClick={() => push(props.buttonLink)} variant="outline-success">
                    {props.buttonText}
                </Button>&nbsp;&nbsp;
                <Button onClick={() => setShow(false)} variant="outline-success">
                    Close
                </Button>
            </div>
        </Alert>
    );
};

export default FooterMessage;