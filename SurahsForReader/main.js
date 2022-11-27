let surah_flex = document.querySelector(".surah_flex");
let spinner = document.querySelector(".spinner");
let icons = document.querySelectorAll(".icon i");
let audio = document.querySelector("#audio");

let url = window.location.href;
let search = url.lastIndexOf("?") + 1;
let part = url.slice(search);
let modifyUrl = +part.replace("#", "");
if (search > 0) {
    spinner.style.display = "flex"; // https://mp3quran.net/api/v3/suwar

    fetch(
            `https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${modifyUrl}`
        )
        .then((ress) => ress.json())
        .then((data2) => {
            console.log(data2);
            let {
                surah_list
            } = data2.reciters[0].moshaf[0];
            let arr = surah_list.split(",");
            console.log(arr);
            for (let i = 0; i < arr.length; i++) {
                fetch(`https://api.quran.com/api/v4/chapters/${arr[i]}?language=ar`)
                    .then((ress3) => ress3.json())
                    .then((data3) => {
                        let box = `
            
                        <div class="surah_item" onclick="addAudio(${data3.chapter.id})">
                            <div class="surah_item_right">
                                <div class="icons">
                                    <i class="fa-solid fa-book-open"></i>
                                </div>
                                <div class="surah_item_name">
                                    
                                    <h3> ${
                                    data3.chapter.id < 10
                                        ? "00" + data3.chapter.id
                                        : data3.chapter.id >= 10 && data3.chapter.id < 100
                                        ? "0" + data3.chapter.id
                                        : data3.chapter.id
                                    }</h3>
                                    
                                </div>
                            </div>
                            <div class="surah_item_left">
                                <a  onclick="mySource(${
                                data3.chapter.id
                                } , event)" download>
                                    <i class="fa-solid fa-download"></i>
                                </a>
                            </div>
                        </div>
                    `;
                surah_flex.innerHTML += box;
                spinner.style.display = "none";
            });
            }
        });

    function addAudio(id) {

        audio.setAttribute("autoplay", true);
        spinner.style.display = "flex";
        fetch(
                `https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${modifyUrl}`
            ) // mishary
            .then((ress) => ress.json())
            .then((data2) => {
                spinner.style.display = "none";
                let {
                    surah_list
                } = data2.reciters[0].moshaf[0];
                let arr = surah_list.split(",");
                fetch(`https://api.quran.com/api/v4/chapters/${id}?language=ar`)
                    .then((ress3) => ress3.json())
                    .then((data3) => {
                        let audioSource = data2.reciters[0].moshaf[0].server;
                        if (id > 0 && id < 10) {
                            audio.src = audioSource + "00" + id + ".mp3";
                        } else if (id >= 10 && id < 100) {
                            audio.src = audioSource + "0" + id + ".mp3";
                        } else if (id >= 100 && id <= 114) {
                            audio.src = audioSource + id + ".mp3";
                        }
                    });
            });
    }

    function mySource(id, e) {
        fetch(
                `https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${modifyUrl}&sura=${id}`
            )
            .then((res6) => res6.json())
            .then((data6) => {
                let {
                    server
                } = data6.reciters[0].moshaf[0];
                if (id > 0 && id < 10) {
                    e.target.parentElement.href = server + "00" + id + ".mp3";
                    e.target.parentElement.click();
                } else if (id >= 10 && id < 100) {
                    e.target.parentElement.href = server + "0" + id + ".mp3";
                    e.target.parentElement.click();
                } else if (id >= 100 && id <= 114) {
                    e.target.parentElement.href = server + id + ".mp3";
                    e.target.parentElement.click();
                }
                spinner.style.display = "none";
            });
    }
}