import React, { Component } from 'react';
import{ Link } from 'react-router-dom';
import axios from "axios";
import '../css/Search.css';
import '../App.css'


export default class Search extends Component {

  constructor(props) {
    super(props);
    
        this.state = {
            inputText: '',
            username: "",
            login_id: "",
            diary_id: "",
            sentence: "",
            Tags: [],
            comment_id: "",
            }
        }

        // handleClick = () => {
        //     const { inputText } = this.state;
        //     const data = {};
        //     axios.post("/search/${this.state.username}/${this.state.date}",data)
        //     .then(json => {
        //         console.log(json);
        //         this.setState({
                    
        //         });
        //         this.componentDidMount();
        //     });

        // };
//検索フォームのイベントハンドラー
        handleClick = () => {
const { inputText, login_id } = this.state;

  axios.get(`http://localhost:8080/search`, {
    params: {
      keyword: inputText,
      loginId: login_id
    }
  })
  .then((res) => {
    this.setState({ results: res.data });
  })
  .catch((err) => {
    console.error("検索失敗:", err);
  });
};

//コメント表示のイベントハンドラー
        handleCommentClick = () => {
            const {diary_id, comments_id} = this.state;
            const data = {};
            axios.get(`/search/${this.state.username}/${this.state.date}`)
            .then(json => {
                console.log(json);
                this.setState({
                    diaryId: diary_id,
                    commentsId: comments_id
                });
                this.componentDidMount();
            });
        };
            //画面で何か入力された時に、その値をstateとして保持する。
    //これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる。
    onInput = (e) => {
        this.setState({ inputText: e.target.value });
    }   

        viewStamp = (e) => {

    }   

    toggleModal = () => {
        const{ showModal } = this.state;
        this.setState({
            showModal: !showModal
        });
    }

    deleteBook = (index) => {
        const { diary } = this.state;
        const data = { id: diary[index].id };
        axios.post("/search/delete", data)
    .then(() => {
      this.fetchBooks(); // ← 削除後に再取得
    })
    .catch(error => {
      console.error("削除エラー:", error);
      alert("削除に失敗しました。");
    });
};

    render(){

        const {tag, showModal, key, username, index, id} = this.state;

        return(

        <div>
            <div>
                {/*検索フォームに入力した文字の取り出し(未完)*/}
  <input type="text" name="inputText" className="searchTag" onChange={this.onInput}
   placeholder="タグ検索" value={this.state.inputText}/>

  <button onClick={this.handleClick} className="searchButton">検索</button>
            </div>



{/*user関連のあれこれ*/}
            <div className="searchDiary">
                <span className="userImgSearch"><Link to="/mypage">{this.state.userimage}  
                ●</Link>
                </span>
                <span className="userNameSearch"><Link to="/mypage">
                    {this.state.username}カラス</Link>
                </span>
                <div className="commentArea">今日もいい天気#現実逃避</div>
                {/*私は押す処理が必要がなく、どのリアクションを押したか
                アイコンを格納しておいて、入力されたアイコンIDを取得して表示*/}
                <span classname="reactionAiconConteiner">{this.state.viewStamp}
                <span className="reactionAicon">😡</span>
                <span className="reactionAicon">😕</span>
                <span className="reactionAicon">😐</span>
                <span className="reactionAicon">🙂</span>
                <span className="reactionAicon">😍</span>
                </span>

                <button className="commentAll" onClick={this.handleCommentClick}>💬</button>
                <span className="commentCount">1</span>
            </div>

            <span className="userImgSearch">{this.state.userimage}<Link to="/mypage">
                ■</Link>
            </span>
            <span className="userNameSearch"><Link to="/mypage">
                {this.state.username}カラス</Link>
            </span>
            
            <div className="commentArea">みんな今日は華金だで！！酒飲むぞー！！！ #今日も一日お疲れ様✨ </div>

            {/*モーダルやら*/}
            {/*<input type="submit" onClick={this.toggleModal} value="削除"></input>*/}
            {showModal &&
            <div className="modalArea">
                <button onClick={this.toggleModal}>×</button>
                <h2>日記を削除します。本当によろしいですか？</h2>
                <button onClick={this.toggleModal}>キャンセル</button>
                <button onClick={() => {this.deleteBook(index)}}>OK</button>
            </div>
            }
        </div>
            
        );
    }
}