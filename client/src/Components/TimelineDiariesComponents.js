import React from "react";
import '../css/Timeline.css';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Timeline extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            timeline: {
                diaryList: [],
                reactionList: [],
                comentList: [],
                userList: []},
            hashtag:"",
            }
    }

     

    render(){
        const { diaryList, reactionList, comentList, userList } = this.state.timeline;
        const { hashtag } = this.state;
        return (
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
                    <td><Link to="/diarypage">💬4</Link></td>
                </tr>
                </table>
            </div>
        
        );
    }
}