async function getWorkamtes(){
    const workmates = document.querySelector(".photos")
    const jsonServer = "http://localhost:3000/workmates"

    fetch(jsonServer)
    .then(res => res.json())
    .then(data =>{
        for(let i=0;i<data.length;i++){
            let str = `<section class="d-flex p-2 flex-wrap">
                  <section class="profile">
                    <div class="container text-center col-lg-12 mx-3">
                      <div class="row">
                        <div class="col">
                          <a href="${data[i].html_url}"><img src="${data[i].avatar_url}" class="img-thumbnail img-fluid me-3 workmate-photo" alt="..."></a>
                          <p class="workmate-name">${data[i].name || data[i].login}<p>
                        </div>
                      </div>
                    </div>
                  </section>`
            workmates.innerHTML += str;
        }
    })
}
    

document.addEventListener("DOMContentLoaded", ()=>{
    //alert("Por favor, abra o JSONServer!")
    getWorkamtes()
})