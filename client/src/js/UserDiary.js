import React from "react";
import '../css/UserDiary.css';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Timeline extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
                diary:"",
                honnninn:"",
                addcomment:"",
                imagePreview:"",


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
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/diarypage")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                diary:json
            })
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
        const { honnninn,addcomment,currentTime,currentDate,imagePreview,diary} = this.state;

        
       
        
        return (
        <div>


        <main>
        <h1>日記ページ</h1>

            <div className="diary">
                <table>   
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
                        <td><Link to="/mypage">さかな</Link></td>
                        <td>2025/7/11(金)20:58</td>
                    </tr>
                </table>
                <div className="diary_sub">
                    <p>仕事頑張った！</p>
                    <p>#頑張った</p>
                </div>
                            
                <table>
                    <tr>
                        <td onClick={this.addReaction}>😊1　😡2　😢3　😌4</td>
                        <td>💬4</td>
                    </tr>
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
                </table>
                <div className="comment_sub">
                    <p>お疲れ様！</p>
                </div>
                
            </div>

         {commentList.map((commentdata, index)  => (
            <div className="comment">
                <table>   
                    <tr>
                        <td><Link to="/mypage">〇</Link></td>
                        <td><Link to="/mypage">{com_userList[index].nickname}</Link></td>
                        <td>{commentdata.time}</td>
                    </tr>
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