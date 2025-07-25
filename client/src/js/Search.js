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
            diaries: [],
            tagList: {1:"#現実逃避",2:"#憂鬱"},
            inputText: '',
            usernames: [],
            users: [],
            diaryId: "",
            diary: [],
            sentence: '',
            tags: [],
            hashtag:"",
            comment_id: '',
            }
        }

          componentDidMount() {
            
this.fetchDiaries();

  const diaryId = this.props?.diary?.diaryId;
  if (diaryId) {
    fetch(`/search/tag/${diaryId}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ tag: json });
      })
      .catch(error => {
        console.error("データ取得中にエラーが発生しました:", error);
      });
  } else {
    console.warn("diaryId が取得できませんでした。props.diary が undefined の可能性があります。");
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
//         handleClick = () => {
// const { inputText, login_id } = this.state;

//   axios.get(`http://localhost:8080/search`, {
//     params: {
//       keyword: inputText,
//       loginId: login_id
//     }
//   })
//   .then((res) => {
//     this.setState({ results: res.data });
//   })
//   .catch((err) => {
//     console.error("検索失敗:", err);
//   });
// };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tag !== this.state.tag) {
    }
  }

  fetchDiaries = async () => {
    try {
      const response = await axios.get(`/api/search`, {
        params: this.state.tag ? { tag: this.state.tag } : {}
      });
      this.setState({ diaries: response.data });
    } catch (error) {
      console.error('日記の取得に失敗しました', error);
    }
  };



//コメント表示のイベントハンドラー
        handleCommentClick = () => {
            const {diary_id, comments_id} = this.state;
            const data = {};
            axios.get(`/search/${this.state.diary_id}/${this.state.date}`)
            .then(json => {
                console.log(json);
                this.setState({
                    diaryId: diary_id,
                    commentsId: comments_id
                });
            });
        };
            //画面で何か入力された時に、その値をstateとして保持する。
    //これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる。
    onInput = (e) => {
        this.setState({ tag: e.target.value });
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
        
        const {tag, showModal, key, index, user, comment} = this.state;
        
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

  <button onClick={this.fetchDiaries} className="searchButton">検索</button>
            </div>

{/* user関連のあれこれ */}
            <div className="searchDiary">
                <span className="userImgSearch"><Link to="/mypage">{this.state.userimage}  
                ●</Link>
                </span>
                <span className="userNameSearch"><Link to="/mypage">
                    カラス</Link>
                </span>

                <div className="commentAreaContainer">
                  {this.state.diaries.map((diary, user) => (
                    <div key={diary.id}>

                      <span>{user.nickname}</span>
                      <span className="diaryTime">{diary.diaryTime}</span>
                      <div className="diaryCard">
                        <p>{diary.sentence}


                          {Array.isArray(tag) && tag.map((tagdata, index)  => (
                                    <block keyWord={index}>{tagdata.tags}</block>
                          ))}

                        </p>
                      </div>
                      <div>ハッシュエリア
                        {diary.posts.length}
                        <p>{diary.posts.map( (post,index) => {
                          return <span>ハッシュタグ:{this.state.tagList[post.id]}</span>
                        })}
                        </p>
                      </div>
                      <div classname="reactionAiconConteiner">
                        <span className="reactionAicon">{stampIcons[diary.stamp]}</span>
                <Link to={"/diarypage/"+diary.diaryId} state={{ diary: {diary} }}>
                <button className="commentAll">💬</button>{comsize}</Link>
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