const loadData = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
      .then(res => res.json())
      .then(data => displayData(data.data.tools))
}
const displayData = universes =>{
    const cardContainer = document.getElementById("card-container")
    for(const universe of universes){
        const cardDiv = document.createElement("div")
        cardDiv.classList.add("col")
        cardDiv.innerHTML = `
        <div class="card h-100 shadow-lg rounded-2">
            <img src="${universe.image}" class="card-img-top" alt="...">
            <div class="card-body p-3">
                <h5 class="card-title">Features</h5>
                <p class="card-text">
                    <ol>
                        <li><small>${universe.features[0]}</small></li>
                        <li><small>${universe.features[2]}</small></li>
                        <li><small>${universe.features[3]}</small></li>
                    </ol>
                </p>
            </div>
            <div class="card-footer p-3 d-flex justify-content-between">
               <div>
                    <h5 class="card-title">${universe.name}</h5>
                    <p class="card-text"><i class="fa-solid fa-calendar-days mx-1"></i><small>${universe.published_in}</small></p>
               </div>
               <button class="btn btn-outline-dark w-25 p-2"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
        `
        cardContainer.appendChild(cardDiv)
    }
}
loadData()