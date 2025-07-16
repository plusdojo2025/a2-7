import React from "react";

import styles from './gragh.css';

export default class Gragh extends React.Component{
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            books:[] ,
            name: "",
            author: "",
            overview: "",
            showModal: false,
            //Todo:ここに、モーダルウィンドウ制御用のフラグと、モーダルウィンドウ上で扱うデータを宣言する。
            modIndex: 0,
            modName: "",
            modAuthor: "",
            modOverview: "",
            }
    }
    render(){
        return <div>グラフページです。</div>
    };
}