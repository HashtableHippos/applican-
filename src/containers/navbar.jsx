import React, { Component } from 'react';
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
                <Link to={'/'} className="mui--text-title mui--text-light">AppliCAN</Link>
              </td>
              <td style={{ textAlign: 'right' }}>
                {(!this.props.isUserAuth) ?
                  <ul className="mui-list--inline mui--text-body2">
                    <li> <Link to={'/login'} className="mui--text-light">Login </Link> </li>
                  </ul>
                  : <ul className="mui-list--inline mui--text-body2">
                    <li><Link to={'/dashboard'} className="mui--text-light">Dashboard </Link></li>
                    <li><a href="/auth/logout" className="mui--text-light">Logout</a></li>
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

