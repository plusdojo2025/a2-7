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
            diary: [],
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
                diary:json
            })
        })
          .catch(error => {
            console.error("データ取得中にエラーが発生しました:", error);
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

        const { diary,hashtag,imagePreview } = this.state;
        return (









        <main  className="mmain">
        <h1>タイムライン</h1>
            
            <form>
            <input type="text"
            placeholder="タグで検索（例: 頑張った）"
            onChange={this.onInput} 
            value={hashtag}/>
            <input type="submit"/>
            </form>

            
            

         {Array.isArray(diary) && diary.map((diarydata, index)  => (
    <TimelineDiaries key={index} diary={diarydata} reaction4={diarydata.reactions} comment={diarydata.comments} user={diarydata.user}/>
            ))}


   
            

        </main>
        );
    }
}