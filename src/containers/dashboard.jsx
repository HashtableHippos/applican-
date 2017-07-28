import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MDDelete from 'react-icons/md/delete';
import JobStepper from '../components/shared/jobStepper/jobStepper';
import SavedJobsTable from '../components/dashboard/savedJobsTable';
import LineChart from '../components/dashboard/linechart';
import PieChart from '../components/dashboard/piechart';
import { updateJobStatusAPI, deleteJobAPI, fetchUserJobs, setSortFilter } from '../actions/actions';
import { getSortedJobs } from '../selectors/jobs';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = ({ filterValue: 'all', name: 'name', position: 'position', Email: 'email', FollowUp: new Date() });
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
        <div className="panel-container">
          <div>
            <div className="mui-panel dashboard-panel">
              <div className="panel-heading"> Total Jobs </div>
              <div className="panel-body"> {this.props.userJobs.length} </div>
            </div>
            <div className="mui-panel dashboard-panel" >
              <div className="panel-heading"> Jobs in Progress </div>
              <div className="panel-body"> {this.props.userJobs.filter(job => (job.status !== -1 && job.status !== 4)).length}</div>
            </div>
          </div>
          <div className="mui-panel dashboard-panel">
            <LineChart jobs={this.props.userJobs} />
          </div>
          <div className="mui-panel dashboard-panel">
            <PieChart />
          </div>
        </div>
        <span className="filterBox">
          <span className="filter-label">Show </span>
          <select value={this.state.filterValue} onChange={this.handleFilterChange}>
            <option value="all"> All Jobs</option>
            <option value="saved"> Saved Jobs</option>
            <option value="progress">Jobs in Progress</option>
            <option value="complete">Completed Jobs</option>
          </select>
        </span>
        <span className="filterBox">
          <span className="filter-label">SORT </span>
          <select onChange={this.props.toggleSortFilter}>
            <option value="DEFAULT"> By Date </option>
            <option value="BY_PROGRESS"> By Progress </option>
          </select>
        </span>
        {(this.state.filterValue === 'all' || this.state.filterValue === 'saved') &&
        (<div><br />
          <h3>Saved Jobs</h3>
          <SavedJobsTable statusFilterValue={-1} />
        </div>
        )}

        {(this.state.filterValue === 'all' || this.state.filterValue === 'progress') &&
        (<div>
          <h3>Job in Progress</h3>
          <table className="mui-table">
            <thead>
              <tr>
                <th />
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
                      <MDDelete size={20} />
                    </button>
                  </td>
                  <td>-
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
          <SavedJobsTable statusFilterValue={4} />
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
