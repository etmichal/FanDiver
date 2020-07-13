
/*==================================================================================================
- GENERATES GRAPH DATA FOR EACH ROLL SELECTED BASED ON NUMDIE AND TYPEDIE
    * CALCULATES MIN, MAX AND AVERAGE VALUES FOR EACH DATASET
    * CALCULATES THE ODDS OF THROWING EACH ROLL BETWEEN THE MIN AND THE MAX
- COMBINES THOSE DATA SETS SO THAT THEY CAN BE COMBINED ON THE GRAPH
==================================================================================================*/

export function generateData(numDie, typeDie, compareNumDie, compareTypeDie) {

    //Set variables for "Test case" data
    let testRoll = {
        numDie: numDie,
        typeDie: typeDie,
        min: numDie,
        max: typeDie * numDie,
        mean: Number(((typeDie * numDie) / 2).toFixed(2)),
    }

    //Set variables for "Control" or "Comparison" case data
    let compareRoll = {
        numDie: compareNumDie,
        typeDie: compareTypeDie,
        min: compareNumDie,
        max: compareNumDie * compareTypeDie,
        mean: Number(((compareNumDie * compareTypeDie) / 2).toFixed(2)),
    }

    //Creates arrays which will hold all graph data
    let testData = createDataPoints(testRoll);
    let compareData = createDataPoints(compareRoll);
    let graphData = [];
    graphData = combineData(testData, compareData);
    graphData.unshift(['Resulting Roll Value', `${numDie}d${typeDie}`, `${compareNumDie}d${compareTypeDie}`]);
    return { testRoll, compareRoll, graphData };
}

/*==================================================================================================
GENERATES AN ARRAY OF DATA POINTS FOR THE NUMBER OF DIE AND TYPE OF DIE SELECTED
==================================================================================================*/

function createDataPoints(rollObject) {
    let dataSet = [];
    if (rollObject.min === 1) {
        for (let x = 1; x <= rollObject.max; x++) {
            let count = x - 1;
            dataSet.push([(rollObject.min + count), ((1 / rollObject.max) * 100)]);
        }
    }
    else {
        const totalPossibilites = Math.pow(rollObject.typeDie, rollObject.numDie);
        for (let x = rollObject.min; x <= rollObject.max; x++) {
            let possibilities = calcProbablity(rollObject, x);
            if(x === 16) {
                console.log('Roll Total: ' + x + ' Possibilities: ' + possibilities + ' Total Possibilities: ' + totalPossibilites);
                console.log('data: ' + [(x), ( Number((possibilities / totalPossibilites).toFixed(2) ) ) * 100]);
            }
            dataSet.push([(x), ( Number((possibilities / totalPossibilites).toFixed(2) ) ) * 100]);
            // else {
            //     let possibilities = calcProbablity(rollObject, x);
            //     dataSet.push([(x), (Number((possibilities / totalPossibilites).toFixed(2))) * 100]);
            // }

        }
    }

    return dataSet;
}

/*==================================================================================================
COMBINES DATA SET 1 WITH DATA SET 2 TO CREATE PROPER FORMAT FOR GRAPHING
==================================================================================================*/

function combineData(data1, data2) {
    let graphData = [];

    data1.forEach(dataPoint => {
        dataPoint.push(null);
        graphData.push(dataPoint);
    });

    data2.forEach(dataPoint => {
        dataPoint.splice(1, 0, null);
        graphData.push(dataPoint);
    })
    //console.log(graphData);
    return graphData;
}





/*======================================================================================== 

The probability of each roll must be calculated and added to the graph data

    To solve this problem, the following resource was used:
    https://www.lucamoroni.it/the-dice-roll-sum-problem/

p = desired value (i.e. the number of ways to roll a total of 4)
n = number of dice (numDie)
s = number of sides (typeDie)

Data will graph correctly up to 2 die, 3 die and above come up with negative values. After research I could not come up
with a reason other than a problem with the formula. Currenlty exploring alternative formulas for calculation.

=========================================================================================*/

function calcProbablity(rollObject, rollSum) {
    let combonations = 0;                               //Number of possible outcomes for specified roll
    let p = rollSum;                                    //The roll total in question (i.e. how many ways can you roll a total of 7)
    let points = p - rollObject.numDie;                 //Adjusted 'p' value, removing 1 point for each die (so that each die is assumed at least a 1)                                          
    
    /*========================================================================================
    Currently - The number of ways 'p' can be rolled
    This number will have to be adjusted for sequences or rolls counted multiple times
    =========================================================================================*/
    console.log('--------------------' + rollSum + '-------------------------');
    combonations = calcPossibilities(points, rollObject.numDie);

    /*=======================================================================================
    Since a 1 was assumed for each die, we have to remove cases where the die rolled the max value,
    i.e. a 6 on a d6, since each die is assumed 1, the roll of a 6 would actually be a 7
    because this die now exceeds to maximum roll, we have to eliminate all insances of this roll from the probability
    =======================================================================================*/

    let maxRolls = Math.floor(p / rollObject.typeDie);  //Represents the number of dice that can roll a maximum without exceeding p
    if(p === rollObject.typeDie) {
        maxRolls = 0;
    }

    /*======================================================================================
    CALCULATES THE TOTAL NUMBER OF INVALID VALUES (i.e. rolls over dieType)
    ======================================================================================*/

    let invalidValues = [];
    // let maxCounter = 1;
    // console.log('pre-loop');
    // while(points > rollObject.numDie) {
    //     console.log('loop started');
    //     let currentPossiblities = calcPossibilities(points, rollObject.numDie);
    //     let maxRollCombonations = factorial(rollObject.numDie) / factorial(maxCounter);
    //     invalidValues.push(currentPossiblities * maxRollCombonations);
    //     maxCounter++;
    // }

    for (let x = 1; x <= maxRolls; x++) {
        points = points - rollObject.typeDie;           //Adjusts points for assuming die1 rolls the max value

        let currentPossiblities = 0;
        if(points < 0) {

        } else if (x === 1) {
            currentPossiblities = doublePossibilites(points, rollObject.numDie);
            if(x===16){
                console.log(`Current Possibilities ${x}: ${currentPossiblities}`);
            }
            invalidValues.push(currentPossiblities * rollObject.numDie);
        } else {
            currentPossiblities = doublePossibilites(points, rollObject.numDie);
            if(rollSum===16){
                console.log(`Current Possibilities ${x}: ${currentPossiblities}`);
            }
            let maxRollCombonations = calcPossibilities(x, rollObject.numDie);
            if(rollSum===16){
                console.log(`maxRollCombonations ${x}: ${maxRollCombonations}`);
            }
            invalidValues.push(currentPossiblities * doublePossibilites);
        }
    }

    let totalInvalidValues = 0;
    console.log(invalidValues);
    for (let x = 0; x < invalidValues.length; x++) {
        if ((x % 2) === 0) {
            totalInvalidValues += invalidValues[x];
        } else {
            totalInvalidValues -= invalidValues[x];
        }
    }
    if(rollSum === 16) {
        console.log('combonations: ' + combonations + ' Invalid Rolls: ' + invalidValues);
    }
    combonations = combonations - totalInvalidValues;
    if(rollSum === 16) {
        console.log('total combonations: ' + combonations);
    }
    return combonations;
}

function factorial(x) {
    let total = 1;
    for(let y = 1; y <= x; y++) {
        total = total * y;
    }
    return total;
}

function calcPossibilities(points, numDie) {
    let n = numDie + points - 1;             //Total number of die adjusted per formula to account for point distribution ((n)) = (n + p - 1)
    return factorial(n) / (factorial(points) * factorial(numDie - 1));
}

function doublePossibilites(points, numDie) {
    let n = numDie + points - 1;
    return factorial(n) / factorial(points);
}