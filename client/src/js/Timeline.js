import React from "react";
import '../css/Timeline.css';
import axios from "axios";

export default class Timeline extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            postList:[[]] ,
            reactionList:[[]] ,
            comentList:[] ,
            userList:[] ,
            hashtag:"",
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
                hashtag:""
            });
            //this.componentDidMount();
        });
    }    


    render(){
        const { hashtag } = this.state;
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
                    <td>〇</td>
                    <td>さかな</td>
                    <td>2025/7/11(金)20:58</td>
                </tr>
        </table>
                <div className="diary_sub">
                <p>仕事頑張った！</p>
                <p>#頑張った</p>
                </div>
                


                <table>
                <tr>
                    <td>😊1　😡2　😢3　😌4</td>
                    <td>💬4</td>
                </tr>
                </table>
            </div>

            

        </main>
        <footer>フッター</footer>

        </div>
        );
    }
}