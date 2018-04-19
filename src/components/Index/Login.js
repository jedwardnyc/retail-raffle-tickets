import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin(ev) {
    ev.preventDefault();
    this.props.login(this.state)
    console.log(this.state)
  }
  
  render() {
    return (
      <div>
        <h1> Log in </h1>
        <div>
          <form onSubmit={this.submitLogin} className="signin-container">
            {/* <div className="form-group">
              <label>Username: </label>&nbsp;
              <input
                name="username"
                type="username"
                className="form-control"
                required
              />
            </div> */}
            <div className="form-group">
              <label>E-Mail:</label>&nbsp;
              <input
                onChange={(ev) => this.setState({ email: ev.target.value })}
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Password: </label>&nbsp;
              <input
                onChange={(ev) => this.setState({ password: ev.target.value })}
                type="password"
                className="form-control"
                required
              />
            </div>
            <button className="btn btn-block btn-primary"> Log in </button>
          </form>
          <h4> Don't have an account? </h4>
          <button> Sign up </button>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch, { history }) => { 
  return {
    login: credentials => dispatch(login(credentials, history))
  } 
};

export default connect(null,mapDispatchToProps)(Login);