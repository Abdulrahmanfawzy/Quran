let url = window.location.href;
let search = url.lastIndexOf("?") + 1;
let part = +url.slice(search);

let spinner = document.querySelector(".spinner");
let item_flex = document.querySelector(".item_flex");
let branch_name = document.querySelector(".branch_name");

window.onload = ()=>{
    spinner.style.display = "flex";
}

fetch(`https://hadeethenc.com/api/v1/categories/list/?language=ar`)
.then(res => res.json())
.then(datas1 => {
    spinner.style.display = "none";

    for(let i = 0; i < datas1.length; i++){
        if(datas1[i].id == part - 1){
            branch_name.innerHTML = "أحاديث النبي ﷺ عن " + `<span>${datas1[part - 1].title}</span>`
        }
    }


})


fetch(`https://hadeethenc.com/api/v1/hadeeths/list/?language=ar&category_id=${part}&per_page=50`)
.then(res => res.json())
.then(datas => {
    spinner.style.display = "none";

    let {data} = datas;
    
    for(let i = 0; i < data.length; i++){

        let box = `
            <a href="../hadithDetails/index.html?${data[i].id}" class="item">
                <div class="right">
                    <div class="rectangle">
                        <section>
                            ${i + 1}
                        </section>
                    </div>
                    <div class="surah_name">
                        ${data[i].title}
                    </div>
                </div>
            </a>
        `;
        item_flex.innerHTML += box;
    
    }

        let footer_div = document.querySelector(".footer_div");
        let boxer = `<footer class="text-center text-lg-start" style="border-top: 1px solid #464b50">
        <!-- Copyright -->
        <div class="text-center p-3" style="background-color: #1f2125e6; color: #FFF;">
            All rights reserved © with AbdulRahman Fawzy in 2022
        </div>
        <!-- Copyright -->
        </footer>`;

        footer_div.innerHTML = boxer;


})


















