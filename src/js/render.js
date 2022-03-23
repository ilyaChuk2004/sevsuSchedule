
export function makeDom(j) {
    const w = weeksArr2[j]
    wEl = week.cloneNode(1)
    // debugger
    qs(wEl, ".weekTit").textContent = `для ${weeks[j].match(/\d/g).join('')} недели`
    for (let i = 0; i < w.length; i++) {//days
        const el = w[i];
        if (el.length > 0) {
            let day = qs(wEl, `.d${i + 1}`)
            let comp = new DOMParser().parseFromString(`<div class="comp">
                                                                                <div class="para"></div>
                                                                                <div class="subject"></div>
                                                                                <div class="name"></div>
                                                                                <div class="place"></div>
                                                                                <div class="type"></div>
                                                                            <div>`, "text/html").querySelector('.comp')
            day.querySelector('h2').innerText = `${el[0].Column19[0]}${el[0].Column19.slice(1).toLocaleLowerCase()}`
            for (let i2 = 0; i2 < el.length; i2++) {//pars
                const el2 = el[i2];
                qw(el2, "")
                if (el2.Column22 || el2.Column33 || el2.Column34) {
                    // debugger
                    try {
                        if (parseInt(weeks[j]) == curWeek && weeksArr2[i][i2].length > 0 && new Date().getDay() == i + 1) {
                            comp.classList.add('cur')
                            // console.log('added')
                        } else {
                            // console.log('not today')
                        }
                    } catch (error) {

                    }

                    let re = /( [а-яА-ЯёЁ]+ [А-Я]\.[А-Я]\..*)/
                    // console.log(document.querySelector(`.d${i + 1}`))

                    comp.querySelector('.para').innerText = `${el2.Column20[0]}.`
                    comp.querySelector('.subject').innerText = `${el2.Column33 ? el2.Column33.split(re)[0] : ""} ${el2.Column22 ? el2.Column22.split(re)[0] : ""} ${el2.Column34 ? el2.Column34.split(re)[0] + "(Ⅱ)" : ""}`
                    comp.querySelector('.name').innerText = `${el2.Column33 ? (el2.Column33.split(re)[1] ? el2.Column33.split(re)[1].trim() : "") : ""} ${el2.Column22 ? (el2.Column22.split(re)[1] ? el2.Column22.split(re)[1].trim() : "") : ""} ${el2.Column34 ? (el2.Column34.split(re)[1] ? el2.Column34.split(re)[1].trim() : "") : ""}`
                    try {
                        comp.querySelector('.place').innerText = `${((el2.Column36 != undefined && (el2.Column36 + '').match(/[0-9]/) != null) ? qw((el2.Column36 + '').replace('\n', ' '), "") : "")}`
                    } catch (error) {
                        debugger
                    }
                    comp.querySelector('.type').innerText = `${el2.Column22 ? (el2.Column36 != undefined ? el2.Column36 : qw(el2.Column35, "")) : (el2.Column35 != undefined ? el2.Column35 : "")}`

                    day.innerHTML += comp.outerHTML
                    //     .innerHTML += 
                    // <div class="par">${el2.Column20[0]}. ${el2.Column33.split(/ [а-яА-ЯёЁ]+ [А-Я]\.[А-Я]\./[0]) ?? ""} ${el2.Column22.split(/ [а-яА-ЯёЁ]+ [А-Я]\.[А-Я]\./[0]) ?? ""} ${el2.Column34.split(/ [а-яА-ЯёЁ]+ [А-Я]\.[А-Я]\./[0]) ?? ""} ${("– ") + (el2.Column22 !== undefined ? "" : (el2.Column36 ?? ""))} ${("(" + el2.Column35 + ")") ?? ""}</div>`
                } else {
                    // console.log(el2)
                }
            }
        }

    }
    // console.log(wEl)
    weeksDom.push(wEl)

}

export function dataMake(weekA, jj) {


    oFileIn = 0;
    ppo = [];
    ppn = [];
    ppm = [];
    ppr = [];
    ppr2 = [];
    pfin = [];
    emptyDays = []
    days = [];

    weeksL = workbook.SheetNames.length

    let w = weeks.filter(function (word, index) {
        if (word.match(new RegExp(curWeek))) {
            curWeekI = index
            return true;
        } else {
            return false;
        }
    });

    var XL_row_object = XLSXamu.sheet_to_row_object_array(workbook.Sheets[weekA]);
    ppo = XL_row_object
    // console.log(json_object)




    ////////////////////////////////////////


    oob = [{}, {}]
    oob = oob[Object.keys(oob)[2]]
    let our = []



    // debugger
    for (let i = 0; i < ppo.length; i++) {
        // console.log(oob[i])
        // for (let i2 = 0; i2 < Object.keys(oob[i]).length; i2++) {
        //     // console.log(Object.values(oob[i])[i2])
        //     if (Object.values(oob[i])[i2] == null) {
        //         // console.log(`del ${i} ${i2}` + "Column" + (i2 + 1))
        //         // oob[i]["Column" + (i2 + 1)] = "notnull"
        //     } else {
        //         console.log([Object.values(oob[i])[i2], i, i2])
        //     }
        // }

        ppo[i] = Object.fromEntries(Object.entries(ppo[i]).filter(([_, v]) => v > 1 || v.length > 1));
    }



    let si = 1;
    for (let i = 0; i < ppo.length; i++) {
        // console.log(Object.values(ppo[i]).indexOf("ПИ/б-21-1-о"))
        if (Object.values(ppo[i]).indexOf("ПИ/б-21-1-о") > -1) {
            break

        } else {
            si++
        }
        // console.log(Object.values(ppo[i]).indexOf("ПИ/б-21-1-о"))
        if (Object.keys(ppo[i]).indexOf("__EMPTY_4") > -1 && ppo[i]["__EMPTY_4"].length > 2 && isNaN(parseInt(ppo[i]["__EMPTY_4"]))) {
            debugger
            // emptyDays.push({ title: ppo[i].__EMPTY_4, day: ppo[i].__EMPTY_19 })
        } else { }

    }
    ppo = ppo.slice(si)

    let head;
    //ppn

    head = ppo[0];
    oob = ppo.slice(1)

    for (let i = 0; i < ppo.length; i++) {  ///удаление первой и третей части
        const el = Object.keys(ppo[i]);
        ppn.push({})
        for (let i2 = 0; i2 < Object.keys(ppo[i]).length; i2++) {
            const el2 = Object.keys(ppo[i])[i2];
            // debugger
            if (+el2.split("__EMPTY_")[1] >= 19 && +el2.split("__EMPTY_")[1] <= 36) {//
                ppn[i][`Column${el2.split("__EMPTY_")[1]}`] = Object.values(ppo[i])[i2]
            } else {
                // delete oob[i]["Column" + (i2 + 1)]
            }
        }

    }




    let oom = []
    //ppm
    ppm = ppn
    // for (let i = 0; i < ppn.length; i++) { //удаление пустых пар вообще
    //     const el = Object.values(ppn[i]);
    //     let con = 0;
    //     let start = 0


    //     for (let i2 = 0; i2 < Object.values(ppn[i]).length; i2++) {
    //         const el2 = Object.values(ppn[i])[i2];
    //         // debugger
    //         if (el2 == "ПЗ" || el2 == "ЛЗ" || el2 == "Л" || el2 == "дист" || Object.keys(ppn[i])[i2] == "19") { con++ }
    //         if (el2 == "ВТОРНИК" || el2 == "ПОНЕДЕЛЬНИК" || el2 == "СРЕДА" || el2 == "ЧЕТВЕРГ" || el2 == "ПЯТНИЦА" || el2 == "СУББОТА") {
    //             start = el2;
    //         }
    //     }

    //     if (con) {
    //         // oom.push({ [`${Object.entries(ppn[i])[0]}`]: Object.entries(ppn[i])[1] })
    //         ppm.push(ppn[i])
    //     } else if (start) {
    //         ppm.push({ "Column666": start })
    //     } else {
    //     }

    // }

    //ppr
    let oor = []
    let sub = {
        sub: 33,
        // type: 31,
        place: 36,
        day: 19,
        num: 20,
        subG: 22,
        // placeG: 25,
        sub2: 34,
        type2: 35,
        // place2: 32
    }

    for (let i = 0; i < ppm.length; i++) {
        const el = Object.keys(ppm[i]);
        ppr.push({})
        for (let i2 = 0; i2 < Object.keys(ppm[i]).length; i2++) {
            const el2 = Object.keys(ppm[i])[i2];
            // debugger
            // debugger
            // console.log(Object.entries(ppm[i]), Object.keys(ppm[i]).length)
            if (+el2.split("Column")[1] == sub.sub ||
                // +el2.split("Column")[1] == sub.type ||
                +el2.split("Column")[1] == sub.place ||
                +el2.split("Column")[1] == sub.day ||
                +el2.split("Column")[1] == sub.num ||
                (+el2.split("Column")[1] == sub.subG && (Object.keys(ppm[i]).length <= 4) ||
                    +el2.split("Column")[1] == sub.sub2 ||
                    +el2.split("Column")[1] == sub.type2 ||
                    +el2.split("Column")[1] == 666
                    // (+el2.split("Column")[1] == sub.place2 && !el.includes("Column25"))
                )) {//
                ppr[i][`Column${el2.split("Column")[1]}`] = Object.values(ppm[i])[i2]

            } else {

            }
        }

    }

    let oor2 = []

    for (let i = 0; i < ppr.length; i++) { //удаление пустых пар вообще
        const el = Object.values(ppr[i]);
        let con = 0;


        for (let i2 = 0; i2 < Object.values(ppr[i]).length; i2++) {
            const el2 = Object.values(ppr[i])[i2];
            // debugger
            if (el2 == "ПЗ" || el2 == "ЛЗ" || el2 == "Л" || el2 == "дист" || el2 == "ВТОРНИК" || el2 == "ПОНЕДЕЛЬНИК" || el2 == "СРЕДА" || el2 == "ЧЕТВЕРГ" || el2 == "ПЯТНИЦА" || el2 == "СУББОТА") { con++; break }
        }

        if (con) {
            // oom.push({ [`${Object.entries(ppr[i])[0]}`]: Object.entries(ppr[i])[1] })
            ppr2.push(ppr[i])
        }

    }



    for (let i = 0; i < ppr2.length - 1; i++) {
        // debugger
        const el2 = Object.keys(ppr2[i]);
        if (el2[0] == "Column666") {
            ppr2[i + 1]["Column19"] = Object.values(ppr2[i])[0]
            ppr2.splice(i, 1)
        }
    }


    let fin = []

    for (let i = 0; i < ppr2.length; i++) {
        const el = Object.values(ppr2[i]);
        const elk = Object.keys(ppr2[i]);


        if (elk.includes("Column19") || elk.includes("Column666")) {
            days.push(i)
        }


    }


    let j = 0;
    for (let i = 0; i < days.length; i++) {

        const el = days[i]
        let div = days[i + 1] - el
        pfin[i] = [];
        for (let i2 = 0; i2 < div; i2++) {
            pfin[i].push(ppr2[j])
            j++
        }

    }
    weeksArr2.push(pfin)


    makeDom(jj)


}

export function setTime() {
    // debugger
    setInterval(() => {
        let cSec = () => { return new Date().getSeconds() }
        let cMin = () => { return new Date().getMinutes() }
        let cHou = () => { return new Date().getHours() }
        let cTime = () => { return (cHou() * 60) + cMin() }
        let cTimes = () => { return cTime() * 60 + cSec() }
        var cPar

        time.some((el, i) => {
            let s = (+el.s.split(':')[0] * 60) + (+el.s.split(':')[1])
            let e = (+el.e.split(':')[0] * 60) + (+el.e.split(':')[1])
            let sn = 0;
            try {
                sn = (+time[i + 1].s.split(':')[0] * 60) + (+time[i + 1].s.split(':')[1])
            } catch (error) {

            }
            if (cTime() >= s && cTime() < e) {
                // console.log(i)
                cPar = [el, i,
                    (+el.e.split(':')[0] * 60) + (+el.e.split(':')[1])];
                return 1;
            } else {
                if (cTime() >= e && cTime() < sn) {
                    // console.log('bef', time[i + 1])
                    cPar = [time[i + 1], i + 1,
                    (+time[i + 1].s.split(':')[0] * 60) + (+time[i + 1].s.split(':')[1]),
                        'n'];
                    return 1;
                } else {
                    cPar = [1,
                        1, 1,
                        'o']
                }
            }
        });

        // console.log(cPar)

        // console.log(+(((cPar[1] - cMin) / 60).toFixed())  +":"+   )
        if (!cPar[3]) {

            let sec = ((cPar[2] * 60) - cTimes()) - ((Math.trunc(((cPar[2] * 60) - cTimes()) / 60)) * 60)
            let min = Math.trunc(((cPar[2] * 60) - cTimes()) / 60)

            document.querySelector('.now .tit').innerHTML = `Сейчас идёт <span id="num"></span> пара <img src="" />`
            document.querySelector('.now #end').textContent = ((min + '').length == 1 ? "0" + min : min) + ":" + (
                (sec + '').length == 1 ? "0" + sec : sec
            )
            document.querySelector('.now').classList.add('none')
            document.querySelector('.now #num').textContent = cPar[1] + 1
            document.querySelector('.now #hours').textContent = cPar[0].e
            document.querySelector('.now img').setAttribute('src', 'book.png')

            Array.from(document.querySelectorAll('.comp.cur')).some((el, i) => {
                if (parseInt(el.querySelector('.para').textContent) == cPar[1] + 1) {
                    el.classList.add('this')
                }
            })

            qs(document, '.now').style.flexDirection = ""
        } else if (cPar[3] == 'n') {
            let sec = ((cPar[2] * 60) - cTimes()) - ((Math.trunc(((cPar[2] * 60) - cTimes()) / 60)) * 60)
            let min = Math.trunc(((cPar[2] * 60) - cTimes()) / 60)
            document.querySelector('.now #end').textContent = ((min + '').length == 1 ? "0" + min : min) + ":" + (
                (sec + '').length == 1 ? "0" + sec : sec
            )
            document.querySelector('.now').classList.add('none')
            document.querySelector('.now .tit').innerHTML = "сейчас перерыв <img src='break.png'/>"
            document.querySelector('.now #hours').textContent = cPar[0].e
            qs(document, '.now').style.flexDirection = ""
            try {
                document.querySelector('.comp.this').classList.remove('this')
            } catch (error) {

            }
        } else {
            document.querySelector('.now .tit').innerHTML = "Занятия закончились.. <img style='height: 15pt;' src='zzz.png'/>"
            try {
                document.querySelector('.comp.this').classList.remove('this')
            } catch (error) {

            }
        }
    }, 1000);

}

export var render = {










}