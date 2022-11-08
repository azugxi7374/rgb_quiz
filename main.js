(function () {
    window.mode = window.mode || "RGB"
    const toneHues = (() => {
        // const keys = Object.keys(toneMap).filter(s => 
        let toneHues = Object.entries(toneMap).filter(([k, v]) => {
            const skip = /[-+]|^s\d+|[13579]$/.test(k);
            return !skip
        });
        return toneHues;
    })();
    window.toneHues = toneHues

    function createColor() {
        const rgb = [0, 0, 0].map(e => Math.floor(Math.random() * 256))
        return rgb;
    }
    function createColorPCCS() {
        const [name, clr] = toneHues[Math.floor(Math.random() * toneHues.length)]
        return [name, clr]
    }

    // view
    function setColor(e1, e2, e3, e4, r, g, b) {
        e1.style = `background: rgb(${r}, ${g}, ${b});`
        e2.innerText = `rgb(${r}, ${g}, ${b})`;
        e3.innerText = `#${[r, g, b].map(v => (256 + v).toString(16).slice(-2)).join("")}`
        e4.innerText = `(${[r, g, b].map(v => (v / 256 + 0.05).toString().slice(0, 3)).join(", ")})`
    }

    function setColorPCCS(e1, e2, pccsName, rgbstr) {
        e1.style.background = rgbstr;
        e2.innerText = pccsName;
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
            // 出題編
            // 色生成, viewをrender
            if (mode === "PCCS") {
                const [name, clr] = createColorPCCS();
                setColorPCCS(e1, e2, name, clr);
            } else {
                const [r, g, b] = createColor();
                setColor(e1, e2, e3, e4, r, g, b);
            }
            [e2, e3, e4].forEach(e => e.style = "opacity: 0;");
        } else {
            // 回答編
            [e2, e3, e4].forEach(e => e.style = "opacity: 1;");
        }
    }

    function exec() {
        reduce(state);
        state.i++;
    }
    function init() {
        renderColorList();
        test();
    }

    document.addEventListener("DOMContentLoaded", () => { init(); exec() });
    document.addEventListener("click", exec);

    function renderColorList() {
        const btn = document.querySelector('.clrlist-link');
        const div = document.querySelector('.clrlist');
        // const tones = 'p ltg g dkg lt sf d dk b dp v W ltGy mGy dkGy Bk'.split(" ")
        if (div) {
            let html = "";
            toneHues.forEach(([name, clr]) => {
                html += `<div class="clrlist-item"><div class="clrlist-clr" style="color:${clr}">■</div><div class="clrlist-name">${name}</div></div>`
            });
            div.innerHTML = html;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                div.dataset.visible = !(div.dataset.visible === "true")
            });
        }
    }

    function test() {
        const o = {}; toneHues.forEach(([k, v]) => { var t = k.replace(/\d+/, ""); o[t] = o[t] ? o[t] + 1 : 1 })
        const ok1 = Object.keys(o).length === 16
        const ok2 = Object.values(o).reduce((a, b) => a + b) === 137
        if (ok1 && ok2) { return } else {
            throw new Error("test error");
        }
    }

})();

