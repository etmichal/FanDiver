import React from 'react';
import NewGraphData from '../NewGraphData/NewGraphData';
import DieSelector from '../DieSelector/DieSelector';

/* this componant share many similar functions with the pages first rolling componenet.
    Future updates of this app should seek to optimize this section by combining like code. */

class Graph extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSet1: {
                numDie: 0,
                typeDie: 0,
                min: 0,
                max: 0,
                mean: 0,
                data: [],
            }
        }
        this.setStates = this.setStates.bind(this);
    }
    
    setStates(numDie, typeDie, min, max, mean) {
        this.setState( { numDie: numDie } );
        this.setState( { typeDie: typeDie } );
        this.setState( { min: min } );
        this.setState( { max: max } );
        this.setState( { mean: mean } );
    }

    render() {
        return (
            <DieSelector setStates={this.setStates}/>
        )
    }
}