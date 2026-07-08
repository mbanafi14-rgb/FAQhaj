const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vR4xbvFae0JUJwFxuTWfEsf4H-zn6gnLzBDQlUoeix1o-LdD6owHkhea0ZLgHPJbF9PIJJzfMNRzpte/pub?gid=0&single=true&output=csv";

const faq = document.getElementById("faq");
const categories = document.getElementById("categories");
const search = document.getElementById("search");

let allQuestions = [];

let currentLang = "ar";

Papa.parse(SHEET_URL, {
    download: true,
    header: true,
    complete: function(results) {

        allQuestions = results.data.filter(r => r.Q_ar);

        renderFAQ(allQuestions);
        buildCategories();
    }
});

function renderFAQ(data){

    faq.innerHTML="";

    data.forEach(item=>{

        if(item.show &&
           item.show.toLowerCase()=="no")
           return;

        faq.innerHTML += `
        <div class="card" data-category="${item.cat_ar}">

            <div class="question">

            ${currentLang === "ar" ? item.Q_ar : item.Q_en}

                <span>+</span>

            </div>

            <div class="answer">

                ${currentLang === "ar" ? item.an_ar : item.an_en}

            </div>

        </div>
        `;

    });

    document.querySelectorAll(".question").forEach(q=>{

        q.onclick=()=>{

            q.parentElement.classList.toggle("active");

        }

    });

}

function buildCategories(){

    const unique=[...new Set(allQuestions.map(x=>x.cat_ar).filter(Boolean))];

    categories.innerHTML='<button class="cat active">الكل</button>';

    unique.forEach(cat=>{

        categories.innerHTML +=
        `<button class="cat">${cat}</button>`;

    });

    document.querySelectorAll(".cat").forEach(btn=>{

        btn.onclick=function(){

            document.querySelectorAll(".cat")
            .forEach(x=>x.classList.remove("active"));

            this.classList.add("active");

            const selected=this.innerText;

            if(selected=="الكل"){

                renderFAQ(allQuestions);

            }

            else{

                renderFAQ(
                    allQuestions.filter(
                        x=>x.cat_ar==selected
                    )
                );

            }

        }

    });

}

search.addEventListener("keyup",()=>{

    const value=search.value.toLowerCase();

    renderFAQ(

        allQuestions.filter(item=>{

            return(

                item.Q_ar.toLowerCase().includes(value)||

                item.an_ar.toLowerCase().includes(value)||

                item.keywords.toLowerCase().includes(value)

            );

        })

    );

});

document.getElementById("arBtn").addEventListener("click", () => {

    currentLang = "ar";

    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";

    search.placeholder = "ابحث عن سؤال...";

    renderFAQ(allQuestions);

});

document.getElementById("enBtn").addEventListener("click", () => {

    currentLang = "en";

    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";

    search.placeholder = "Search...";

    renderFAQ(allQuestions);

});
