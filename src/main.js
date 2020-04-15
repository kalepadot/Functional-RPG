import $ from 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';
import { storeState, changeState } from './../src/rpg'

// USER LOGIC

$(document).ready(function() {
  const player = storeState({level: 1, health: 100, gold: 20, potions: 2, items: ['sword of justice', 'the one ring', 'on the wings of and angel']});
  const playerHealth = changeState("health");
  const playerPotions = changeState("potions");
  const drinkPotion = playerHealth(20);
  const usePotion = playerPotions(-1);
  $('#usePotion').click(function() {
    player(drinkPotion);
    const newState = player(usePotion);
    // const newState = playerHealth(potion);
    $('#health-value').text(newState.health);
    $('#potion-value').text(newState.potions);

    if(newState.potions <= 0) {
      $('#usePotion').hide();
    } else {
      $('#usePotion').show();
    }
  });
  $('#showInventory').click(function() {
    const playerState = player(usePotion)
    for(let i = 0; i < playerState.items.length; i++) {
      $('#items').append(playerState.items[i] + ", ");

    }

  })
});