import React from 'react';
import './RollResults.css';

class RollResults extends React.Component {
    
    show() {
        document.getElementById('rollResults').style.visibility = "visible";
    }

    render() {
        return (
            <p id="rollResults">{this.props.numDie}d{this.props.typeDie} resulted in: {this.props.rollTotal}</p>

        )
    }
}

export default RollResults;