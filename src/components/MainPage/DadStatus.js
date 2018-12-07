import React from 'react';
import { connect } from 'react-redux';

import { showLoginForm, showRegisterForm } from '../../actions/AppActions';

export const DadStatus = ({loginClicked, registerClicked}) => {
  // const login = null;
  // const register = null;
  const login = <span className="btn-link" onClick={loginClicked}>Login</span>;
  const register = <span className="btn-link" onClick={registerClicked}>Register</span>;
  return (
    <div>
      <h3>Do Art Daily challenge</h3>
      <h5>Time until next deadline: 11:20:23</h5>
      <p className="lead">You aren't logged in. {login} or {register} to participate.</p>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loginClicked: () => dispatch(showLoginForm()),
  registerClicked: () => dispatch(showRegisterForm())
})

export default connect(null, mapDispatchToProps)(DadStatus);