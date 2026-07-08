const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4xbvFae0JUJwFxuTWfEsf4H-zn6gnLzBDQlUoeix1o-LdD6owHkhea0ZLgHPJbF9PIJJzfMNRzpte/pub?gid=0&single=true&output=csv";

const faq = document.getElementById("faq");

Papa.parse(SHEET_URL,{
    download:true,
    header:true,

    complete:function(results){

        faq.innerHTML="";

        results.data.forEach(item=>{

            if(item.show !== "" && item.show.toLowerCase()=="no")
                return;

            faq.innerHTML += `
            <div class="card">

                <div class="question">

                    ${item.Q_ar}

                    <span>+</span>

                </div>

                <div class="answer">

                    ${item.an_ar}

                </div>

            </div>
            `;

        });

        document.querySelectorAll(".question").forEach(question=>{

            question.addEventListener("click",()=>{

                question.parentElement.classList.toggle("active");

            });

        });

    }

});
