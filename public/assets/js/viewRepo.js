function getRepoDetails(){
    const params = new URLSearchParams(window.location.search)
    const repo = params.get("id")
    const repoApi = `https://api.github.com/repos/V131R4/${repo}`

    const repoName = document.querySelector(".repo-name")
    const repoOwner = document.querySelector(".repo-owner")
    const repoDescription = document.querySelector(".description")
    const releasedDate = document.querySelector(".releasedDate")
    const languages = document.querySelector(".languages")
    const url = document.querySelector("#url")
    const ul = document.querySelector(".items")
    const repoInfo = document.querySelector('.repo-info')
    const license = document.querySelector(".license");

    if (!repo) {
        console.log(params);
        document.querySelector('.repo-details').innerHTML = '<p>Repositório não encontrado.</p>';
        return;
      }
    
    fetch(repoApi)
    .then(resp => resp.json())
    .then(repos => {
        repoName.textContent = `Repositório: ${repos.name}`
        repoOwner.src = `${repos.owner["avatar_url"]}`
        repoDescription.textContent = repos.description
        releasedDate.textContent = `${Intl.DateTimeFormat('pt-BR').format(new Date(repos.created_at))}`
        languages.textContent = repos.language || "Sem linguagem de programação"
        url.textContent = repos.html_url
        url.href = repos.html_url
        let topics = repos.topics.map(topic => `<li class="topic">${topic}</li>`).join("")
        ul.innerHTML = topics
        let str = `<p class="fork"><i class="fa-solid fa-code-fork"></i>${repos.forks_count}</p>
                    <p class="watchers"><i class="fa-solid fa-eye"></i>${repos.watchers || 0}</p>
                   <p class="star"><i class="fa-regular fa-star"></i>${repos.stargazers_count}</p>`
                   
        repoInfo.innerHTML += str
        license.innerHTML = `<h2>Licença: </h2>
                            <p class="license-item"><i class="fa-solid fa-scale-balanced"></i>${repos.license != null ? repos.license["name"] : 'Não há licença'}</p>`
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    getRepoDetails()
})