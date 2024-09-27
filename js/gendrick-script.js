let xp = 0;
let health = 100;
let coin = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Bâton"];


const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const coinText = document.querySelector("#coinText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weaponText = document.querySelector("#weaponText")
const weapons = [
  { name: 'Bâton', power: 5 },
  { name: 'Fouet', power: 30 },
  { name: 'Marteau', power: 50 },
  { name: 'Sabre', power: 100 }
];

const monsters = [
  {
    name: "Ratanas",
    level: 2,
    health: 15
  },
  {
    name: "Squelette",
    level: 8,
    health: 60
  },
  {
    name: "Roi Usurpateur",
    level: 20,
    health: 300
  }
];

const locations = [
  {
    name: "village",
    "button text": ["Aller voir le marchand", "Explorer le donjon", "Affronter le Roi Usurpateur"],
    "button functions": [goMarchand, goDonjon, fightRoi],
    text: function(){ 
      if (hasVisitedAnyLocation){
      return "Vous entrez dans le village. Vous apercevez un écriteau indiquant \"Marchand\". Plus loin se trouve le donjon. Vous devriez y aller avant de vouloir affronter le Roi Usurpateur.";
    } else {
      return "\"Jeune homme... Mon nom est Gendrick, ancien roi usurpé du trône qui m'a été légué par mes ancêtres. Pénètre le donjon. Cherche la Force. Tu réussiras à vaincre celui qui m'a tout pris. Deviens le nouveau Roi !\"";
    }
  },
    music: "https://github.com/LiiamD/The-Legend-of-Gendrick/raw/refs/heads/main/src/audio/village.mp3",
    background: "https://raw.githubusercontent.com/LiiamD/The-Legend-of-Gendrick/refs/heads/main/src/image/background_castle.jpg",
  },
  {
    name: "marchand",
    "button text": ["10 PV (10 Coin)", "Arme (30 Coin)", "Retourner au village"],
    "button functions": [buyHealth, buyWeapon, goVillage],
    text: "Vous entrez chez Léon le marchand.",
    music: "https://github.com/LiiamD/The-Legend-of-Gendrick/raw/refs/heads/main/src/audio/marchand.mp3",
    background: "https://raw.githubusercontent.com/LiiamD/The-Legend-of-Gendrick/refs/heads/main/src/image/marchandV2.png"
  },
  {
    name: "donjon",
    "button text": ["Attaquer Ratanas", "Attaquer Squelette", "Retourner au village"],
    "button functions": [fightRatanas, fightSquelette, goVillage],
    text: "Vous pénétrez dans le donjon. Attention ! Des monstres y rôdent !",
    music: "https://github.com/LiiamD/The-Legend-of-Gendrick/raw/refs/heads/main/src/audio/donjon.mp3",
    background: "https://raw.githubusercontent.com/LiiamD/The-Legend-of-Gendrick/refs/heads/main/src/image/donjonV3.png"
  },
  {
    name: "combat",
    "button text": ["Attaque !", "Esquive !", "Fuite !"],
    "button functions": [attack, dodge, goVillage],
    text: function() {
      if (isFightingRoi){
     return "Vous affrontez le Roi Usurpateur !";
    } else {
      return "Vous affrontez un monstre !";
    }
     }, 
    music: "https://github.com/LiiamD/The-Legend-of-Gendrick/raw/refs/heads/main/src/audio/combat.mp3",
    background: "https://raw.githubusercontent.com/LiiamD/The-Legend-of-Gendrick/refs/heads/main/src/image/combatv3.png",
  },
  {
    name: "victoire",
    "button text": ["Rentrer au village", "Rentrer au village", "Rentrer au village"],
    "button functions": [goVillage, goVillage, easterEgg],
    text: "Vous avez vaincu le monstre ! Vous avez gagné des points de XP ainsi que des Coin !",
    music: "https://github.com/LiiamD/The-Legend-of-Gendrick/raw/refs/heads/main/src/audio/victoire.mp3",
    background: "https://raw.githubusercontent.com/LiiamD/The-Legend-of-Gendrick/refs/heads/main/src/image/victoire.png"
  },
  {
    name: "game over",
    "button text": ["REJOUER ?", "REJOUER ?", "REJOUER ?"],
    "button functions": [restart, restart, restart],
    text: "Vous êtes mort. &#x2620;",
    music: "https://github.com/LiiamD/The-Legend-of-Gendrick/raw/refs/heads/main/src/audio/game_over.mp3",
    background: "https://raw.githubusercontent.com/LiiamD/The-Legend-of-Gendrick/refs/heads/main/src/image/game_over.png"
  },
  { 
    name: "game complete", 
    "button text": ["REJOUER ?", "REJOUER ?", "REJOUER ?"], 
    "button functions": [restart, restart, restart], 
    text: "Jeune homme... Tu as battu le despote qui s'est emparé de mon trône... Dorénavant, tu es officiellement... le nouveau Roi !",
    music: "https://github.com/LiiamD/The-Legend-of-Gendrick/raw/refs/heads/main/src/audio/game_complete.mp3",
    background: "https://raw.githubusercontent.com/LiiamD/The-Legend-of-Gendrick/refs/heads/main/src/image/game_complete.png"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Rentrer au village ?"],
    "button functions": [pickTwo, pickEight, goVillage],
    text: "\"Jeune homme... Choisis un des deux numéros au-dessus. Dix numéros seront aléatoirement choisis entre 0 et 10. Si le numéro que tu as choisi correspond à l'un des 10 numéros aléatoires. Tu gagneras un gros lot !\"",
    music: "https://github.com/LiiamD/The-Legend-of-Gendrick/raw/refs/heads/main/src/audio/easter_egg.mp3",
    background: "https://raw.githubusercontent.com/LiiamD/The-Legend-of-Gendrick/refs/heads/main/src/image/easter_egg.png"
  }
];

let hasVisitedAnyLocation = false;
let isFightingRoi = false;


// initialize buttons
button1.onclick = goMarchand;
button2.onclick = goDonjon;
button3.onclick = fightRoi;

const playButton = document.getElementById('playButton');
const titleScreen = document.getElementById('titleScreen');
const gameScreen = document.getElementById('gameScreen');
const audioElement = document.getElementById('maMusique');
const menuTheme = document.querySelector('.menuTheme');

//Fonction pour démarrer l'audio du dialogue de Gendrick quand on clique dans le menu du début du jeu
window.addEventListener('load', () => {
  menuTheme.play().catch(error => {
    console.error("Erreur lors de la lecture de la musique :", error);
  });
});

// Événement clique de la souris pour désactiver le mute
document.addEventListener('click', () => {
  menuTheme.muted = false; // Désactiver le mute
  menuTheme.play(); // Essayer de jouer la musique
  document.removeEventListener('click', arguments.callee); // Supprimer l'écouteur après la première activation
});


// Fonction pour démarrer le jeu (après avoir cliqué sur "Play")
playButton.addEventListener('click', function() {
  // Masquer l'écran titre et afficher le jeu
  titleScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  
  //renvoie au village après avoir cliqué sur "Play"
  goVillage();
});

//fonction permettant d'assigner un role spécifique pour chaque bouton selon la location
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  text.innerHTML = typeof location.text === 'function' ? location.text() : location.text;

  // Changer la musique selon la scène
  if (location.music) {
    audioElement.src = location.music;  // Changer la source audio
    audioElement.play().catch(function(error) {
      console.log('Lecture audio bloquée :', error);
    });
  }

  // Changer l'arrière-plan selon la scène
  if (location.background) {
    document.body.style.backgroundImage = `url(${location.background})`;  // Appliquer l'image de fond
    document.body.style.backgroundSize = 'cover';  // Pour couvrir tout l'écran
  }

}

function goVillage() {
  update(locations[0]);
  hasVisitedAnyLocation = true;
}

function goMarchand() {
  update(locations[1]);
}

function goDonjon() {
  update(locations[2]);
}

function buyHealth() {
  if (coin >= 10) {
    coin -= 10;
    health += 10;
    coinText.innerText = coin;
    healthText.innerText = health;
  } else {
    text.innerText = "Revenez quand vous aurez un peu plus riche...";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (coin >= 30) {
      coin -= 30;
      currentWeapon++;
      coinText.innerText = coin;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Vous avez maintenant le " + newWeapon + ".";
      inventory.push(newWeapon);
      weaponText.innerText = weapons[currentWeapon].name;
      text.innerText += " Vous avez dans votre inventaire : " + inventory;
    } else {
      text.innerText = "Désolé mais la maison ne fait pas crédit...";
      weaponText.innerText = weapons[currentWeapon].name;
    }
  } else {
    text.innerText = "Vous possédez déja l'arme la plus puissante !";
    button2.innerText = "Vendre une arme pour 15 Coin";
    button2.onclick = sellWeapon;
    weaponText.innerText = weapons[currentWeapon].name;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    coin += 15;
    coinText.innerText = coin;
    let currentWeapon = inventory.shift();
    text.innerText = "Vous avez vendu le " + currentWeapon + ".";
    text.innerText += " Vous avez dans votre inventaire : " + inventory;
  } else {
    text.innerText = "Ne vendez pas votre seule arme pour vous défendre !";
  }
}

function fightRatanas() {
  fighting = 0;
  goFight();
  isFightingRoi = false;
  update(locations.find(location => location.name === "combat")); 
  showMonsterStats();
}

function fightSquelette() {
  fighting = 1;
  goFight();
  isFightingRoi = false;
  update(locations.find(location => location.name === "combat"));
  showMonsterStats();
}

function fightRoi() {
  fighting = 2;
  goFight();
  isFightingRoi = true;
  update(locations.find(location => location.name === "combat"));
  showMonsterStats();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function showMonsterStats(){
  monsterStats.style.display = "block";
}

function attack() {
  text.innerText = "Le " + monsters[fighting].name + " attaque !";
  text.innerText += " Vous l'attaquez avec votre " + weapons[currentWeapon].name + " !";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Dommage vous l'avez raté !";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Malheureusement votre " + inventory.pop() + " vient de se briser...";
    currentWeapon--;
    weaponText.innerText = weapons[currentWeapon].name;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Vous avez réussi à esquiver le coup du " + monsters[fighting].name;
}

function defeatMonster() {
  coin += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  coinText.innerText = coin;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  coin = 50;
  currentWeapon = 0;
  inventory = ["Bâton"];
  coinText.innerText = coin;
  healthText.innerText = health;
  xpText.innerText = xp;

location.reload();
}



function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Vous avez choisi " + guess + ". Voici les numéros aléatoires :\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Bien joué ! Vous avez gagné 20 Coin";
    coin += 20;
    coinText.innerText = coin;
  } else {
    text.innerText += "Dommage ! Vous avez perdu 10 PV";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

