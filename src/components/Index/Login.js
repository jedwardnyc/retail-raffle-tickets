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
          <h1> Create an account </h1>
          :
          <h1> Log in </h1>
        }
        <div>
          <div>
            <form onSubmit={this.submit} className='jumbotron'>
            { error.type === 'username' ? <p><strong>{error.message}</strong></p> : null }
            {
              signup ? 
                <div>
                  <div className='form-group'>
                    <label> Full Name:</label>&nbsp;
                    <input
                      onChange={(ev) => this.setState({ name: ev.target.value })}
                      value={name}
                      type='name'
                      className={`form-control  ${error.type === 'name' ? 'is-invalid' : '' }` }
                      placeholder='ex. Jane Doe'
                      required
                    />
                    <div className='invalid-feedback'>
                      {error.message}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label> Email: </label>&nbsp;
                    <input
                      onChange={(ev) => this.setState({ email: ev.target.value })}
                      value={email}
                      type='email'
                      className={`form-control  ${error.type === 'email' ? 'is-invalid' : '' }` }
                      placeholder='example@domain.com'
                      required
                    />
                    <div className='invalid-feedback'>
                      {error.message}
                    </div>
                  </div>
                </div>
              : null
            }
            <div className='form-group'>
                <label> Username:</label>&nbsp;
                <input
                  onChange={(ev) => this.setState({ username: ev.target.value })}
                  value={username}
                  type='username'
                  className={`form-control  ${error.type === 'unique' ? 'is-invalid' : '' }` }
                  placeholder='Enter username'
                  required
                />
                <div className='invalid-feedback'>
                  {error.message}
                </div>
              </div>
              <div className='form-group'>
                <label>Password: </label>&nbsp;
                <input
                  onChange={(ev) => this.setState({ password: ev.target.value })}
                  value={password}
                  type='password'
                  className={`form-control  ${error.type === 'password' ? 'is-invalid' : '' }` }
                  placeholder='secret password'
                  required
                />
                <div className='invalid-feedback'>
                  {error.message}
                </div>
              </div>
              <button disabled={!username && !password} className='btn btn-block btn-primary'> { signup ? 'Sign up' : 'Log in' } </button>
            </form>
            { 
              signup ? 
              <h4> or &nbsp;
                <a href='#' 
                  onClick={(ev)=> {
                    ev.preventDefault();
                    clearErrors();
                    this.setState({ signup: false, password: '', username: '' })}}>
                  Log in 
                </a> 
              </h4>
              :
              <h4> Don't have an account? &nbsp;
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