import React from "react";

import styles from './gragh.css';

export default class Gragh extends React.Component{
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