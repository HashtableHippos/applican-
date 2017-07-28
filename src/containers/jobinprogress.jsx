import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon } from 'semantic-ui-react';
import { updateJobStatusAPI, deleteJobAPI, fetchUserNotes, addContactApi } from '../actions/actions';
import JobStepper from '../components/shared/jobStepper/jobStepper';
import Notes from '../components/jobInProgress/notes';
import SavedCoverLetter from '../components/jobInProgress/savedCoverLetter';
import ContactInfo from '../components/jobInProgress/ContactInfo';
import AddContact from '../components/jobInProgress/AddContact';

class JobInProgress extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <container>
        <div>
          <Header as="h2" icon textAlign="center">
            <i className="handshake icon" />
            <Header.Content>
              <h2>{this.props.job.position}</h2>
              <h2><i>{this.props.job.company}</i></h2>
            </Header.Content>
          </Header>
        </div>
        <div>
          <JobStepper job={this.props.job} handleProgressClick={this.props.toggleJobStatus} />
        </div><br />
        <h3 className="title">Upload Cover Letter</h3>
        <div className="coverletter">
          <SavedCoverLetter jobId={this.props.job.id} coverLetterKey={this.props.job.cover_letter_key} />
        </div><br />
        <div>
          <h3 className="title">Notes</h3>
          <Notes id={this.props.job.id} />
        </div>
        <div className="contactsArrange">
          <h3 className="title">Contacts</h3>
          <AddContact jobId={this.props.job.id} />
          <ContactInfo jobId={this.props.job.id} />
        </div>
      </container>

    );
  }
}


const mapStateToProps = (state, ownProps) =>
  ({ job: state.userJobs.find(job => job.id === parseInt(ownProps.match.params.id, 10)),
  });
const mapDispatchToProps = dispatch => ({
  addJobToQueue(job) {
    dispatch(updateJobStatusAPI(job, 0));
  },
  toggleJobStatus(numString, job) {
    const incrementer = Number(numString) - 1;
    dispatch(updateJobStatusAPI(job, incrementer));
  },
  deleteJob(job) {
    dispatch(deleteJobAPI(job));
  },
  addContact(name, position, Email, FollowUp, id) {
    dispatch(addContactApi(name, position, Email, FollowUp, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JobInProgress);

