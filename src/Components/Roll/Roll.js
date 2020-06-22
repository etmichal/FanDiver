import React from 'react';
import './Roll.css';
import RollResults from '../RollResults/RollResults';

class Roll extends React.Component {
    constructor(props) {
        super(props);

        this.rollDice = this.rollDice.bind(this);
    }

    rollDie() {
        return Math.floor(Math.random() * this.props.typeDie) +1;
    }

    rollDice() {
        document.getElementById('rollResults').style.visibility = 'visible';
        let rollTotal = 0;
        for(let x = 0; x < this.props.numDice; x++) {
            rollTotal += this.rollDie(this.props.typeDie);
        }
        Number(rollTotal);
        this.props.onDiceRoll(rollTotal);
        return rollTotal;
    }

    render() {
        return (<button type="submit" onClick={this.rollDice}>Roll!</button>);
    }
}

export default Roll;