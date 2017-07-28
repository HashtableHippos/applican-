import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addContactApi } from '../../actions/jobActions';
import Button from 'muicss/lib/react/button';

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ name: 'name', position: 'position', Email: 'email', FollowUp: new Date() });
    this.jobId = -1;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFollowUpChange = this.handleFollowUpChange.bind(this);
  }

  handleNameChange(evt) {
    this.setState({ name: evt.target.value });
  }
  handlePositionChange(evt) {
    this.setState({ position: evt.target.value });
  }
  handleEmailChange(evt) {
    this.setState({ Email: evt.target.value });
  }
  handleFollowUpChange(evt) {
    this.setState({ FollowUp: evt.target.value });
  }

  render() {
    return (
      <div className="addContactHead">
        <table>
          <td width={50}>
            <a className="mui--text-title">Add Contacts</a>
            <form onSubmit={(e) => {
              e.preventDefault();
              this.props.addContact(this.state.name, this.state.position, this.state.Email, this.state.FollowUp, this.props.jobId);
            }}
            >
              <input type="text" name="name" placeholder={this.state.name} onChange={this.handleNameChange} className="aContact" />
              <input type="text" name="position" placeholder={this.state.position} onChange={this.handlePositionChange} className="aContact" />
              <input type="text" name="Email" placeholder={this.state.Email} onChange={this.handleEmailChange} className="aContact" />
              <input type="date" name="FollowUp" placeholder={this.state.FollowUp} onChange={this.handleFollowUpChange} className="aContact" />
              <Button variant="raised" color="primary" type="submit">Submit</Button>
            </form>
          </td>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addContact(name, position, Email, FollowUp, jobId) {
    dispatch(addContactApi(name, position, Email, FollowUp, jobId));
  },
});

export default connect(null, mapDispatchToProps)(AddContact);
