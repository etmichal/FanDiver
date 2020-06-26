import React from 'react';
import './RollResults.css';

class RollResults extends React.Component {
    
    render() {
        return (
            //Returns the total roll and the type of dice and number of dice selected
            <p id="rollResults">{this.props.numDie}d{this.props.typeDie} resulted in: {this.props.rollTotal}</p>

        )
    }
}

export default RollResults;