import React from "react";
import '../css/UserDiary.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

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
                imagePreview: null,
            imageFile: null,
            isOwner: false, 
                user:{},
                tag:[],
                reaction:[],
                comsize:0,
                myId:"",
                addsentence:"",

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
        //console.log("取得したdiaryId:" + diaryId);


        // diary_idを使ってテンプレートリテラルでURLを作成
fetch(`/diarypage/${diaryId}`)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        // stateのdiaryに受け取ったデータを保持
        this.setState({
            diary: json,
            addsentence:json.sentence,
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
            user: json,
            aFewWords: json.afewWords,
            isOwner: json.isOwner,
            imagePreview: '/api/images/' + json.imageId,
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

fetch(`/timeline/reaction/${diaryId}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                reaction:json
            })
        })
          .catch(error => {
            console.error("データ取得中にエラーが発生しました:", error);
        });

        fetch(`/timeline/comsize/${diaryId}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                comsize:json
            })
        })
          .catch(error => {
            console.error("データ取得中にエラーが発生しました:", error);
        });
fetch(`/myId`)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        // stateのdiaryに受け取ったデータを保持
        this.setState({
            myId: json
        });
    })
    .catch(error => {
        console.error("Error fetching diary:", error);
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
    
    onInput2 = (e) => {
    this.setState({ addsentence: e.target.value });
    };
    

    // フォーム送信時の処理
  onSubmit = async(e) => {
    e.preventDefault(); // ページがリロードされないようにする
    if (this.state.addcomment === '') {
      alert("コメントを入力してください。");
      return; // 空コメントの場合は処理を中断
    }
    // 確認ダイアログを表示
    const isConfirmed = window.confirm("コメントを送信してもよろしいですか？");

     if (isConfirmed) {
    const data = {
        user:this.state.user,
        time:new Date(),
        sentence: this.state.addcomment, // 入力されたコメント
        diary:this.state.diary,
        diaryId:this.state.diary.diaryId,
        loginId:this.state.user.loginId,
    };

    
    // Spring BootのバックエンドにPOSTリクエストを送信
    try {
            const res = await axios.post("/timeline/comment", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            this.setState({ addcomment:"" });
            
            this.componentDidMount(); 
        } catch (error) {
            console.error(error);
            alert("送信に失敗しました");
        }
    } else {
      // ユーザーがキャンセルした場合
      alert("コメント送信がキャンセルされました");
    }
    

  };




  onDelete = async(e) => {


    // 確認ダイアログを表示
    const isConfirmed = window.confirm("日記を削除してもよろしいですか？");

     if (isConfirmed) {

        
        let urlList = window.location.pathname.split('/');
        let diaryId = urlList[urlList.length -1];
        

        fetch(`/diarypage/delete/${diaryId}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            alert("削除しました。");
            window.location.href = '/timeline';

        })
          .catch(error => {
            console.error("データ取得中にエラーが発生しました:", error);
        });

    
    }else {
      // ユーザーがキャンセルした場合
      alert("日記削除がキャンセルされました");
    }
    

  };


  onUpdate = async(e) => {


    e.preventDefault(); // ページがリロードされないようにする
    if (this.state.addsentence === '') {
      alert("日記の内容を入力してください。");
      return; // 空コメントの場合は処理を中断
    }
    // 確認ダイアログを表示
    const isConfirmed = window.confirm("日記の内容を更新しますか？");

     if (isConfirmed) {
        let urlList = window.location.pathname.split('/');
        let diaryId = urlList[urlList.length -1];

    const data = {
        sentence:this.state.addsentence, // 入力された
    };

    
    // Spring BootのバックエンドにPOSTリクエストを送信
    try {
            const res = await axios.post(`/diarypage/update/${diaryId}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("更新しました。");
            this.componentDidMount(); 
        } catch (error) {
            console.error(error);
            alert("送信に失敗しました");
        }
    } else {
      // ユーザーがキャンセルした場合
      alert("コメント送信がキャンセルされました");
    }

  };


    render(){
        const { myId,addcomment,currentTime,currentDate,diary,user,tag,reaction,comsize,aFewWords, imagePreview, isOwner,addsentence} = this.state;

        
       
        
        return (
        <div>


        <main className="mmain">
        <h1>日記ページ</h1>
             


            <div className="diary">
                <table className="mtable">
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
                        
                            <td>{this.formatTimestamp(diary.resistTime)}</td>
                    </tr>
                    </tbody>  
                </table>





                {myId == user.loginId ? (
                    <form className="diary_update">
                    <textarea className="mtextarea2"  value={addsentence} onChange={this.onInput2}/>
                    
                </form>
                ):(<div className="diary_sub">
                    <p>{diary.sentence}</p>
                    
                </div>)}
                            
                <table className="mtable">
                    <tbody>
                    <tr>
                        <td onClick={this.addReaction}>😊{reaction[0]}　😡{reaction[1]}　😢{reaction[2]}　😌{reaction[3]}</td>
                        <td>💬{comsize}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
                

            {myId == user.loginId ? (
        <div>
          <button className="mbutton" onClick={this.onUpdate}>更新</button>
          <button className="mbutton"   onClick={this.onDelete}>削除</button>
        </div>
      ):<div></div>}

      <div className="addComment">
                <table className="mtable">
                    <tbody>
                    <tr>
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
                    cols="100"
                    className="mtextarea"/><br/>
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
