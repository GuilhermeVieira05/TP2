const gitHubAPI = `https://api.github.com/users/V131R4/repos`;
const gitHubProfile = `https://api.github.com/users/V131R4`;

async function getRepo(){
  const row = document.querySelector(".repositories-row");
      fetch(gitHubAPI)
      .then(resp => resp.json())
      .then(data =>{
          data.map(item =>{
              let div = document.createElement("div")
              div.classList.add("col-lg-4")
              div.classList.add("col-md-6")
              div.classList.add("col-sm-12")
              div.classList.add("col-12")
              div.innerHTML = `
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">${item.name.toUpperCase()}</h5>
                    <p class="card-text">${item.description || "Sem descrição"}</p>
                    <p class="card-text">${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}</p>
                    <div class="card-items">
                    <p class="card-fork"><i class="fa-solid fa-code-fork"></i>${item.forks_count}</p>
                    <p class="card-stars"><i class="fa-regular fa-star"></i>${item.stargazers_count}</p>
                    </div>
                    <a href="repo.html?id=${item.name}" class="btn btn-primary">Acesse</a>
                    <p id="repo_id" class="none">${item.id}
                  </div>
                </div>`
            row.appendChild(div)
          })
      })
      .catch(e =>{
          console.log("Erro ao chamar a função", e);
      })
}

async function getInfo(){
  const profilePhoto = document.querySelector("#profile-photo")
  const profileName = document.querySelector("#profile-name")
  const profileBio = document.querySelector("#profile-bio");
  const profileLocation = document.querySelector("#profile-location")
  const profileUrl = document.querySelector("#profile-url")
  const repositoriesCount = document.querySelector("#repositories-count")
  const followers = document.querySelector(".followers")
  try{
    const response = await fetch(gitHubProfile)
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    profilePhoto.src = data.avatar_url;
    profileName.textContent = data.name
    profileBio.textContent = data.bio
    profileLocation.textContent = data.location
    profileUrl.href = data.html_url
    profileUrl.target = `_blank`
    repositoriesCount.textContent = `Repositórios (${data.public_repos})`
    followers.innerHTML = `<i class="fa-solid fa-user"></i>
                           <p>${data.followers}</p>`
  }catch(error){
    console.error("Erro ao puxar o perfil!", error);
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
    getRepo()
    getInfo()
})