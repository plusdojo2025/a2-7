import React, { Component } from 'react';
import axios from "axios";
import '../css/Search.css';


export default class Search extends Component {

    
  constructor(props) {
    super(props);
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const now = new Date().toISOString().slice(0, 16);     // YYYY-MM-DDTHH:MM

        this.state = {
            Tags: [],
            setTag:[],
        }

  }
     componentDidMount(){
        //学習用にaxiosではなく、標準のfetchを利用する
        //関数コンポーネントの際の、function(json){}と同じ意味の記述
        fetch("/api/book/")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する
            //stateが変わると自動的に画面が再描画される
            this.setState({
                Tags:json
            })
        });
    }


    render(){

        const {tag} = this.state;

        return(

        <div>
            <div>
  <input type="text" placeholder="タグ検索"></input>
            </div>
            <div><textarea></textarea></div>
        </div>
            
        );
    }
}