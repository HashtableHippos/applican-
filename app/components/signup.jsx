import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      password: '',
      confirmPassword: '',
    };
    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
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

  confirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }

  submitSignup(e) {
    e.preventDefault();
    console.log('clicked on submit');
    if (this.isValidPasswords()) {
      // check username availability and signup
      console.log('valid');
    } else {
      alert('Passwords do not match!');
    }
  }

  isValidPasswords() {
    return this.state.password === this.state.confirmPassword;
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={e => this.submitSignup(e)}>
          <label htmlFor="username">Username</label>
          <input type="text" onChange={e => this.changeUserName(e)} name="username" />

          <label htmlFor="password">Password</label>
          <input type="password" onChange={e => this.changePassword(e)} name="password" />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" onChange={e => this.confirmPassword(e)} name="confirmPassword" />
          <button>Sign up</button>
        </form>
        <Link to="Login">Login!</Link>
      </div>
    );
  }
}

export default Signup;
