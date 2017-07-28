import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MDDelete from 'react-icons/md/delete';
import { removeContactApi, fetchContactsApi } from '../../actions/actions';

export class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchContacts(this.props.jobId);
  }

  render() {
    return (
      <div className="contactList">
        <a className="mui--text-title">Contacts List</a>
        <table className="contactTable">
          <thead className="contactHead" >
            <tr >
              <th>Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>FollowUp Date</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            { Array.isArray(this.props.contacts) && this.props.contacts.map(el => (
              <tr className="contactRow" key={el.id}>
                <td className="contactRow">{el.name}</td>
                <td className="contactRow">{el.position}</td>
                <td className="contactRow">{el.Email}</td>
                <td className="contactRow">{el.FollowUp.toString().slice(0,10)}</td>
                <td>
                  <button onClick={() => this.props.removeContactApi(el.id)}>
                    <MDDelete size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isUserAuth: state.user, contacts: state.contacts });
const mapDispatchToProps = dispatch => ({
  fetchContacts(id) {
    dispatch(fetchContactsApi(id));
  },
  removeContactApi(id) {
    dispatch(removeContactApi(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
