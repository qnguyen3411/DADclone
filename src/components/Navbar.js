import React from 'react';
import { connect } from 'react-redux';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink as NavLinkRS
} from 'reactstrap';

import {
  showLoginForm,
  showRegisterForm,
  showSubmissionForm
} from '../actions/AppActions';

import { userIsLoggedIn } from '../state/selectors/UsersSelector';

const NavLink = props => (
  <NavItem>
    {React.createElement(NavLinkRS, props)}
  </NavItem>
);

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  resolveUserLinks() {
    const { isLoggedIn } = this.props;

    return (isLoggedIn) ?
      this.loggedInLinks() :
      this.loggedOutLinks()
  }

  loggedOutLinks() {
    const { onLoginClicked, onRegisterClicked } = this.props;
    return (
      <React.Fragment>
        <NavLink onClick={onLoginClicked}>Login</NavLink>
        <NavLink onClick={onRegisterClicked}>Register</NavLink>
      </React.Fragment>
    )
  }

  loggedInLinks() {
    const { onSubmitClicked } = this.props;
    return (
      <React.Fragment>
        <NavLink onClick={onSubmitClicked}>Submit</NavLink>
        <NavLink>Logout</NavLink>
      </React.Fragment>
    )
  }

  renderLogo() {
    const Yel = ({ text }) => <span className="text-warning">{text}</span>;
    return (
      <span className="font-weight-bold">
        <Yel text="D" />o<Yel text="A" />rt<Yel text="D" />aily
      </span>
    )
  }

  render() {
    const userLinks = this.resolveUserLinks();
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">{this.renderLogo()}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-1" navbar>
            <NavLink to="/" tag={RouterNavLink}>Home</NavLink>
            <NavLink to="/leaderboard" tag={RouterNavLink}>Leaderboard</NavLink>
          </Nav>

          <Nav className="ml-auto" navbar>{userLinks}</Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: userIsLoggedIn(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSubmitClicked: () => dispatch(showSubmissionForm()),
  onLoginClicked: () => dispatch(showLoginForm()),
  onRegisterClicked: () => dispatch(showRegisterForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

