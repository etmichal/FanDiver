

//Rolls a single die of the selected type *typeDie*
function rollDie(typeDie) {
    return Number(Math.floor(Math.random() * typeDie) +1);
}

//Rolls the selected number of dice *numDie*, stores each roll and returns the sum of all rolls
export function rollDice(numDice, typeDie) {
    let rollTotal = 0;
    let dieRolls = [];
    dieRolls.push("Rolls: ")
    for(let x = 0; x < numDice; x++) {
        let roll = rollDie(typeDie);
        dieRolls.push(roll);
        rollTotal += roll;
    }
    return {rollTotal: rollTotal, dieRolls: dieRolls};
}