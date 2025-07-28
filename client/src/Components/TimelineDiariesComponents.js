import React from "react";
import '../css/Timeline.css';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Timeline extends React.Component {

    constructor(props) {
        super(props);

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
            user: [],
            tag: [],
            hashtag: "",
            imagePreview: null,
            imageFile: null,
            isOwner: false, 
            reaction1: rea4[0],
            reaction2: rea4[1],
            reaction3: rea4[2],
            reaction4: rea4[3],
            reaList: [],
            myrea: -1,
            picture:null,
        };
    }

    componentDidMount() {

        if(this.props.diary.imageId!==null){
            this.setState({
                    picture: '/api/images/' + this.props.diary.imageId,
                });
        }

        
        fetch(`/timeline/user/${this.props.diary.diaryId}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    user: json,
                    aFewWords: json.afewWords,
                isOwner: json.isOwner,
                    imagePreview: '/api/images/' + json.imageId,
                });
            })
            .catch(error => {
                console.error("データ取得中にエラーが発生しました:", error);
            });

        fetch(`/timeline/tag/${this.props.diary.diaryId}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    tag: json
                });
            })
            .catch(error => {
                console.error("データ取得中にエラーが発生しました:", error);
            });

        fetch(`/timeline/myrea/${this.props.diary.diaryId}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    myrea: json
                });
            })
            .catch(error => {
                console.error("データ取得中にエラーが発生しました:", error);
            });
    }

    formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    addReaction = async (reactionIndex) => {
        let reaction = -1;
        if (reactionIndex === 1) {
            reaction = 1;
        } else if (reactionIndex === 2) {
            reaction = 2;
        } else if (reactionIndex === 3) {
            reaction = 3;
        } else if (reactionIndex === 4) {
            reaction = 4;
        }

        if (this.state.reaList !== reaction) {
            const data = { reaction: reaction };
            let diaryId = this.props.diary.diaryId;

            try {
                await axios.post(
                    `/timeline/stamp/${diaryId}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                // 最新のリアクションを取得
                fetch(`/timeline/realist/${this.props.diary.diaryId}`)
                    .then(res => res.json())
                    .then(json => {
                        console.log(json);
                        this.setState({ reaList: json });

                        let rea4 = [0, 0, 0, 0];
                        for (let i = 0; i < json.length; i++) {
                            if (json[i].reaction1) rea4[0]++;
                            if (json[i].reaction2) rea4[1]++;
                            if (json[i].reaction3) rea4[2]++;
                            if (json[i].reaction4) rea4[3]++;
                        }

                        this.setState({
                            reaction1: rea4[0],
                            reaction2: rea4[1],
                            reaction3: rea4[2],
                            reaction4: rea4[3],
                        });
                        this.componentDidMount(); // データ更新後に再読み込み
                    })
                    .catch(error => {
                        console.error("データ取得中にエラーが発生しました:", error);
                    });
            } catch (error) {
                console.error(error);
                alert("送信に失敗しました");
            }
        }
    };

    delReaction = async (reactionIndex) => {
        fetch(`/timeline/delrea/${this.props.diary.diaryId}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({ myrea: -1 });
            })
            .catch(error => {
                console.error("データ取得中にエラーが発生しました:", error);
            });

        fetch(`/timeline/realist/${this.props.diary.diaryId}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({ reaList: json });

                let rea4 = [0, 0, 0, 0];
                for (let i = 0; i < json.length; i++) {
                    if (json[i].reaction1) rea4[0]++;
                    if (json[i].reaction2) rea4[1]++;
                    if (json[i].reaction3) rea4[2]++;
                    if (json[i].reaction4) rea4[3]++;
                }

                this.setState({
                    reaction1: rea4[0],
                    reaction2: rea4[1],
                    reaction3: rea4[2],
                    reaction4: rea4[3],
                });

                this.componentDidMount(); // データ更新後に再読み込み
            })
            .catch(error => {
                console.error("データ取得中にエラーが発生しました:", error);
            });
    };

    render() {
        const { diary, comment } = this.props;
        const { myrea, aFewWords, imagePreview, isOwner, reaction1, reaction2, reaction3, reaction4, tag, user,picture } = this.state;
        console.log(diary);

        let comsize = comment.length;
        return (
            <div className="diary">
                <table className="mtable">
                    <tbody>
                        <tr>
                            <td>
                                <Link to="/mypage">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="プロフィール画像"
                                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc', borderRadius: '50%' }} />
                                    )}
                                </Link>
                            </td>
                            <td><Link to="/mypage">{user.nickname}</Link></td>
                            <td>{this.formatTimestamp(diary.resistTime)}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="diary_sub">
                    <p>{diary.sentence}</p>

                    {picture ?
                    (<img src={picture} alt="日記画像 " style={{ width: '50%', height: '50%'}} 
                    />):(<div/>)}
                    
                </div>

                <table className="mtable">
                    <tbody>
                        <tr>
                            {/* リアクションボタン */}
                            {myrea === 1 ? (
                                <td onClick={() => this.delReaction(1)}>
                                    <button className="reactionButton2">😊</button> {reaction1}
                                </td>
                            ) : (
                                <td onClick={() => this.addReaction(1)}>
                                    <button className="reactionButton">😊</button> {reaction1}
                                </td>
                            )}

                            {myrea === 2 ? (
                                <td onClick={() => this.delReaction(2)}>
                                    <button className="reactionButton2">😡</button> {reaction2}
                                </td>
                            ) : (
                                <td onClick={() => this.addReaction(2)}>
                                    <button className="reactionButton">😡</button> {reaction2}
                                </td>
                            )}

                            {myrea === 3 ? (
                                <td onClick={() => this.delReaction(3)}>
                                    <button className="reactionButton2">😢</button> {reaction3}
                                </td>
                            ) : (
                                <td onClick={() => this.addReaction(3)}>
                                    <button className="reactionButton">😢</button> {reaction3}
                                </td>
                            )}

                            {myrea === 4 ? (
                                <td onClick={() => this.delReaction(4)}>
                                    <button className="reactionButton2">😌</button> {reaction4}
                                </td>
                            ) : (
                                <td onClick={() => this.addReaction(4)}>
                                    <button className="reactionButton">😌</button> {reaction4}
                                </td>
                            )}

                            {/* コメントボタン */}
                            {diary ? (
                                <td>
                                    <Link to={`/diarypage/${diary.diaryId}`} state={{ diary: { diary } }}>
                                        <button className="reactionButton">💬</button> {comsize}
                                    </Link>
                                </td>
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
