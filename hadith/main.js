let item_flex = document.querySelector(".item_flex");
let spinner = document.querySelector(".spinner");

spinner.style.display = "flex";
fetch(`https://hadeethenc.com/api/v1/categories/list/?language=ar`)
.then(res => res.json())
.then(datas => {

    for(let i = 0; i < datas.length; i++){

        let box = `
            <a href="../displayHadith/index.html?${datas[i].id}" class="item">
                <div class="right">
                    <div class="rectangle">
                        <section>
                            ${datas[i].id}
                        </section>
                    </div>
                    <div class="surah_name">
                        ${datas[i].title}
                    </div>
                </div>
            </a>
        `;
        item_flex.innerHTML += box;
    }
    spinner.style.display = "none";
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


















