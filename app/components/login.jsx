import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      password: '',
    };
    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  changeUserName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  changePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  submitLogin(e) {
    e.preventDefault();
    console.log('clicked on login');
    // find username and password in DB
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={e => this.submitLogin(e)}>
          <label htmlFor="username">Username</label>
          <input type="text" onChange={e => this.changeUserName(e)} name="username" />

          <label htmlFor="password">Password</label>
          <input type="password" onChange={e => this.changePassword(e)} name="password" />
          <button>Login</button>
        </form>
        <Link to="/signup">Sign up!</Link>
      </div>
    );
  }
}

export default Login;
