import React, { Component } from 'react';
import axios from 'axios';

export default class DiariesComponent extends Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const now = new Date().toISOString().slice(0, 16);     // YYYY-MM-DDTHH:MM

   this.state = {
  login_id: '',
  sentence: '',
  stamp: 0,
  resist_time: now,
  diary_time: today,
  image: null,        // 👈 Add this
  imageName: ''       // 👈 Optional: for naming the image
};

  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleStampClick = (value) => {
    this.setState({ stamp: value });
  };
  handleImageChange = (e) => {
  this.setState({ image: e.target.files[0] });
};


  handleSubmit = (e) => {
  e.preventDefault();

  const { login_id, sentence, stamp, resist_time, diary_time, image } = this.state;

  // First: send diary
  axios.post('http://localhost:8080/diary/regist', {
    login_id, sentence, stamp, resist_time, diary_time
  })
  .then(res => {
    alert('Diary submitted!');
    console.log(res.data);

    // Second: upload image if selected
    if (image) {
      const formData = new FormData();
      formData.append('name', 'diary-' + res.data.diary_id); // link image to diary if needed
      formData.append('file', image);

      return axios.post('http://localhost:8080/diary/add', formData);
    }
  })
  .then(imgRes => {
    if (imgRes) {
      alert('Image uploaded!');
      console.log(imgRes.data);
    }
  })
  .catch(err => {
    console.error('Error:', err);
    alert('Error submitting diary or image.');
  });
};
handleImageUpload = () => {
  const { image } = this.state;

  if (!image) {
    alert("Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("name", "diary-upload");
  formData.append("file", image);

  axios.post("http://localhost:8080/diary/add", formData)
    .then((res) => {
      alert("Image uploaded!");
      console.log(res.data);
    })
    .catch((err) => {
      console.error("Image upload failed:", err);
      alert("Failed to upload image.");
    });
};




  render() {
    const { diary_time, sentence, stamp } = this.state;

    const emojis = [
      { id: 1, icon: '😡', label: 'Angry' },
      { id: 2, icon: '😕', label: 'Sad' },
      { id: 3, icon: '😐', label: 'Neutral' },
      { id: 4, icon: '🙂', label: 'Happy' },
      { id: 5, icon: '😍', label: 'Love' }
    ];

    return (
      <div style={styles.container}>
        <h2>📅 Today: {diary_time}</h2>

      <textarea
  name="sentence"
  placeholder="Write your thoughts here... Use #hashtag for important notes"
  value={this.state.sentence}
  onChange={this.handleChange}
  style={styles.textArea}
/>

 <div style={styles.hashtagPreview}>
  {this.state.sentence.split(' ').map((word, index) =>
    word.startsWith('#') ? (
      <span key={index} style={styles.hashtag}>{word} </span>
    ) : (
      <span key={index}>{word} </span>
    )
  )}
</div> 



      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '20px' }}>
  
  {/* Visibility select box */}
  <select
    name="login_id"
    value={this.state.login_id}
    onChange={this.handleChange}
    style={styles.select}
  >
    <option value="">設定</option>
    <option value="1">公開</option>
    <option value="2">非公開</option>
  </select>

  {/* Image file input */}
  <input type="file" onChange={this.handleImageChange} style={styles.imageInput} />

  {/* Upload button */}
  <button onClick={this.handleImageUpload} style={styles.uploadButton}>Upload Image</button>
</div>


        

        <div style={styles.stampBox}>
          <p>今日はどんな気分ですか</p>
          {emojis.map((emoji) => (
            <span
              key={emoji.id}
              title={emoji.label}
              style={{
                ...styles.emoji,
                backgroundColor: stamp === emoji.id ? '#ffefc2' : 'transparent',
                border: stamp === emoji.id ? '2px solid orange' : '2px solid transparent'
              }}
              onClick={() => this.handleStampClick(emoji.id)}
            >
              {emoji.icon}
            </span>
          ))}
        </div>

        <button onClick={this.handleSubmit} style={styles.button}>
          Register
        </button>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '60%',
    margin: 'auto',
    padding: '1rem',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },
  textArea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    fontSize: '16px',
    marginTop: '10px',
    marginBottom: '15px'
  },
  select: {
    padding: '8px',
    marginBottom: '20px'
  },
  stampBox: {
    margin: '20px 0'
  },
  emoji: {
    fontSize: '30px',
    margin: '8px',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '50%',
    transition: 'all 0.2s'
  },
  textArea: {
  width: '100%',
  height: '150px',
  padding: '10px',
  fontSize: '16px',
  marginTop: '10px',
  marginBottom: '10px',
  direction: 'ltr',
  textAlign: 'left'
},
hashtagPreview: {
  textAlign: 'left',
  padding: '8px',
  backgroundColor: '#0917d6ff',
  border: '1px solid #ddd',
  minHeight: '30px'
},
hashtag: {
  color: '#ff6600',
  fontWeight: 'bold'
},
imageInput: {
  padding: '6px',
  fontSize: '14px'
},
uploadButton: {
  padding: '6px 12px',
  fontSize: '14px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px'
}



  
  
};
