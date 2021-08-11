import React from "react";
import { Modal, Button } from "react-bootstrap";

const SellerTutorial = (props) => {
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>JORTinc Tutorial for Seller’s</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ol>
          <li>Choose item to post for sale.</li>
          <li>
            Display item and take a good picture ( make sure it’s clean and not
            looking bad if it’s used) If new please take it out of it’s original
            packaging if at all possible.
          </li>
          <li>
            Take a good picture or picture’s can display up to 9 pictures and 1
            video of the same item or multiple item’s we will go over this a
            little more shortly, Also you can split the one item up into 4
            pictures in the same frame, keep in mind they may not be able to
            zoom in as well. Also you can display the original packaging in the
            background of your product.
          </li>
          <li>
            We recommend when taking the pictures that you use a cardboard with
            felt on it behind the products to keep anything behind hidden, this
            is good for two purposes, it keeps people from being distracted by
            items you don’t want to have displayed, (like a messy room) or
            security you might un might un knowingly have something that may put
            your personal have something that may put your personal information
            out there if someone was to zoom in.
          </li>
          <li>
            Now the nut’s and bolts of the site, go to JORTinc.com and pull up
            the site, choose seller.
          </li>
          <li>
            Follow the easy prompts to create a seller profile, if your using a
            laptop or a desktop you will either have to upload your pictures
            from email or download them from your phone or camera onto your
            device before posting them.
          </li>
          <li>
            Now we have 4 different type of sell’s.
            <ol>
              <li>
                Basic 1 on1 auction sell, you post a product the
                picture/pictures and sell it in the normal fashion.
              </li>
              <li>
                A service Auction this can be anything from hourly service like,
                plumber’s, electricians, to doctors, dentist, or Attorney’s it
                can also be movie’s, restaurant’s grocery item’s special ity
                shops like nail’s, hair, massage, as well as weekend get away’s
                at a resort, spa, winery or whatever the possibility’s are
                endless. Basically it’s simple, you choose what type of service
                you have to offer and then what the limit or reserve should be
                and then you post it for pre-bid’s just like a one on one
                Auction then when it goes live you will be notified and then
                when it sells you will be notified to let the buyer know how
                they will be able to collect on their win.
              </li>
              <li>
                Now the fun, we have what is called a booty sell, OK get your
                mind out of the gutter it’s not a booty call lol, it’s what we
                refer to a simple multiple item sell, that you can post up to 9
                item’s and a short video on the site, these item’s are all sold
                with one price that way you can liquidate quickly if you have
                allot of thing’s to sell and your not really worried about the
                item’s all going. So one price get’s them all. Again you can
                choose the limit and the reserve.
              </li>
              <li>
                Now the Junk sell. This is the final sell we have, again you can
                list up to 9 item’s and no we are not asking you to put junk on
                the site we want clean and workable product’s as well as new
                product’s, the junk sell can have up to 9 item’s at each item
                will have a separate price. So that you can sell allot of your
                product’s but get what the true value is for each item.
              </li>
            </ol>
          </li>
          <li>
            Choose your bid increase, your limit or your reserve, choose a aprox
            amount for shipping or wether it’s free shipping.
          </li>
          <li>
            Set yourself a reminder that when it goes live you will be able to
            go back and watch the sell, we recommend that you come back to the
            site after 5.5 to 5 ¾ hrs to see how the prebids are doing. You will
            receive a email letting you know when it goes live as well as when
            the item product or service is sold so you can ship it out, we
            prefer shipping happens the same day as the sell as soon as you get
            paid for the good’s or services.
          </li>
          <li>
            You will also get a break down of exactly how the payout went, our
            commission, as well as any credit card charges as well as any
            shipping fees if you including the approximation in your sell.
          </li>
          <li>
            Again we ask that you ship the good’s or service the same day so the
            buyer can get what they paid for in a timely manner.
          </li>
        </ol>
        <p>
          Thank you so much for being one of our seller’s on this site, we hope
          that you are profitable and keep putting your good’s or services on
          our site, without you non of this would be possible, please let any of
          our staff know if we can be of any assistance to you. We hope that you
          have a fun and exciting experience and we try to make this as easy and
          user friendly as possible. We welcome all comment’s, suggestion’s or
          advice.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleSellerModal}>
          Okay
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default SellerTutorial;
