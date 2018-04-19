import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (CheckedComponent) => {

  class NotAuthentication extends Component {
    componentWillMount() {
      if (this.props.authenticated) {
        this.props.history.push('/adviors');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        this.props.history.push('/advisors');
      }
    }

    render() {
      return <CheckedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ auth }) {
    return { 
      authenticated: auth.authenticated 
    }
  }

  return connect(mapStateToProps)(NotAuthentication);
};