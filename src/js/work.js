import { dataMake, makeDom, setTime } from './render';

import $ from 'dom7';
import { qs, weeksDom } from './globalVars';

export function today(e) {

    try {
        app.swiper.get('.swiper').slideTo(getChildIndex($('.swiper-slide.cur')[0]), 300)
    } catch (error) {

    }

    // setTimeout(() => {
    window.q = $

    if ($('.day.cur').length) {
        q('.page-content').scrollTop(q('.page-content').scrollTop() + q('.day.cur')[0].getBoundingClientRect().y - 30, 500)
        q('.swiper-pagination').scrollLeft(q('.swiper-pagination').scrollLeft() + q('.swiper-pagination-bullet-active')[0].getBoundingClientRect().x - 20, 500)
    }

    // console.log('sc')

    // doScrolling(".day.cur", 700)

    // }, 250);


}


export function work(fur) {
    
    if (localStorage.nee2 && !fur) {
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
            var req = new XMLHttpRequest();


            req.open('POST', `https://${state.appData.url}/php/get.php`, true);
            req.responseType = 'arraybuffer';
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            req.onload = function (e) {

                delete localStorage.nee2
                delete localStorage.weeks
                window.weeksDom = []

                onload()

            };
            req.ontimeout = function (params) {
                app.emit('e-reloaded', 1)
            }
            req.onerror = function () {
                app.emit('e-reloaded', 1)
            }
            req.onabort = function () {
                app.emit('e-reloaded', 1)
            }
            req.send('action=connectBD');
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

                








                for (let j = 0; j < weeks.length; j++) {
                    // console.log(weeks[j]);
                    dataMake(weeks[j], j)
                }

                if (nee2.length > 0) {
                    localStorage.nee2 = JSON.stringify(nee2)
                    localStorage.weeks = JSON.stringify(weeks)
                    localStorage.last = +new Date
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


                for (let j = 0; j < nee2.length; j++) {
                    makeDom(j)
                }
            }
            // let data = {}


            qs(document, '.swiper-wrapper').innerHTML = ''
            window.weeksDom.forEach((el, i) => {
                qs(document, '.swiper-wrapper').innerHTML += `<div class="swiper-slide ${i == curWeekI ? "cur" : ""}">${el.outerHTML.replace('<h2></h2>', '')}</div>`
            })


            swiper = new app.swiper.create('.swiper', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + weeks[index] + "</span>";
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
                            document.querySelector(`.day.cur`).closest('.swiper-slide').classList.add("cur")
                            condition = nee2[curWeekI][new Date().getDay() - 1].length > 0
                        } catch (error) { }
                        
                        if (new Date().getDay() != 0 && condition) { // если не воскресенье 
                            setTime()
                            window.timeStarted = 1

                        } else {
                            qs(document, '.now .tit').innerHTML = "<h3>Сегодня выходной! <img style='height: 15pt;' src='party.png'/></h3>"
                        }

                        setTimeout(() => {
                            today(e)
                            setTimeout(() => {
                                swiper.updateAutoHeight(0)
                            }, 1000);
                        }, 300);
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