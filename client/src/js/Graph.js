import React from "react";
// import axios from 'axios';
import styles from '../css/Graph.css';
import { PieChart } from 'react-minimal-pie-chart';

export default class Graph extends React.Component{
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            diaries:[            { stamp: '1', count: 12 , word: 'aa', wordcount: 1},
            { stamp: '2', count: 10 , word: 'bb', wordcount: 2},
            { stamp: '3', count: 5 , word: 'cc', wordcount: 3},
            { stamp: '4', count: 8 , word: 'dd', wordcount: 4},
            { stamp: '5', count: 15 , word: 'ee', wordcount: 5}] ,
            activeTab: 'tab1',
            }
        handleTabChange = (tabId) => {
            this.setState({ activeTab: tabId });
        };
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
            <div className="tab-labels">
                <div className="tab-group_left">
                    <label for="tab1" className={`tab-label label1 ${this.state.activeTab === 'tab1' ? 'active' : ''}`}
                    onClick={() => this.handleTabChange('tab1')}>グラフ</label>
                    <label for="tab2" className={`tab-label label2 ${this.state.activeTab === 'tab2' ? 'active' : ''}`}
                    onClick={() => this.handleTabChange('tab2')}>キーワード分析</label>
                </div>
                <div className="tab-group_right">
                    <input className="calender_input" type="date" name="day"></input>
                    <button className="calender_button" onClick={this.saveBook}>変更</button>
                </div>
            </div>
          </div>
          <div className="tab-content content1" style={{ display: this.state.activeTab === 'tab1' ? 'block' : 'none' }}>

        	<h1 className="tab-title">感情グラフ</h1>
        	
        	<h2 className="tab-comments">スタンプごとの件数の割合</h2>
                <PieChart
                data={data} // ここにデータ渡すだけで勝手に割合計算してくれる
                label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`} // 円グラフ上のラベル
                labelStyle={{ fontSize: '5px' }}
                style={{ height: '500px' }}
                />
          </div>
          <div className="tab-content content2" style={{ display: this.state.activeTab === 'tab2' ? 'block' : 'none' }}>
            <h1 className="tab-title">キーワード分析</h1>
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