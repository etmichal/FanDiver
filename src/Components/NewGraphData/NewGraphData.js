import React from 'react';

class NewGraphData extends React.Component {

    render() {
        return (
            <div>
                <h2>Test Data Set: </h2>
                <div>
                    <label htmlFor="numTestDice">Number of Dice: </label>
                    <select name="numDie" id="numDie" onChange={this.handleNumChange}>
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
                    <label htmlFor="typeDie">Number of Sides: </label>
                    <select name="typeDie" id="typeDie" onChange={this.handleTypeChange}>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
            
        )
    }

}

export default NewGraphData;