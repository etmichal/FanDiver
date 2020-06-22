import React from 'react';
import './App.css';
import DieSelector from './Components/DieSelector/DieSelector';
import Roll from './Components/Roll/Roll';
import RollResults from './Components/RollResults/RollResults';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      numDice: 1,
      typeDie: 4,
      rollTotal: 0,
    }
    this.setNum = this.setNum.bind(this);
    this.setType = this.setType.bind(this);
    this.setRollTotal = this.setRollTotal.bind(this);
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
          <Roll onDiceRoll={this.setRollTotal} numDice={this.state.numDice} typeDie={this.state.typeDie}/>
          <RollResults numDie={this.state.numDice} typeDie={this.state.typeDie} rollTotal={this.state.rollTotal}/>
        </header>
      </div>
    );
  }
}

export default App;
