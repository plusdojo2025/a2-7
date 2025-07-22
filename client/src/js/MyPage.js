import React from 'react';
import axios from "axios";
import '../css/MyPage.css';

export default class MyPage extends React.Component{
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
        fetch("/mypage")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                nickname: json.nickname,
                aFewWords: json.aFewWords,
                isOwner: json.isOwner,
                MyPage:json
            })
        });
    }

    //画像ファイルを選択したときに、ファイル情報をstateに保存し、画像のプレビューを表示できるようにする処理
    //ファイル選択フォームから最初に選ばれたファイルを取得
    //fileが選択されているときのみ処理を行う
    handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.setState({
                imageFile: file,
                imagePreview: URL.createObjectURL(file),
            });
        }
    };

    //
    // 画像のみアップロード
    handleImageUpload = async () => {
        const { imageFile } = this.state;
        if (!imageFile) {
            alert("画像を選択してください");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            await axios.post("/mypage/update/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("画像をアップロードしました");
        } catch (error) {
            console.error(error);
            alert("画像アップロードに失敗しました");
        }
    };


    //プロフィール情報（ニックネーム・ひとこと・画像など）をサーバーに送信して更新する処理
    handleUpdate = async () => {
        const { nickname, aFewWords} = this.state;

        const formData = new FormData();
        formData.append("nickname", nickname);
        formData.append("aFewWords", aFewWords);

        try {
            const res = await axios.post("/mypage/update/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("プロフィールを更新しました");
        } catch (error) {
            console.error(error);
            alert("更新に失敗しました");
        }
    };

    //画面で何か入力された時に、その値をstateとして保持する。
    //これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる。
    onInput = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }    


    //画像は画像のみで更新可能にする
    //ニックネームと自己紹介はセットにする
    //isOwnerで本人のみにボタンが表示されるように
    render(){
        const { nickname, aFewWords, imagePreview, isOwner } = this.state;
        return(
            <div>
                <h2 className="mypagetitle">マイページへようこそ!!!!</h2>
                {/* ① アイコン画像エリア */}
                <div className="mypage-box">
                    <div>
                        <h3>① アイコン</h3>
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="プロフィール画像"
                                style={{ width: '100px', height: '100px', borderRadius: '50%', }}
                            />
                        ) : (
                            <div id="icon"/>
                        )}
                        {isOwner && <input type="file" accept="image/*" onChange={this.handleImageChange} />}
                        {/* ↓画像アップロードボタンの追加*/}
                        {isOwner && <button onClick={this.handleImageUpload}>アイコン更新</button>}
                    </div>


                    {/* ②～④ を form にまとめる */}
                    <form onSubmit={this.handleUpdate}>
                        {/* ② 名前表示エリア */}
                        <div>
                            <h3>② ニックネーム</h3>
                            <input
                                type="text"
                                name="nickname"
                                value={nickname}
                                disabled={!isOwner}
                                onChange={this.onInput}
                                placeholder="ニックネーム"
                            />
                        </div>

                        {/* ③ ひとこと表示エリア */}
                            <h3>③ 自己紹介</h3>
                            <textarea
                                id="introduction"
                                value={aFewWords}
                                name="aFewWords"
                                disabled={!isOwner}
                                onChange={this.onInput}
                                placeholder="自己紹介を入力"
                            />

                        {/* ④ 更新ボタン */}
                        <div style={{ textAlign: 'center' }}>
                            {isOwner && <button type="submit">更新する</button>}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
