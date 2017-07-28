import React, { Component } from 'react';
import { resolve } from 'path';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/css/mui.css';
import { fetchUserAuthStatus } from '../actions/actions';

class NavBar extends Component {
  componentDidMount() {
    this.props.checkUserAuth();
  }
  render() {
    return (
      <div className="navbar">
        <table width="100%">
          <tbody>
            <tr className="mui--appbar-height">
              <td className="mui--text-title">
                <Link to={'/'} className="mui--text-title mui--text-light" id="applican">AppliCAN</Link>
              </td>
              <Link to={'/about'} className="mui--text-light" id="about">About </Link>
              <td style={{ textAlign: 'right' }}>
                {(!this.props.isUserAuth) ?
                  <a href="/auth/google" className="logo">
                    <img src="img/google_signin.png" alt="Google Login" />
                  </a>
                  : <ul className="mui-list--inline mui--text-body2">
                    <li><Link to={'/dashboard'} className="mui--text-light" id="dashboard">Dashboard </Link></li>
                    <li><a href="/auth/logout" className="mui--text-light" id="logout">Logout</a></li>
                  </ul>
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isUserAuth: state.user });
const mapDispatchToProps = dispatch => ({
  checkUserAuth() {
    dispatch(fetchUserAuthStatus());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

