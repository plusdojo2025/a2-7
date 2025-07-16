import React, { useState } from 'react';
import axios from "axios";

export default class UserInfo extends React.Component() {


    const MyPage = () => {
        const [currentPassword, setCurrentPassword] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [message, setMessage] = useState('');

        const handleUpdatePassword = async (e) => {
            e.preventDefault();

            if (newPassword !== confirmPassword) {
                setMessage('新しいパスワードが一致しません。');
                return;
            }
            //try catch文を書く
        };


        render(){
            return (
                <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
                    <h2>マイページ - パスワード変更</h2>
                    <form onSubmit={handleUpdatePassword}>
                        <div>
                            <label>現在のパスワード：</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>新しいパスワード：</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>新しいパスワード（確認）：</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">更新</button>
                    </form>
                    {message && <p style={{ color: 'red' }}>{message}</p>}
                </div>
            );
        };
    }
}