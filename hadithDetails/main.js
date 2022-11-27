let url = window.location.href;
let search = url.lastIndexOf("?") + 1;
let part = +url.slice(search);

let spinner = document.querySelector(".spinner");
let item_flex = document.querySelector(".item_flex");

window.onload = () => {
  spinner.style.display = "flex";
};

fetch(`https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${part}`)
  .then((res) => res.json())
  .then((datas) => {
    spinner.style.display = "none";

    let { words_meanings } = datas;
    let { hints } = datas;
    let { reference } = datas;

    let arr = words_meanings.map((el) => {
      return `<li>${el.word}:<span>${el.meaning}</span></li>`;
    });

    let hints_arr = hints.map((el, index) => {
      return `<p>${index + 1}. ${el} </p>`;
    });

    // let reference_arr = reference.map((el , index)=>{
    //     return(
    //         `<p>${index + 1}. ${el} </p>`
    //     );
    // })

    let box = `
        <div class="item">
            <div class="hadiths">
                الحديث:  ${datas.hadeeth} <span>[${datas.grade}] [${datas.attribution}] </span>
            </div>
            <div class="surah_name">
                <h4><i class="fa-solid fa-bars-staggered"></i> الشرح</h4>
                <p>
                    ${datas.explanation}
                </p>
                <h4 class="words"><i class="fa-solid fa-bars-staggered"></i> معاني الكلمات</h4>
                
                ${arr}

                <section class="hints">
                    <h4> <i class="fa-regular fa-lightbulb"></i> فوائد الحديث</h2>
                    ${hints_arr}
                </section>

                <article>
                    <h4> <i class="fa-solid fa-bars-staggered"></i> المراجع</h2>
                    <li>${reference}</li>
                </article>
            </div>
        </div>
    `;
    item_flex.innerHTML = box;

    let footer_div = document.querySelector(".footer_div");
    let boxer = `<footer class="text-center text-lg-start" style="border-top: 1px solid #464b50">
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: #1f2125e6; color: #FFF;">
        All rights reserved © with AbdulRahman Fawzy in 2022
    </div>
    <!-- Copyright -->
    </footer>`;

    footer_div.innerHTML = boxer;
  });
