import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import axios from 'axios';
import { selectJobDetails, setJobDesc } from '../../actions/actions';

class JobListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmSave: false,
      style: {color: 'blue', fontSize: '15px'}
    }; 

    this.selectJobHandle = this.selectJobHandle.bind(this);
    this.saveJob = this.saveJob.bind(this);
  }

  selectJobHandle(e) {
    this.props.selectJob(this.props.job);
    axios({
      method: 'POST',
      url: '/api/dice',
      data: {
        url: this.props.job.detailUrl,
      },
    })
      .then((data) => {
        this.props.setJobDesc(data.data);
      });
  }
  saveJob(e) {
    if (!this.props.user) {
      alert('Please login to enable Save Job function.'); 
      return; 
    }
    axios.post('/api/jobs', {
      data: {
        position: this.props.job.jobTitle,
        company: this.props.job.company,
        location: this.props.job.location,
        job_url: this.props.job.detailUrl,
        post_date: this.props.job.date,
      },
    })
      .then((data) => {
        this.setState({ confirmSave: true }); 
      });
  }

  render() {
    return (
      <div className="mui--divider-bottom">
        <a onClick={e => this.selectJobHandle(e, this.props.job)}>
          <h3>{this.props.job.jobTitle}</h3>
          <p>{this.props.job.company}: {this.props.job.location}</p>
        </a>
        <button
          className="mui-btn mui-btn--raised mui-btn--primary"
          onClick={e => this.saveJob(e)}
        >Save Job
        </button> {this.state.confirmSave ? <a style={this.state.style}> Job Saved!</a> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  selectJob(job) {
    dispatch(selectJobDetails(job));
  },
  setJobDesc(jobDesc) {
    dispatch(setJobDesc(jobDesc));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobListEntry));
