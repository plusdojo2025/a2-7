import React from 'react';
import axios from "axios";


export default class Search extends React.Component {
    render(){
        return(
            <div>
                <input type="text" placeholder="タグ検索"></input>
            </div>
        );
    }
}