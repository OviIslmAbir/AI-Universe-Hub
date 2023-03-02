// load data

const loadData = (dataLimit, spinner) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
      .then(res => res.json())
      .then(data => displayData(data.data.tools, dataLimit))
}

// display data 

const displayData = (universes, dataLimit) =>{
    // // start loader
    // toggleSpinner(true)

    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = '';
    // show all btn
    const showAll = document.getElementById("show-all") 
    if(dataLimit && universes.length > 6){
        universes = universes.slice(0, 6)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

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

    // stop loader
    toggleSpinner(false)
}
// showAll btn clicked 
document.getElementById("show-btn").addEventListener("click", function(){
    loadData()
})
// toggle Spinner
const toggleSpinner = isLoading => {
    const loader = document.getElementById("loader")
    if(isLoading){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}



loadData(6, toggleSpinner(true))