document.addEventListener("DOMContentLoaded", ()=>{
    const gitHubAPI = `https://api.github.com/users/V131R4/repos`
    const row = document.querySelector(".repositories-row")

    async function getRepo(){
        fetch(gitHubAPI)
        .then(resp => resp.json())
        .then(data =>{
            data.map(item =>{
                let div = document.createElement("div")
                div.classList.add("col-lg-4")
                div.innerHTML = `
                  <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${item.name.toUpperCase()}</h5>
                      <p class="card-text">${item.description}</p>
                      <p class="card-text">${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}</p>
                      <a href="repo.html" class="btn btn-primary">Acesse</a>
                    </div>
                  </div>`
              row.appendChild(div)
            })
        })
        .catch(e =>{
            console.log(e)
        })
    }

    getRepo()
})