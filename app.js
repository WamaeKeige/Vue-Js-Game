new Vue({
  el: '#app',
  data: {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: []
  },
  methods: {
    gameStart: function() {
       this.gameIsRunning = true;
       this.playerHealth = 100;
       this.monsterHealth = 100;
    },
    attack: function(){
      var damage =  this.calculateAttack(2, 12);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player Hits Monster for' + damage
      });
       if (this.checkWin()){
         return;
       }
      this.playerHealth -=  this.calculateAttack(3, 12);
      this.checkWin();
},
    specialAttack: function(){
      var damage = this.calculateDamage(10, 20);
              this.monsterHealth -= damage;
              this.turns.unshift({
                  isPlayer: true,
                  text: 'Player hits Monster hard for ' + damage
              });
              if (this.checkWin()) {
                  return;
              }
              this.monsterAttack();
    },
    monsterAttack: function(){
      var damage = this.calculateAttack(9, 16)
      this.playerHealth -=  damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster Hits Player for' + damage
      });
      this.checkWin();
    },
    giveUp: function(){
      this.gameIsRunning = false;
    },
    heal: function(){
     if(this.playerHealth <= 90){
         this.playerHealth += 10;
     } else{
       this.playerHealth = 100;
     }
     this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
     this.monsterAttack();
    },
    calculateAttack: function(min, max){
       return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
             if (this.monsterHealth <= 0) {
                 if (confirm('You won! New Game?')) {
                     this.gameStart();
                 } else {
                     this.gameIsRunning = false;
                 }
                 return true;
             } else if (this.playerHealth <= 0) {
                 if (confirm('You lost! New Game?')) {
                     this.gameStart();
                 } else {
                     this.gameIsRunning = false;
                 }
                 return true;
             }
             return false;
         }
     }
 });
