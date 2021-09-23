import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "274457437956-76ugng8lf8rkae8u037blhuj802113ma.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(
        this.auth.currentUser.get().getId(),
        this.auth.currentUser.get().getBasicProfile().getGivenName(),
        this.auth.currentUser.get().getBasicProfile().getFamilyName(),
        this.auth.currentUser.get().getBasicProfile().getName(),
        this.auth.currentUser.get().getBasicProfile().getEmail(),
        this.auth.currentUser.get().getBasicProfile().getImageUrl()
      );
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    console.log(this);
    if (this.props.isSignedIn === null) {
      return <div>&nbsp;</div>;
    } else if (this.props.isSignedIn) {
      const greeting = `Hello, ${this.props.firstName}`;

      return (
        <Nav className="ml-auto">
          <NavDropdown alignRight title={greeting} id="nav-dropdown">
            {/* <NavDropdown.Item href="/seller">Looking to Sell?</NavDropdown.Item> */}
            <NavDropdown.Item>
              <Link to="/seller">Looking to Sell?</Link>
            </NavDropdown.Item>
            {/* <NavDropdown.Item href="/profile">Profile</NavDropdown.Item> */}
            <NavDropdown.Item>
              <Link to="/profile">Profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={this.onSignOutClick}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    } else {
      return (
        <Nav className="ml-auto">
          <NavDropdown alignRight title="Log In" id="nav-dropdown">
            <NavDropdown.Item onClick={this.onSignInClick}>
              Log In
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    fullName: state.auth.fullName,
    email: state.auth.email,
    imageUrl: state.auth.imageUrl,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
