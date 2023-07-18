//get plant id from query parameter
const urlParams = new URLSearchParams(window.location.search);
const plantId = urlParams.get('id');
//const submitUpdateForm = document.getElementById("update-form")
const updateContainer = document.getElementById("update-container")
const cookieArr = document.cookie.split(";").map(cookie => cookie.trim().split("="))
const userIdCookie = cookieArr.find(cookie => cookie[0] === "userId")
const userId = userIdCookie[1]

const headers = {
    'Content-Type': 'application/json'
}
const baseUrl = "http://localhost:8080/api/plants/"
const baseUrlUpdates = "http://localhost:8080/api/updates/"

//CRUD FUNCTIONS FOR POSTING AND DELETING UPDATES

//getting and displaying plant details using plant Id
async function getPlantDetails(plantId){
    const response = await fetch(`${baseUrl}${plantId}`, {
        method: "GET",
        headers: headers
    })

    const data = await response.json();

    //displaying plant details using retrieved data
    document.getElementById("plant-name").textContent = data.plantName;
    document.getElementById("plant-update").textContent = data.plantNotes;

    const plantImg = document.getElementById("plant-image");
    plantImg.src = data.photoUrl;
    console.log(data)
}

// const handleUpdateSubmit = async(event) => {
//    event.preventDefault()
//
//    let bodyObj = {
//        isHealthy: document.getElementById("health-rating-select").value,
//        date: document.getElementById("update-date").value,
//        updateBody: document.getElementById("update-input").value
//    }
//    console.log(bodyObj)
//
//    await addUpdate(bodyObj);
//
//    document.getElementById("health-rating-select").value = ''
//    document.getElementById("update-date").value = ''
//    document.getElementById("update-input").value = ''
// }
 //post a new update to a plant
  async function addUpdate(plantId){
        const isHealthy = document.getElementById("health-rating-select")
        const date = document.getElementById("update-date")
        const updateBody= document.getElementById("update-input")

        const updateHealth = isHealthy.value
        const update = updateBody.value
        const updateDate = date.value

        let bodyObj = {
            isHealthy: updateHealth,
            updateBody: update,
            date: updateDate
        }
        try {
         const response = await fetch(`${baseUrlUpdates}plant/${plantId}`, {
               method: "POST",
               body: JSON.stringify(bodyObj),
               headers: headers
         })
         if(response.status == 200){
               alert("Update Posted")

         }
         isHealthy.value = ""
         updateBody.value = ""
         date.value = ""

         getUpdates(plantId)

        } catch (error){
            console.error("error submitting update", error)
        }
 }

async function getUpdates(plantId){
   try {
    const response = await fetch(`${baseUrlUpdates}plant/${plantId}`, {
        method: "GET",
        headers: headers
    })
    if(response.status == 200){
        const updates = await response.json();

        //clearing existing inputs
        updateContainer.innerHTML = "";

        //Creating HTML elements
        updates.forEach((update) => {
            const updateCard = document.createElement("div")
            updateCard.classList.add("update")
            updateCard.innerHTML = `
                        <div class="update-card" >
                            <div class="card-body">
                            <p class="update-date">${update.date}</p>
                            <p class="update-health">Healthiness Level: ${update.isHealthy}</p>
                            <p class="update-body">${update.updateBody}</p>
                            </div>
                        </div>
                    `
                    const deleteBtn = document.createElement("button")
                    deleteBtn.id = "delete-btn"
                    deleteBtn.innerText = "Delete"
                    deleteBtn.addEventListener("click", () => handleUpdateDelete(update.id))

                    updateCard.appendChild(deleteBtn)
                    updateContainer.insertBefore(updateCard, updateContainer.firstChild)
        })
      } else {
        console.error("error getting updates", response.status)
      }
    } catch(error){
        console.error("Error getting updates", error)
    }
}
//async function getUpdateById(updateId){
//    await fetch(baseUrl + updateId, {
//        method: "GET",
//        headers: headers
//    })
//        .then(res => res.json())
//        .then(data => populateModal(data))
//        .catch(err => console.error(err.message))
//}
async function handleUpdateDelete(updateId){
    await fetch(baseUrlUpdates + updateId, {
        method: "DELETE",
        headers: headers
    })
        .catch(err => console.error(err))

    return getUpdates(plantId);
}
//create update cards, looping through array, create cards for each item, append it to container
//const createUpdateCards = (array) => {
//    updateContainer.innerHTML = ''
//    array.forEach(obj => {
//        let updateCard = document.createElement("div")
//        updateCard.classList.add("update-card")
//        updateCard.innerHTML = `
//            <div class="card d-flex" style="width: 18rem; height:18rem;">
//                <div class="card-body d-flex flex-column justify-content-between" style="height: available">
//                    <p class="card-text">${obj.body}</p>
//                    <div class="d-flex justify-content-between">
//                        <button class="btn btn-danger" onclick="handleUpdateDelete(${obj.id})">Delete</button>
//                    </div>
//                </div>
//            </div>
//        `
//        updateContainer.append(updateCard);
//    })
//}
//const populateUpdateModal = (obj) =>{
//    updateBody.innerText = ''
//    updateBody.innerText = obj.body
//}

document.getElementById("update-form").addEventListener("submit", function (event){
    event.preventDefault()
    addUpdate(plantId)
})

getPlantDetails(plantId)
getUpdates(plantId);
//submitUpdateForm.addEventListener("submit", handleUpdateSubmit)
