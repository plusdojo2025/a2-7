import React from "react";
//import './Timeline.css';
//import axios from "axios";

export default class Timeline extends React.Component{


    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            postList:[[]] ,
            reactionList:[[]] ,
            comentList:[] ,
            userList:[] ,
            }
    }

    //マウント後に自動で動作する。
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/timeline")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                timeline:json
            })
        });
    }


    render(){
        return (
        <div>タイムライン画面</div>
        );
    }
}