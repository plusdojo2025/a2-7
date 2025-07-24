import React, { Component } from 'react';
import axios from 'axios';
import './DiaryComponentTest.css'; // ✅ Import CSS

export default class DiariesComponentTest extends Component {
 constructor(props) {
  super(props);

  const today = props.selectedDate || new Date().toISOString().split('T')[0];

  this.state = {
    login_id: '',
    sentence: '',
    stamp: 0,
    resist_time: new Date().toISOString().split('.')[0],
    diary_time: today,
    image: null,
    imageName: ''
  };
}
componentDidUpdate(prevProps) {
  if (prevProps.selectedDate !== this.props.selectedDate) {
    this.setState({ diary_time: this.props.selectedDate });
  }
}


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleStampClick = (value) => {
    this.setState({ stamp: value });
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];
    this.setState({
      image: file,
      imageName: file ? file.name : ''
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      login_id, sentence, stamp, resist_time, diary_time, image, imageName
    } = this.state;

    if (!login_id || isNaN(parseInt(login_id))) {
      alert("Please select 公開 or 非公開.");
      return;
    }

    if (!sentence.trim()) {
      alert("Please write something in your diary.");
      return;
    }

    const formData = new FormData();
    formData.append('login_id', login_id);
    formData.append('sentence', sentence);
    formData.append('stamp', stamp);
    formData.append('resist_time', resist_time);
    formData.append('diary_time', diary_time);

    if (image) {
      formData.append('imageFile', image);
      formData.append('name', imageName || 'diary-image');
    }

    axios.post('http://localhost:8080/diary/register', formData)
      .then(res => {
        alert('Diary and image submitted!');
        console.log(res.data);
        this.setState({
          login_id: '',
          sentence: '',
          stamp: 0,
          resist_time: new Date().toISOString().split('.')[0],
          diary_time: new Date().toISOString().split('T')[0],
          image: null,
          imageName: ''
        });
      })
      .catch(err => {
        if (err.response) {
          console.error('Server error:', err.response.data);
        } else if (err.request) {
          console.error('No response from server:', err.request);
        } else {
          console.error('Request error:', err.message);
        }
        alert('Failed to submit diary/image.');
      });
  };

  render() {
    console.log('📅 DiaryComponent selectedDate:', this.props.selectedDate);

    const { diary_time, sentence, stamp } = this.state;

    const emojis = [
      { id: 1, icon: '😡', label: 'Angry' },
      { id: 2, icon: '😕', label: 'Sad' },
      { id: 3, icon: '😐', label: 'Neutral' },
      { id: 4, icon: '🙂', label: 'Happy' },
      { id: 5, icon: '😍', label: 'Love' }
    ];

    return (
      <div className="container">
        {/* <h2>📅 Today: {diary_time}</h2> */}
        <h2>📅選択した日付 : <span className="highlighted-date">{this.state.diary_time}</span></h2>



        <textarea
          name="sentence"
          placeholder="Write your thoughts here... Use #hashtag for important notes"
          value={sentence}
          onChange={this.handleChange}
          className="textArea"
        />

        <div className="hashtagPreview">
          {sentence.split(' ').map((word, index) =>
            word.startsWith('#') ? (
              <span key={index} className="hashtag">{word} </span>
            ) : (
              <span key={index}>{word} </span>
            )
          )}
        </div>

        <div className="formRow">
          <select
            name="login_id"
            value={this.state.login_id}
            onChange={this.handleChange}
            className="select"
          >
            <option value="">設定</option>
            <option value="1">公開</option>
            <option value="2">非公開</option>
          </select>

          <input
            type="file"
            onChange={this.handleImageChange}
            className="imageInput"
          />
        </div>

        <div className="stampBox">
          <p>今日はどんな気分ですか</p>
          {emojis.map((emoji) => (
            <span
              key={emoji.id}
              title={emoji.label}
              className="emoji"
              style={{
                backgroundColor: stamp === emoji.id ? '#ffefc2' : 'transparent',
                border: stamp === emoji.id ? '2px solid orange' : '2px solid transparent'
              }}
              onClick={() => this.handleStampClick(emoji.id)}
            >
              {emoji.icon}
            </span>
          ))}
        </div>

        <button onClick={this.handleSubmit} className="button">
          Register
        </button>
      </div>
    );
  }
}
