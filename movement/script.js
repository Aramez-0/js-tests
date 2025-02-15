let position = {x: 0, y: 0}

function createItems() {
    const container = document.querySelector('#container');
    let x = 0
    for (let i = 0; i < 100; i++) {
        let item = document.createElement('div');
        let y = 0
        
        if (i === 0) {
            item.classList.add('item1');
        } else {
            item.classList.add('item0');
        };
        
        y = i % 10

        if (y === (0) && i !== 0) {
            x++
        }

        item.classList.add(`x${x}`)
        item.classList.add(`y${y}`)

        container.appendChild(item);
    };
};
createItems();

function item2() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let item = document.querySelector(`.x${x}.y${y}`)
    item.classList.add('item2')
}
item2()

const keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

function handleKey(e) {
    switch (e.keyCode) {
      case keys.left:
        position.y--;
        break;
      case keys.up:
        position.x--;
        break;
  
      case keys.right:
        position.y++;
        break;
  
      case keys.down:
        position.x++;
        break;
    }


    if (position.x < 0) position.x = 0
    if (position.x > 9) position.x = 9
    if (position.y < 0) position.y = 0
    if (position.y > 9) position.y = 9
    
    let item = document.querySelector(`.x${position.x}.y${position.y}`);
    let previous = document.querySelector('.item1')
    
    previous.classList.add('item0')
    previous.classList.remove('item1')
    item.classList.add('item1')
    item.classList.remove('item0')
}

window.addEventListener('keydown', handleKey)

