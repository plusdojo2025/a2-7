import React, { Component } from 'react';
import axios from 'axios';

export default class ImageUpload extends Component {
  state = { file:null, name:'', message:'' };

  handleFileChange = e => this.setState({ file: e.target.files[0] });
  handleNameChange = e => this.setState({ name: e.target.value });

  handleSubmit = async (e) => {
  e.preventDefault();
  const { file, name } = this.state;

  const form = new FormData();
  form.append('name', name);
  form.append('file', file);

  try {
    const res = await axios.post('http://localhost:8080/diary/add', form);
    this.setState({ message: res.data.message });
  } catch (err) {
    console.error('🔥 Network error:', err);
    if (err.response) {
      console.log('🔍 Server responded with:', err.response.data);
    } else if (err.request) {
      console.log('📡 Request sent but no response received');
    } else {
      console.log('⚠️ Other error:', err.message);
    }
    this.setState({ message: 'Failed to upload image. Please check console.' });
  }
};


  render() {
    return (
      <div style={{ width:'60%', margin:'auto', textAlign:'center' }}>
        {/* <h2>🖼️ Upload Image</h2> */}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Image Name"
            value={this.state.name}
            onChange={this.handleNameChange}
          /><br/><br/>
          <input type="file" onChange={this.handleFileChange} /><br/><br/>
          <button type="submit">Upload</button>
        </form>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
