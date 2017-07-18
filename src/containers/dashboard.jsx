import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MDDelete from 'react-icons/md/delete';
import MDAdd from 'react-icons/md/add';
import JobStepper from '../components/shared/jobStepper/jobStepper';
import JobTable from '../components/dashboard/jobTable';
import { updateJobStatusAPI, deleteJobAPI, fetchUserJobs, setSortFilter } from '../actions/actions';
import getSortedJobs from '../selectors/jobs';

import '../styles/css/dashboard.css';


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
        <div className="filterBox">
          <span className="filter-label">SORT </span>
          <select onChange={this.props.toggleSortFilter}>
            <option value="DEFAULT"> Default</option>
            <option value="BY_PROGRESS"> By Progress</option>
            <option value="BY_DATE"> By Progress</option>
          </select>
        </div>
        {(this.state.filterValue === 'all' || this.state.filterValue === 'saved') &&
        (<div>
          <h3>Saved Jobs</h3>
          <JobTable userJobs={this.props.userJobs} 
            handleAddJobToQueue={this.props.addJobToQueue} filter={-1}
          />
        </div>
        )}

        {(this.state.filterValue === 'all' || this.state.filterValue === 'progress') &&
        (<div>
          <h3>In Progress</h3>
          <table className="mui-table">
            <thead>
              <tr>
                <th>Remove</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Date</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {this.props.userJobs.filter(job => job.status >= 0 && job.status < 4).map(job =>
                (<tr key={job.id}>
                  <td width={50}>
                    <button onClick={() => this.props.deleteJob(job)}> 
                      <MDDelete size={25} />
                    </button>
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
        {(this.state.filterValue === 'all' || this.state.filterValue === 'complete') &&
        (<div>
          <h3>Completed Jobs</h3>
          <JobTable userJobs={this.props.userJobs} filter={4} />
        </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ userJobs: getSortedJobs(state), isUserAuth: state.user });
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
  toggleSortFilter(evt) {
    dispatch(setSortFilter(evt.target.value));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
