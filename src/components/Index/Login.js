import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { login, signUp, clearErrors } from '../../store';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      name: '',
      signup: false
    }
    this.submit = this.submit.bind(this);
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  submit(ev) {
    const { username, password, signup, email, name } = this.state;
    ev.preventDefault();
    signup ? this.props.signUp({ username, password, email, name }) : this.props.login({ username, password })
  }
  
  render() {
    const { username, password, signup, email, name } = this.state;
    const { signUp, error, clearErrors } = this.props;
    return (
      <div>
        { signup ? 
          <h1 className='center loginTitle'> Create an account </h1>
          :
          <h1 className='center loginTitle'> Log in </h1>
        }
        <div>
          <form id='login' onSubmit={this.submit}>
          { error.type === 'username' ? <p><strong>{error.message}</strong></p> : null }
          {
            signup ? 
              <div>
                <div>
                  <input
                    onChange={(ev) => this.setState({ name: ev.target.value })}
                    value={name}
                    type='name'
                    className={`form-control loginInput ${error.type === 'name' ? 'is-invalid' : '' }` }
                    placeholder='Full Name'
                    required
                  />
                  <div className='invalid-feedback'>
                    {error.message}
                  </div>
                </div>
                <div>
                  <input
                    onChange={(ev) => this.setState({ email: ev.target.value })}
                    value={email}
                    type='email'
                    className={`form-control loginInput ${error.type === 'email' ? 'is-invalid' : '' }` }
                    placeholder='Email Address'
                    required
                  />
                  <div className='invalid-feedback'>
                    {error.message}
                  </div>
                </div>
              </div>
            : null
          }
          <div>
              <input
                onChange={(ev) => this.setState({ username: ev.target.value })}
                value={username}
                type='username'
                className={`form-control loginInput ${error.type === 'unique' ? 'is-invalid' : '' }` }
                placeholder='Username'
                required
              />
              <div className='invalid-feedback'>
                {error.message}
              </div>
            </div>
            <div>
              <input
                onChange={(ev) => this.setState({ password: ev.target.value })}
                value={password}
                type='password'
                className={`form-control loginInput ${error.type === 'password' ? 'is-invalid' : '' }` }
                placeholder='Password'
                required
              />
              <div className='invalid-feedback'>
                {error.message}
              </div>
            </div>
            <button disabled={!username && !password} className='btn btn-block btn-primary loginButton'> { signup ? 'Sign up' : 'Log in' } </button>
          </form>
          <hr className='loginHR'/>
          { 
            signup ? 
            <h4 className='center'> or &nbsp;
              <a href='#' 
                onClick={(ev)=> {
                  ev.preventDefault();
                  clearErrors();
                  this.setState({ signup: false, password: '', username: '' })}}>
                Log in 
              </a> 
            </h4>
            :
            <h4 className='center'> Don't have an account? &nbsp;
              <a href='#' 
                onClick={(ev)=> {
                  ev.preventDefault();
                  clearErrors();
                  this.setState({ signup: true, password: '', username: '' })}}>
                Sign up here! 
              </a>
            </h4>       
          }
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
    signUp: user => dispatch(signUp(user, history)),
    clearErrors: () => dispatch(clearErrors())
  } 
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);