import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Panel from 'muicss/lib/react/panel';
import JobStepper from './jobStepper';
import JobTable from './dashboard/jobTable';
import { updateJobStatusAPI, deleteJobAPI, fetchUserJobs } from '../actions/actions';
import '../../public/assets/css/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = ({ filterValue: 'all' });
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchJobs();
  }
  handleFilterChange(evt) {
    this.setState({ filterValue: evt.target.value });
  }

  render() {
    return (
      <div className="mui-container-fluid">
        <h2>Job Search Summary</h2>
        <div className="mui-row">
          <div className="mui-panel mui-col-md-2">
            Total Job Applications
          </div>
          <div className="mui-panel mui-col-md-2" >
            Total Job Applications
          </div>
          <div className="mui-panel mui-col-md-8">
            Chart
          </div>
        </div>
        <div className="filterBox">
          <span className="filter-label">Show </span>
          <select value={this.state.filterValue} onChange={this.handleFilterChange}>
            <option value="all"> All Jobs</option>
            <option value="saved"> Saved Jobs</option>
            <option value="progress">Jobs in Progress</option>
            <option value="complete">Completed Jobs</option>
          </select>
        </div>
        {(this.state.filterValue === 'all' || this.state.filterValue === 'saved') &&
        (<div>
          <h3>Saved Jobs</h3>
          <JobTable userJobs={this.props.userJobs} handleAddJobToQueue={this.props.addJobToQueue} />
        </div>
        )}

        {(this.state.filterValue === 'all' || this.state.filterValue === 'progress') &&
        (<div>
          <h3>In Progress</h3>
          <table className="mui-table">
            <thead>
              <tr>
                <th>Remove</th>
                <th>Add Contact</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Date</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {this.props.userJobs.filter(job => job.status >= 0 && job.status < 5).map(job =>
                (<tr key={job.id}>
                  <td width={50}>
                    <button
                      className="mui-btn mui-btn--fab mui-btn--accent mui-btn--small"
                      onClick={() => this.props.deleteJob(job)}
                    >+</button>
                  </td>
                  <td width={50}>
                    <form>
                      <input type="text" name="name" value="Name" />
                      <input type="text" name="position" value="Position" />
                      <input type="text" name="Email" value="Email" />
                      <input type="date" name="FollowUp" value="Follow up date" />
                      <input type="submit" />
                    </form>
                  </td>
                  <td>
                    <Link to={`/jobs/${job.id}`}>{job.position}</Link>
                  </td>
                  <td>{job.company}</td>
                  <td>{new Date(job.post_date).toDateString()}</td>
                  <td>
                    <JobStepper job={job} handleProgressClick={this.props.toggleJobStatus} />
                  </td>
                </tr>))
              }
            </tbody>
          </table>
        </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ userJobs: state.userJobs, isUserAuth: state.user });
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
  fetchJobs() {
    dispatch(fetchUserJobs());
  },
  addContact(name, position, Email, FollowUp) {
    dispatch(addContact(name, position, Email, FollowUp));
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
