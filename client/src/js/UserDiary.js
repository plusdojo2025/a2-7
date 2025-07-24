import React from "react";
import '../css/UserDiary.css';
import axios from "axios";
import { Link } from 'react-router-dom';

import TimelineDiaries from '../Components/TimelineDiariesComponents'
import UserDiarycoments from '../Components/UserDiarycomentsComponents'

export default class UserDiary extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);


        //stateの設定。
        this.state = {
                diary:{},
                honnninn:"",
                addcomment:"",
                imagePreview:"",
                user:{},
                tag:[],

                currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                currentDate: new Date().toLocaleDateString(),  // 今日の日付
            };
    }

    //マウント後に自動で動作する。
    componentDidMount(){
        // 1秒ごとに現在時刻を更新
    this.timerID = setInterval(() => {
      this.updateTime();  // updateTimeメソッドを呼び出して時刻を更新
      this.timerID = setInterval(() => this.updateTime(), 1000); // 1秒ごとに時刻を更新

    }, 1000);


        let urlList = window.location.pathname.split('/');
        let diaryId = urlList[urlList.length -1];
        console.log("取得したdiaryId:" + diaryId);


        // diary_idを使ってテンプレートリテラルでURLを作成
fetch(`/diarypage/${diaryId}`)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        // stateのdiaryに受け取ったデータを保持
        this.setState({
            diary: json
        });
    })
    .catch(error => {
        console.error("Error fetching diary:", error);
    });

// 同様に、ユーザー情報を取得するリクエストも修正
fetch(`/diarypage/user/${diaryId}`)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        // stateのuserに受け取ったデータを保持
        this.setState({
            user: json
        });
    })
    .catch(error => {
        console.error("Error fetching user:", error);
    });
fetch(`/timeline/tag/${diaryId}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                tag:json
            })
        })
          .catch(error => {
            console.error("データ取得中にエラーが発生しました:", error);
        });

    }

    componentWillUnmount() {
    clearInterval(this.timerID);  // コンポーネントがアンマウントされる時にタイマーをクリア
    
  }
  
    // 時刻を更新するメソッド
  updateTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      currentDate: new Date().toLocaleDateString(), // 今日の日付も更新
    });
  }
  formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // 「年/月/日 時:分」の形式で表示
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };


  

    //画面で何か入力された時に、その値をstateとして保持する。
    //これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる。
     onInput = (e) => {
    this.setState({ addcomment: e.target.value });
    };    

    // フォーム送信時の処理
  onSubmit = async(e) => {
    e.preventDefault(); // ページがリロードされないようにする
    console.log(this.state.user.loginId);  // userの値を確認

    const data = {
        user:this.state.user,//本人のID取得
        time:new Date(),
        sentence: this.state.addcomment, // 入力されたコメント
        diary:this.state.diary,
        diaryId:this.state.diary.diaryId,
    };

    
    // Spring BootのバックエンドにPOSTリクエストを送信
    try {
            const res = await axios.post("/timeline/comment", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("コメントを送信しました");
            this.componentDidMount(); 
        } catch (error) {
            console.error(error);
            alert("送信に失敗しました");
        }
    

  };


    render(){
        const { honnninn,addcomment,currentTime,currentDate,imagePreview,diary,user,tag} = this.state;

        
       
        
        return (
        <div>


        <main>
        <h1>日記ページ</h1>
             


            <div className="diary">
                <table>
                    <tbody>
                    <tr>
                        <td><Link to="/mypage">{imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="プロフィール画像"
                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                    ) : (
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc', borderRadius: '50%' }} />
                    )}</Link></td>
                        <td><Link to="/mypage">{user.nickname}</Link></td>
                        <td>{diary.diaryTime}</td>
                            <td>投稿時間{this.formatTimestamp(diary.resistTime)}</td>
                    </tr>
                    </tbody>  
                </table>
                <div className="diary_sub">
                    <p>{diary.sentence}</p>
                    {Array.isArray(tag) && tag.map((tagdata, index)  => (
                    <block key={index}>{tagdata.tags}</block>
                    ))}
                </div>
                            
                <table>
                    <tbody>
                    <tr>
                        <td onClick={this.addReaction}>😊1　😡2　😢3　😌4</td>
                        <td>💬4</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {honnninn === '' && (
        <div>
          <button>編集</button>
          <button>削除</button>
        </div>
      )}

      <div className="addComment">
                <table>
                    <tbody>
                    <tr>
                        <td>{imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="プロフィール画像"
                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                    ) : (
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc', borderRadius: '50%' }} />
                    )}</td>
                        <td>あなた</td>
                        <td>{currentDate} {currentTime}</td>
                    </tr>
                    </tbody>   
                </table>
                <form onSubmit={this.onSubmit}>
                   <textarea 
                    value={addcomment}// テキストエリアの値としてstateを設定
                    onChange={this.onInput}// 入力が変更されるたびにstateを更新
                    placeholder="コメントを入力" 
                    rows="5" 
                    cols="100"/><br/>
                    <input type="submit" value="送信"/>
                </form>
                
            </div>

            

         {diary.comments && Array.isArray(diary.comments) && diary.comments.map((commentdata, index) => (
    <div className="comment" key={index}>

        <UserDiarycoments key={index} comment={commentdata}/>
                    
            </div>
    ))}                   
            
        </main>


        </div>
        );
    }
}
