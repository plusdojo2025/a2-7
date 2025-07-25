import React from 'react';
import axios from "axios";
import '../css/UserInfo.css';

export default class UserInfo extends React.Component {
    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            message: '',
        }
    }


        //マウント後に自動で動作する
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/userinfo")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                UserInfo:json
            })
        });
    }

    //画面で何か入力された時に、その値をstateとして保持する。
    //これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる。
    onInput = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }    


    //パスワード更新フォームの送信イベント
    handleUpdatePassword = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = this.state;

        //新しいパスワードと確認用パスワードが一致するかチェック
        if (newPassword !== confirmPassword) {
            this.setState({ message: "新しいパスワードが一致しません。" });
            return;
        }

        //サーバーにパスワード更新リクエストを送る
        try {
            const response = await axios.post("/api/userinfo/update", {
                currentPassword,
                newPassword,
            });
            this.setState({ message: response.data.message || "パスワードを更新しました。" });
        } catch (err) {
            console.error("Error:", err);
            this.setState({ message: "パスワードの更新に失敗しました。" });
        }
    };

    //requiredでパスワードの入力を必須に
    render() {
        const{ currentPassword, newPassword, confirmPassword, message } = this.state;
        return (
            
            <div>
                <h2>パスワード変更</h2>
                <form onSubmit={this.handleUpdatePassword}>
                    <div>
                        <label>現在のパスワード：</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={currentPassword}
                            onChange={this.onInput}
                            required
                        />
                    </div>
                    <br></br>
                    <div>
                        <label>新しいパスワード：</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={this.onInput}
                            required
                        />
                    </div>
                    <br></br>
                    <div>
                        <label>新しいパスワード（確認）：</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={this.onInput}
                            required
                        />
                    </div>
                    <br></br>
                    <button type="submit" style={{ fontSize: '20px', padding: '12px 24px' }}>更新</button>
                </form>
                {message && <p style={{ color: 'red' }}>{message}</p>}
            </div>
        );
    }
}