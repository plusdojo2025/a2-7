import React from "react";
import '../css/Timeline.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import TimelineDiaries from '../Components/TimelineDiariesComponents'

export default class Timeline extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            timeline: {
                diaryList: [],
                reaction4: [],
                commentList: [],
                userList: []},
            hashtag:"",
            imagePreview:"",
            }
    }

    //マウント後に自動で動作する。
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/timeline")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                timeline:json
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


    //検索ボタン処理
    searchTag = () => {
        const {hashtag} = this.state;

        axios.get("/timeline",hashtag)
        .then((response)=>{
            console.log(response.data);
            this.setState({
                hashtag:"",
            });
            //this.componentDidMount();
        });
    }    



    


    render(){
        const { diaryList, reaction4, commentList, userList } = this.state.timeline;
        const { hashtag,imagePreview } = this.state;
        return (
        <div>

        <header>ヘッダー</header>
        <main>
        <h1>タイムライン</h1>
            
            <form>
            <input type="text"
            placeholder="タグで検索（例: 頑張った）"
            onChange={this.onInput} 
            value={hashtag}/>
            <input type="submit"/>
            </form>

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
                    <td>😊1 </td>
                    <td>😡2 </td>
                    <td>😢3 </td>
                    <td>😌4 </td>
                    
                    
                    <td><Link to="/diarypage">💬4</Link></td>
                </tr>
                </table>
            </div>

        {diaryList.map((diarydata, index)  => (
            
            <TimelineDiaries diary={diaryList} reaction4={reaction4[index]} comment={commentList[index]} user={userList[index]}/>
                
        ))} 

    
            

        </main>
        <footer>フッター</footer>

        </div>
        );
    }
}