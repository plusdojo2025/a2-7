import React from "react";
import '../css/Timeline.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import TimelineDiaries from '../Components/TimelineDiariesComponents'

export default class Timeline extends React.Component {

    // 親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        // stateの設定
        this.state = {
            diary: [],
            hashtag: "",
            imagePreview: null,
            imageFile: null,
            isOwner: false, 
        };
    }

    // マウント後に自動で動作する
    componentDidMount() {
        // fetchを使用して初期データを取得
        fetch("/timeline")
            .then(res => res.json())
            .then(json => {
                console.log(json);
                // stateのbooksに受け取ったデータを保持する
                // stateが変わると自動的に画面が再描画される
                this.setState({
                    diary: json
                });
            })
            .catch(error => {
                console.error("データ取得中にエラーが発生しました:", error);
            });
    }

    // 画面で何か入力された時に、その値をstateとして保持する
    // これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる
    onInput = (e) => {
        this.setState({ hashtag: e.target.value });
    };

    // 検索ボタン処理
    searchTag = async (e) =>{
        e.preventDefault(); // ページがリロードされないようにする
    try {
      const response = await axios.get(`/timeline/serchtag`, {
        params: this.state.hashtag ? { tag: this.state.hashtag } : {}
      });
      this.setState({ diary: response.data });
    } catch (error) {
      console.error('日記の取得に失敗しました', error);

    }
  };


    render() {
        const { diary, hashtag} = this.state;

        return (
            <main className="mmain">
                <h1>タイムライン</h1>

                <form onSubmit={this.searchTag} className="timeline_box">
                    <input
                        type="text"
                        placeholder="タグ検索"
                        onChange={this.onInput}
                        value={hashtag} // 入力が変更されるたびにstateを更新
                    />
                    <input type="submit" value="検索" />
                </form>

                <span>
          <a href="#" className="topPage">topへ</a>         
        </span>

                {/* diaryが空の配列の場合にメッセージを表示 */}
                {Array.isArray(diary) && diary.length === 0 ? (
                    <p>日記が見つかりませんでした。</p>
                ) : (
                    // diaryが配列の場合のみ表示
                    Array.isArray(diary) && diary.map((diarydata, index) => (
                        <TimelineDiaries
                            key={index}
                            diary={diarydata}
                            reaction4={diarydata.reactions}
                            comment={diarydata.comments}
                            user={diarydata.user}
                        />
                    ))
                )}
            </main>
        );
    }
}
