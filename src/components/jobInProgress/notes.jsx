import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserNotes } from '../../actions/actions';
import axios from 'axios';


class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '',
      notes: '',
      retrieve: 'TEST',
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveNotes = this.saveNotes.bind(this);
  }

  componentDidMount() {
    axios.get('/api/findnotes')
      .then((res) => {
        console.log('this is res: ', res.data);
        this.props.setUserNotes(res.data);
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    console.log('right here, christine', e.target.value);
    this.setState({
      notes: e.target.value,
    });
  }

  makeTab(active) {
    this.setState({ activeTab: active });
    this.setState({ notes: this.props.allnotes.data.filter(note => note.job_id === this.props.id)[0][active] });
    this.setState({ show: true });
  }

  saveNotes(event) {
    const tab = this.state.activeTab;
    event.preventDefault();
    axios.post('/api/notes', {
      [tab]: this.state.notes,
      job_id: this.props.id,
    })
      .then((data) => {
        console.log('this is data after saved: ', data);
      });
  }


  render() {
    console.log('this is allNotes: ', this.props.allnotes);
    return (
      <div>
        <a href="#" onClick={this.makeTab.bind(this, 'Start')}>Start </a>
        <a href="#" onClick={this.makeTab.bind(this, 'Application')}>Application </a>
        <a href="#" onClick={this.makeTab.bind(this, 'Submit')}>Submit </a>
        <a href="#" onClick={this.makeTab.bind(this, 'Interview')}>Interview </a>
        <a href="#" onClick={this.makeTab.bind(this, 'Offer')}>Offer </a>
        <br />
        <h2>{this.state.activeTab}</h2>
        {this.state.show ?
          <div id="results" className="search-results">
            <form onSubmit={this.saveNotes}>
              <input type="text" value={this.state.notes} onChange={e => this.handleChange(e)} style={{ height: 100, width: 600 }} />
              <input type="submit" value="Save" />
            </form>
          </div> : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) =>
  ({ allnotes: state.allNotes });

const mapDispatchToProps = dispatch => ({
  setUserNotes: (notes) => { dispatch(setUserNotes(notes)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
