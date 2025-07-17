import React from 'react';
import axios from "axios";

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
                MyPage:json
            })
        });
    }

    handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.setState({
                imageFile: file,
                imagePreview: URL.createObjectURL(file),
            });
        }
    };

    handleUpdate = async () => {
        const { nickname, aFewWords, imageFile } = this.state;

        const formData = new FormData();
        formData.append("nickname", nickname);
        formData.append("aFewWords", aFewWords);
        if (imageFile) {
            formData.append("image", imageFile);
        }


        try {
            const res = await axios.post("/update-profile", formData, {
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

    render(){
        const { nickname, aFewWords, imagePreview } = this.state;
        return(
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                {/* ① アイコン画像エリア */}
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <h3>① アイコン画像</h3>
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="プロフィール画像"
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                        />
                    ) : (
                        <div style={{ width: '100px', height: '100px', backgroundColor: '#ccc', borderRadius: '50%' }} />
                    )}
                    <input type="file" accept="image/*" onChange={this.handleImageChange} />
                </div>

                {/* ② 名前表示エリア */}
                <div style={{ marginBottom: '15px' }}>
                    <h3>② ニックネーム</h3>
                    <input
                        type="text"
                        value={nickname}
                        onChange={this.onInput}
                        placeholder="ニックネーム"
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                {/* ③ ひとこと表示エリア */}
                <div style={{ marginBottom: '15px' }}>
                    <h3>③ ひとこと</h3>
                    <textarea
                        value={aFewWords}
                        onChange={this.onInput}
                        placeholder="自己紹介やコメントを入力"
                        rows="3"
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                {/* ④ 更新ボタン */}
                <div style={{ textAlign: 'center' }}>
                    <h3>④ プロフィール更新</h3>
                    <button onClick={this.handleUpdate}>更新する</button>
                </div>
            </div>
        );
    }
}
