import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component{
  constructor(props) {
    super(props);
  }

  submitLogin(ev) {
    ev.preventDefault();
    this.props.login({
      username: event.target.username.value,
      password: event.target.password.value
    })
  }
  
  render() {
    return (
      <div>
        <h1> (currently undergoing maintenance) </h1>
        <div className="signin-container">
          <div className="buffer local">
            <form>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  type="username"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  required
                />
              </div>
              <button disabled className="btn btn-block btn-primary"> Log in </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => { 
  return {
    login: credentials => dispatch(login(credentials))
  } 
};

export default connect(null,mapDispatchToProps)(Login);