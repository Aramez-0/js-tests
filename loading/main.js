let position = 1
// const pre = document.querySelector("#container pre")

function main() {
    let s = ''
    s += "##############\n"

    s += loadBar()

    s += "##############\n"
    console.log(s)
    // pre.textContent = s
}

function loadBar() {
    let bar = ''

    for (let i = 0; i < 14; i++) {
        if (i == 0 || i == 13 || i < /* == */ position) {
            bar += "#"
        } else {
            bar  += "/"
        }
    }
    return `${bar}\n`
}

setInterval(() => {
    console.clear()
    if (position > 13) {
        position = 1
    }
    main()
    position += 1
}, 400)