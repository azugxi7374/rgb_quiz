(function () {
    const filterFlg = [true, true];
    const colorList = window.jiscolor;

    function validColorList() {
        return colorList.filter(([f3, f2, ...rest]) => {
            return filterFlg[0] && f3 || filterFlg[1] && f2
        }).map((a) => [a[5], a[2], a[6]]); // name, clr, munsell
    }

    function createColorJIS() {
        const list = validColorList();
        if (list.length > 0) {
            const [name, clr, mun] = list[Math.floor(Math.random() * list.length)]
            return [name, clr, mun]
        } else {
            return ["", "#ffffff", ""]
        }
    }

    // view
    function setColorJIS(e1, e2, e3, jisName, rgbstr, mun) {
        e1.style.background = rgbstr;
        e2.innerText = jisName;
        e3.innerText = mun;
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
            if (mode === "JIS") {
                const [name, clr, mun] = createColorJIS();
                setColorJIS(e1, e2, e3, name, clr, mun);
            } else {
                // ERROR
                throw new Error();
            }
            [e1, e3].forEach(e => e.style.opacity = 0);
            // [e2, e3, e4].forEach(e => e.style = "opacity: 0;");
        } else {
            // 回答編
            [e1, e3].forEach(e => e.style.opacity = 1);
            // [e2, e3, e4].forEach(e => e.style = "opacity: 1;");
        }
    }

    function exec() {
        reduce(state);
        state.i++;
    }
    function init() {
        renderColorList();
        addFilterListeners();
        // test();
    }

    document.addEventListener("DOMContentLoaded", () => { init(); exec() });
    document.addEventListener("click", exec);

    function addFilterListeners() {
        ['check3', 'check2'].forEach(id => {
            document.getElementById(id).addEventListener('input', (e) => {
                e.stopPropagation();
                filterFlg[e.target.id === 'check3' ? 0 : 1] = e.target.checked;
                renderColorList();
            })
        });
        const btn = document.querySelector('.clrlist-link');
        const div = document.querySelector('.clrlist');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            div.dataset.visible = !(div.dataset.visible === "true")
        });
    }
    function renderColorList() {
        const div = document.querySelector('.clrlist');
        // const tones = 'p ltg g dkg lt sf d dk b dp v W ltGy mGy dkGy Bk'.split(" ")
        if (div) {
            const clist = validColorList();
            let html = "";
            clist.forEach(([name, clr]) => {
                html += `<div class="clrlist-item"><div class="clrlist-clr" style="color:${clr}">■</div><div class="clrlist-name">${name}</div></div>`
            });
            div.innerHTML = html;
        };
    }

    /*
    function test() {
        const o = {}; toneHues.forEach(([k, v]) => { var t = k.replace(/\d+/, ""); o[t] = o[t] ? o[t] + 1 : 1 })
        const ok1 = Object.keys(o).length === 16
        const ok2 = Object.values(o).reduce((a, b) => a + b) === 137
        if (ok1 && ok2) { return } else {
            throw new Error("test error");
        }
    }
*/

})();

