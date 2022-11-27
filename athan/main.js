let tabler = document.querySelector(".tabler tbody");
let search_div_inpt = document.querySelector("#search_div_inpt");
let search_icon = document.querySelector(".search_icon");
let day = document.querySelector(".day");
let iter;
let arr = [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Sunset",
  "Isha",
  "Midnight",
];

let cityArr = [
  "الاسكندرية",
  "القاهرة",
  "دمنهور",
  "الجيزة",
  "بور سعيد",
  "السويس",
  "أسون",
  "الفيوم",
  "مدينة 6 أكتوبر"
];

for (let i = 0; i < cityArr.length; i++) {
  iter = i;
  myFun(i);
}

search_icon.addEventListener("click", afterEvent);
search_div_inpt.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    afterEvent();
  }
});
function afterEvent() {
  if (search_div_inpt.value != "") {
    let val = search_div_inpt.value;
    fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${val}`)
      .then((ntyga) => ntyga.json())
      .then((dater) => {
        tabler.innerHTML = "";
        if (dater.code == 200) {
          let { timings } = dater.data;
          let { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Sunset, Isha, Midnight } =
            timings;

            let AsrNum =
                Asr.split(":")[0] > 12 && Asr.split(":")[0] < 24
                ? Asr.split(":")[0] - 12 + ":" + Asr.split(":")[1]
                : Asr.split(":")[0] + ":" + Asr.split(":")[1];
            let MaghribNum = Maghrib.split(":")[0] > 12 && Maghrib.split(":")[0] < 24
            ? Maghrib.split(":")[0] - 12 + ":" + Maghrib.split(":")[1]
            : Maghrib.split(":")[0] + ":" + Maghrib.split(":")[1];
            let SunsetNum = Sunset.split(":")[0] > 12 && Sunset.split(":")[0] < 24
            ? Sunset.split(":")[0] - 12 + ":" + Sunset.split(":")[1]
            : Sunset.split(":")[0] + ":" + Sunset.split(":")[1];

            let IshaNum = Isha.split(":")[0] > 12 && Isha.split(":")[0] < 24
            ? Isha.split(":")[0] - 12 + ":" + Isha.split(":")[1]
            : Isha.split(":")[0] + ":" + Isha.split(":")[1];
            
            let MidnightNum = Midnight.split(":")[0] > 12 && Midnight.split(":")[0] < 24
            ? Midnight.split(":")[0] - 12 + ":" + Midnight.split(":")[1]
            : Midnight.split(":")[0] + ":" + Midnight.split(":")[1];

          let box = `
            
                <tr>
                    <td scope="col">${val}</td>
                    <td scope="col"> ${Fajr}<span>AM</span></td>
                    <td scope="col">${Sunrise}<span>AM</span> </td>
                    <td scope="col">${Dhuhr}<span>AM</span></td>
                    <td scope="col">${AsrNum}<span>PM</span></td>
                    <td scope="col">${MaghribNum}<span>PM</span></td>
                    <td scope="col">${SunsetNum}<span>PM</span></td>
                    <td scope="col">${IshaNum}<span>PM</span></td>
                    <td scope="col">${MidnightNum}<span>${(Midnight.split(":")[0] == 00) ? "AM" : "PM"}</span></td>
                </tr>
                `;
          tabler.innerHTML = box;
          search_div_inpt.value = "";
        } else {
          alert("write a valid name please !..");
        }
      });
  } else {
    alert("fill the input please");
  }
}

function myFun(i) {
  fetch(
    `https://api.aladhan.com/v1/timingsByAddress?address=${cityArr[i]}`
  )
    .then((ntyga) => ntyga.json())
    .then((dater) => {
      let { timings } = dater.data;
      day.innerHTML = dater.data.date.readable;
      myWork(timings, i);
    });
}

function myWork(timings, i) {
  let { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Sunset, Isha, Midnight } = timings;
  let AsrNum =
    Asr.split(":")[0] > 12 && Asr.split(":")[0] < 24
      ? Asr.split(":")[0] - 12 + ":" + Asr.split(":")[1]
      : Asr.split(":")[0] + ":" + Asr.split(":")[1];
  let MaghribNum = Maghrib.split(":")[0] > 12 && Maghrib.split(":")[0] < 24
  ? Maghrib.split(":")[0] - 12 + ":" + Maghrib.split(":")[1]
  : Maghrib.split(":")[0] + ":" + Maghrib.split(":")[1];
  let SunsetNum = Sunset.split(":")[0] > 12 && Sunset.split(":")[0] < 24
  ? Sunset.split(":")[0] - 12 + ":" + Sunset.split(":")[1]
  : Sunset.split(":")[0] + ":" + Sunset.split(":")[1];

  let IshaNum = Isha.split(":")[0] > 12 && Isha.split(":")[0] < 24
  ? Isha.split(":")[0] - 12 + ":" + Isha.split(":")[1]
  : Isha.split(":")[0] + ":" + Isha.split(":")[1];
  
  let MidnightNum = Midnight.split(":")[0] > 12 && Midnight.split(":")[0] < 24
  ? Midnight.split(":")[0] - 12 + ":" + Midnight.split(":")[1]
  : Midnight.split(":")[0] + ":" + Midnight.split(":")[1];

  let box = `
        
        <tr>
            <td scope="col">${cityArr[i]}</td>
            <td scope="col"> ${Fajr}<span>AM</span></td>
            <td scope="col">${Sunrise}<span>AM</span> </td>
            <td scope="col">${Dhuhr}<span>AM</span></td>
            <td scope="col">${AsrNum}<span>PM</span></td>
            <td scope="col">${MaghribNum}<span>PM</span></td>
            <td scope="col">${SunsetNum}<span>PM</span></td>
            <td scope="col">${IshaNum}<span>PM</span></td>
            <td scope="col">${MidnightNum}<span>${(Midnight.split(":")[0] == 00) ? "AM" : "PM"}</span></td>
        </tr>
    `;
  tabler.innerHTML += box;
}
