const figlet = require('figlet');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const levelText = [
    "Lvl 0",
    "Lvl 1",
    "Lvl 1.3",
    "Lvl 2",
    "Lvl 3",
    "Lvl 4",
    "Lvl 5",
    "Lvl 6",
    "Lvl 6.66",
  ];
  
  function getLevelText(level) {
    return levelText[level] || "Unknown Level";
  }

const levelArt = [
    "ASCII Art for Level 0",
    "ASCII Art for Level 1",
    "ASCII Art for Level 1.3",
    "ASCII Art for Level 2",
    "ASCII Art for Level 3",
    "ASCII Art for Level 4",
    "ASCII Art for Level 5",
    "ASCII Art for Level 6",
    "ASCII Art for Level 6.66",
  ];
  
  function getLevelArt(level) {
    return levelArt[level] || "Unknown Level ASCII Art";
  }

const tamagotchi = {
  level: 0,
  xp: 0,
  health: 100,
  mood: 100,
  status: ['neutral'],
};

const levelXp = [13, 19, 150, 222, 333, 444, 555, 600, 666];
let hasQuit = false;

function updateStatus() {
  console.clear();
  console.log(`Tamagotchi Level: ${getLevelText(tamagotchi.level)}`);
  console.log(`XP: ${tamagotchi.xp}`);
  console.log(`Health: ${tamagotchi.health}`);
  console.log(`Mood: ${tamagotchi.mood}`);

  if (tamagotchi.health >= 50 || tamagotchi.mood >= 50) {
    tamagotchi.status = ['happy'];
  } else if ((tamagotchi.health >= 25 && tamagotchi.health < 50) || (tamagotchi.mood >= 25 && tamagotchi.mood < 50)) {
    tamagotchi.status = ['neutral'];
  } else if ((tamagotchi.health >= 0 && tamagotchi.health < 25) || (tamagotchi.mood >= 0 && tamagotchi.mood < 25)) {
    tamagotchi.status = ['sad'];
  } else {
    tamagotchi.status = ['angry'];
  }

  console.log(`Status: ${tamagotchi.status.join(', ')}`);

      console.log(getLevelArt(tamagotchi.level));
}


function checkXP() {
  if (tamagotchi.xp < 0) {

    tamagotchi.status.push('angry');
  } else if (tamagotchi.status.includes('angry')) {
    tamagotchi.status = tamagotchi.status.filter((s) => s !== 'angry');
    console.log("Tamagotchi is unhappy!");
  }

  if (tamagotchi.xp >= levelXp[tamagotchi.level]) {
    levelUp();
  }
  
  if (tamagotchi.level === 6.66) {
    console.log("Congratulations! Your Tamagotchi has reached the final level, 6.66!");
    console.log("A mysterious portal opens up, and your Tamagotchi steps through it, disappearing into another dimension...");
    rl.close();
  } else {
    tamagotchi.level++;
    console.log(`Tamagotchi leveled up to level ${tamagotchi.level}`);
    tamagotchi.status.push('happy');
  }
}

function levelUp() {
  tamagotchi.level++;
  console.log(`Tamagotchi leveled up to level ${tamagotchi.level}`);
  tamagotchi.status.push('happy');
}



function playGame() {
  updateStatus();
  rl.question('What do you want to do? (feed, play, sleep, quit): ', (choice) => {
    switch (choice) {
      case 'feed':
        tamagotchi.xp += 10;
        tamagotchi.health += 10;
        tamagotchi.status.push('happy');
        tamagotchi.status = tamagotchi.status.filter((s) => s !== 'hungry');
        break;
      case 'play':
        tamagotchi.xp += 5;
        tamagotchi.mood += 10;
        tamagotchi.status.push('happy');
        tamagotchi.status = tamagotchi.status.filter((s) => s !== 'bored');
        break;
      case 'sleep':
        tamagotchi.xp += 5;
        tamagotchi.health += 20;
        tamagotchi.status.push('happy');
        tamagotchi.status = tamagotchi.status.filter((s) => s !== 'tired');
        break;
      case 'quit':
        if (!hasQuit) {
            console.log("No, please! Don't leave me alone!!");
            tamagotchi.status.push('sad'); 
            hasQuit = true;
            rl.question('Are you really sure you want to leave? (y/n): ', (confirm) => {
              if (confirm.toLowerCase() === 'y') {
                console.log("Okay, I get it. You don't love me...(T ^ T) - Farewell...");
                rl.close();
              } else {
                hasQuit = false;
                playGame();
              }
            });
            return;
          } else {
            console.log("Okay, I get it. You don't love me...(T ^ T) - Farewell...");
            rl.close();
          }
          break;
        default:
          console.log('Invalid choice.');
        }

    tamagotchi.xp--;
    tamagotchi.health--;
    tamagotchi.mood--;class Spawn {
  constructor(name) {
    this.name = name;
    this.mood = 'neutral';
    this.hunger = 0;
    this.tired = 0;
    this.poop = 0;
    this.sick = false;
    this.intelligence = 0;
  }

  updateMood() {
    if (this.hunger >= 5 || this.tired >= 5 || this.poop >= 5 || this.sick) {
      this.mood = 'angry';
    } else if (this.hunger >= 3 || this.tired >= 3 || this.poop >= 3) {
      this.mood = 'sad';
    } else if (this.intelligence >= 5) {
      this.mood = 'happy';
    } else {
      this.mood = 'neutral';
    }
  }

  feed() {
    if (this.hunger > 0) {
      this.hunger--;
      this.updateMood();
      return `${this.name} is fed and happier.`;
    }
    return `${this.name} is not hungry.`;
  }

  putToBed() {
    if (this.tired > 0) {
      this.tired--;
      this.updateMood();
      return `${this.name} is resting and feels better.`;
    }
    return `${this.name} is not tired.`;
  }

  clean() {
    if (this.poop > 0) {
      this.poop--;
      this.updateMood();
      return `${this.name} is clean now.`;
    }
    return `${this.name} doesn't need cleaning.`;
  }

  heal() {
    if (this.sick) {
      this.sick = false;
      this.updateMood();
      return `${this.name} is no longer sick.`;
    }
    return `${this.name} is not sick.`;
  }

  play() {
    this.intelligence++;
    this.updateMood();
    return `${this.name} played and got smarter.`;
  }

  teach() {
    this.intelligence += 3;
    this.updateMood();
    return `${this.name} read a book and gained knowledge.`;
  }

  pat() {
    this.updateMood();
    return `${this.name} is feeling loved.`;
  }

  getStatus() {
    return `
      ${this.name}'s Mood: ${this.mood}
      Hunger: ${this.hunger}
      Tiredness: ${this.tired}
      Poop Level: ${this.poop}
      Intelligence: ${this.intelligence}
      Sick: ${this.sick ? 'Yes' : 'No'}
    `;
  }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to the Infernal Spawn game!');

rl.question('Enter a name for your Infernal Spawn: ', (name) => {
  const spawn = new Spawn(name);

  const gameLoop = () => {
    console.log(spawn.getStatus());
    rl.question(
      'Interact with your Infernal Spawn (feed, clean, play, put to bed, pat, heal, teach, or exit): ',
      (action) => {
        if (action === 'exit') {
          console.log('Goodbye!');
          rl.close();
        } else if (action in spawn) {
          console.log(spawn[action]());
        } else {
          console.log('Invalid action. Try again.');
        }
        gameLoop();
      }
    );
  };

  gameLoop();
});



    checkXP();
    playGame();
  });
}

function displayIntro() {
    console.log("You went to your old neighbor's house in the middle of the night to steal a potato.");
    rl.question("Press enter to continue.", () => {
      console.clear();
      console.log(
        "You are standing outside your neighbor's house, staring at the heavy bulkhead door which leads down to the basement."
      );
      rl.question('It\'s locked. Open door? (y) ', (answer) => {
        if (answer.toLowerCase() === 'y') {
          console.log("With all your strength, you rip off the bulkhead door and toss it aside.");
          rl.question('Look down? (y) ', (answer) => {
            if (answer.toLowerCase() === 'y') {
              console.log("You stare down into the cold darkness.");
              rl.question('Go down to the basement? (y/n) ', (answer) => {
                if (answer.toLowerCase() === 'y') {
                  console.log("You stomp down the stairs as loud as possible to prove to everyone that you are not afraid of the dark.");
                  rl.question('Do you want to look around? (y) ', (answer) => {
                    if (answer.toLowerCase() === 'y') {
                      console.log("Standing in your neighbor's basement, you see a large iron chest which emits a purple glow.");
                      console.log("\"That's where he must be hiding the potato!\", you say to yourself.");
                      rl.question('Open the chest? (y) ', (answer) => {
                        if (answer.toLowerCase() === 'y') {
                          console.log("With a bolt cutter, you open the chest and find an old grimoire in it.");
                          console.log("\"It probably contains information on where he has hidden the potato!\", you think.");
                          rl.question('Open the grimoire? (y) ', (answer) => {
                            if (answer.toLowerCase() === 'y') {
                              console.log("You open the grimoire.");
                              console.log("It contains instructions on how to summon... what looks like... a potato! - no doubt.");

                              playGame();
                            } else {
                              console.log("You decide not to open the grimoire.");

                              playGame();
                            }
                          });
                        } else {
                          console.log("You decide not to open the chest.");

                          playGame();
                        }
                      });
                    } else {
                      console.log("You decide not to look around.");

                      playGame();
                    }
                  });
                } else {
                  console.log("You are scared of the basement. But what's even more frightening is a potato-less life.");
                  console.log("So, with all your might and wetted pants, you enter the basement...");
                  console.log("You stomp down the stairs as loud as possible to prove to everyone that you are not afraid of the dark.");
                  rl.question('Do you want to look around? (y) ', (answer) => {
                    if (answer.toLowerCase() === 'y') {
                      console.log("Standing in your neighbor's basement, you see a large iron chest which emits a purple glow.");
                      console.log("\"That's where he must be hiding the potato!\", you say to yourself.");
                      rl.question('Open the chest? (y) ', (answer) => {
                        if (answer.toLowerCase() === 'y') {
                          console.log("With a bolt cutter, you open the chest and find an old grimoire in it.");
                          console.log("\"It probably contains information on where he has hidden the potato!\", you think.");
                          rl.question('Open the grimoire? (y) ', (answer) => {
                            if (answer.toLowerCase() === 'y') {
                              console.log("You open the grimoire.");
                              console.log("It contains instructions on how to summon... what looks like... a potato! - no doubt.");

                              playGame();
                            } else {
                              console.log("You decide not to open the grimoire.");

                              playGame();
                            }
                          });
                        } else {
                          console.log("You decide not to open the chest.");

                          playGame();
                        }
                      });
                    } else {
                      console.log("You decide not to look around.");

                      playGame();
                    }
                  });
                }
              });
            } else {
              console.log("You decide not to look down.");

              playGame();
            }
          });
        } else {
          console.log("You decide not to open the door.");

          playGame();
        }
      });
    });
  }
  

  displayIntro();