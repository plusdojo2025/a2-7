import React from "react";

import styles from '../css/Graph.css';

export default class Graph extends React.Component{
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            diaries:[] ,
            stamp: "",
            diary_time: "",
            word: "",
            keywords: "",
            }
    }
    render(){
        const { diaries, stamp, diary_time, word, keywords} = this.state;
        return (
        <div>
            yabe-!!!
        </div>

        );
    };
}