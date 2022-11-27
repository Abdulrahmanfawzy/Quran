let item_flex = document.querySelector(".item_flex");
let range = document.querySelector(".range section");
let range_icon = document.querySelector(".range i");
let mood = "down";
let spinner = document.querySelector(".spinner");

spinner.style.display = "flex";
window.onload = ()=>{
  spinner.style.display = "none";
}

fetch(`https://api.alquran.cloud/v1/quran/quran-uthmani`)
  .then((res) => res.json())
  .then((datas) => {
    let { surahs } = datas.data;
    for (let i = 0; i < surahs.length; i++) {
      funForSurahs(i);
    }

    function funForSurahs(i) {
      let box = `
        <a href="display/index.html?${surahs[i].number}" class="item">
            <div class="right">
                <div class="rectangle">
                    <section>
                        ${surahs[i].number}
                    </section>
                </div>
                <div class="surah_name">
                    ${
                      surahs[i].number < 10
                        ? "00" + surahs[i].number
                        : surahs[i].number >= 10 && surahs[i].number < 100
                        ? "0" + surahs[i].number
                        : surahs[i].number
                    }
                </div>
            </div>
            <div class="left">
                <div class="ayat_num">${surahs[i].ayahs.length}  آيات </div>
            </div>
        </a>
        `;
      item_flex.innerHTML += box;
    }

    range.addEventListener("click", () => {
      item_flex.innerHTML = "";

      if (mood == "down") {
        for (let i = surahs.length - 1; i >= 0; i--) {
          funForSurahs(i);
        }
        range.innerHTML = "رتب تنازلياً";
        range_icon.style.transform = "rotate(180deg)";
        mood = "up";
      } else {
        range.innerHTML = "رتب تصاعدياً";
        for (let i = 0; i < surahs.length; i++) {
          funForSurahs(i);
        }
        range_icon.style.transform = "rotate(0deg)";
        mood = "down";
      }
    });
  });

let icon = document.querySelector(".icon");
let search_inpt = document.getElementById("search_inpt");
function searchFun() {
  if (search_inpt.value != "") {
    let val = search_inpt.value;
    icon.href = `search/index.html?q=${val}`;
  } else {
    alert("fill the input");
  }
}

icon.addEventListener("click", searchFun);
search_inpt.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (search_inpt.value != "") {
      let val = search_inpt.value;
      window.location.href = `search/index.html?q=${val}`;
    } else {
      alert("fill the input");
    }
  }
});

let radio = document.getElementById("radio");
let radio_iconer = document.querySelector(".radio_iconer i");
let txt = document.getElementById("txt");
let audio_icon = document.querySelector(".audio_icon i");
let audio = document.querySelector(".audier audio");
let audier = document.querySelector(".audier");

radio.addEventListener("click", () => {
  audio.src = "https://qurango.net/radio/salma";
  audier.style.display = "block";

  if (radio_iconer.className == "fa-solid fa-play") {
    radio_iconer.className = "fa-solid fa-pause";
    audio_icon.className = "fa-solid fa-pause";
    audio.play();
  } else {
    radio_iconer.className = "fa-solid fa-play";
    audio_icon.className = "fa-solid fa-play";
    audio.pause();
  }
});

audio_icon.addEventListener("click", () => {
  if (audio_icon.className == "fa-solid fa-play") {
    radio_iconer.className = "fa-solid fa-pause";
    audio_icon.className = "fa-solid fa-pause";
    audio.play();
  } else {
    audio_icon.className = "fa-solid fa-play";
    radio_iconer.className = "fa-solid fa-play";
    audio.pause();
  }
});

let surah_option_li = document.querySelector(".surah_option_li");
let juz_option = document.querySelector(".juz_option");
