let money = 0
let defeated = 0
let damage = 1
let passiveDamage = 0

let moneyDisplayer = document.querySelector('#money-displayer')
let damageDisplayer = document.querySelector('#damage-displayer')
let passiveDamageDisplayer = document.querySelector('#passive-damage-displayer')
let defeatedDisplayer = document.querySelector('#defeated-displayer')

function updateMD() {
    moneyDisplayer.textContent = `Money: ${money}`
    damageDisplayer.textContent = `Damage: ${damage}`
    passiveDamageDisplayer.textContent = `Passive Damage: ${passiveDamage}`
    defeatedDisplayer.textContent = `Targets Defeated: ${defeated}`
}

class Upgrade {
    constructor(name, desc, price) {
        this.name = name
        this.desc = desc
        this.price = price
        this.damage = Math.round(price / 2 + 1)
    }

    buy() {
        money -= this.price
        damage += this.damage
        this.price *= 2
    }
}

class passiveUpgrade {
    constructor(name, desc, price) {
        this.name = name
        this.desc = desc
        this.price = price
        this.damage = Math.round(price / 100 + 1)
    }

    buy() {
        money -= this.price
        passiveDamage += this.damage
        this.price *= 2
    }
}

let upgrades = []

function createUpgrade(name, desc, price, passive) {
    let append = document.querySelector('.upgrades')
    let container = document.createElement('div')
    container.classList.add('upgrade-container')
    append.appendChild(container)

    let upgradeName = document.createElement('h3')
    upgradeName.textContent = name
    container.appendChild(upgradeName)

    let upgradeDescription = document.createElement('p')
    upgradeDescription.textContent = desc
    container.appendChild(upgradeDescription)

    let upgradePrice = document.createElement('p')
    upgradePrice.textContent = `$${price}`
    container.appendChild(upgradePrice)

    let upgradeBtn = document.createElement('button')
    upgradeBtn.textContent = 'Buy'
    container.appendChild(upgradeBtn)

    let upgrade = new Upgrade(name, desc, price)
    
    if (passive) {
        upgrade = new passiveUpgrade(name, desc, price)
    }

    upgrades.push({ upgrade, container, upgradePrice, upgradeBtn })

    upgradeBtn.addEventListener('click', () => {
        if (money >= upgrade.price) {
            upgrade.buy()
            upgradePrice.textContent = `$${upgrade.price}`
            upgradeBtn.disabled = true
        }
    })
}

createUpgrade('Stick', 'A stick', 1)

let stone = false
let flower = false
let tooth = false
let hug = false
let cultivate = false

function checkUpgrades() {
    upgrades.forEach(({ upgrade, container, upgradePrice, upgradeBtn }) => {
        if (money >= upgrade.price) {
            upgradeBtn.disabled = false
        } else {
            upgradeBtn.disabled = true
        }
    })

    if (money >= 10 && !stone) {
        createUpgrade('Stone', 'A stone', 10)
        stone = true
    } else if (money >= 20 && !flower) {
        createUpgrade('Flower', 'A flower', 20)
        flower = true
    } else if (money >= 40 && !tooth) {
        createUpgrade('Tooth', 'A tooth', 40)
        tooth = true
    } else if (money >= 80 && !hug) {
        createUpgrade('Hug', 'A hug', 80)
        hug = true
    } else if (money >= 160 && !cultivate) {
        createUpgrade('Cultivate', 'You discover cultivation', 160, true)
        cultivate = true
    }
    
    updateMD()

    updateDamage(true)
}

setInterval(checkUpgrades, 100)

function updateDamage(passive) {
    x.hit(passive)
    eletarget.textContent = x.health
}

class Target {
    constructor(level) {
        this.drop = level
        this.health = level * 2 + 1
    }

    hit(passive) {
        if (passive) {
            this.health -= passiveDamage
        } else {
            this.health -= damage
        }
        this.targetDefeated()
    }

    targetDefeated() {
        if (this.health <= 0) {
            defeated += 1
            money += this.drop + 1
            createTarget()
        }
    }
}
let eletarget = document.querySelector('#target')

let x = null

function createTarget() {
    let target = new Target(defeated % 10 == 0 ? defeated * 5 : defeated)
    x = target

    if (defeated % 10 == 0 && defeated != 0) {
        eletarget.classList.add('boss')
    } else if (eletarget.classList.contains('boss')) {
        eletarget.classList.remove('boss')
    }
}
createTarget()


eletarget.textContent = x.health
eletarget.addEventListener('click', () => {updateDamage(false)})


// have to do something about the damage of upgrades