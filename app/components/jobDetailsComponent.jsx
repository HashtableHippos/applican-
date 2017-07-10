import React from 'react';
import { connect } from 'react-redux';

const JobDetails = (props) => {
  const renderThis = props.selectJob.data ?
    (
      <div>
        <h2>{props.selectJob.data.jobTitle}</h2>
        <h2>{props.selectJob.data.company}</h2>
        <h4>{props.selectJob.data.location}</h4>
        <h4>{props.selectJob.data.date}</h4>
        <h3>{props.selectJob.data.detailUrl}</h3>
      </div>
    )
    : <div className="mui--text-center"><h1>Select a job</h1></div>;

  return (
    renderThis
  );
};

const mapStateToProps = state => ({ selectJob: state.jobDetailsDisplay });

export default connect(mapStateToProps)(JobDetails);
