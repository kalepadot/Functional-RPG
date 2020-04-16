import { storeState, changeState, addArrayItem, multiPropChangeState, rng, tryToDoAThing } from '../src/rpg.js';

describe('storeState, changeState, initialGameState', () => {
  
  test('should subtract 10 from player health prop when attacked', () => {
    const player = storeState({health: 100});
    const hurtPlayer = changeState("health")(-10);
    const attackPlayer = player(hurtPlayer);
    expect(attackPlayer.health).toEqual(90);
  });

  test('should add item to player items array', () => {
    const player = storeState({health: 100, potions: 2, items: []});
    const givePlayerItem = addArrayItem("items");
    const giveJewel = givePlayerItem("Jewel of the forgotten temple");
    const finalState = player(giveJewel);
    expect(finalState.items[0]).toEqual("Jewel of the forgotten temple");
  }); 

  test('should decrement potion number and increase player health', () => {
    const player = storeState({health: 40, potions: 2, items: []});
    const drinkPotion = multiPropChangeState("health")(20)("potions")(-1);
    const updatedPlayerStats = player(drinkPotion);
    expect(updatedPlayerStats.health).toEqual(60);
    expect(updatedPlayerStats.potions).toEqual(1);
  });
  
  test('should fight the player and enemy and decrement both healths by their damage', () =>{
    const player = storeState({health: 100, potions: 2, items: []});
    const enemy = storeState({health: 50})
    const playerTakeDamage = changeState("health")(-10);
    const enemyTakeDamage = changeState("health")(-20);
    const playerState = player(playerTakeDamage);
    const enemyState = enemy(enemyTakeDamage);
    expect(playerState.health).toEqual(90);
    expect(enemyState.health).toEqual(30);
  });

  test('should randomize damage dealt and decrement health by randomized damage total', () =>{
    const enemy = storeState({health: 50});
    const enemyTakeDamage = changeState("health")(-(rng( 0.4, 1, 20)));
    const enemyState = enemy(enemyTakeDamage);
    expect(enemyState.health).toEqual(41);
  });

  test('should edit the object value inside of a parent object', () => {
    const game = storeState({
      player: {
        health: 100,
        damage: 20,
        potions: 2,
        items: []
      },
      goblin: {
        health: 40,
        damage: 10
      }
    });
    const goblinSwing = tryToDoAThing("health")(-10)("player");
    const updatedGameState = game(goblinSwing);
    expect(updatedGameState.player.health).toEqual(90);
  })

});