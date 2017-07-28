import React, { Component } from 'react';
import axios from 'axios';
import Button from 'muicss/lib/react/button';

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: 'file' };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleResumeSubmit = this.handleResumeSubmit.bind(this);
  }

  handleFileChange(evt) {
    this.setState({ file: evt.target.files[0] });
  }
  handleResumeSubmit(evt) {
    evt.preventDefault();
    const { file } = this.state;
    const { endpointUrl } = this.props;
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.setState({ file: '' });
    return axios.post(endpointUrl, formData, config).then(data => {
      if (this.props.onSubmit) {
        this.props.onSubmit ();
      }
    });
  }

  render() {
    return (
      <div className="uploadBar">
        <form onSubmit={this.handleResumeSubmit}>
          <input type="file" onChange={this.handleFileChange} />
          <Button color="primary" variant="raised">Submit</Button>
        </form>
      </div>
    );
  }
}
export default FileUploader;
