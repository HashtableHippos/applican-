import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setSearchTerm, updateJobListings } from '../../actions/actions';


class JobSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobType: '',
      location: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchLocationChange = this.handleSearchLocationChange.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  handleSearchTermChange(e) {
    this.setState({
      jobType: e.target.value,
    });
    this.props.handleSearchTermChange(e);
  }

  handleSearchLocationChange(e) {
    this.setState({
      location: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post('/api/search', {
      data: {
        text: this.state.jobType,
        location: this.state.location,
      },
    })
      .then((data) => {
        this.props.addAPIJobData(data.data);
        this.props.history.push('/search');
      });
  }

  render() {
    return (
      <div className="mui-container mui--text-center">
        <h1>{this.state.jobType}</h1>
        <h2>{this.state.location}</h2>
        <form className="search" onSubmit={this.handleSubmit}>
          <input className="input1"
            type="text"
            onChange={e => this.handleSearchTermChange(e)}
            placeholder="Job Type"
          />
          <input className="input2"
            type="text"
            onChange={e => this.handleSearchLocationChange(e)}
            placeholder="Zip Code"
          />
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ searchTerm: state.searchTerm });

const mapDispatchToProps = dispatch => ({
  handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  },
  addAPIJobData(APIData) {
    dispatch(updateJobListings(APIData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);
