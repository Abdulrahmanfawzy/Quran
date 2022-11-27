let content = document.querySelector(".content ul");
let spinner = document.querySelector(".spinner");
let info = document.querySelector(".info");
let overlay_list = document.querySelector(".overlay_list");
let overlays = document.querySelector(".overlays");
let close = document.querySelector(".close");
let layer = document.querySelector(".layer");

let url = window.location.href;
let search = url.lastIndexOf("?") + 1;
let part = url.slice(search);
let modifyUrl = +part.replace("#", "");
if (search > 0) {
  spinner.style.display = "flex";
  fetch(`https://api.alquran.cloud/v1/surah/${modifyUrl}`)
    .then((res) => res.json())
    .then((datas) => {
      let { ayahs } = datas.data;
      let { data } = datas;
      let mood;

      if (data.revelationType == "Meccan") {
        mood = "مكية";
      } else {
        mood = "مدنية";
      }
      let intro = `
    <div class="info_title">
        <i class="fa-solid fa-circle-info"></i>
        <h2> معلومات حول ${data.name} </h2>
    </div>
    <hr>
    <div class="info_flex">
        <ul>
            <li>
                <i class="fa-solid fa-music"></i>
                <a href="../listen/index.html?${modifyUrl}">الإستماع الى ${
        data.name
      }</a>
            </li>
            <li>
                <i class="fas fa-circle-notch"></i>
                <section> عدد آيات ${data.name} : ${
        data.numberOfAyahs
      }</section>
            </li>
            <li>
                <i class="fas fa-circle-notch"></i>
                <section> النزول : ${mood}</section>
            </li>
        </ul>

        <ul>
            <li>
                <i class="fa-solid fa-download"></i>
                <a href="../listen/index.html?${modifyUrl}">تحميل ${
        data.name
      } </a>
            </li>
           
            <li>
                <i class="fas fa-circle-notch"></i>
                <section> الأسم بالأنجليزي : ${data.englishName} </section>
            </li>
        </ul>

        <ul>
            <li>
                <i class="fas fa-circle-notch"></i>
                <section> ترتيب ${data.name} : ${data.number}</section>
            </li>
            
            <li>
                <i class="fas fa-circle-notch"></i>
                <section>  موضعها في القرآن : من الصفحة ${ayahs[0].page} الى ${
        ayahs[ayahs.length - 1].page
      }</section>
            </li>
        </ul>
    </div>
    `;
      info.innerHTML = intro;

      if (
        ayahs[0].text.indexOf("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ") == 0
      ) {
        for (let i = 0; i < ayahs.length; i++) {
          let zero = ayahs[i].text.split(
            "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ"
          );

          let box = `
                <li onclick="tafsirFun(${ayahs[i].numberInSurah})">
                <section>${zero[i + 1] || ayahs[i].text}</section>
                <label> ﴿${ayahs[i].numberInSurah}﴾ </label></li>
            `;
          content.innerHTML += box;
          spinner.style.display = "none";
        }
      } else {
        for (let i = 0; i < ayahs.length; i++) {
          let box = `
                <li><section>${ayahs[i].text}</section> <label> ﴿${ayahs[i].numberInSurah}﴾ </label></li>
            `;
          content.innerHTML += box;
          spinner.style.display = "none";
        }
      }

      // change display
      let content_list = document.querySelectorAll(".content li");
      addActiveForlist(content_list);
      let increaseFont = document.getElementById("increaseFont");
      let decreaseFont = document.getElementById("decreaseFont");
      let nums;

      if (window.innerWidth > 576) {
        nums = 27;
      } else {
        nums = 20;
      }

      increaseFont.onclick = () => {
        content.style.fontSize = ++nums + "px";
      };

      decreaseFont.onclick = () => {
        content.style.fontSize = --nums + "px";
      };
    });
} else {
  window.location = "../index.html";
}

function tafsirFun(id) {
  overlays.style.display = "block";
  layer.style.display = "block";
  fetch(
    `https://api.quran.com/api/v3/chapters/${modifyUrl}/verses/${id}/tafsirs/16`
  )
    .then((res5) => res5.json())
    .then((data5) => {
      let { tafsir } = data5;
      let { resource_name } = tafsir; // name
      let { text } = tafsir;
      fetch(`https://api.quran.com/api/v3/chapters/${modifyUrl}/verses/${id}`)
        .then((res6) => res6.json())
        .then((data6) => {
          let boxx = `
                <div>
                    <div class="info_title">
                        <i class="fa-solid fa-circle-info"></i>
                        <h2> تفسير ${resource_name}</h2>
                    </div>
                    <hr/>
                    <div class="data">
                        <h2 class="modify_txt">${data6.verse.text_madani}</h2>
                        <div>
                            <p>
                                ${text}
                            </p>
                        </div>
                    </div>
                </div>
            `;
          overlay_list.innerHTML = boxx;
        });
    });
}

close.addEventListener("click", () => {
  overlays.style.display = "none";
  layer.style.display = "none";
});

layer.addEventListener("click", () => {
  overlays.style.display = "none";
  layer.style.display = "none";
});

function edit() {
  fetch(`https://api.alquran.cloud/v1/surah/${modifyUrl}`)
    .then((res2) => res2.json())
    .then((data3) => {
      let select_from = document.getElementById("select_from");
      let select_to = document.getElementById("select_to");
      let { ayahs } = data3.data;
      for (let i = 0; i < ayahs.length; i++) {
        let box = `
                <option value="${i}">من الإية ${i + 1}</option>
            `;
        select_from.innerHTML += box;

        select_from.onchange = () => {
          let val = +select_from.value;
          let valTo = +select_to.value;
          content.innerHTML = "";
          for (let i = val; i < valTo; i++) {
            let zero = ayahs[i].text.split(
              "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ"
            );
            let list = `
                        <li onclick="tafsirFun(${i + 1})"><section>${
              zero[i + 1] || ayahs[i].text
            }</section> <label> ﴿${ayahs[i].numberInSurah}﴾ </label></li>
                    `;
            content.innerHTML += list;
          }

          let content_list = document.querySelectorAll(".content li");
          addActiveForlist(content_list);
        };
        select_to.onchange = () => {
          let val = +select_from.value;
          let valTo = +select_to.value;
          content.innerHTML = "";
          for (let i = val; i < valTo; i++) {
            let zero = ayahs[i].text.split(
              "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ"
            );
            let list = `
                        <li onclick="tafsirFun(${i + 1})"> <section>${
              zero[i + 1] || ayahs[i].text
            }</section> <label> ﴿${ayahs[i].numberInSurah}﴾ </label></li>
                    `;
            content.innerHTML += list;
          }
          let content_list = document.querySelectorAll(".content li");
          addActiveForlist(content_list);
        };
      }
      for (let i = ayahs.length; i > 0; i--) {
        let box2 = `
                <option value="${i}">الي الإية ${i}</option>
            `;
        select_to.innerHTML += box2;
      }
    });
}
edit();

function addActiveForlist(lista) {
  let show_shape = document.getElementById("show_shape");
  show_shape.onclick = () => {
    lista.forEach((el) => {
      el.classList.toggle("active");
    });
  };
}
