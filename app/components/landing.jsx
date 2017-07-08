import React from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', location: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.persist();
    this.setState({ value: event.target.value });
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
        title: this.value,
      }),
    })
      .then((res) => {
        console.log(res);
        res.json()
          .then((data) => {
            console.log(data);
          });
      });
    this.props.history.push('/search');
  }

  render() {
    return (
      <div className="mui-container mui--text-center">
        <h1>Welcome to Applican</h1>
        <h2>The can-do job searcher that's right for you!</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Landing;