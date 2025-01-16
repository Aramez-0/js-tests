/*let timeleft = 1000000;
setInterval(function countDown() {
    document.querySelector("#countdown").textContent = timeleft -= 1;
}, 1000);*/

const html = document.querySelector("html");

let usernameSelector = document.querySelector("#username-selector");
usernameSelector.addEventListener("click", () => {
    let username = prompt("Please enter a username to be displayed. Cannot contain spaces:");
    document.querySelector("#username").textContent = username;
    
    if (username === "" || username.includes(" ")) {
        inputname();
        return;
    };
    usernameSelector.remove();
});

let changeBgImg = document.querySelector("#select") ;
changeBgImg.addEventListener("change", () => {
    
    switch (changeBgImg.value) {
        case "pickle":
            html.style.backgroundImage = ("url('img/pickle.jpg')");
            break;
        case "chocolate":
            html.style.backgroundImage = ("url('img/chocolate.jpg')");
            break;
        case "honey-biscuits":
            html.style.backgroundImage = ("url('img/honey_biscuits.jpg')");
            break;
        default:
            html.style.backgroundImage = null;
    };
});

let bgColor = document.querySelector("#bg-color");
bgColor.addEventListener("change", () => {
    html.style.backgroundColor = bgColor.value;
});

const insertPara = document.querySelector("#insert-para");
insertPara.addEventListener("click", () => {
    const paraContent = document.querySelector("#para-content");
    const text = prompt("Enter some text:");
    paraContent.textContent = text;

    if (text === "") {
        paraContent.textContent = "Please do not be concerned, this is not a virus or malware. It also has nothing to do with the above options; it is merely a way for you to display text that will not save. Nor will it collect your personal information in any way.";
        console.log("Imagine not trusting your own website");
    };
});

let sound1 = new Audio("sound/160-bpm-industrial-drum-loop.wav");
let sound2 = new Audio("sound/oberheim-bass.wav");
let sound3 = new Audio("sound/overall-quality-of-single-note-violin.wav");
let sound4 = new Audio("sound/percussion-improv-aluminum-can-hit.wav");
let sound5 = new Audio("sound/wood-impact.wav");
let sound6 = new Audio("sound/extremely-loud-incorrect-buzzer.mp3");

let keySoundEffect = document.querySelector("#key-sound-effect");
keySoundEffect.addEventListener("keypress", (event) => {
    switch (event.key) {
        case "1":
            sound1.play();
            break;
        case "2":
            sound2.play();
            break;
        case "3":
            sound3.play();
            break;
        case "4":
            sound4.play();
            break;
        case "5":
            sound5.play();
            break;
        default:
            sound6.play();
    };
});

let hiddenDiv = document.querySelector("#hidden-div");
hiddenDiv.addEventListener("mouseover", (event) => {
    hiddenDiv.style.visibility = "hidden";
});
hiddenDiv.addEventListener("mouseout", (event) => {
    hiddenDiv.style.visibility = "visible";
});

let fadingCountdown = document.querySelector("#fading-countdown");
let appendPoint = document.querySelector("#main-container")
fadingCountdown.addEventListener("click", (event) => {
    let five = document.createElement("div")
    five.textContent = "5"
    five.style.fontSize = "150px"
    five.style.color = "green"
    five.style.position = "absolute"
    five.style.zIndex = "10"
    five.style.top = "180px"
    five.style.left = "180px"
    appendPoint.appendChild(five)
    let fiveOpacity = five.style.opacity = "1";
    let fiveInterval = setInterval( () => {
        if (fiveOpacity > 0) {
           fiveOpacity -= 0.05;
           five.style.opacity = fiveOpacity;
        } else {
            clearInterval(fiveInterval)
            five.remove()
        }
    }, 75);
    setTimeout( () => {
        let four = document.createElement("div")
        four.textContent = "4"
        four.style.fontSize = "125px"
        four.style.color = "blue"
        four.style.position = "absolute"
        four.style.zIndex = "10"
        four.style.bottom = "100px"
        four.style.right = "150px"
        appendPoint.appendChild(four)
        let fourOpacity = four.style.opacity = "1";
        let fourInterval = setInterval( () => {
            if (fourOpacity > 0) {
                fourOpacity -= 0.05;
                four.style.opacity = fourOpacity;
            } else {
                clearInterval(fourInterval)
                four.remove()
            }
        }, 75);
    }, 1000);
    setTimeout( () => {
        let three = document.createElement("div")
        three.textContent = "3"
        three.style.fontSize = "100px"
        three.style.color = "yellow"
        three.style.position = "absolute"
        three.style.zIndex = "10"
        three.style.top = "100px"
        three.style.right = "100px"
        appendPoint.appendChild(three)
        let threeOpacity = three.style.opacity = "1";
        let threeInterval = setInterval( () => {
            if (threeOpacity > 0) {
                threeOpacity -= 0.05;
                three.style.opacity = threeOpacity;
            } else {
                clearInterval(threeInterval)
                three.remove()
            }
        }, 75);
    }, 2000);
    setTimeout( () => {
        let two = document.createElement("div")
        two.textContent = "2"
        two.style.fontSize = "75px"
        two.style.color = "orange"
        two.style.position = "absolute"
        two.style.bottom = "200px"
        two.style.left = "200px"
        appendPoint.appendChild(two)
        let twoOpacity = two.style.opacity = "1";
        let twoInterval = setInterval( () => {
            if (twoOpacity > 0) {
                twoOpacity -= 0.05;
                two.style.opacity = twoOpacity;
            } else {
                clearInterval(twoInterval)
                two.remove()
            }
        }, 75);
    }, 3000);
    setTimeout( () => {
        let one = document.createElement("div")
        one.textContent = "1"
        one.style.fontSize = "200px"
        one.style.color = "red"
        one.style.position = "absolute"
        one.style.zIndex = "10"
        appendPoint.appendChild(one)
        let oneOpacity = one.style.opacity = "1";
        let oneInterval = setInterval( () => {
            if (oneOpacity > 0) {
                oneOpacity -= 0.05;
                one.style.opacity = oneOpacity;
            } else {
                clearInterval(oneInterval)
                one.remove()
            }
        }, 75);
    }, 4000);
    setTimeout( () => {
        let arrow = document.createElement("div")
        arrow.textContent = "##---->"
        arrow.style.fontSize = "100px"
        arrow.style.color = "white"
        arrow.style.position = "absolute"
        arrow.style.zIndex = "11"
        arrow.style.left = "100px"
        appendPoint.appendChild(arrow)
        let arrowOpacity = arrow.style.opacity = "1";
        let arrowInterval = setInterval( () => {
            if (arrowOpacity > 0) {
                arrowOpacity -= 0.05;
                arrow.style.opacity = arrowOpacity;
            } else {
                clearInterval(arrowInterval)
                arrow.remove()
            }
        }, 75);
    }, 5000);
    setTimeout( () => {
        let mark = document.createElement("div")
        mark.textContent = "*"
        mark.style.fontSize = "150px"
        mark.style.color = "black"
        mark.style.position = "absolute"
        mark.style.zIndex = "10"
        mark.style.left = "430px"
        mark.style.bottom = "170px"
        appendPoint.appendChild(mark)
        let markOpacity = mark.style.opacity = "1";
        let markInterval = setInterval( () => {
            if (markOpacity > 0) {
                markOpacity -= 0.05;
                mark.style.opacity = markOpacity;
            } else {
                clearInterval(markInterval)
                mark.remove()
            }
    }, 90);
    }, 5000)
});