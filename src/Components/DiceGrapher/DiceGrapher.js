import React from 'react';
import DieSelector from '../DieSelector/DieSelector';
import { Chart } from 'react-google-charts';
import { generateData } from './dataGenerator';
import './DiceGrapher.css';
import {queryGraphData} from './GraphDataQuery';

class Graph extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            numDice: 1,
            typeDie: 4,
            minRoll: 0,
            maxRoll: 0,
            meanRoll: 0,
            data: [],
            options: {
                title: 'Roll Probabilities',
                hAxis: { title: '% Chance', maxValue: 100 },
                vAxis: { title: 'Resulting Roll Values' },
            },
            compareNum: 1,
            compareType: 4,
            compareMinRoll: 0,
            compareMaxRoll: 0,
            compareMean: 0,

            visibility: 'invisible',
        }
        this.setNum = this.setNum.bind(this);
        this.setType = this.setType.bind(this);
        this.setStats = this.setStats.bind(this);
        this.setCompareNum = this.setCompareNum.bind(this);
        this.setCompareType = this.setCompareType.bind(this);
    }

    setNum(numDice) {
        this.setState({ numDice: numDice });
    }

    setType(typeDie) {
        this.setState({ typeDie: typeDie });
    }

    setStats(numDice, typeDie, compareNum, compareType) {
        const url = 'http://api.wolframalpha.com/v2/query?';
        const input = `input=${numDice}+${typeDie}-sided+dice`;
        const appId = '&appid=A896YH-QGP4YTJH4X'
        const endPoint = url + input + appId;
        queryGraphData(endPoint);
        const data = generateData(numDice, typeDie, compareNum, compareType);
        this.setState({
            minRoll: data.testRoll.min, maxRoll: data.testRoll.max, meanRoll: data.testRoll.mean,
            compareMinRoll: data.compareRoll.min, compareMaxRoll: data.compareRoll.max,
            compareMean: data.compareRoll.mean, data: data.graphData, visibility: 'visible'
        });
    }

    setCompareNum(compareNum) {
        this.setState({ compareNum: compareNum });
    }

    setCompareType(compareType) {
        this.setState({ compareType: compareType });
    }

    render() {
        return (
            <section id="graphSection">
                <h2>Graph your Probabilities</h2>
                <div id="dropdowns">
                    <div className="selector">
                        <p className="selector-title">Test Data Set</p>
                        <DieSelector onNumChange={this.setNum} onTypeChange={this.setType} />
                        <p className="stat-text">Min Roll: <span className="stats">{this.state.minRoll}</span> Max Roll: <span className="stats">{this.state.maxRoll}</span> Avg: <span className="stats">{this.state.meanRoll}</span></p>
                    </div>
                    <div className="selector">
                        <p className="selector-title">Control Data Set</p>
                        <DieSelector onNumChange={this.setCompareNum} onTypeChange={this.setCompareType} />
                        <p className="stat-text">Min Roll: <span className="stats">{this.state.compareMinRoll}</span> Max Roll: <span className="stats">{this.state.compareMaxRoll}</span> Avg: <span className="stats">{this.state.compareMean}</span></p>
                    </div>

                    
                </div>
                <button onClick={() => this.setStats(this.state.numDice, this.state.typeDie, this.state.compareNum, this.state.compareType)}>Graph it!</button>
                <div className={this.state.visibility}>
                    <Chart
                        chartType="BarChart"
                        data={this.state.data}
                        options={this.state.options}
                        width="100%"
                        height="60vh"
                        toggleLegend
                    />
                </div>
                
            </section>
        );
    }
}

export default Graph;