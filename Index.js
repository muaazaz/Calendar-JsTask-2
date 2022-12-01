import { Array, Daily } from "./data.js";

var count = 1;
var arr = [];
var tim = 0;
var tim1 = 0;
var mrg = 0;
var start1 = 0;
var start2 = 0;
var isvalid = false;
var PM = false;
var counter = 0;



//Getting current date
const d = new Date();
let notime = d.toString();
let day = notime.split(" ");
document.getElementById("dt").innerHTML = day[0] + ", " + day[1] + " " + day[2];

function createDailyevnt() {
    Daily.forEach((element) => {
        let alldayevnt = document.createElement('div');
        let time = document.createElement('p');
        let item = document.createElement('h1');
        let loc = document.createElement('p');

        time.setAttribute("class", "gry");
        alldayevnt.setAttribute("class", "evt");
        loc.setAttribute("class", "grn");

        loc.innerHTML = element.loc;
        item.innerHTML = element.item;
        time.innerHTML = "ALL Day-";

        alldayevnt.appendChild(time);
        alldayevnt.appendChild(item);
        alldayevnt.appendChild(loc);

        let main = document.getElementById("daily");
        main.appendChild(alldayevnt);
    })
}

//Function TO generate events
function genevents(start, end, itm, loca) {

    let strttime = document.getElementById(start);

    let evnt = document.createElement("div");
    let time = document.createElement("p");
    let item = document.createElement("h1");
    let loc = document.createElement("p");

    evnt.setAttribute("class", "events")
    time.setAttribute("class", "tim")
    item.setAttribute("class", "item")
    loc.setAttribute("class", "loc")

    if (start - 12 < 0) {
        start1 = start - 12;
        time.innerHTML = start2.toString() + "AM-";
    } else {
        time.innerHTML = start2.toString() + "PM-";
    }


    item.innerHTML = itm;
    loc.innerHTML = loca;

    evnt.style.backgroundColor = "white";
    evnt.style.position = "relative";
    evnt.style.zIndex = "1";


    calTimeSpan(start, end, evnt);

    evnt.appendChild(time);
    evnt.appendChild(item);
    evnt.appendChild(loc);

    let evntObj = {
        start: start,
        end: end,
        item: item.innerHTML,
        loc: loc.innerHTML
    }
    //Storing events in an array as an object
    storeevents(evntObj);
    //To manage overlapping
    if (count > 0) {
        overlapandStore(evntObj);
        if (tim != 0) {
            rmvOver(evntObj);
            evnt.style.marginTop = mrg.toString() + "rem";
            evnt.style.marginLeft = "20%";
            tim.appendChild(evnt);

        }
        else {
            strttime.appendChild(evnt);
        }

    }
    else {
        strttime.appendChild(evnt);
    }
    tim = 0;
    count++;
}
//Adjusting the height of the 
function calTimeSpan(start, end, evnt) {

    let hgt = 0;
    let diff = end - start;
    if (diff == 0.5) {
        hgt = 4;
    }
    else {
        hgt = Math.round((diff * 4) * 2);
    }

    evnt.style.height = hgt.toString() + "rem";
    if (hgt > 4) {
        evnt.style.flexDirection = "column";
    }
}

//Storing events in array
function storeevents(evnt) {

    arr.push(evnt);
}

//Checking where ovelap occurs
function overlapandStore(evnt) {
    let diff2 = false;

    arr.forEach((element) => {
        diff2 = (element.end - evnt.start > 0 && element.start != evnt.start)
        if (diff2) {
            tim1 = element.start;
            tim = document.getElementById(element.start);
        }
    });

}
//Fixing the overlapping
function rmvOver(evnt) {
    let diff = evnt.start - tim1;
    mrg = Math.round((diff * 4) * 2);
}

//Initialize event creation based on time zones
function Createevents() {
    Array.forEach((element) => {
        let start = element.start;
        let end = element.end;
        let item = element.item;
        let loc = element.loc;


        let tm1 = start.split(':');
        let tm2 = end.split(':');

        start = convert(start, tm1);
        end = convert(end, tm2)

        check(start);
        if (isvalid) {
            start1 = start.split('.')
            if (start1[0] - 12 > 0) {
                start2 = start1[0] - 12;
            }
            else {
                start2 = start1[0];
            }
            if (start1[1]) {
                start2 = start2.toString() + ":30";
            }
            else {
                start2 = start2.toString() + ":00";
            }
            genevents(start, end, item, loc);
        }
        else {
            alert('More than two events can not start at the same time!.')
        }
    });
}

//To control event spaming
function check(start) {
    arr.forEach((element) => {
        if (element.start == start) {
            counter++;
        }
    })
    if (counter >= 2) {
        isvalid = false;
    }
    else {
        isvalid = true;
    }
}


//To check time for am or pm and converting it in 24 hours format
function checkampm(tm) {
    switch (tm) {
        case '1':
            return (+tm + 12).toString();
            break;
        case '2':
            return (+tm + 12).toString();
            break;
        case '3':
            return (+tm + 12).toString();
            break;
        case '4':
            return (+tm + 12).toString();
            break;
        case '5':
            return (+tm + 12).toString();
            break;
        case '6':
            return (+tm + 12).toString();
            break;
        case '7':
            return (+tm + 12).toString();
            break;
        case '8':
            return (+tm + 12).toString();
            break;

        default:
            return tm;
            break;
    }
}

//Converts :30 to .5 for easier convienience in code
function checkhalf(tm) {
    return '.5';
}

//Convert fully to 24 hours format
function convert(tm, tm1) {
    tm1[0] = checkampm(tm1[0]);
    if (tm1[1]) {
        tm1[1] = checkhalf(tm1[1]);
        tm = tm1[0] + tm1[1];
        return tm;
    } else {
        tm = tm1[0];
        return tm;
    }
}
//Create Daily events
createDailyevnt();
//Creating timely events
Createevents();
// check2();