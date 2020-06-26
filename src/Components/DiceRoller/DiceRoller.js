import { rollDice } from './Roll/Roll';
import React from 'react';
import DieSelector from '../DieSelector/DieSelector';


class DiceRoller extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //number of dice to roll
            numDice: 1,
            //type of die to roll (how many sides)
            typeDie: 4,
            //the total calculated roll
            rollTotal: 0,
            //an array storing the randomly generated roll for each individual die
            rolls: [],

            visibility: 'invisible',
        }
        this.setNum = this.setNum.bind(this);
        this.setType = this.setType.bind(this);
        this.setRollTotal = this.setRollTotal.bind(this);
        this.setRolls = this.setRolls.bind(this);
    }

    setNum(numDice) {
        this.setState({ numDice: numDice });
    }

    setType(typeDie) {
        this.setState({ typeDie: typeDie });
    }

    setRollTotal(rollTotal) {
        console.log('roll Total ' + rollTotal);
        this.setState({ rollTotal: rollTotal });
    }


    setRolls(dieRolls) {
        this.setState({ rolls: dieRolls })
    }

    changeVisibility() {
        this.setState({ visibility: '.visible' });
    }

    rollDice(numDice, typeDie) {
        if(this.state.visibility === 'invisible') {
            this.changeVisibility();
        }
        let rollResults = rollDice(numDice, typeDie);
        this.setRollTotal(rollResults.rollTotal);
        this.setRolls(rollResults.dieRolls);
    }

    //Adds each item in the *rolls* array as a list item
    displayRolls() {
        const rolls = this.state.rolls;
        let displayRolls = [];
        let counter = 1;
        rolls.forEach(roll => {
            if (roll === "Rolls ") {
                displayRolls.push(<li key="rollHeader">{roll}</li>);
            }
            else {
                displayRolls.push(<li key={"roll" + counter}>{roll}</li>);
                counter++;
            }
        })
        return displayRolls;
    }

    render() {

        return (
            <main>
                <h1>Roll the Dice!</h1>
                {/* Will update values for number of dice needed and type of die to roll */}
                <DieSelector onNumChange={this.setNum} onTypeChange={this.setType} />
                {/* Generates rolls passed on criteria selected, calculates totals, and saves each individual roll */}
                <button type="submit" onClick={() => this.rollDice(this.state.numDice, this.state.typeDie)}>Roll!</button>
                {/* Returns the results of the roll for the user to view */}
                <p className={this.state.visibility}>{this.state.numDie}d{this.state.typeDie} resulted in: {this.state.rollTotal}</p>
                <ul id="displayRolls" className={this.state.visibility}>
                    {this.displayRolls()}
                </ul>
            </main>
        );
    }
}

export default DiceRoller;
