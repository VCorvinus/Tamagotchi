const readline = require('readline');
const fs = require('fs');
const figlet = require('figlet'); 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Spawn {
    constructor(name) {
      this.name = name;
      this.mood = 'neutral';
      this.hunger = 0;
      this.tired = 0;
      this.poop = 0;
      this.sick = false;
      this.intelligence = 0;
      this.level = 0;
      this.xp = 0;
      this.health = 100;
      this.bored = 0;
      this.sickBar = 0;
    }
  
    updateMood() {
      if (this.hunger >= 5 || this.tired >= 5 || this.poop >= 5 || this.sick) {
        this.mood = '☆*:.｡.o(≧▽≦)o.｡.:*☆';
        this.health -= 10;
      } else if (this.hunger >= 3 || this.tired >= 3 || this.poop >= 3) {
        this.mood = '(╥_╥)';
        this.health -= 5;
      } else if (this.intelligence >= 5) {
        this.mood = '（＾_＾）';
        this.health += 5;
      } else if (this.bored >= 5) {
        this.mood = '（⌯⌅⌄⌅）';
      } else if (this.bored >= 0) {
        this.mood = '(ノ°益°)ノ';
      } else {
        this.mood = '(๑◕︵◕๑)';
      }
      this.health = Math.max(0, Math.min(100, this.health));
      if (this.bored >= 5) {
        this.mood = '(๑◕︵◕๑)';
    }
  }  
  
    levelUp() {
      if (this.xp >= this.getXPToNextLevel()) {
        this.level++;
        this.xp = 0;
        if (this.level === 6) {
          console.log('Congratulations! You reached the highest level. Your reward: a potato!');
          rl.close();
        }
      }
    }
  
    getXPToNextLevel() {
      return (this.level + 1) * 111;
    }
  
    feed() {
      if (this.hunger > 0) {
        this.hunger--;
        this.xp += 10;
        this.updateMood();
        this.levelUp();
        return `${this.name} is fed and happier.`;
      }
      return `${this.name} is not hungry.`;
    }
  
    bed() {
      if (this.tired > 0) {
        this.tired--;
        this.xp += 10;
        this.updateMood();
        this.levelUp();
        return `${this.name} is resting and feels better.`;
      }
      return `${this.name} is not tired.`;
    }
  
    clean() {
      if (this.poop > 0) {
        this.poop--;
        this.xp += 10;
        this.updateMood();
        this.levelUp();
        return `${this.name} is clean now.`;
      }
      return `${this.name} doesn't need cleaning.`;
    }
  
    heal() {
      if (this.sick) {
        this.sick = false;
        this.xp += 10;
        this.updateMood();
        this.levelUp();
        return `${this.name} is no longer sick.`;
      }
      return `${this.name} is not sick.`;
    }
  
    play() {
        this.mood = 'happy';
        this.hunger++;
        this.xp += 10;
        if (this.bored > 0) {
          this.bored--;
        }
        this.updateMood();
        this.levelUp();
        return `${this.name} played and is happier.`;
      }
    
      teach() {
        this.intelligence += 3;
        this.bored += 5;
        this.xp += 15;
        if (this.bored > 0) {
          this.bored--;
        }
        this.updateMood();
        this.levelUp();
        return `${this.name} read a book and gained knowledge.`;
      }
    
      pat() {
        this.health += 10;
        this.xp += 5;
        if (this.bored > 0) {
          this.bored--;
        }
        this.updateMood();
        this.levelUp();
        return `${this.name} is feeling loved.`;
      }
    
      ensureStatsWithinRange() {
        this.hunger = Math.max(0, Math.min(100, this.hunger));
        this.tired = Math.max(0, Math.min(100, this.tired));
        this.poop = Math.max(0, Math.min(100, this.poop));
        this.health = Math.max(0, Math.min(100, this.health));
        this.sickBar = Math.max(0, Math.min(100, this.sickBar));
      }
  
      getStatus() {
        this.ensureStatsWithinRange();
        const xpToNextLevel = this.getXPToNextLevel();
        const xpBar = '='.repeat((this.xp / xpToNextLevel) * 20);
    
        let sickStatus = '';
        if (this.sick) {
          sickStatus = `Sick: ${'='.repeat(this.sickBar)} ${this.sickBar}%\n`;
        }
    
        return `
          Level: ${this.level}
          XP: ${this.xp}/${xpToNextLevel} [${xpBar}]
          Health: ${this.health}
          ${this.name}'s Mood: ${this.mood}
          Hunger: ${this.hunger}
          Tired: ${this.tired}
          Filthy: ${this.poop}
          Intelligence: ${this.intelligence}
          Bored: ${this.bored}
          ${sickStatus}
        `;
      }
    }
  

console.log('Welcome to the Tamagotchi game!');
console.log(figlet.textSync("HellSpawn")); 

  const saveFile = 'spawn_save.json';
  
  function loadSpawn() {
    if (fs.existsSync(saveFile)) {
      const savedSpawn = JSON.parse(fs.readFileSync(saveFile));
      console.log(`Loaded saved game for ${savedSpawn.name}`);
      return new Spawn(savedSpawn.name);
    } else {
      console.log('Starting a new game.');
      return null;
    }
  }
  
  const savedSpawn = loadSpawn();
  
  if (savedSpawn) {
    rl.question('Do you want to continue the saved game? (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        const spawn = savedSpawn;
        startGameLoop(spawn);
      } else {
        startNewGame();
      }
    });
  } else {
    startNewGame();
  }

  function startNewGame() {
    setTimeout(() => {
      rl.question('Enter a name for your Spawn: ', (name) => {
      const spawn = new Spawn(name);
      startGameLoop(spawn);
    });
    }, 2000);
  }
  

function startGameLoop(spawn) {
  console.log(spawn.getStatus()); 
  setInterval(() => {
    const randomFactorHunger = Math.random() * 0.4 + 0.8;
    const randomFactorTired = Math.random() * 0.4 + 0.8;
    const randomFactorBored = Math.random() * 0.4 + 0.8;

    spawn.hunger += Math.round(spawn.hunger * (randomFactorHunger * 0.1));
    spawn.tired += Math.round(spawn.tired * (randomFactorTired * 0.1));
    spawn.bored += Math.round(spawn.bored * (randomFactorBored * 0.1));

    if (spawn.hunger >= 3 || spawn.tired >= 3 || spawn.poop >= 3) {
      spawn.sick = true;
    }

    if (spawn.sick) {
      spawn.sickBar = spawn.sickBar || 0;
      spawn.sickBar += 10;
      if (spawn.sickBar >= 100) {
        gameOver(spawn);
      }
    }

    console.log('1 minute has passed.');
    console.log(spawn.getStatus()); 
  }, 1 * 60 * 1000);

  gameLoop(spawn);
}

function gameOver() {
  console.log(`${spawn.name} has died. Game over.`);
figlet('Game Over', function(err, data) {
            if (!err) {
              console.log(data);
            }

rl.question('Do you want to restart the game? (y/n): ', (answer) => {
              if (answer.toLowerCase() === 'y') {
                startNewGame();
              } else {
                console.log('Goodbye!');
                rl.close();
        }
      });
    });
  }
  
  function gameLoop(spawn) {
    rl.question('Interact with your Spawn by entering feed, clean, play, bed, pat, heal and teach or save and exit): ', (action) => {
      if (action === 'exit') {
        console.log('Goodbye!');
        rl.close();
      } else if (action === 'save') {
        saveSpawn(spawn);
        console.log('Game saved.');
        gameLoop(spawn);
      } else if (action in spawn) {
        console.log(spawn[action]());
        gameLoop(spawn);
      } else {
        console.log('Invalid action. Try again.');
        gameLoop(spawn);
      }
    });
  }
  
  function saveSpawn(spawn) {
    fs.writeFileSync(saveFile, JSON.stringify(spawn));
  }