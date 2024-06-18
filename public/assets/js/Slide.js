function showSlides(){      
    const api = `http://localhost:3000/carousel`
    const carousel  = document.querySelector(".carousel-inner")
    fetch(api)
    .then(res => res.json())
    .then(data => {
        let carouselContent = '';
        data.forEach((item, i) => {
            let activeClass = i === 0 ? ' active' : '';
            let str = `<div class="carousel-item${activeClass}">
                        <a href="${item.url}"><img src="${item.img}" class="d-block w-100 carousel-img" alt="..."></a>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${item.title}</h5>
                            <p>${item.description}</p>
                        </div>
                      </div>`;
            carouselContent += str;
        });
        carousel.innerHTML = carouselContent;
    })
    .catch(error => {
        console.error("Erro", error);
    });
}

document.addEventListener("DOMContentLoaded", ()=>{
    showSlides()
})