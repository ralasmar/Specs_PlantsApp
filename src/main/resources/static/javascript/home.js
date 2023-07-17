//LOGIN/LOGOUT---------------------------------------------------------------
//read cookie to log in
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

//dom elements
const submitForm = document.getElementById("plant-form")
const plantContainer = document.getElementById("plant-container")

//modal elements
let plantBody = document.getElementById('plant-body')
let updateBody = document.getElementById('update-body')
let updatePlantBtn = document.getElementById('update-plant-button')

  const name = document.getElementById("plantName")
    const photo = document.getElementById("plantPhoto")
    const notes = document.getElementById("plantNotes")
    const modal = document.querySelector(".modal-footer")





const headers = {
    'Content-Type': 'application/json'
}
const baseUrl = "http://localhost:8080/api/plants/"

//logout method that clears cookie
function handleLogout(){
    let c = document.cookie.split(";")
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

//CRUD OPERATIONS--------------------------------------------------------------
//form that submits new plants
//const handleSubmit = async(event) => {
//
//    let bodyObj = {
//        plantName: document.getElementById("plant-input").value,
//        photoUrl: document.getElementById("photo-input").value,
//        plantNotes: document.getElementById("plant-notes-input").value
//    }
//    await addPlant(bodyObj);
//
//     document.getElementById("plant-input").value = ''
//     document.getElementById("photo-input").value = ''
//     document.getElementById("plant-notes-input").value = ''
//
//}

async function addPlant(plantId){
    event.preventDefault()
    const plantNameInput = document.getElementById("plant-input")
    const photoUrlInput = document.getElementById("photo-input")
    const plantNotesInput = document.getElementById("plant-notes-input")

//    const name = plantNameInput.value
//    const photo = photoUrlInput.value
//    const notes = plantNotesInput.value

    let bodyObj = {
        plantName: plantNameInput.value,
        photoUrl: photoUrlInput.value,
        plantNotes: plantNotesInput.value
}
    const response = await fetch(`${baseUrl}user/${userId}`,{
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if(response.status == 200){
        return getPlants(userId);
    }
    plantNameInput.value = ""
    photoUrlInput.value = ""
    plantNotesInput.value = ""
}
//retrieve plants that are associated with user, create cards for them, append to container
async function getPlants(userId){
   await fetch(`${baseUrl}user/${userId}`,{
            method: "GET",
            headers: headers
   })
        .then(response => response.json())
        .then(data => createPlantCards(data))
        .catch(err => console.error(err))
}
 //creating HTML elements for the popup window
    const form = document.createElement("form")
    const editHeading = document.createElement("h1")
    const plantLabel = document.createElement("label")
    const plantNameInput = document.createElement("input")
    const photoLabel = document.createElement("label")
    const photoUrlInput = document.createElement("input")
    const plantNotesLabel = document.createElement("label")
    const plantNotesInput = document.createElement("input")
    const submitButton = document.createElement("button")

//edit a plant
async function editPlant(plant){

    console.log(event.currentTarget)
    //popup window for editing
    const width = 350;
    const height = 250;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const popupWindow = window.open("", "Edit Plant", `width=${width}, height=${height}, top=${top}, left=${left}`);

    //setting content for the form elements
    editHeading.innerText = "Edit Plant"
    plantLabel.innerText = "Plant name: "
    photoLabel.innerText = "Photo Url: "
    plantNotesLabel.innerText = "Notes: "
    submitButton.type = "submit"
    submitButton.innerText = "Update"

    //inputting existing values for name, photo, and notes
    plantNameInput.value = plant.plantName
    console.log(plant)
    console.log(plant.plantName)
    photoUrlInput.value = plant.photoUrl
    plantNotesInput.value = plant.plantNotes

    //adding form elements
    form.appendChild(document.createElement("br"));
    form.appendChild(plantLabel);
    form.appendChild(plantNameInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(photoLabel);
    form.appendChild(photoUrlInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(plantNotesLabel);
    form.appendChild(plantNotesInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(submitButton);

    //appending form to popup window
    popupWindow.document.body.appendChild(form)

    //adding an event listener
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        //retrieve updated values
//        const updatedName = plantNameInput.value
//        const updatedPhoto = photoUrlInput.value
//        const updatedNotes = plantNotesInput.value

        popupWindow.close()

        let bodyObj = {
            plantName: plantNameInput.value,
            photoUrl: photoUrlInput.value,
            plantNotes: plantNotesInput.value
        }

        try {
            const response = await fetch(`${baseUrl}${plant.id}`,{
                method: "PUT",
                headers: headers,
                body: JSON.stringify(bodyObj)
            })

            if(response.status == 200){
                alert("Plant has been updated")
                getPlants(userId)
                console.log(plant)
                console.log(plant.plantName)
            } else {
                console.error("error updating plant", response.status)
            }
        } catch (error){
            console.error("Error updating plant", error)
        }
    })
}

////update a plant
async function getPlantById(plantId){
    await fetch(baseUrl + plantId, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))
}
async function handlePlantEdit(event){
const plantId = event.target.parentNode.id

    let bodyObj = {
        id: plantId,
        plantName: name.value,
        photoUrl: photo.value,
        plantNotes:notes.value
        }
    await fetch(`${baseUrl}${plantId}`, {
        method: "PUT",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err))

    return getPlants(userId);
}

//delete a plant
async function handleDelete(plantId){
    await fetch(baseUrl + plantId, {
        method: "DELETE",
        headers: headers
    })
        .catch(err => console.error(err))

    return getPlants(userId);
}
//HELPER FUNCTIONS------------------------------------------------------

//accept an array of objects, loop through array, create card for each item, append to container
const createPlantCards = (plants) => {
    plantContainer.innerHTML = ''

    plants.forEach(plant => {
    console.log(plant)
        let plantCard = document.createElement("div")
        plantCard.classList.add("plant-card")

        plantCard.innerHTML = `
                <div class="card d-inline-flex" style="margin: 20px; background-color: pink; border-color: pink">
                    <div class="card-body d-flex flex-column justify-content-between" >
                            <p id="card-plant-input" class="card-plantName">${plant.plantName}</p>
                       <a href="plant.html?id=${plant.id}">
                           <img id="card-photo-input" class="card-photoUrl" src="${plant.photoUrl}"/>
                        </a>
                        <p id="card-notes-input" class="card-plantNotes">${plant.plantNotes}</p>
                        <div class="d-flex justify-content-between">
                        <button onclick="getPlantById(${plant.id})" type="button" class="btn btn-primary"data-bs-toggle="modal" style="background-color: green; border-color: green" data-bs-target="#plant-edit-modal">
                        Edit</button>
                        <button id="delete-btn-plant-card" class="btn btn-danger" style="background-color: yellow; border-color: yellow; color: black" onclick="handleDelete(${plant.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;

        plantContainer.append(plantCard)

    })
}



//method which accepts an object as an argument and uses it to populate fields within the modal and assign a data tag to the save button element
const populateModal = (obj) => {

    name.innerText = ""
    photo.innerText = ""
    notes.innerText = ""
    modal.id = obj.id

    name.innerText = obj.plantName
    photo.innerText = obj.photoUrl
    notes.innerText = obj.plantNotes


}

//invoke getPlants method
getPlants(userId);

//event listeners
document.getElementById("plant-form").addEventListener("submit", function(event){
    event.preventDefault()
    addPlant(userId)
})

//submitForm.addEventListener("submit", handleSubmit)

//updatePlantBtn.addEventListener("click", (event) => {
//    let plantId = event.target.getAttribute('data-plant-id')
//    handlePlantEdit(plantId);
//})








