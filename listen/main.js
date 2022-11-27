let content = document.querySelector(".content_box ul");
let spinner = document.querySelector(".spinner");
let audio = document.getElementById("audio");
let str;
let url = window.location.href;
let search = url.lastIndexOf("?") + 1;
let part = url.slice(search);
let modifyUrl = +part.replace("#" , "");


if(search > 0){

fetch(`https://api.alquran.cloud/v1/surah/${modifyUrl}`)
.then(result => result.json())
.then(data1 => {
    let {name} = data1.data;
    str = name;
})



spinner.style.display = "flex";
fetch(`https://www.mp3quran.net/api/v3/reciters?language=ar&sura=${modifyUrl}`)
.then(res => res.json())
.then(datas =>{

    let {reciters} = datas;
    
    for(let i = 0; i < reciters.length; i++){
        let box = `
            <h3 class="item_box" onclick="playAudio(${reciters[i].id})">
                <div class="details diver">
                    <div class="div1">
                        <i class="fa-solid fa-headphones-simple"></i>
                        <div class="surah_names">${str}</div>
                    </div>
                    <div class="div1">
                        <a href="${(modifyUrl > 0 && modifyUrl < 10)? reciters[i].moshaf[0].server+"00"+ modifyUrl + ".mp3": (modifyUrl >= 10 && modifyUrl < 100)? reciters[i].moshaf[0].server+"0"+ modifyUrl + ".mp3": reciters[i].moshaf[0].server+ modifyUrl + ".mp3"}" download><i class="fa-solid fa-download"></i></a>
                    </div>
                </div>
                <section class="diver">
                     بصوت الشيخ ${reciters[i].name}
                </section>
            </h3>
        `
        content.innerHTML += box;
    }
    spinner.style.display = "none"
})

function playAudio(id){
    spinner.style.display = "flex"
    fetch(`https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${id}&sura=${modifyUrl}`)
    .then(res => res.json())
    .then(data2 =>{
        let {server} = data2.reciters[0].moshaf[0]
        if(modifyUrl > 0 && modifyUrl < 10){
            audio.src = server + "00" + modifyUrl + ".mp3";
        }else if(modifyUrl >= 10 && modifyUrl < 100){
            audio.src = server + 0 + modifyUrl + ".mp3";
        }else if(modifyUrl >= 100 && modifyUrl <= 114){
            audio.src = server + modifyUrl + ".mp3";
        }
        spinner.style.display = "none";
        
    })
    
}




function addClick(){
    let body = document.body;
    body.addEventListener("click" , (e)=>{
        if(e.target.classList.contains("diver")){
            addBorder(e.target.parentElement);
        }else if(e.target.classList.contains("item_box")){
            addBorder(e.target);
        }else if(e.target.classList.contains("surah_names")){
            addBorder(e.target.parentElement.parentElement.parentElement);
        }else if(e.target.classList.contains("div1")){
            addBorder(e.target.parentElement.parentElement);
        }
    })
}
addClick();


function addBorder(targeter){
    let query = document.querySelectorAll(".item_box");
    query.forEach((el)=>{
        el.style.border = "1px solid #464b50";
    })
    targeter.style.border = "1px solid #2ca4ab";
}
}else{
    window.location = "../index.html"
}

