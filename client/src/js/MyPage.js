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
        //{credentials: 'include'}の追加
        
        fetch("/api/mypage/",{credentials: 'include'})
        .then(res => res.json())
        .then(json => {
            console.log(json);
            
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                nickname: json.nickname,
                aFewWords: json.aFewWords,
                isOwner: json.isOwner,
                imagePreview: `/images/${json.imageId}`,
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

    //this.componentDidMountで更新後に再取得
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
            await axios.post("/api/mypage/update/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("画像をアップロードしました");
            this.componentDidMount(); 
        } catch (error) {
            console.error(error);
            alert("画像アップロードに失敗しました");
        }
    };


    //プロフィール情報（ニックネーム・自己紹介）をサーバーに送信して更新する処理
    handleUpdate = async (e) => {
        e.preventDefault();
        const { nickname, aFewWords} = this.state;

        const data = {
        nickname,
        aFewWords
    };

        try {
            const res = await axios.post("/api/mypage/update/profile", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("プロフィールを更新しました");
            this.componentDidMount(); 
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
                        <input type="file" accept="image/*" onChange={this.handleImageChange} />
                        {/* ↓画像アップロードボタンの追加*/}
                        <button onClick={this.handleImageUpload}>アイコン更新</button>
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
                                // disabled={!isOwner}
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
                                // disabled={!isOwner}
                                onChange={this.onInput}
                                placeholder="自己紹介を入力"
                            />

                        {/* ④ 更新ボタン */}
                        <div style={{ textAlign: 'center' }}>
                            <button type="submit">更新する</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
