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
            keywordcounts:[] ,
            stamptallies: {},
            activeTab: 'tab1',
            start: "",
            end: "",
            currectpage: "1",
            itemspage: "20",
            mode: "1"
            }
        
    }
        componentDidMount() {
        axios.get("/graph", {
            params: { day: null , mode: "1"}  // ← 明示的に送ることで「nullを意図して送ってる」と分かる
            })
            .then(res => {
                console.log(res.data);
                console.log("ssss");
                this.setState({ stamptallies: res.data.stamptallies || {},
                    keywordcounts: res.data.keywordcounts || [],
                    start: res.data.start,
                    end: res.data.end,
                 });
            });
        };

        handleTabChange = (tabId) => {
            this.setState({ activeTab: tabId });
        };
        dayselect = (e) => {
            const data = document.querySelector('.calender_input').value;
            const mode = e.target.name;
            axios.get("/graph", {
                params: {
                    day:data,
                    mode:mode
                }
            }).then(res => {
                this.setState({ stamptallies: res.data.stamptallies || {},
                    keywordcounts: res.data.keywordcounts || [],
                    start: res.data.start,
                    end: res.data.end
                });
                console.log(res.data);
            });
        }
    render(){
        const emojiMap = new Map([
        ['1', '😡'], // '1'という文字列に対応する絵文字
        ['2', '😕'],
        ['3', '😐'],
        ['4', '🙂'],
        ['5', '😍'],
        // 必要に応じて他の数字と絵文字を追加
        ]);
        const { keywordcounts, currentpage, itempage } = this.state;

        // 表示するデータの開始インデックスと終了インデックスを計算
        const indexOfLastItem = currentpage * itempage;
        const indexOfFirstItem = indexOfLastItem - itempage;
        // 現在のページに表示するキーワード
        const currentKeywords = keywordcounts.slice(indexOfFirstItem, indexOfLastItem);
        // 全体のページ数を計算
        const totalPages = Math.ceil(keywordcounts.length / itempage);
        
        const stampdata = Object.entries(this.state.stamptallies).map(([stampid, count],index ) => ({
        title: emojiMap.has(stampid) ? emojiMap.get(stampid) : stampid, // ラベル（スタンプ名）
        value: count, // 件数（円グラフの大きさの元）
        color: ['#4DC4FF', '#ff3e3eff', '	#03AF7A', '#FFF100', '#005AFF'][index % 5], // 色
        }));
        const nostampdata = stampdata.length === 0;
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
                    <input className="calender_input" type="date" name="day"></input>
                    <button className="calender_button" name="1" onClick={this.dayselect}>期間変更（月ごと）</button>
                    <button className="calender_button" name="2" onClick={this.dayselect}>期間変更（選択日から1か月）</button>
                </div>
            </div>
          </div>
          <div className="tab-content content1" style={{ display: this.state.activeTab === 'tab1' ? 'block' : 'none' }}>
        	
        	<h2 className="tab-comments">スタンプごとの数と割合</h2>
            <h3>期間：{this.state.start}~{this.state.end}</h3>

            <div className="tab-flex">
            {nostampdata ? (<p>表示するスタンプデータがありません。</p>) : (
                
                <PieChart
                data={stampdata} // ここにデータ渡すだけで勝手に割合計算してくれる
                label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}`} // 円グラフ上のラベル
                labelStyle={() => ({
  fontSize: '5px',
  fill: '#333333', 
})}
                style={{ height: '500px', width: '500px'}}
                className="graph-pie-chart"
                />
            )
                }
                <div className="tab-legend">
                <h4 style={{ fontSize: '30px'}}>スタンプ集計</h4>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {stampdata.map((entry, index) => (
                    <li key={index} style={{ marginBottom: '5px', fontSize: '20px' }}>
                        <span
                        style={{
                            display: 'inline-block',
                            width: '15px',
                            height: '15px',
                            backgroundColor: entry.color,
                            marginRight: '8px',
                        }}
                        ></span>
                        {entry.title}: {entry.value}件
                    </li>
                    ))}
                </ul>
                </div>
                </div>
          </div>
          <div className="tab-content content2" style={{ display: this.state.activeTab === 'tab2' ? 'block' : 'none' }}>

            {/* その他の用途でdiaryを使う */}
            <h2 className="tab-comments">キーワード数のカウント</h2>
            <h3>期間：{this.state.start}~{this.state.end}</h3>
            {this.state.keywordcounts.length === 0 ? (
                <p>表示するキーワードデータがありません。</p> ) : (
            <table className="keyword-table">
                <tr className="keyword-category">
                    <th className="keyword-category-detail">キーワード</th>
                    <th className="keyword-category-detail">カウント</th>
                </tr>
            {this.state.keywordcounts.map((item, index) => (
                <tr className="keyword-item" key={index}>
                    <td>{item.word}</td>
                    <td>{item.count}</td>
                </tr>
            ))}
                {/* 他のデータも表示したいならここに書ける！ */}
            </table>
                )}
          </div>

            
        </div>

        );
    };
}