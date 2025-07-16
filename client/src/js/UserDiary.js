import React from "react";
import '../css/Timeline.css';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Timeline extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
 
            }
    }

    //マウント後に自動で動作する。
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/diarypage")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                diarypage:json
            })
        });
    }


    render(){

        return (
        <div>

        <header>ヘッダー</header>
        <main>
        <h1>日記ページ</h1>
 
        </main>
        <footer>フッター</footer>

        </div>
        );
    }
}