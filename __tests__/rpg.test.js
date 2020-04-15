import { storeState, changeState } from '../src/rpg.js';


describe('storeState, changeState, initialGameState', () => {
  test('should subtract 10 from player health prop when attacked', () => {
    const player = storeState({health: 100});
    const hurtPlayer = changeState("health")(-10);
    const attackPlayer = player(hurtPlayer);
    expect(attackPlayer.health).toEqual(90);
  })
});

