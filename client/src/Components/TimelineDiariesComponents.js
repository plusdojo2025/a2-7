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
            user:[],
            tag:[],
            hashtag:"",
            imagePreview:"",
            reaction1: rea4[0],
            reaction2: rea4[1],
            reaction3: rea4[2],
            reaction4: rea4[3],
            reaList:[],
            myrea:-1,
            
            }
    }


    //マウント後に自動で動作する。
    componentDidMount(){
        fetch(`/timeline/user/${this.props.diary.diaryId}`)
        .then(res => res.json())
        .then(json => {
            
        this.setState({
                user:json
            })

        
        })
          .catch(error => {
            console.error("データ取得中にエラーが発生しました:", error);
        });

        fetch(`/timeline/tag/${this.props.diary.diaryId}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                tag:json
            })
        })
          .catch(error => {
            console.error("データ取得中にエラーが発生しました:", error);
        });

        fetch(`/timeline/myrea/${this.props.diary.diaryId}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                myrea:json
            })
        })
          .catch(error => {
            console.error("データ取得中にエラーが発生しました:", error);
        });
        
    }


    formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // 「年/月/日 時:分」の形式で表示
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

     addReaction = async(reactionIndex) => {
        
        let reaction=-1;
        if(reactionIndex===1){
            reaction=1;
        }else if(reactionIndex===2){
            reaction=2;
        }else if(reactionIndex===3){
            reaction=3;
        }else if(reactionIndex===4){
            reaction=4;
        }

        const data = {
            reaction:reaction
        };


        let diaryId = this.props.diary.diaryId;

        // Spring BootのバックエンドにPOSTリクエストを送信
    try {
            const res = await axios.post(`/timeline/stamp/${diaryId}`, data,{
                headers: {
                    "Content-Type": "application/json",
                },
            });    
            fetch(`/timeline/realist/${this.props.diary.diaryId}`)
            .then(res => res.json())
            .then(json => {
            console.log(json);
            this.setState({
                reaList:json
                })
            
            //stateの設定。
        let rea4 = [0, 0, 0, 0];
        

        for (let i = 0; i < json.length; i++) {
            if (json[i].reaction1) {
                rea4[0]++;
            }
            if (json[i].reaction2) {
                rea4[1]++;
            }
            if (json[i].reaction3) {
                rea4[2]++;
            }
            if (json[i].reaction4) {
                rea4[3]++;
            }
        }
        this.setState({
            reaction1: rea4[0],
            reaction2: rea4[1],
            reaction3: rea4[2],
            reaction4: rea4[3],
        })
                this.componentDidMount(); 

            })
            .catch(error => {
                console.error("データ取得中にエラーが発生しました:", error);
            });


            
        } catch (error) {
            console.error(error);
            alert("送信に失敗しました");
        }
    

  };
    

     

    render(){
        const { diary ,comment } = this.props;
        const { myrea,imagePreview,reaction1,reaction2,reaction3,reaction4 ,tag,user} = this.state;
        console.log(diary);

        let comsize = comment.length;
        return (
            <div className="diary">    
                <table className="mtable">   
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
                            
                            <td>{this.formatTimestamp(diary.resistTime)}</td>
                            </tr>

                            </tbody>
                            </table>
                            <div className="diary_sub">
                                <p>{diary.sentence}</p>

                                {Array.isArray(tag) && tag.map((tagdata, index)  => (
                                    <block key={index}>{tagdata.tags}</block>
                                            ))}
                            </div>

                             <table className="mtable">
                                <tbody>
                            <tr>
                                {myrea===1? (
                                    <td onClick={() => this.addReaction(1)}><button className="reactionButton2">😊</button> {reaction1}</td>
                                ) : (
                                <td onClick={() => this.addReaction(1)}><button className="reactionButton">😊</button> {reaction1}</td>)}

                                {myrea===2? (
                                    <td onClick={() => this.addReaction(2)}><button className="reactionButton2">😡 </button>{reaction2}</td>
                                ):(
                                <td onClick={() => this.addReaction(2)}><button className="reactionButton">😡 </button>{reaction2}</td>)}

                                {myrea===3? (
                                    <td onClick={() => this.addReaction(3)}><button className="reactionButton2">😢</button> {reaction3}</td>
                                ):(
                                <td onClick={() => this.addReaction(3)}><button className="reactionButton">😢</button> {reaction3}</td>)}

                                {myrea===4? (
                                    <td onClick={() => this.addReaction(4)}><button className="reactionButton2">😌 </button>{reaction4}</td>
                                ):(
                                <td onClick={() => this.addReaction(4)}><button className="reactionButton">😌 </button>{reaction4}</td>
                                )}
            
                                {diary ? (//もしコメント公開設定なら
                                <td><Link to={"/diarypage/"+diary.diaryId} state={{ diary: {diary} }}><button className="reactionButton">💬</button>{comsize}</Link></td>
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