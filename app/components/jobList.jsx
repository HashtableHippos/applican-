import React from 'react';
import { connect } from 'react-redux';
import JobListEntry from './jobListEntry';

const JobList = props => (
  <div>
    {
      props.jobAPIData.data.map((job, idx) => (<JobListEntry job={job} key={idx} />))
    }
  </div>
);

const mapStateToProps = state => ({ jobAPIData: state.jobAPIData });

export default connect(mapStateToProps)(JobList);
