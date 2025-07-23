import React from "react";
import '../css/Timeline.css';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Timeline extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        let rea4 = [0, 0, 0, 0];
        

        for (let i = 0; i < this.props.reaction4.length; i++) {
            if (this.props.reaction4[i].reaction1) {
                rea4[0]++;
            }
            if (this.props.reaction4[i].reaction2) {
                rea4[1]++;
            }
            if (this.props.reaction4[i].reaction3) {
                rea4[2]++;
            }
            if (this.props.reaction4[i].reaction4) {
                rea4[3]++;
            }
        }

        this.state = {
            hashtag:"",
            imagePreview:"",
            hashlist:[],
            reaction1: rea4[0],
            reaction2: rea4[1],
            reaction3: rea4[2],
            reaction4: rea4[3],
            
            }
    }


    //マウント後に自動で動作する。
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/timeline/hash")
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
        const { hashtag,imagePreview,reaction1,reaction2,reaction3,reaction4 ,hashlist} = this.state;
        

        let comsize = comment.length;
        return (
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
                            <td><Link to="/mypage">{diary.nickname}</Link></td>
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
                                <td onClick={() => this.addReaction(0)}><button className="reactionButton">😊</button> {reaction1}</td>
                                <td onClick={() => this.addReaction(1)}><button className="reactionButton">😡 </button>{reaction2}</td>
                                <td onClick={() => this.addReaction(2)}><button className="reactionButton">😢</button> {reaction3}</td>
                                <td onClick={() => this.addReaction(3)}><button className="reactionButton">😌 </button>{reaction4}</td>
            
                                {diary ? (//もしコメント公開設定なら
                                <td><Link to="/diarypage/${diary.diary_id}">💬{comsize}</Link></td>
                            ) : (
                            <td>🚫</td>
                        )} 
                    </tr>
                    </tbody>
                </table>
                            
            </div>

        
        );
    }
}