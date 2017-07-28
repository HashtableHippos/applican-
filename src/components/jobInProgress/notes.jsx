import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserNotes } from '../../actions/actions';
import axios from 'axios';
import Container from 'muicss/lib/react/container';
import Button from 'muicss/lib/react/button';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '',
      notes: '',
      tabs: ['Start', 'Application', 'Submit', 'Interview', 'Offer'],
      color: '#8A58B7',
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveNotes = this.saveNotes.bind(this);
  }

  componentDidMount() {
    axios.get('/api/findnotes')
      .then((res) => {
        this.props.setUserNotes(res.data);
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    this.setState({
      notes: e.target.value,
    });
  }

  makeTab(active) {
    this.setState({ activeTab: active });
    const data = this.props.allnotes.data.filter(note => note.job_id === this.props.id);
    if (data.length === 0) {
      this.setState({ notes: '' });
    } else {
      const retrieve = data[0][active];
      this.setState({ notes: retrieve !== null ? retrieve : '' });
    }
  }

  saveNotes(event) {
    const tab = this.state.activeTab;
    event.preventDefault();
    axios.post('/api/notes', {
      [tab]: this.state.notes,
      job_id: this.props.id,
    })
      .then((data) => {
        alert('Notes Saved!'); 
        axios.get('/api/findnotes')
          .then((res) => {
            this.props.setUserNotes(res.data);
          })
          .catch(err => console.log(err));
      });
  }

  render() {
    return (
      <Container>
        <div className="tabhead">
          {this.state.tabs.map(tab => (
            <button className="tabs" onClick={this.makeTab.bind(this, tab)} style={tab === this.state.activeTab ? { backgroundColor: this.state.color } : null}> {tab.toUpperCase()} </button>
          ))}
          <br />
          <div id="results" className="search-results">
            <form onSubmit={this.saveNotes}>
              <textarea className="input" type="text" value={this.state.notes} onChange={e => this.handleChange(e)} />
              <br />
              <Button variant="raised" color="primary">SAVE</Button>
            </form>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) =>
  ({ allnotes: state.allNotes });

const mapDispatchToProps = dispatch => ({
  setUserNotes: (notes) => { dispatch(setUserNotes(notes)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
