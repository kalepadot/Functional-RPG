import { storeState, changeState, addArrayItem } from '../src/rpg.js';


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
});