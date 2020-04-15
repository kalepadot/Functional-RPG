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
export const storeState = (initialState) => {
  let currentState = initialState;
  return(stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  }
}

export const addArrayItem = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: [...state[prop], value]
    });
  }
}

// const game = storeState(initialGameState);


// export const player = changeState("health");
// const player = storeState({health: 100, potions: 2, items: []});

const givePlayerItem = addArrayItem("items");
const giveJewel = givePlayerItem("Jewel of the forgotten temple");
// const recieveGold = givePlayerGold();



// export const hurtPlayer = player("health")(-10);
// export const takePotion = player("health")(20);
// export const usePotion = player("potions")(-1);
// export const recievePotion = player("potions")(1);


// console.log(game);
// console.log(hurtPlayer(game));


// const hp = changeState("health");
// const startingHp = hp(100);
// const takeDamage = hp(-10);
// const takePotion = hp(20);
