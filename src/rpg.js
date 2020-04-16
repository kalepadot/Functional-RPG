/*
game = {

  character = {
    health: 100,
    potions: 1,
    items: []
  },
  map = [room1, room2, room3];
}

takeHit => character.health -10;
drinkPotion => character.health +50;
acquireItem(item) => character.items.push(item);

1. create character
2. creating enemy
3. combat
  - damaging character
  - damaging enemy
  - taking potions
  - recieve potion from corpse (if statement enemy hp=0 +1 potion and random gold reward)
  - rewards gold baby
   
*/

//BUSINESS LOGIC

export const storeState = (initialState) => {
  let currentState = initialState;
  return(stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};

export const addArrayItem = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: [...state[prop], value]
    });
  };
};

export const multiPropChangeState = (prop1) => {
  return (value1) => {
    return (prop2) => {
      return (value2) => {
        return (state) => ({
          ...state,
          [prop1]: (state[prop1] || 0) + value1,
          [prop2]: (state[prop2] || 0) + value2
        });
      };
    };
  };
};

// EDIT OBJECT VALUES WITHIN OTHER OBJECTS [BISH BASH BOSH BUSH DID 9/11]
export const editPropOfObjInParentState = prop => {
  return value => {
    return childObjName => {
      return parentObjState => ({
        ...parentObjState,
        [childObjName]: { ...parentObjState[childObjName], [prop]: parentObjState[childObjName][prop] + value }
      });
    }
  }
}



let gameObj = { playerHealth: 100, playerDamage: 20, enemyHealth: 50, enemyDamage: 10};

export const fight = multiPropChangeState("playerHealth")(gameObj.enemyDamage)("enemyHealth")(gameObj.playerDamage);


const player = storeState({health: 100, gold: 20, potions: 2, items: []});
export const playerHealth = changeState("health");
const drinkPotion = playerHealth(20);
const healedPlayer = player(drinkPotion);

console.log(healedPlayer.health);


// generate random number(RNJESUS)

export function rng(random, min, max) {
  return Math.round(random * (max - min) + min);
};

rng( Math.random(), 1, 20)