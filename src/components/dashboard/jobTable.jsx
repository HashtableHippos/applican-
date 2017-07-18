import React from 'react';
import MDAdd from 'react-icons/md/add';
import { Link } from 'react-router-dom';

const JobTable = props => (
  <table className="mui-table">
    <tbody>
      {props.userJobs.filter(job => job.status === props.filter).map(job =>
        (<tr key={job.id}>
          {props.handleAddJobToQueue &&
          <td width={50}>
            <span>
              <button
                onClick={() => props.handleAddJobToQueue(job)}
              >
                <MDAdd size={25} />
              </button>
            </span>
          </td>
          }
          <td>
            <Link to={`/jobs/${job.id}`}>{job.position}</Link>
          </td>
          <td>{job.company}</td>
          <td>{new Date(job.post_date).toDateString()}</td>
        </tr>))
      }
    </tbody>
  </table>
);

export default JobTable;
