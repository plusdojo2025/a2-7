import React from 'react';
import axios from "axios";
import '../css/MyPage.css';

export default class MyPage2 extends React.Component{
    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            nickname: '',
            aFewWords: '',
            imagePreview: null,
            imageFile: null,
            isOwner: false, 
            
        }
    }


        //マウント後に自動で動作する
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        //{credentials: 'include'}の追加
         let urlList = window.location.pathname.split('/');
        let loginId = urlList[urlList.length -1];
        //console.log("取得したdiaryId:" + diaryId);

        fetch(`/mypage/data/${loginId}`,{credentials: 'include'})
        .then(res => res.json())
        .then(json => {
             console.log("APIレスポンス:", json); // ← ここ
            
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                nickname: json.nickname,
                aFewWords: json.afewWords,
                isOwner: json.isOwner,
                //imagePreview: `/images/${json.imageId}`,
                //imagePreview: 'http://localhost:8080/api/images/' + json.imageId
                imagePreview: json.imageId ? `/api/images/${json.imageId}` : null
            })
        });
    }



    render(){
        const { nickname, aFewWords, imagePreview, isOwner } = this.state;
        // ここに追加
    console.log("描画時の aFewWords:", aFewWords);
    console.log("isOwner in render:", this.state.isOwner);
        return(
            <div>
                
                {/* ① アイコン画像エリア */}
                <div className="mypage-box">
                    <div>
                        
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="プロフィール画像"
                                style={{ width: '250px', height: '200px', borderRadius: '50%', }}
                            />
                        ) : (
                            <div id="icon"/>
                        )}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        {/* ↓画像アップロードボタンの追加*/}
                    </div>



                        {/* ② 名前表示エリア */}
                        <div>
                            <h3>① ニックネーム</h3>
                            <input
                                type="text"
                                name="nickname"
                                value={nickname}
                                //disabled={!isOwner}
                                onChange={this.onInput}
                                placeholder="ニックネーム"
                                class="area-input"
                                disabled="false"
                            />
                        </div>

                        {/* ③ ひとこと表示エリア */}
                            <h3>② 自己紹介</h3>
                            <textarea
                                id="introduction"
                                value={aFewWords || ''}  // ← null の時でも空文字にして確実に表示
                                name="aFewWords"
                                //disabled={!isOwner}
                                onChange={this.onInput}
                                placeholder="自己紹介を入力"
                                class="area-input"
                                disabled="false"
                            />

                        
                </div>
            </div>
        );
    }
}
