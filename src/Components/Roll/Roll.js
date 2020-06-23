import React from 'react';
import './Roll.css';

class Roll extends React.Component {
    constructor(props) {
        super(props);

        this.rollDice = this.rollDice.bind(this);
    }

    //Rolls a single die of the selected type *typeDie*
    rollDie() {
        return Math.floor(Math.random() * this.props.typeDie) +1;
    }

    //Rolls the selected number of dice *numDie*, stores each roll and returns the sum of all rolls
    rollDice() {
        document.getElementById('rollResults').style.visibility = 'visible';
        let rollTotal = 0;
        let dieRolls = [];
        for(let x = 0; x < this.props.numDice; x++) {
            let roll = Number(this.rollDie(this.props.typeDie));
            dieRolls.push(roll);
            rollTotal += roll;
        }
        this.props.onDiceRoll(rollTotal);
        return rollTotal;
    }

    render() {
        // Renders a button that executes the *rollDice* function witht he selected criteria
        return (<button type="submit" onClick={this.rollDice}>Roll!</button>);
    }
}

export default Roll;