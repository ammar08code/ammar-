const sections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => {
    observer.observe(section);
});
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
function toggleMenu() {
    const menu = document.getElementById("nav-menu");

    menu.classList.toggle("active");
}
// =========================
// RPG GAME
// =========================

let gamePlayer = {
    name: "AMMAR",
    level: 1,
    exp: 0,
    hp: 100,
    maxHp: 100,
    attack: 15,
    defense: 5,
    coins: 50,
    potions: 3
};

const enemies = [
    {
        name: "Goblin",
        hp: 40,
        attack: 8,
        defense: 2,
        exp: 20,
        coins: 15
    },
    {
        name: "Wolf",
        hp: 55,
        attack: 12,
        defense: 4,
        exp: 30,
        coins: 20
    },
    {
        name: "Orc",
        hp: 80,
        attack: 18,
        defense: 7,
        exp: 50,
        coins: 35
    }
];

let currentEnemy = null;


// OPEN GAME

function openGame() {

    document.getElementById("game-section").scrollIntoView({
        behavior: "smooth"
    });

    updateGameUI();

    message("🌲 Press Explore to find an enemy!");
}


// CLOSE GAME

function closeGame() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// MESSAGE

function message(text) {

    document.getElementById("game-message").textContent = text;
}


// EXPLORE

function exploreGame() {

    if (gamePlayer.hp <= 0) {
        message("💀 You need to recover first!");
        return;
    }

    currentEnemy =
        enemies[Math.floor(Math.random() * enemies.length)];

    document.getElementById("enemy-area").style.display = "block";

    updateGameUI();

    message("⚔️ An enemy appeared!");
}


// ATTACK

function attackEnemy() {

    if (!currentEnemy) {
        message("🌲 Explore first!");
        return;
    }

    let damage =
        gamePlayer.attack - currentEnemy.defense;

    if (damage < 1) {
        damage = 1;
    }

    const critical =
        Math.floor(Math.random() * 5) + 1;

    if (critical === 1) {

        damage *= 2;

        message("💥 CRITICAL HIT! Damage: " + damage);

    } else {

        message("⚔️ You dealt " + damage + " damage!");
    }

    currentEnemy.hp -= damage;

    if (currentEnemy.hp <= 0) {

        enemyDefeated();

        return;
    }

    enemyAttack();
    updateGameUI();
}


// ENEMY ATTACK

function enemyAttack() {

    let damage =
        currentEnemy.attack - gamePlayer.defense;

    if (damage < 1) {
        damage = 1;
    }

    gamePlayer.hp -= damage;

    if (gamePlayer.hp < 0) {
        gamePlayer.hp = 0;
    }

    message(
        "👾 " +
        currentEnemy.name +
        " attacked you for " +
        damage +
        " damage!"
    );

    if (gamePlayer.hp <= 0) {

        gamePlayer.hp =
            Math.floor(gamePlayer.maxHp / 2);

        currentEnemy = null;

        document.getElementById("enemy-area")
            .style.display = "none";

        message(
            "💀 You lost! HP recovered to half."
        );
    }

    updateGameUI();
}


// ENEMY DEFEATED

function enemyDefeated() {

    gamePlayer.exp += currentEnemy.exp;

    gamePlayer.coins += currentEnemy.coins;

    message(
        "🏆 You defeated " +
        currentEnemy.name +
        "! +" +
        currentEnemy.exp +
        " EXP, +" +
        currentEnemy.coins +
        " Coins"
    );

    currentEnemy = null;

    document.getElementById("enemy-area")
        .style.display = "none";

    levelUp();

    updateGameUI();
}


// LEVEL UP

function levelUp() {

    let requiredExp =
        gamePlayer.level * 100;

    if (gamePlayer.exp >= requiredExp) {

        gamePlayer.exp -= requiredExp;

        gamePlayer.level++;

        gamePlayer.maxHp += 20;

        gamePlayer.attack += 5;

        gamePlayer.defense += 2;

        gamePlayer.hp =
            gamePlayer.maxHp;

        message(
            "⭐ LEVEL UP! You are now Level " +
            gamePlayer.level +
            "!"
        );
    }
}


// POTION

function usePotionGame() {

    if (gamePlayer.potions <= 0) {

        message("🧪 No potions left!");

        return;
    }

    if (gamePlayer.hp === gamePlayer.maxHp) {

        message("❤️ HP is already full!");

        return;
    }

    gamePlayer.hp += 40;

    if (gamePlayer.hp > gamePlayer.maxHp) {
        gamePlayer.hp = gamePlayer.maxHp;
    }

    gamePlayer.potions--;

    message("🧪 Potion used!");
    updateGameUI();
}


// RUN

function runAway() {

    if (!currentEnemy) {

        message("🌲 There is nothing to run from!");

        return;
    }

    const chance =
        Math.floor(Math.random() * 2) + 1;

    if (chance === 1) {

        message("🏃 You escaped!");

        currentEnemy = null;

        document.getElementById("enemy-area")
            .style.display = "none";

    } else {

        message("❌ You failed to escape!");

        enemyAttack();
    }

    updateGameUI();
}


// SHOP

function openShop() {

    document.getElementById("shop-panel")
        .style.display = "block";
}

function closeShop() {

    document.getElementById("shop-panel")
        .style.display = "none";
}


// BUY POTION

function buyPotion() {

    if (gamePlayer.coins < 20) {

        message("💰 Not enough coins!");

        return;
    }

    gamePlayer.coins -= 20;

    gamePlayer.potions++;

    message("🧪 Potion purchased!");

    updateGameUI();
}


// UPGRADE ATTACK

function upgradeAttack() {

    if (gamePlayer.coins < 50) {

        message("💰 Not enough coins!");

        return;
    }

    gamePlayer.coins -= 50;

    gamePlayer.attack += 3;

    message("⚔️ Attack increased!");

    updateGameUI();
}


// UPGRADE DEFENSE

function upgradeDefense() {

    if (gamePlayer.coins < 50) {

        message("💰 Not enough coins!");

        return;
    }

    gamePlayer.coins -= 50;

    gamePlayer.defense += 2;

    message("🛡️ Defense increased!");

    updateGameUI();
}


// SAVE

function saveGame() {

    localStorage.setItem(
        "ammarRPG",
        JSON.stringify(gamePlayer)
    );

    message("💾 Game saved!");
}


// LOAD

function loadGame() {

    const saved =
        localStorage.getItem("ammarRPG");

    if (!saved) {

        message("❌ No save game found!");

        return;
    }

    gamePlayer =
        JSON.parse(saved);

    message("💾 Game loaded!");

    updateGameUI();
}


// UPDATE UI

function updateGameUI() {

    document.getElementById("player-name")
        .textContent = gamePlayer.name;

    document.getElementById("level")
        .textContent = gamePlayer.level;

    document.getElementById("exp")
        .textContent = gamePlayer.exp;

    document.getElementById("hp")
        .textContent = gamePlayer.hp;

    document.getElementById("max-hp")
        .textContent = gamePlayer.maxHp;

    document.getElementById("attack")
        .textContent = gamePlayer.attack;

    document.getElementById("defense")
        .textContent = gamePlayer.defense;

    document.getElementById("coins")
        .textContent = gamePlayer.coins;

    document.getElementById("potions")
        .textContent = gamePlayer.potions;

    if (currentEnemy) {

        document.getElementById("enemy-name")
            .textContent = "👾 " + currentEnemy.name;

        document.getElementById("enemy-hp")
            .textContent = Math.max(
                currentEnemy.hp,
                0
            );
    }
}