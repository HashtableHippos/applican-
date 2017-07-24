import React from 'react';
import { connect } from 'react-redux';
import { Header, Icon } from 'semantic-ui-react';
import { updateJobStatusAPI, deleteJobAPI, fetchUserNotes } from '../actions/actions';
import JobStepper from '../components/shared/jobStepper/jobStepper';
import Contacts from '../components/jobInProgress/contacts';
import Notes from '../components/jobInProgress/notes';
import ContactInfo from '../components/jobInProgress/ContactInfo';

const JobInProgress = props => (
  <container>
    <div>
      <Header as="h2" icon textAlign="center">
        <i className="handshake icon" />
        <Header.Content>
          <h2>{props.job.position}</h2>
          <h2><i>{props.job.company}</i></h2>
        </Header.Content>
      </Header>
    </div>
    <div>
      <JobStepper job={props.job} handleProgressClick={props.toggleJobStatus} />
    </div>
    <br />
    <div>
      <Notes id={props.job.id} />
    </div>
    <div>
      <h3>Contacts</h3>
      <Contacts />
      <ContactInfo id={props.job.id} />
    </div>
  </container>
);

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
});

export default connect(mapStateToProps, mapDispatchToProps)(JobInProgress);

