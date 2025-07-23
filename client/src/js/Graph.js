import React from "react";
// import axios from 'axios';
import '../css/Graph.css';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

export default class Graph extends React.Component{
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            diaries:[            ] ,
            activeTab: 'tab1',
            }
        
    }
        componentDidMount() {
        axios.get("/graph", {
            params: { day: null }  // ← 明示的に送ることで「nullを意図して送ってる」と分かる
            })
            .then(res => {
            this.setState({ diaries: res.data });
            });
        };

        handleTabChange = (tabId) => {
            this.setState({ activeTab: tabId });
        };
        dayselect = () => {
            const data = document.querySelector('.calender_input').value;
            axios.get("/graph", {
                params: {
                    day:data
                }
            }).then(res => {
                this.setState({ diaries: res.data });
                console.log(res.data);
            });
        }
    render(){
        const data = this.state.diaries.map((diary, index) => ({
        title: diary.stamp, // ラベル（スタンプ名）
        value: diary.count, // 件数（円グラフの大きさの元）
        color: ['#4DC4FF', '#FF4B00', '	#03AF7A', '#FFF100', '#005AFF'][index % 5], // 色
        }));
        return (
        <div className="super_graph">
          <div className="tab-container">
            <div className="tab-labels">
                <div className="tab-group_left">
                    <label for="tab1" className={`tab-label label1 ${this.state.activeTab === 'tab1' ? 'active' : ''}`}
                    onClick={() => this.handleTabChange('tab1')}>感情グラフ</label>
                    <label for="tab2" className={`tab-label label2 ${this.state.activeTab === 'tab2' ? 'active' : ''}`}
                    onClick={() => this.handleTabChange('tab2')}>キーワード分析</label>
                </div>
                <div className="tab-group_right">
                    <input className="calender_input" type="date" name="day" value=""></input>
                    <button className="calender_button" onClick={this.dayselect}>期間変更</button>
                </div>
            </div>
          </div>
          <div className="tab-content content1" style={{ display: this.state.activeTab === 'tab1' ? 'block' : 'none' }}>
        	
        	<h2 className="tab-comments">スタンプごとの数と割合</h2>
                <PieChart
                data={data} // ここにデータ渡すだけで勝手に割合計算してくれる
                label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}`} // 円グラフ上のラベル
                labelStyle={{ fontSize: '5px',color: 'white'}}
                style={{ height: '500px', width: '500px'}}
                />
          </div>
          <div className="tab-content content2" style={{ display: this.state.activeTab === 'tab2' ? 'block' : 'none' }}>

            {/* その他の用途でdiaryを使う */}
            
            <table>
                <tr>
                    <th>キーワード</th>
                    <th>カウント</th>
                </tr>
            {this.state.diaries.map((diary) => (
                <tr>
                    <td>{diary.word}</td>
                    <td>{diary.wordcount}</td>
                </tr>
            ))}
                {/* 他のデータも表示したいならここに書ける！ */}
            </table>
          </div>

            
        </div>

        );
    };
}