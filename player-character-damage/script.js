let money = 0
let defeated = 0
let damage = 1

let moneyDisplayer = document.querySelector('#money-displayer')
let damageDisplayer = document.querySelector('#damage-displayer')

function updateMD() {
    moneyDisplayer.textContent = `Money: ${money}`
    damageDisplayer.textContent = `Damage: ${damage}`
}

class Upgrade {
    constructor(name, desc, price) {
        this.name = name
        this.desc = desc
        this.price = price
        this.damage = price / 2 + 1 
    }

    buy() {
        money -= this.price
        damage += this.damage
        this.price *= 2
    }
}

let upgrades = []

function createUpgrade(name, desc, price) {
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
        createUpgrade('Cultivate', 'You discover cultivation', 160)
        cultivate = true
    }
    
    updateMD()
}

setInterval(checkUpgrades, 100)


class Target {
    constructor(level) {
        this.drop = level
        this.health = level * 2 + 1
    }

    hit() {
        this.health -= damage
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

let x

function createTarget() {
    let target = new Target(defeated)
    x = target
}
createTarget()

let eletarget = document.querySelector('#target')
eletarget.textContent = x.health
eletarget.addEventListener('click', () => {
    x.hit()
    eletarget.textContent = x.health
})


// the balance is bad

// implement a passive class