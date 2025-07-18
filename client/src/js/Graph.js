import React from "react";
// import axios from 'axios';
import styles from '../css/Graph.css';
import { PieChart } from 'react-minimal-pie-chart';

export default class Graph extends React.Component{
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            diaries:[] ,
            }
    }
    render(){
        const data = this.state.diaries.map((diary, index) => ({
        title: diary.stamp, // ラベル（スタンプ名）
        value: diary.count, // 件数（円グラフの大きさの元）
        color: ['#E38627', '#C13C37', '#6A2135', '#8A2BE2', '#00CED1'][index % 5], // 色
        }));
        return (
        <div className="super_graph">
          <div className="tab-container">
                <input type="radio" name="tabs" id="tab1" className="tab-input" checked></input>
                <input type="radio" name="tabs" id="tab2" className="tab-input"></input>
            <div className="tab-labels">
                <div className="tab-group_left">
                    <label for="tab1" className="tab-label label1">グラフ</label>
                    <label for="tab2" className="tab-label label2">キーワード分析</label>
                </div>
                <div className="tab-group_right">
                    <input className="calender_input" type="date" name="day"></input>
                    <button className="calender_button" onClick={this.saveBook}>変更</button>
                </div>
            </div>
          </div>
          <div className="tab-content content1">

        	<h1 className="check_results">感情グラフ</h1>
        	
        	<h2>スタンプごとの件数の割合</h2>
                <PieChart
                data={data} // ここにデータ渡すだけで勝手に割合計算してくれる
                label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`} // 円グラフ上のラベル
                labelStyle={{ fontSize: '5px' }}
                style={{ height: '200px' }}
                />
          </div>
          <div className="tab-content content2">
            <h1 className="check_results">キーワード分析</h1>
            {/* その他の用途でdiaryを使う */}
            {this.state.diaries.map((diary) => (
                <div>
                <h3>キーワード分析</h3>
                <p>キーワード: {diary.word}</p>
                <p>カウント: {diary.wordcount}</p>
                {/* 他のデータも表示したいならここに書ける！ */}
                </div>
            ))}
          </div>

            
        </div>

        );
    };
}