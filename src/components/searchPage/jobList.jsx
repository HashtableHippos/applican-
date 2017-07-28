import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobListEntry from './jobListEntry';


class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSelect: 0,
      activePage: '',
      color: '#8A58B7',
    };
    this.handlePageNumberClick.bind(this);
  }

  handlePageNumberClick(e) {
    e.preventDefault();
    this.setState({ activePage: e.target.value}); 
    this.setState({ pageSelect: (e.target.value * 10) - 10 });
  }

  render() {
    console.log('active page: ', typeof(this.state.activePage)); 
    const pages = Array.from(Array(Math.floor((this.props.jobAPIData.data.length) / 10)).keys(), val => val + 1);
    return (
      <div>
        <div>
          {pages.map(num => (
            <button className="page" value={num} key={Math.random()*num}
              onClick={e => this.handlePageNumberClick(e)} style={(num) === Number(this.state.activePage)? { backgroundColor: this.state.color } : null}
            >Page {num}
            </button>))}
        </div><br />
        {this.props.jobAPIData.data.slice(this.state.pageSelect, this.state.pageSelect + 10)
          .map(job => (<JobListEntry job={job} key={job.detailUrl} history={this.props.history} />))}
      </div>
    );
  }
}

const mapStateToProps = state => ({ jobAPIData: state.jobAPIData });

export default connect(mapStateToProps)(JobList);
