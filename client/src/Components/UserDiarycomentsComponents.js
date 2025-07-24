import React from "react";
import '../css/Timeline.css';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Timeline extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        
        this.state = {
           imagePreview:"",
           user:[],
            
            }
    }


    //マウント後に自動で動作する。
    componentDidMount(){
        const {comment}=this.props;
        fetch(`/diarypage/comment/user/${comment.commentId}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                user:json
            })
        })
          .catch(error => {
            console.error("データ取得中にエラーが発生しました:", error);
        });
        
    }

 
    render(){
        const { comment } = this.props;
        const {imagePreview,user} = this.state;

        return (
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
                                <td><Link to="/mypage">{user.nickname}</Link></td>
                                <td>{comment.time}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="comment_sub">
                        <p>{comment.sentence}</p>
                    </div>
                </div>

        
        );
    }
}