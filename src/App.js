/*MAIN FILE FOR DIE ROLL PAGE*/
/*
  THIS APP WILL ALLOW THE USER TO SELECT A NUMBER OF DIE, AND THE TYPE (NUMBER OF SIDES) OF THE DIE,
  THE APP WILL THEN RANDOMLY GENERATE ROLLS FOR EACH DIE THEN CALCULATE AND RETURN THE TOTAL ROLL
*/

import React from 'react';
import './App.css';
import DieSelector from './Components/DieSelector/DieSelector';
import Roll from './Components/Roll/Roll';
import RollResults from './Components/RollResults/RollResults';

class App extends React.Component {

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
    }
    this.setNum = this.setNum.bind(this);
    this.setType = this.setType.bind(this);
    this.setRollTotal = this.setRollTotal.bind(this);
  }
  
  setRolls(dieRolls) {
    this.setState({rolls: dieRolls})
  }

  setNum(numDice) {
    this.setState({numDice: numDice});
  }

  setType(typeDie) {
    this.setState({typeDie: typeDie});
  }

  setRollTotal(rollTotal) {
    this.setState({rollTotal: rollTotal});
  }
  
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1>Roll the Dice!</h1>
          {/* Will update values for number of dice needed and type of die to roll */}
          <DieSelector onNumChange={this.setNum} onTypeChange={this.setType}/>
          {/* Generates rolls passed on criteria selected, calculates totals, and saves each individual roll */}
          <Roll onDiceRoll={this.setRollTotal} numDice={this.state.numDice} typeDie={this.state.typeDie}  setDieRolls={this.setDieRolls}/>
          {/* Returns the results of the roll for the user to view */}
          <RollResults numDie={this.state.numDice} typeDie={this.state.typeDie} rollTotal={this.state.rollTotal}/>
        </header>
      </div>
    );
  }
}

export default App;
