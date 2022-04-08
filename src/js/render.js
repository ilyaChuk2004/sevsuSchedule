
export function makeDom(j) {
    // const w = weeksArr2[j]
    const w = nee2[j]

    wEl = week.cloneNode(1)
    // debugger
    qs(wEl, ".weekTit").textContent = `для ${weeks[j].match(/\d/g).join('')} недели`
    for (let i = 0; i < w.length; i++) {//days
        const el = w[i];
        if (el.length > 0 && i+1<7) {
            let day = qs(wEl, `.d${i + 1}`)
            let comp = new DOMParser().parseFromString(`<div class="comp">
                                                                                <div class="para ttip" ttipText="aauu" tail="1"></div>
                                                                                <div class="subject ttip"></div>
                                                                                <div class="name"></div>
                                                                                <div class="place"></div>
                                                                                <div class="type ttip" ttipText="aauu" tail="1""></div>
                                                                            <div>`, "text/html").querySelector('.comp')
            day.querySelector('h2').innerText = `${el[0].day[0].toUpperCase()}${el[0].day.slice(1)}`
            for (let i2 = 0; i2 < el.length; i2++) {//pars
                const el2 = el[i2];
                qw(el2, "")
                if (el2.name) {
                    // debugger
                    try {
                        if (parseInt(weeks[j]) == curWeek && nee2[i][i2].length > 0 && new Date().getDay() == i + 1) {
                            comp.classList.add('cur')
                            // console.log('added')
                        } else {
                            // console.log('not today')
                        }
                    } catch (error) {

					}
					
					//регулярка для разделения строки на название предмета и фио преподавателя
					let regexp = /( [а-яА-ЯёЁ]+ [А-Я]\.[А-Я]\..*)/ 
					
					//например, с 8:30 до 10:00
					let curParaSchedule = `с ${time[el2.par - 1].s} до ${time[el2.par - 1].e}`
					
					if (!el2.bigDay) {
						qs(comp,'.para').innerText = `${el2.par}.`
						qs(comp, '.para').setAttribute('ttipText', curParaSchedule)
					} else {
						day.classList.add('bigDay')
					}

					
					
					qs(comp, '.subject').innerHTML = `${el2.name ? el2.name.split(regexp)[0] : ""} ${el2.spec ? '<span class="ttip spec" tail="1" ttipText="занятие только у ' + el2.spec + ' группы">' + el2.spec+'</span>':''}`

                    qs(comp,'.name').innerText = `${el2.name ? (el2.name.split(regexp)[1] ? el2.name.split(regexp)[1].trim() : "") : ""}`
                    try {
                        qs(comp,'.place').innerText = `${((el2.place != undefined && (el2.place + '').match(/[0-9]/) != null) ? qw((el2.place + '').replace('\n', ' '), "") : "")}`
					} catch (error) { }
					
                    qs(comp,'.type').innerText = `${el2.type?.search(/ПЗ|ЛР|Л/) > -1 ? el2.type : (el2.place?.search(/ПЗ|ЛР|Л/) > -1? el2.place:'')}`
					if (qs(comp, '.type').innerText.search(/ПЗ|ЛР|Л/) > -1) {
						let text = qs(comp, '.type').innerText == "ПЗ" ? "Пракическое занятие" :
							(qs(comp, '.type').innerText == "ЛЗ" ? "Лабороторное зантяе" : "Лекция")
						
						qs(comp, '.type').setAttribute('ttipText', text)
					}
                    day.innerHTML += comp.outerHTML
                }
            }
        }

    }
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
    window.ppoR = workbook.Sheets[weekA]

    



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
            // debugger
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
    // nee2.push(pfin)


    


    //*NEW ENGINE///////////////////////////////

    let offsetTop = 10; // колво бесполезных ячеек сверху, до "1 пара"

    function parNum(n) {
        n = n - offsetTop;
        return n % 8 == 0 ? 8 : n % 8
    }

    function dayNum(n) {
        n = n - offsetTop;
        return Math.ceil(n / 8)
    }
    
    nee2 = []
    nee12 = []
    weeks.forEach((el, wI) => { //получаем массив недель
        let curSheet = raw.Sheets[el]

        let keys = Object.keys(curSheet); // названия клеток: A1, AJ18, X4......
        let vals = Object.values(curSheet); // их содержимое
        let entries = Object.entries(curSheet); // всё это в виде массива
        let inDom = (new DOMParser).parseFromString(XLSXam.utils.sheet_to_html(curSheet), "text/html")
		window.inDomi=inDom
        let glob = ["AB", "Z", "AA", "AC", "AF", "AG", "AJ", "AK"]; //всё, кроме 1 группы
        function isEmpty(vals, keys, chars, num) {
            if ((vals[keys.indexOf(chars + num)] == undefined ||
                vals[keys.indexOf(chars + num)].t == 'z')) {
                return true
            } else {
                return false
            }
        }
        function check(vals, keys, i) {
            //true если у однопоточников, кроме первой группы, нет пар(=> лекция или англ или выходной)
            // debugger
            let ret = true
            glob.forEach(el => {
                if (vals[keys.indexOf(el + keys[i].match(/(\d+)/)[0])].v != undefined) {
                    //если в какой-то колонке чето есть
                    ret = false
                }

            })
            return ret
        }

       
        nee=[]
		for (let i = 0; i < vals.length; i++) { //получаем массив пар

			let globalParaCondition = (keys[i].search(/\bX\d/) >= 0 &&  //1 колонка
				vals[i].v != undefined && vals[i].v.length > 2
				&& check(vals, keys, i));
			
			let ourLeft = "AJ"
			let outRight = "AK"
			let ourRegexp = new RegExp(`${ourLeft}\\d|${outRight}\\d`)
			let ourPlace="AM"
			let ourType="AL"

			
			if (keys[i].search(ourRegexp) >= 0 // наши 2 колонки 
                && vals[i].v != undefined && vals[i].v.length > 2 // не пустые
                ||
                globalParaCondition) {

				let num = keys[i].match(/(\d+)/)[0];
				let bigDay = 0
				

					if (inDom.querySelector('#sjs-X' + num).getAttribute('rowspan') == 8) {
						console.log(vals[i])
						bigDay = 1
					}

                
                let numBef = keys[i-1].match(/(\d+)/)[0];

                let cPar = parNum(num)
                    let day;
                    switch (dayNum(num)) {
                        case 1:
                            day = "понедельник"
                            break;
                        case 2:
                            day = "вторник"
                            break;
                        case 3:
                            day = "среда"
                            break;
                        case 4:
                            day = "четверг"
                            break;
                        case 5:
                            day = "пятница"
                            break;
                        case 6:
                            day = "суббота"
                            break;
                    }


                
                let spec;
                if (keys[i].search(/\bX\d/) < 0 && num > offsetTop) {
                    // debugger
                    if (isEmpty(vals, keys, ourLeft, num)) {
                        spec = 'Ⅱ'
					} else if (inDom.querySelector('#sjs-' + ourLeft + num).getAttribute('colspan') != '2') {
                        spec = 'Ⅰ'
                    }
                }
                nee.push({
                    par: cPar,
                    "day": day,
                    name: vals[i].v,
                    type: vals[keys.indexOf(ourType + num)].v,
                    place: vals[keys.indexOf(ourPlace + num)].v,
					spec: spec,
					bigDay:bigDay
                })

            }

        }

        // debugger

        
        nee12=[]
        nee.slice(1).forEach((el, i) => {
            if (el.day) {
                if (i == 0 || nee.slice(1)[i - 1].day != el.day) {
                    nee12.push([])
                }
                nee12[nee12.length - 1].push(el)
            }
        })



        nee2.push(nee12)
    });

    makeDom(jj)
}

export function setTime() {
    let maxPar = _.last(nee2[curWeekI][new Date().getDay() - 1]).par; // номер последней пары
    setInterval(() => {
        let cSec = () => { return new Date().getSeconds() }
        let cMin = () => { return new Date().getMinutes() }
        let cHou = () => { return new Date().getHours() }
        let cTime = () => { return (cHou() * 60) + cMin() }
        let cTimes = () => { return cTime() * 60 + cSec() }
        
        window.cPar = 0;

        time.some((el, i) => {
            let s = (+el.s.split(':')[0] * 60) + (+el.s.split(':')[1])
            let e = (+el.e.split(':')[0] * 60) + (+el.e.split(':')[1])
            let sn = 0;
            try {
                sn = (+time[i + 1].s.split(':')[0] * 60) + (+time[i + 1].s.split(':')[1])
            } catch (error) {

            }
            if (cTime() >= s && cTime() < e && i<maxPar) {
                // console.log(i)
                cPar = [el, i,
                    (+el.e.split(':')[0] * 60) + (+el.e.split(':')[1])];
                return 1;
            } else {
                if (cTime() >= e && cTime() < sn && i+1 < maxPar) {
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
            document.querySelector('.now #hours').textContent = cPar[0].s
            qs(document, '.now').style.flexDirection = ""
            try {
                document.querySelector('.comp.this').classList.remove('this')
            } catch (error) {

            }	
        } else {
            document.querySelector('.now .tit').innerHTML = "Занятия закончились.. <img style='height: 15pt;' src='zzz.png'/>"
            document.querySelector('.now').classList.remove('none')
            try {
                document.querySelector('.comp.this').classList.remove('this')
            } catch (error) {

            }
        }
    }, 1000);

}

export var render = {










}