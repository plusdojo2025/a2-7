import React, { Component } from 'react';
import axios from "axios";
import '../css/Search.css';


export default class Search extends Component {

    
  constructor(props) {
    super(props);
    
        this.state = {
            username: "",
            login_id: "",
            diary_id: "",
            sentence: "",
            Tags: [],
            comment_id: "",
        }

  }
        handleClick = () => {
            const {diary_id} = this.state;
            const data = {};
            axios.post("/search/{username}/{date}",data)
            .then(json => {
                console.log(json);
                this.setState({
                    
                });
                this.componentDidMount();
            });

        };
        handleReactionClick = () => {

        };
        hundleCommentClick = () => {

        };
            //画面で何か入力された時に、その値をstateとして保持する。
    //これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる。
    onInput = (e) => {
        const key = e.target.name;
        console.log(key)
        this.setState({
            [key]: e.target.value
        });

        console.log(e.target.value);
    }   

    toggleModal = () => {
        const{ showModal } = this.state;
        this.setState({
            showModal: !showModal
        });
    }

    deleteBook = (index) => {
        const { books } = this.state;
        const data = { id: books[index].id };
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

        const {tag, showMOdal, key, username, index, id} = this.state;

        return(
        <div>
            <div>
                {/*検索フォームに入力した文字の取り出し(未完)*/}
  <input type="text" name="searchTag" onChange={this.onInput}placeholder="タグ検索"></input>
  <button onClick={this.handleClick}>検索</button>
            </div>

{/*user関連のあれこれ*/}
            <div className="searchDiary">
                <span className="userImgSearch">{this.state.userimage}</span>
                <span className="userNameSearch">
                    {this.state.username}カラス
                </span>
                <div className="commentArea">今日もいい天気</div>
                <button className="reactionButton">👍</button>
                <button className="reactionButton">😘</button>
                <button className="reactionButton">😲</button>
                <button className="commentAll" onClick="">💬</button>
            </div>

            <div className="userImgSearch">{this.state.userimage}</div>
            <div className="userNameSearch">
                {this.state.username}カラス
            </div>
            
            <div className="commentArea">みんな今日は華金だで！！酒飲むぞー！！！ #今日も一日お疲れ様✨ </div>

            {/*モーダルやら*/}
            {showMOdal &&
            <div className="commentArea">
                <button>×</button>
                <h2>日記を削除します。本当によろしいですか？</h2>
                <button>キャンセル</button>
                <button onClick={() => {this.deleteBook(index)}}>OK</button>
            </div>
            }
        </div>
            
        );
    }
}