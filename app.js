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
            <img src="${universe.image}" class="card-img-top" alt="">
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
               <button onclick = "loadDetails('${universe.id}')" class="btn btn-outline-dark w-25 p-2" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
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
// load details 
const loadDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}
// displayDetails 
const displayDetails = universe => {
    const universeDetails = document.getElementById('universe-details')
    universeDetails.innerHTML=`
    <div class ="d-flex justify-content-between gap-4">
        <div class="border border-danger rounded p-3">
           <h5>${universe.description}<h4>
           <div class ="d-flex justify-content-between mt-3">
              <p style="font-size: 16px;" class="text-success">
                <small>
                    <span>${universe.pricing[0].price ? universe.pricing[0].price: "Free of Cost"}</span>
                    <br>
                    <span>${universe.pricing[0].plan}</span>
                </small>
              </p>
              <p style="font-size: 16px;" class="text-warning">
                <small>
                    <span>${universe.pricing[1].price ? universe.pricing[1].price: "Free of Cost"}</span>
                    <br>
                    <span>${universe.pricing[1].plan}</span>
                </small>
              </p>
              <p style="font-size: 16px;" class="text-danger">
                <small>
                    <span>${universe.pricing[2].price ? universe.pricing[2].price: "Free of Cost"}</span>
                    <br>
                    <span>${universe.pricing[2].plan}</span>
                </small>
              </p>
           </div>
           <div class ="d-flex justify-content-between mt-3">
               <div>
                  <h5>Features</h5>
                    <ul>
                        <li><small>${universe.features}</small></li>
                        <li><small>${universe.features}</small></li>
                        <li><small>${universe.features}</small></li>
                    </ul>
               </div>
               <div>
                   <h5>Integrations</h5>
                    <ul>
                        <li><small>${universe.integrations[0] ? universe.integrations[0]: "No data Found"}</small></li>
                        <li><small>${universe.integrations[1] ? universe.integrations[1]: "No data Found"}</small></li>
                        <li><small>${universe.integrations[2] ? universe.integrations[2]: "No data Found"}</small></li>
                    </ul>
               </div>
           </div>
        </div>
        <div>
           <img src="${universe.image_link[0]}" class="card-img-top rounded" alt="">
           <h5>${universe.input_output_examples}</h5>
        </div>
    </div> 
    `
}


loadData(6, toggleSpinner(true))