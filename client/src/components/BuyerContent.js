import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BuyerContent = props => {
    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1>JORT Terms of Service</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Buyers Terms</h3>
                <ol>
                    <li>
                        Buyer Beware, All sales are final.
                        <ol>
                            <li>It is however under the discretion of the owner or seller of the product to offer a refund.</li>
                            <li>JORT inc does not own any products; we are simply an avenue that offers products and services, so it is up to the discretion of the site supervisor to offer any and all refunds.</li>
                            <li>Although we do encourage New items to be under a warranty there is no guarantee of this and it's always up to the discretion of the seller if they offer this service.</li>
                            <li>Any service that is purchased makes sure you as the buyer/consumer are aware of all the terms before requesting a refund.</li>
                        </ol>
                    </li>
                    <li>
                        Used Items
                        <ol>
                            <li>Remember the items are used.</li>
                            <li>If you get something shipped to you and it is not what you purchased or is nothing but total junk and is unusable please contact customer service so we can take care of it for you.</li>
                            <li>We will refund your money and seek retribution on a case by case situation, and has to be approved by a customer service supervisor or manager.</li>
                            <li>If you feel like you have been a victim of a scammer or illegal activity please notify customer service ASAP so we can address the problem and put a stop to it.</li>
                            <li>Remember you can always contact customer service if you have any issues with the site, the seller or the product and or service. We are here for you the consumer and are here to help you resolve your issues.</li>
                        </ol>
                    </li>
                    <li>
                        New Items
                        <ol>
                            <li>We encourage all sellers to have a warranty on their products this however is not always the case so as usual it's buyer beware. But if you receive your item that doesn't match the description or not what you ordered</li>
                            <li>The item needs to be shipped the same da as the sale, when you purchase a item make sure you get a tracking number, if you don't receive a tracking number contact customer support.</li>
                            <li>We as well track items so make sure the address the item is to be shipped is correct.</li>
                            <li>We encourage feedback both good and bad. It helps us improve.</li>
                            <li>When Pre-bidding on an item you may not have the winning bid, so make yourself available when it goes live however if there are no more bids once the item is live the highest pre-bid wins.</li>
                            <li>Once you win an item we expect payment right away. This can be done through Stripe.</li>
                        </ol>
                    </li>
                    <p>We want to make this experience for you as much fun and carefree as possible, Any and all issues please bring it to our attention. We cannot fix something we don't know is broken, remember here at JORT inc we do not own any merchandise we are jus a avenue to be able to buy and sell as well as have services on or site.</p>
                </ol>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleBuyerModal}>
                    Okay
                </Button>
            </Modal.Footer>
        </div>
    )
}

export default BuyerContent;