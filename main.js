function createColor() {
    const rgb = [0, 0, 0].map(e => Math.floor(Math.random() * 256))
    return rgb;
}

// view
function setColor(e1, e2, e3, e4, r, g, b) {
    e1.style = `background: rgb(${r}, ${g}, ${b});`
    e2.innerText = `rgb(${r}, ${g}, ${b})`;
    e3.innerText = `#${[r, g, b].map(v => (256 + v).toString(16).slice(-2)).join("")}`
    e4.innerText = `(${[r, g, b].map(v => (v / 256 + 0.05).toString().slice(0, 3)).join(", ")})`
}

var state = {
    i: 0,
}

function reduce(state) {
    const e1 = document.querySelector('.color-box');
    const e2 = document.querySelector('.value-rgb');
    const e3 = document.querySelector('.value-hex');
    const e4 = document.querySelector('.value-rate');
    if (state.i % 2 === 0) {
        const [r, g, b] = createColor();
        setColor(e1, e2, e3, e4, r, g, b);
        [e2, e3, e4].forEach(e => e.style = "opacity: 0;");
    } else {
        [e2, e3, e4].forEach(e => e.style = "opacity: 1;");
    }
}

function exec() {
    reduce(state);
    state.i++;
}

document.addEventListener("DOMContentLoaded", exec);
document.addEventListener("click", exec);



