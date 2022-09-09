import { dataMake, makeDom, setTime } from './render';

import $ from 'dom7';
import { group, qs, weeksDom } from './globalVars';

export function today(e) {

    try {
        app.swiper.get('.swiper').slideTo(getChildIndex($('.swiper-slide.cur')[0]), 300)
    } catch (error) {

    }

    // setTimeout(() => {
    window.q = $
    q('.swiper-pagination').scrollLeft(q('.swiper-pagination').scrollLeft() + q('.swiper-pagination-bullet-active')[0].getBoundingClientRect().x - 20, 500)
    if ($('.day.cur').length) {
        q('.page-content').scrollTop(q('.page-content').scrollTop() + q('.day.cur')[0].getBoundingClientRect().y - 30, 500)
        
    }

    // console.log('sc')

    // doScrolling(".day.cur", 700)

    // }, 250);


}


export function work(fur) {
    
    if (localStorage.nee2 && localStorage.group && !+localStorage.force && !fur) {
        start(JSON.parse(localStorage.nee2))
    } else {
        start()
    }





    function start(event) {
        // console.log(event)

        // localStorage.event = event.target.result


        // var url = "IITUTS_1kurs_21_02_12.xls";

        // var req = new XMLHttpRequest();
        // req.open("GET", url, true);
        // req.responseType = "arraybuffer";
        // req.onload = function (e) {
        //     onload(e)
        // };

        // req.send();


        if (!event) {
            console.log('req')
            state.appData.nowRequest = 1;
            var req = new XMLHttpRequest();
            let lastSize = 0;

            app.request.post('https://ichuk.ru/cock/api/collections/get/groups?token=79766710864c138a7f377f20821886',
                { filter: { name: group }, })
                .then(function (res) {
                    console.log(JSON.parse(res.data).entries[0])
                    state.appData.group = JSON.parse(res.data).entries[0]

                    req.open('POST', `https://${state.appData.url}/php/get2.php`, true);
                    req.responseType = 'arraybuffer';
                    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    req.onload = function (e) {

                        delete localStorage.nee2
                        delete localStorage.weeks
                        window.weeksDom = []
                        state.appData.newSize = undefined
                        if (localStorage.lastSize != lastSize && localStorage.force=='0') {
                            state.appData.newSize = lastSize
                        }
                        localStorage.lastSize = lastSize
                        localStorage.force = 0
                        
                        
                        onload()

                    };
                    req.ontimeout = function (params) {
                        app.emit('e-reloaded', 1)
                    }
                    req.onprogress = (event) => {
                        // event.loaded returns how many bytes are downloaded
                        // event.total returns the total number of bytes
                        // event.total is only available if server sends `Content-Length` header
                        console.log(`Downloaded ${event.loaded/(+(localStorage.lastSize ? localStorage.lastSize : 1031751))*70} bytes`);
                        lastSize = event.loaded
                        perc = event.loaded / (+(localStorage.lastSize ? localStorage.lastSize : 1031751)) * 70
                        
                        app.emit('e-progress', perc)
                        
                    }
                    req.onerror = function () {
                        app.emit('e-reloaded', 1)
                    }
                    req.onabort = function () {
                        app.emit('e-reloaded', 1)
                    }
                    console.log(state.appData.group.name)
                    req.send('group=' + state.appData.group.name);
                    app.progressbar.show(0);
                });
            
            
            
            


            
        } else {

            onload(event, 1)
        }


        function onload(e, made) {


            if (!made) {

                weeksArr2 = []
                workbook = XLSXamr(req.response, { raw: true });
                window.raw = XLSXamr(req.response, { sheetStubs: true, bookFiles: true, bookDeps: true, cellNF:true });
                // debugger
                workbook.SheetNames.forEach(function (sheetName) {
                    window.weeks = workbook.SheetNames
                })

                








                    
                    dataMake()
                

                if (nee2.length > 0) {
                    localStorage.nee2 = JSON.stringify(nee2)
                    localStorage.weeks = JSON.stringify(weeks)
                    localStorage.last = +new Date
                    localStorage.group = JSON.stringify(state.appData.group)
                }

                //////////////////
            } else {
                
                window.weeks = JSON.parse(localStorage.weeks)

                let w = weeks.filter(function (word, index) {
                    if (word.match(new RegExp(curWeek))) {
                        curWeekI = index
                        return true;
                    } else {
                        return false;
                    }
                });

                nee2 = JSON.parse(localStorage.nee2)
                state.appData.group = JSON.parse(localStorage.group)
                window.group = state.appData.group.name


                for (let j = 0; j < nee2.length; j++) {
                    makeDom(j)
                }
            }
            // let data = {}


            qs(document, '.swiper-wrapper').innerHTML = ''
            window.weeksDom.forEach((el, i) => {
                qs(document, '.swiper-wrapper').innerHTML += `<div class="swiper-slide ${i == curWeekI ? "cur" : ""}">${el.outerHTML.replaceAll('<h2></h2>', '')}</div>`
            })


            swiper = new app.swiper.create('.swiper', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: function (index, className) {
                        let cur = curWeek - 1 == index?'cur':''
                        return '<span class="' + className +' ' +cur+'">' + weeks[index] + "</span>";
                    },
                },
                allowTouchMove: false,
                addSlidesAfter: 10,
                autoHeight: true,
                initialSlide: curWeekI,

                on: {
                    afterInit: function (e) {
                        // console.log('init')
                        let h = qs(document, '.swiper-pagination').offsetHeight
                        qs(document, '.fab1').style.bottom = `${h + 10}px`
                        qs(document, '.fab2').style.bottom = `${h*2 + 15}px`
                        qs(document, '.swiper-wrapper').style.marginBottom = `${h + 20}px`
                        let condition = 0
                        try {
                            
                            document.querySelector(`.comp.cur`).closest('.day').classList.add("cur")
                            document.querySelector(`.comp.curW`).closest('.swiper-slide').classList.add("cur")
                            
                            condition = nee2[curWeekI][new Date().getDay() - 1].length > 0;
                            
                        } catch (error) { }
                        // debugger
                        
                        if (new Date().getDay() != 0) { // если не воскресенье 
                            
                            try {
                                if (nee2[curWeekI][new Date().getDay() - 1].length > 0) {
                                    setTime()
                                    window.timeStarted = 1
                                } else {
                                    qs(document, '.now .tit').innerHTML = "<h3>Сегодня выходной! <img style='height: 15pt;' src='party.png'/></h3>"
                                }
                            } catch (error) {
                                qs(document, '.now .tit').innerHTML = "<h3>Сегодня выходной! <img style='height: 15pt;' src='party.png'/></h3>"
                            }

                        } else {
                            qs(document, '.now .tit').innerHTML = "<h3>Сегодня выходной! <img style='height: 15pt;' src='party.png'/></h3>"
                        }

                        setTimeout(() => {
                            today(e)
                            setTimeout(() => {
                                try {
                                    app.swiper.get('.swiper').update()
                                } catch (error) {

                                }
                            }, 1000);
                        }, 300);
                        try {
                            app.swiper.get('.swiper').update()
                        } catch (error) {

                        }
                        app.emit('e-reloaded')
                        // console.log('iti', e)
                    },
                },
            });
        }


        // debugger



    }


    setInterval(() => {
        for (let index = 0; index < document.querySelectorAll('.ttip[ttipText]:not([init="1"])').length; index++) {
            const element = document.querySelectorAll('.ttip[ttipText]:not([init="1"])')[index]
            if (element.getAttribute('data-only') == null) {

                let ttext = element.getAttribute('ttipText')

                try {
                    app.tooltip.get(element).destroy()
                } catch (error) {

                }
                app.tooltip.create({
                    targetEl: element,
                    text: ttext,
                    offset:10,
                    cssClass: (element.getAttribute('delay') !== null ? 'd' + element.getAttribute('delay') : '') + (element.getAttribute('tail') !== null ? ' tail ' + element.getAttribute('tail') : ''),
                    on: {
                        show: function (e) {
                            setTimeout(() => {
                                if (document.querySelector('.tooltip-in') !== null) {
                                    app.store.state.gf.vibrate('lil success')
                                }
                            }, 400)
                            if (element.getAttribute('ttipCondition') !== null && !eval(element.getAttribute('ttipCondition'))) {
                                e.hide()
                                setTimeout(() => {
                                    e.hide()
                                }, 20)
                                setTimeout(() => {
                                    e.hide()
                                }, 70)
                                setTimeout(() => {
                                    e.hide()
                                }, 170)
                                setTimeout(() => {
                                    e.hide()
                                }, 470)
                                setTimeout(() => {
                                    e.hide()
                                }, 970)

                                window.ttip = e
                                // console.log('hide')
                            }
                        }
                    }
                })
            }
            element.setAttribute('init', 1)
        }
    }, 200)




}