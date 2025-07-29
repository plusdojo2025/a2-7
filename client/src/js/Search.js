import React, { Component } from 'react';
import{ Link } from 'react-router-dom';
import axios from "axios";
import '../css/Search.css';
import '../App.css'


export default class Search extends React.Component {

  constructor(props) {
    super(props);
      //URLのパラメータなどでtag（入力文字）を取得してtagにセット
        this.state = {
          comment: '',
            tag: '',
            diaryId: '',
            diaries: [],
            tagList: {},
            inputText: '',
            usernames: [],
            users: [],
            user: '',
            sentence: '',
            tags: [],
            hashtag:"",
            comment_id: '',
            }
        }

componentDidMount() {
  let params = new URLSearchParams(window.location.search);
  let tag = params.get("tag");
  if(tag == null) {
    tag = "";
  }
  this.setState({tag:tag});
  console.log(this.state.tag);
  this.fetchDiaries(tag);

  //タグの一覧を取得してthis.setStateでtagListにセット
  //tags = [ タグObject , タグObject ]
  
  // const tagList = {};
  // this.state.tags.map( (tag) => {
  //   tagList[tag.hashtagId] = tag.tags;
  // } );
  // this.setState({
  //   tagList: tagList
  // });
  // tagList : {1:"#現実逃避",2:"#憂鬱"}
  //その時、tagListにTag配列をそのまま入れるのではなく、{ id : タグ文字 }となるようにループで作り変える

          fetch(`/api/search/user`)
          
            .then(res => res.json())
            .then(json => {
                this.setState({
                    user: json,
                    imagePreview: '/api/images/' + json.imageId,
                });
            })
            .catch(error => {
                console.error("データ取得中にエラーが発生しました:", error);
            });

}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tag !== this.state.tag) {
    }
  }

  fetchDiaries = async (tag) => {
    console.log(tag);
    try {
      const response = await axios.get(`/api/search?tag=` + tag);
      this.setState({ diaries: response.data });
    } catch (error) {
      console.error('日記の取得に失敗しました', error);
    }
  };


            //画面で何か入力された時に、その値をstateとして保持する。
    //これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる。
    onInput = (e) => {
        this.setState({ tag: e.target.value });
  console.log(e.target.value);
    }
        viewStamp = (e) => {
    }
    toggleModal = () => {
        const{ showModal } = this.state;
        this.setState({
            showModal: !showModal
        });
    }

//     deleteBook = (index) => {
//         const { diary } = this.state;
//         const data = { id: diary[index].id };
//         axios.post("/search/delete", data)
//     .then(() => {
//       this.fetchBooks(); // ← 削除後に再取得
//     })
//     .catch(error => {
//       console.error("削除エラー:", error);
//       alert("削除に失敗しました。");
//     });
// };

    render(){
        
        const {showModal,index,comment, imagePreview} = this.state;
        
        let comsize = comment.length;
        
const stampIcons = {
  1: "😡",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😍",
};

        return(

        <div>
            <div>
                {/*検索フォームに入力した文字の取り出し(動作未確認)*/}
  <input type="text" name="inputText" className="searchTag"
   placeholder="タグ検索" value={this.state.tag} onChange={this.onInput}/>

  <button onClick={ () => this.fetchDiaries(this.state.tag)} className="searchButton">検索</button>
            </div>

{/* user関連のあれこれ */}
            <div className="searchDiary">
                <div className="commentAreaContainer">
                  {this.state.diaries.map((diary) => (
                    <div key={diary.id}>

                      <span className="userImgSearch">
                        <Link to="/mypage">{imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="プロフィール画像"
                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                            />
                          ) : (
                            <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc', borderRadius: '50%' }} />
                          )}</Link>
                      </span>

                      <span className="searchNickname userNameSearch">
                        <Link to="/mypage">{this.state.user.nickname}</Link>
                      </span>

                      <span className="diaryTime">{diary.diaryTime}</span>
                      <div className="diaryCard">
                        <p>{diary.sentence}
                          {/* <p>{diary.posts.map( (post,index) => {
                          return <span>ハッシュタグ:{this.state.tagList[post.id]}</span>
                            })}
                          </p> */}
                        </p>

                      </div>

                      <div classname="reactionAiconConteiner">
                        <span className="reactionAicon">{stampIcons[diary.stamp]}</span>
                <Link to={"/diarypage/"+diary.diaryId} state={{ diary: {diary} }}>
                <button className="commentAll">💬</button></Link>
                      </div>                      
                    </div>

                  ))}
                </div>
            </div>

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