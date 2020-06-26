/*MAIN FILE FOR DIE ROLL PAGE*/
/*
  THIS APP WILL ALLOW THE USER TO SELECT A NUMBER OF DIE, AND THE TYPE (NUMBER OF SIDES) OF THE DIE,
  THE APP WILL THEN RANDOMLY GENERATE ROLLS FOR EACH DIE THEN CALCULATE AND RETURN THE TOTAL ROLL
*/

import React from 'react';
import './DiceApp.css';
import DiceRoller from './Components/DiceRoller/DiceRoller';
import DiceGrapher from './Components/DiceGrapher/DiceGrapher';

class DiceApp extends React.Component {

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
        </header>
          <DiceRoller />
          {/* <DiceGrapher setNum={this.setNum} setType={this.setType}/> */}
          
      </div>
    );
  }
}

export default DiceApp;
