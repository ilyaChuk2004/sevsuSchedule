export let day = new Date().getDay();
export var workbook

export var oFileIn;
export var oob = [];
export var ppo = [];
export var ppn = [];
export var ppm = [];
export var ppr = [];
export var ppr2 = [];
export var pfin = [];
export var days = [];
export var weeksL;
export var swiper
export var curWeekI;
export var wEl;
export var weeksDom = []
export var nee2 = [{ par: 100 }]
export var nee = []
export var nee12 = []
export var weeksArr2 = []
export var emptyDays = []
export var week = new DOMParser().parseFromString(`<div class="week"><h3 class="weekTit">для нечётной недели</h3>
            <div class="days">
                <div class="pn d1 day"><h2></h2></div>
                <div class="vt d2 day"><h2></h2></div>
                <div class="sr d3 day"><h2></h2></div>
                <div class="cht d4 day"><h2></h2></div>
                <div class="pt d5 day"><h2></h2></div>
                <div class="sb d6 day"><h2></h2></div>
            </div></div>`, "text/html").querySelector('.week')
export let time = [
    { s: "8:30", e: "10:00" },
    { s: "10:10", e: "11:40" },
    { s: "11:50", e: "13:20" },
    { s: "14:00", e: "15:30" },
    { s: "15:40", e: "17:10" },
    { s: "17:20", e: "18:50" },
    { s: "19:00", e: "20:30" },
    { s: "20:40", e: "22:10" },
]

export function qw(v, d) {
    if (!v) {
        return d
    } else {
        return v
    }
}
export function qs(el, selector) {
    return el.querySelector(selector)
}

export function getChildIndex(node) {
    return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}


export var parts = '2021-08-29'.split('-');
// Please pay attention to the month (parts[1]); JavaScript counts months from 0:
// January - 0, February - 1, etc.

export var curWeek = Math.ceil(Math.round((new Date(+new Date) - new Date(parts[0], parts[1] - 1, parts[2])) / (1000 * 60 * 60 * 24)) / 7)