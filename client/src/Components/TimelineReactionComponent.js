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
             reaction1: props.reaction4.reaction1,
            reaction2: props.reaction4.reaction2,
            reaction3: props.reaction4.reaction3,
            reaction4: props.reaction4.reaction4,
            };
    }

    addReaction=()=>{
        // const {}=this.state;

        // const reaction={};

        // axios.post("/timeline/stamp",reaction)
        // .then(json=>{
        //     this.componentDidMount();
        // });
    }

     

    render(){
        const { diary, reaction4, comment, user } = this.props;
        const { hashtag,imagePreview } = this.state;
        return (
             <table>
                </table>
        
        );
    }
}