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
            passwordVisible: {
                current: false,
                new: false,
                confirm: false
            }
        };
    }

    //マウント後に自動で動作する
    componentDidMount() {
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/api/userinfo", { credentials: 'include' })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                //stateのbooksに受け取ったデータを保持する。
                //stateが変わると自動的に画面が再描画される。
                this.setState({
                    UserInfo: json
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
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            this.setState({ message: response.data.message || "更新完了!" });
        } catch (err) {
            const errorMsg = err.response?.data?.error || "パスワードの更新に失敗しました。";
            this.setState({ message: errorMsg });
        }
    };

    //passwordの表示切替の処理
    togglePasswordVisibility = (field) => {
        this.setState((prevState) => ({
            passwordVisible: {
                ...prevState.passwordVisible,
                [field]: !prevState.passwordVisible[field]
            }
        }));
    };



    //requiredでパスワードの入力を必須に
    render() {
        const { currentPassword, newPassword, confirmPassword, message, passwordVisible } = this.state;
        return (

            <div>
                <h2 className="passwordtitle">パスワード変更</h2>
                <div className="mypage-boxuserinfo">
                    <form onSubmit={this.handleUpdatePassword}>
                        <h4 class="section-title">次回から変更したパスワードでログインできます。</h4>
                        <h4 class="section-title">新しいパスワードについては、必ずお客様ご自身でお控えください</h4>
                        <br></br>
                        <div>
                            <label>現在のパスワード：</label>
                            <input
                                type={this.state.passwordVisible.current ? "text" : "password"}
                                name="currentPassword"
                                value={currentPassword}
                                onChange={this.onInput}
                                required
                            />
                            <button type="button" onClick={() => this.togglePasswordVisibility('current')}>
                                {this.state.passwordVisible.current ? '非表示' : '👀'}
                            </button>
                        </div>
                        <br />
                        <div>
                            <label>新しいパスワード：</label>
                            <input
                                type={this.state.passwordVisible.new ? "text" : "password"}
                                name="newPassword"
                                value={newPassword}
                                onChange={this.onInput}
                                required
                            />
                            <button type="button" onClick={() => this.togglePasswordVisibility('new')}>
                                {this.state.passwordVisible.new ? '非表示' : '👀'}
                            </button>
                        </div>
                        <br />
                        <div>
                            <label>新しいパスワード（確認）：</label>
                            <input
                                type={this.state.passwordVisible.confirm ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={this.onInput}
                                required
                            />
                            <button type="button" onClick={() => this.togglePasswordVisibility('confirm')}>
                                {this.state.passwordVisible.confirm ? '非表示' : '👀'}
                            </button>
                        </div>
                        <br />
                        <button id="updatebutton" type="submit" className="passwordupdate-button" >
                            {message || 'パスワードを更新する'}
                        </button>

                    </form>
                </div>
                <br></br>
                <a href="/home">ホームに戻る</a>
            </div>
        );
    }

}