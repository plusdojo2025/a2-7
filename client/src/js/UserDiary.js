import React from "react";
import '../css/UserDiary.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import TimelineDiaries from '../Components/TimelineDiariesComponents'

export default class Timeline extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);

        
        //stateの設定。
        this.state = {
                diary:[],
                honnninn:"",
                addcomment:"",
                imagePreview:"",
                user:[],


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


        //const {diary_id} = this.props.match.params;
        const diary_id=1;

        // diary_idを使ってテンプレートリテラルでURLを作成
fetch(`/diarypage/${diary_id}`)
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
fetch(`/diarypage/user/${diary_id}`)
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

  

    //画面で何か入力された時に、その値をstateとして保持する。
    //これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる。
     onInput = (e) => {
    this.setState({ addcomment: e.target.value });
    };    

    // フォーム送信時の処理
  onSubmit = (e) => {
    e.preventDefault(); // ページがリロードされないようにする

    const commentData = {
        loginId:1,//本人のID取得
        time:new Date().toISOString().slice(0, 16),// YYYY-MM-DDTHH:MM
        sentence: this.state.addcomment, // 入力されたコメント
        //diary:diary,
    };

    // Spring BootのバックエンドにPOSTリクエストを送信
    axios.post('http://localhost:8080/timeline/comment', commentData)
      .then((response) => {
        console.log('コメントが送信されました:', response.data);
        this.setState({ addcomment: "" }); // コメント送信後に入力欄をリセット
      })
      .catch((error) => {
        console.error('コメント送信エラー:', error);
      });

      this.componentDidMount();
  };


    render(){
        const { honnninn,addcomment,currentTime,currentDate,imagePreview,diary,user} = this.state;

        
       
        
        return (
        <div>


        <main>
        <h1>日記ページ</h1>
             


            
                {/* <TimelineDiaries diary={diary} reaction4={diary.reactions} comment={diary.comments} user={diary.user}/> */}
                        

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
                        <td>{diary.resist_time}</td>
                    </tr>
                    </tbody>  
                </table>
                <div className="diary_sub">
                    <p>{diary.sentence}</p>
                    <p>#頑張った</p>
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
                        <td>{currentDate}　{currentTime}</td>
                    </tr>
                    </tbody>   
                </table>
                <form onSubmit={this.onSubmit}>
                   <textarea 
                    value={addcomment}        // テキストエリアの値としてstateを設定
                    onChange={this.onInput}  // 入力が変更されるたびにstateを更新
                    placeholder="コメントを入力" 
                    rows="5" 
                    cols="100"/><br/>
                    <input type="submit" value="送信"/>
                </form>
                
            </div>

            <div className="comment">
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
                        <td><Link to="/mypage">メガネ</Link></td>
                        <td>2025/7/11(金)20:58</td>
                    </tr>
                    </tbody>  
                </table>
                <div className="comment_sub">
                    <p>お疲れ様！</p>
                </div>
                
            </div>

         {diary.comments && Array.isArray(diary.comments) && diary.comments.map((commentdata, index) => (
    <div className="comment" key={index}>
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
                    <td><Link to="/mypage">{commentdata.user}</Link></td>
                    <td>{commentdata.time}</td>
                </tr>
            </tbody>
        </table>
        <div className="comment_sub">
            <p>{commentdata.sentence}</p>
        </div>
    </div>
    ))}                   
            
        </main>


        </div>
        );
    }
}