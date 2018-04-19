import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, signUp, clearErrors } from '../../store';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  submitLogin(ev) {
    const { email, password } = this.state;
    ev.preventDefault();
    this.props.login({ email, password })
  }
  
  render() {
    const { email, password } = this.state;
    const { signUp, error } = this.props;
    return (
      <div>
        <h1> Log in </h1>
        {
          error.type === 'email' ? 
          <div className='jumbotron'>
            <p><strong>{error.message}</strong></p>
          </div>
          :
          null
        }
        <div>
          <form onSubmit={this.submitLogin} className="signin-container">
            <div className="form-group">
              <label>E-Mail:</label>&nbsp;
              <input
                onChange={(ev) => this.setState({ email: ev.target.value })}
                type="email"
                className={`form-control  ${error.type === 'unique' ? 'is-invalid' : '' }` }
                placeholder="example@domain.com"
                required
              />
              <div className="invalid-feedback">
                {error.message}
              </div>
            </div>
            <div className="form-group">
              <label>Password: </label>&nbsp;
              <input
                onChange={(ev) => this.setState({ password: ev.target.value })}
                type="password"
                className={`form-control  ${error.type === 'password' ? 'is-invalid' : '' }` }
                required
              />
              <div className="invalid-feedback">
                {error.message}
              </div>
            </div>
            <button 
              disabled={!email && !password} 
              className="btn btn-block btn-primary"> 
                Log in 
            </button>
          </form>
          <h4> Don't have an account? </h4> 
          <h5> Sign up by filling out the above fields and clicking below! </h5>
          <button disabled={!email && !password} onClick={() => signUp({ email, password })}> Sign up </button>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ error }) => {
  return {
    error
  }
}

const mapDispatchToProps = (dispatch, { history }) => { 
  return {
    login: credentials => dispatch(login(credentials, history)),
    signUp: credentials => dispatch(signUp(credentials, history)),
    clearErrors: () => dispatch(clearErrors())
  } 
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);