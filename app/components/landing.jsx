import React from 'react';
import { connect } from 'react-redux';
import { setSearchTerm, updateJobListings } from '../actions/actions';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/search', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.props.searchTerm,
      }),
    })
      .then((res) => {
        res.json()
          .then((data) => {
            console.log(data);
            this.props.addAPIJobData(data);
            this.props.history.push('/search');
          });
      });
  }

  render() {
    return (
      <div className="mui-container mui--text-center">
        <h1>{this.props.searchTerm}</h1>
        <h2>The can-do job searcher that's right for you!!</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.props.searchTerm}
            onChange={this.props.handleSearchTermChange}
          />
          <input type="submit" value="Submit" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
