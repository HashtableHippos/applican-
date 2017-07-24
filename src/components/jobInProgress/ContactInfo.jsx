import React from 'react';
import axios from 'axios';
import Contacts from './ContactsListEntry';

export default class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contactList: [] };
  }
  componentDidMount() {
    axios.get(`/api/contacts/${this.props.id}`)
      .then((contactList) => {
        this.setState({ contactList });
      });
  }

  render() {
    return (
      <div>
        <table style={{ border: '1px solid' }} >
          <thead style={{ border: '1px solid' }}>
            <tr>
              <th style={{ border: '1px solid' }}>Name</th>
              <th style={{ border: '1px solid' }}>Position</th>
              <th style={{ border: '1px solid' }}>Email</th>
              <th style={{ border: '1px solid' }}>FollowUp Date</th>
            </tr>
          </thead>
          <tbody style={{ border: '1px solid' }}>
            { Array.isArray(this.state.contactList.data) ? this.state.contactList.data.map((el) => {
              return (
                <tr style={{ border: '1px solid' }}>
                  <td style={{ border: '1px solid' }}>{el.name}</td>
                  <td style={{ border: '1px solid' }}>{el.position}</td>
                  <td style={{ border: '1px solid' }}>{el.Email}</td>
                  <td style={{ border: '1px solid' }}>{el.FollowUp}</td>
                </tr>
              );
            }) : 'no contacts' }
          </tbody>
        </table>
      </div>
    );
  }
}
