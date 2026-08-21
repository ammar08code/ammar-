import random
import time
import json
import os

# ==============================
#        PLAYER DATA
# ==============================

player = {
    "name": "",
    "level": 1,
    "exp": 0,
    "hp": 100,
    "max_hp": 100,
    "attack": 15,
    "defense": 5,
    "coins": 50,
    "potions": 3
}

# ==============================
#          ENEMIES
# ==============================

enemies = [
    {
        "name": "Goblin",
        "hp": 40,
        "attack": 8,
        "defense": 2,
        "exp": 20,
        "coins": 15
    },
    {
        "name": "Wolf",
        "hp": 55,
        "attack": 12,
        "defense": 4,
        "exp": 30,
        "coins": 20
    },
    {
        "name": "Orc",
        "hp": 80,
        "attack": 18,
        "defense": 7,
        "exp": 50,
        "coins": 35
    }
]

# ==============================
#          FUNCTIONS
# ==============================

def slow_print(text):
    for character in text:
        print(character, end="", flush=True)
        time.sleep(0.01)
    print()


def show_status():
    print("\n========== STATUS ==========")
    print("Name:", player["name"])
    print("Level:", player["level"])
    print("EXP:", player["exp"])
    print("HP:", player["hp"], "/", player["max_hp"])
    print("Attack:", player["attack"])
    print("Defense:", player["defense"])
    print("Coins:", player["coins"])
    print("Potions:", player["potions"])
    print("============================")


def level_up():
    required_exp = player["level"] * 100

    while player["exp"] >= required_exp:
        player["exp"] -= required_exp
        player["level"] += 1

        player["max_hp"] += 20
        player["attack"] += 5
        player["defense"] += 2

        player["hp"] = player["max_hp"]

        print("\n⭐ LEVEL UP!")
        print("Kau sekarang Level", player["level"])
        print("+20 Max HP")
        print("+5 Attack")
        print("+2 Defense")

        required_exp = player["level"] * 100


def use_potion():
    if player["potions"] <= 0:
        print("Potion kau dah habis!")
        return

    if player["hp"] == player["max_hp"]:
        print("HP kau dah penuh!")
        return

    heal = 40

    player["hp"] += heal

    if player["hp"] > player["max_hp"]:
        player["hp"] = player["max_hp"]

    player["potions"] -= 1

    print("🧪 Kau guna potion!")
    print("HP sekarang:", player["hp"], "/", player["max_hp"])


def battle():
    enemy = random.choice(enemies).copy()

    print("\n================================")
    print("⚔️  ENEMY MUNCUL!")
    print("Enemy:", enemy["name"])
    print("HP:", enemy["hp"])
    print("================================")

    while enemy["hp"] > 0 and player["hp"] > 0:

        print("\n----------------------------")
        print("Kau:", player["hp"], "/", player["max_hp"], "HP")
        print(enemy["name"] + ":", enemy["hp"], "HP")
        print("----------------------------")

        print("1. Attack")
        print("2. Potion")
        print("3. Run")

        choice = input("Apa kau nak buat? ")

        if choice == "1":

            damage = player["attack"] - enemy["defense"]

            if damage < 1:
                damage = 1

            critical = random.randint(1, 5)

            if critical == 1:
                damage *= 2
                print("💥 CRITICAL HIT!")

            enemy["hp"] -= damage

            print("⚔️ Kau menyerang", enemy["name"])
            print("Damage:", damage)

            if enemy["hp"] <= 0:
                print("\n🏆 KAU MENANG!")

                player["exp"] += enemy["exp"]
                player["coins"] += enemy["coins"]

                print("+", enemy["exp"], "EXP")
                print("+", enemy["coins"], "coins")

                level_up()

                return

        elif choice == "2":
            use_potion()

        elif choice == "3":
            chance = random.randint(1, 2)

            if chance == 1:
                print("🏃 Kau berjaya melarikan diri!")
                return
            else:
                print("❌ Tak sempat lari!")

        else:
            print("Pilihan tak sah!")
            continue

        # Enemy attack

        if enemy["hp"] > 0:

            enemy_damage = enemy["attack"] - player["defense"]

            if enemy_damage < 1:
                enemy_damage = 1

            player["hp"] -= enemy_damage

            print(
                "👾",
                enemy["name"],
                "menyerang kau!",
                "Damage:",
                enemy_damage
            )

    if player["hp"] <= 0:
        player["hp"] = 0

        print("\n💀 KAU KALAH!")
        print("Kau kembali ke menu.")

        player["hp"] = player["max_hp"] // 2


def shop():
    while True:

        print("\n========== SHOP ==========")
        print("Coins:", player["coins"])
        print("1. Potion - 20 coins")
        print("2. Upgrade Attack - 50 coins")
        print("3. Upgrade Defense - 50 coins")
        print("4. Keluar")
        print("==========================")

        choice = input("Pilih: ")

        if choice == "1":

            if player["coins"] >= 20:
                player["coins"] -= 20
                player["potions"] += 1
                print("🧪 Potion dibeli!")
            else:
                print("Coins tak cukup!")

        elif choice == "2":

            if player["coins"] >= 50:
                player["coins"] -= 50
                player["attack"] += 3
                print("⚔️ Attack meningkat!")
            else:
                print("Coins tak cukup!")

        elif choice == "3":

            if player["coins"] >= 50:
                player["coins"] -= 50
                player["defense"] += 2
                print("🛡️ Defense meningkat!")
            else:
                print("Coins tak cukup!")

        elif choice == "4":
            break

        else:
            print("Pilihan tak sah!")


def save_game():

    with open("savegame.json", "w") as file:
        json.dump(player, file)

    print("💾 Game berjaya disimpan!")


def load_game():

    global player

    if not os.path.exists("savegame.json"):
        print("❌ Tiada save game!")
        return

    with open("savegame.json", "r") as file:
        player = json.load(file)

    print("💾 Save game berjaya dimuatkan!")


# ==============================
#          MAIN MENU
# ==============================

print("====================================")
print("        ⚔️ PYTHON MINI RPG ⚔️")
print("====================================")

player["name"] = input("Masukkan nama character: ")

while True:

    print("\n================================")
    print("           MAIN MENU")
    print("================================")
    print("1. Explore")
    print("2. Status")
    print("3. Shop")
    print("4. Save Game")
    print("5. Load Game")
    print("6. Keluar")
    print("================================")

    choice = input("Pilih: ")

    if choice == "1":

        print("\n🌲 Kau masuk ke dalam hutan...")
        time.sleep(1)

        battle()

    elif choice == "2":

        show_status()

    elif choice == "3":

        shop()

    elif choice == "4":

        save_game()

    elif choice == "5":

        load_game()

    elif choice == "6":

        print("\nTerima kasih kerana bermain!")
        break

    else:

        print("❌ Pilihan tak sah!")