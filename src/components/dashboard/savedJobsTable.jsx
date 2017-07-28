import React from 'react';
import MDAdd from 'react-icons/md/add';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MDDelete from 'react-icons/md/delete';
import { deleteJobAPI, updateJobStatusAPI } from '../../actions/actions';
import { getSavedJobs } from '../../selectors';

const SavedJobsTable = props => (
  <table className="mui-table">
    <thead>
      <tr>
        <th />
        <th>Job Title</th>
        <th>Company</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {props.userJobs.map(job =>
        (<tr key={job.id}>
          <td width={50}>
            <span>
              {props.statusFilterValue === -1 &&
              <button
                onClick={() => props.addJobToQueue(job)}
              >
                <MDAdd size={20} />
              </button>
              }
              <button onClick={() => props.deleteJob(job)}>
                <MDDelete size={20} />
              </button>
            </span>
          </td>
          <td>
            <Link to={`/jobs/${job.id}`}>{job.position}</Link>
          </td>
          <td>{job.company}</td>
          <td>{new Date(job.post_date).toDateString()}</td>
        </tr>
        ))
      }
    </tbody>
  </table>
);
const mapStateToProps = (state, ownProps) =>
  ({
    userJobs: getSavedJobs(state, ownProps.statusFilterValue),
  });
const mapDispatchToProps = dispatch => ({
  addJobToQueue(job) {
    dispatch(updateJobStatusAPI(job, 0));
  },
  deleteJob(job) {
    dispatch(deleteJobAPI(job));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedJobsTable);
