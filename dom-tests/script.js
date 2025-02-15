const mainContainer = document.querySelector("#main-container");
let countdown = document.querySelector("#countdown");
let countdownValue = document.querySelector("#countdown-value")
let usernameSelector = document.querySelector("#username-selector");
let changeBgImg = document.querySelector("#select") ;
let bgColor = document.querySelector("#bg-color");
let insertPara = document.querySelector("#insert-para");
let paraContent = document.querySelector("#para-content");
let keySoundEffect = document.querySelector("#key-sound-effect");
let hiddenDiv = document.querySelector("#hidden-div");
let appendPoint = document.querySelector("#main-container");
let fadingCountdown = document.querySelector("#fading-countdown");
let dropdown = document.querySelector('.dropdown')
let dropdownMenu = document.querySelector('#dropdown-menu')


// input number and optionally a valid time unit
// time will be displayed in text below in hours : minutes : seconds format 
// text will start to countdown in seconds
// plays random sound from below selection when countdown reaches 0
let currentInterval;
let trainHorn = new Audio("sound/countdown_end/591842__funwithsound__train-horn-48-short.mp3")
let horn = new Audio("sound/countdown_end/608087__funwithsound__horn-15-leslie-short-dissonant.mp3")
function randomReturn() {
    return [trainHorn, horn][Math.floor(Math.random() * 2)];
}
countdown.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        
        let arr = countdown.value.split(" ");
        
        let num = 0;
        
        if (arr[1] === "seconds" || arr[1] === "second" ||arr[1] === "sec" || arr[1] === "s") {
            num = arr[0] * 1000;
        } else if (arr[1] === "minutes" || arr[1] === "minute" || arr[1] === "min" || arr[1] === "m") {
            num = arr[0] * 60000;
        } else if (arr[1] === "hours" || arr[1] === "hour" || arr[1] === "h") {
            num = arr[0] * 3.6e+6;
        } else {
            num = arr[0];
        };

        if (currentInterval) {
            clearInterval(currentInterval);
        };

        currentInterval = setInterval( () => {
            countdownValue.textContent = formatTime(num) ;
            num -= 1000;
            if (num == 0) {
                clearInterval(currentInterval);
                countdownValue.textContent = "00 : 00 : 00";
                randomReturn().play()
            };
        }, 1000);
    };
});

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
};

function pad(number) {
    return number < 10 ? '0' + number : number;
};


// press button, browser prompts for text, enter text, text displayed on screen, 
// button dissapears
usernameSelector.addEventListener("click", () => {
    let username = prompt("Please enter a username to be displayed. Cannot contain spaces:");
    document.querySelector("#username").textContent = username;
    if (username === "" || username.includes(" ")) {inputname(); return;}
    usernameSelector.remove();
});


// dropdown menu of options, when select option, changes background image to that option
changeBgImg.addEventListener("change", () => {
    switch (changeBgImg.value) {
        case "pickle":
            mainContainer.style.backgroundImage = ("url('img/pickle.jpg')");
            break;
        case "chocolate":
            mainContainer.style.backgroundImage = ("url('img/chocolate.jpg')");
            break;
        case "honey-biscuits":
            mainContainer.style.backgroundImage = ("url('img/honey_biscuits.jpg')");
            break;
        default:
            mainContainer.style.backgroundImage = null;
    };
});


// have a browser color picker, when color picker color changes, 
// change background color to that color
bgColor.addEventListener("change", () => {
    mainContainer.style.backgroundColor = bgColor.value;
});


// have button, when click button, browser prompts for text, enter text, display text
// if no text is entered display predetermined text
insertPara.addEventListener("click", () => {
    let text = prompt("Enter some text:");
    paraContent.textContent = text;
    if (text === "") {
        paraContent.textContent = "Please do not be concerned, this is not a virus or malware. It also has nothing to do with the above options; it is merely a way for you to display text that will not save. Nor will it collect your personal information in any way.";
        console.log("Imagine not trusting your own website");
    };
});


// have an area to type text, if text = 1, 2, 3, 4 or 5, 
// play audio assigned to that number
// otherwise play default audio
keySoundEffect.addEventListener("change", (event) => {
    let sound1 = new Audio("sound/keypress1,../160-bpm-industrial-drum-loop.wav");
    let sound2 = new Audio("sound/keypress1,../oberheim-bass.wav");
    let sound3 = new Audio("sound/keypress1,../overall-quality-of-single-note-violin.wav");
    let sound4 = new Audio("sound/keypress1,../percussion-improv-aluminum-can-hit.wav");
    let sound5 = new Audio("sound/keypress1,../wood-impact.wav");
    let sound6 = new Audio("sound/keypress1,../extremely-loud-incorrect-buzzer.mp3");

    switch (keySoundEffect.value) {
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


// press button, text is displayed then slowly fades out
function createAndFadeElement(text, style, delay = 0) {
    setTimeout(() => {
        let element = document.createElement("div");
        element.textContent = text;
        Object.assign(element.style, style);
        appendPoint.appendChild(element);
        fade(element);
    }, delay);
};

function fade(fadeTarget) {
    let initialOpacity = 1;
    let Interval = setInterval( () => {
        if (initialOpacity > 0) {
            initialOpacity -= 0.05;
            fadeTarget.style.opacity = initialOpacity;
        } else {
            clearInterval(Interval);
            fadeTarget.remove();
        }
    }, 75);
};

fadingCountdown.addEventListener("click", () => {
    createAndFadeElement("5", { fontSize: "150px", color: "green", position: "absolute", zIndex: 10, top: "190px", left: "180px" },);
    createAndFadeElement("4", { fontSize: "125px", color: "blue", position: "absolute", zIndex: 10, bottom: "100px", right: "150px" }, 1000);
    createAndFadeElement("3", { fontSize: "100px", color: "yellow", position: "absolute", zIndex: 10, top: "100px", right: "100px" }, 2000);
    createAndFadeElement("2", { fontSize: "75px", color: "orange", position: "absolute", zIndex: 10, bottom: "200px", left: "200px" }, 3000);
    createAndFadeElement("1", { fontSize: "200px", color: "red", position: "absolute", zIndex: 10 }, 4000);
    createAndFadeElement("##---->", { fontSize: "100px", color: "white", position: "absolute", zIndex: 11, left: "100px" }, 5000);
    createAndFadeElement("*", { fontSize: "150px", color: "black", position: "absolute", zIndex: 10, left: "430px", bottom: "170px" }, 5001);
});

dropdown.addEventListener('click', () => {
    if (dropdownMenu.classList.contains('hidden')) {
        dropdownMenu.classList.remove('hidden')
    } else {
        dropdownMenu.classList.add('hidden')
    }
})

/*
function carousel() {
    let imageCarousel = document.querySelector('.image-carousel');
    let image = document.querySelectorAll('.image-carousel div');
        for (let i = 0; i < image.length; i++) {
            console.log(image[i])
            image[i].classList.remove('hidden')
            setTimeout(image[i].classList.add('hidden'), 5000)
        }
}
carousel()
*/