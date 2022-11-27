let content_lista = document.querySelector(".content_lista ul");
let search_div_inpt = document.querySelector("#search_div_inpt");
let search_icon = document.querySelector(".search_icon");
let spinner = document.querySelector(".spinner");
let val;

window.addEventListener("load" , ()=>{
    let url = window.location.href;
    let decoded = decodeURI(url);
    let search = decoded.lastIndexOf("?") + 3;
    let part = decoded.slice(search);
    val = part;
    myFun(val);
});
search_icon.addEventListener("click" , ()=>{
    if(search_div_inpt.value != ""){
        val = search_div_inpt.value;
        myFun(val);
    }
});

// search_icon.addEventListener("click" , myFun)
function myFun(val){

    spinner.style.display = "flex";
    content_lista.innerHTML = "";
    fetch(`https://api.quran.com/api/v3/search?q=${val}`) 
    .then(ress => ress.json())
    .then(searchData =>{
        console.log(searchData);
        spinner.style.display = "none";
        if(searchData.search.total_results > 0){

            let {results} = searchData.search;
            
            for(let i = 0; i < results.length; i++){
                fetch(`https://api.alquran.cloud/v1/ayah/${results[i].verse_key}`)
                .then(ntyga => ntyga.json())
                .then(dater => {
                    console.log(dater);
                    let box = `
                        <div>
                            <a href="../display/index.html?${dater.data.surah.number}">${dater.data.surah.englishName} ${results[i].verse_key}</a>
                            <li>${results[i].highlighted || results[i].text} <label>﴿${dater.data.surah.number}﴾</label></li> 
                        </div>
                    `
                    content_lista.innerHTML += box;
                })
            }
        }else{
            alert("write a correct word");
        }
    })
}


 







