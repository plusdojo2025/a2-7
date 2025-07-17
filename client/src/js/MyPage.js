import React from 'react';
import axios from "axios";

export default class MyPage extends React.Component{
    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            
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

    //画面で何か入力された時に、その値をstateとして保持する。
    //これにより、JavaScript動作時に毎回画面を見に行くのではなく、画面と連動したstateだけを見ればよくなる。
    onInput = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }    

    render(){
        return(
            <div>これはマイページです。</div>
        );
    }
}
