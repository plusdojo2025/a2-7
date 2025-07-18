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
            hashtag:"",
            imagePreview:"",
            
            reaction1: this.props.reaction4.reaction1,
            reaction2: this.props.reaction4.reaction2,
            reaction3: this.props.reaction4.reaction3,
            reaction4: this.props.reaction4.reaction4,
            
            }
    }

    addReaction = (reactionIndex) => {
        let {reaction1,reaction2,reaction3,reaction4}=this.state;
        if(reactionIndex===1){
            reaction1=!reaction1;
        }else if(reactionIndex===2){
            reaction2=!reaction2;
        }else if(reactionIndex===3){
            reaction3=!reaction3;
        }else if(reactionIndex===4){
            reaction4=!reaction4;
        }

        // stateを更新
  this.setState({
    reaction1,
    reaction2,
    reaction3,
    reaction4
  });

        axios.post('http://localhost:8080/timeline/stamp', {
      diary: this.props.user.diary,      
      login_id: this.props.user.login_id,
      reaction1: reaction1,
      reaction2: reaction2,
      reaction3: reaction3,
      reaction4: reaction4,
    })
      .then((response) => {
        console.log('データ送信成功:', response.data);
      })
      .catch((error) => {
        console.error('データ送信失敗:', error);
      });
    }

     

    render(){
        const { diary ,comment, user } = this.props;
        const { hashtag,imagePreview,reaction1,reaction2,reaction3,reaction4 } = this.state;
        return (
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
                            <td><Link to="/mypage">{user.nickname}</Link></td>
                            <td>{diary.resist_time}</td>
                            </tr>
                            </table>
                            <div className="diary_sub">
                                <p>{diary.sentence}</p>
                                <p>#頑張った</p>
                            </div>
                           
                           {/* <TimelineDiaries key={diarydata.diary_id} diary={diarydata} loginId={userList[index]}/> */}
            
                             <table>
                            <tr>
                                <td onClick={() => this.addReaction(0)}>😊 {reaction1}</td>
                                <td onClick={() => this.addReaction(1)}>😡 {reaction2}</td>
                                <td onClick={() => this.addReaction(2)}>😢 {reaction3}</td>
                                <td onClick={() => this.addReaction(3)}>😌 {reaction4}</td>
            
                                {diary ? (//もしコメント公開設定なら
                                <td><Link to="/diarypage">💬{comment}</Link></td>
                            ) : (
                            <td>🚫</td>
                        )} 
                    </tr>
                </table>
                            
            </div>

        
        );
    }
}