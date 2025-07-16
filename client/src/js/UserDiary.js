import React from "react";
import '../css/UserDiary.css';
//import axios from "axios";
import { Link } from 'react-router-dom';

export default class Timeline extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
                honnninn:"",
                addcomment:"",

            }
    }

    //マウント後に自動で動作する。
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/diarypage")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                diarypage:json
            })
        });
    }

    //画面で何か入力された時に、その値をstateとして保持する。
    //これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる。
    onInput = (e) => {
        const hashtag = e.target.value;
        this.setState({
            hashtag: hashtag
        });
    }    

    addReaction=()=>{
        // const {}=this.state;

        // const reaction={};

        // axios.post("/timeline/stamp",reaction)
        // .then(json=>{
        //     this.componentDidMount();
        // });
    }


    render(){
        const { honnninn,addcomment } = this.state;
        
        return (
        <div>

        <header>ヘッダー</header>
        <main>
        <h1>日記ページ</h1>

            <div className="diary">
                <table>   
                    <tr>
                        <td><Link to="/mypage">〇</Link></td>
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
                        <td>〇</td>
                        <td>あなた</td>
                        <td>現在時刻？</td>
                    </tr>
                </table>
                <form>
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
                        <td><Link to="/mypage">〇</Link></td>
                        <td><Link to="/mypage">メガネ</Link></td>
                        <td>2025/7/11(金)20:58</td>
                    </tr>
                </table>
                <div className="comment_sub">
                    <p>お疲れ様！</p>
                </div>
                
            </div>

            <div className="comment">
                <table>   
                    <tr>
                        <td><Link to="/mypage">〇</Link></td>
                        <td><Link to="/mypage">テント</Link></td>
                        <td>2025/7/11(金)20:58</td>
                    </tr>
                </table>
                <div className="comment_sub">
                    <p>お疲れ様☆</p>
                </div>
                
            </div>
                            
            
        </main>
        <footer>フッター</footer>

        </div>
        );
    }
}