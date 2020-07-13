import React from 'react';
import { updateNumDie, updateTypeDie } from './UpdateDiceValues';

class DieSelector extends React.Component {

  constructor(props) {
    super(props);

    this.handleNumChange = this.handleNumChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleNumChange(e) {
    updateNumDie(e.target.value, this.props.onNumChange);
  }

  handleTypeChange(e) {

    updateTypeDie(e.target.value, this.props.onTypeChange);
  }

  render() {
    return (
      <form>
        <div className='selectDice'>
          {/* Generates dropdowns to select number of dice to roll, upon selection the state of *numeDie* will be updated */}
          <label htmlFor="numDie">Number of Dice: </label>
          <select name="numDie" className="numDie" onChange={this.handleNumChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          {/* Generates dropdowns to select the type of die, upon selection the state of *typeDie* will be updated   */}
          <label htmlFor="typeDie">Number of Sides: </label>
          <select name="typeDie" className="typeDie" onChange={this.handleTypeChange}>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </form>
    );
  }
}

export default DieSelector;