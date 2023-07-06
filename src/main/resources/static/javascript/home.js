//LOGIN/LOGOUT---------------------------------------------------------------
//read cookie to log in
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

//dom elements
const submitForm = document.getElementById("plant-form")
const plantContainer = document.getElementById("plant-container")

//modal elements
let plantBody = document.getElementById('plant-body')
let updatePlantBtn = document.getElementById('update-plant-button')

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
const handleSubmit = async(event) => {
    event.preventDefault()
    let bodyObj = {
        plantName: document.getElementById("plant-input").value,
        photoUrl: document.getElementById("photo-input").value,
        plantNotes: document.getElementById("plant-notes-input").value
    }
    await addPlant(bodyObj);
    document.getElementById("plant-input").value = ''
    document.getElementById("photo-input").value = ''
    document.getElementById("plant-notes-input").value = ''
}
async function addPlant(obj){
    const response = await fetch(`${baseUrl}user/${userId}`,{
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if(response.status == 200){
        return getPlants(userId);
    }
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

//update a plant
async function getPlantById(plantId){
    await fetch(baseUrl + plantId, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))
}
async function handlePlantEdit(plantId){
    let bodyObj = {
        id: plantId,
        body: plantBody.value
    }
    await fetch(baseUrl, {
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
const createPlantCards = (array) => {
    plantContainer.innerHTML = ''
    array.forEach(obj =>{
        let plantCard = document.createElement("div")
        plantCard.classList.add("m-2")
        plantCard.innerHTML = `
        <div class="card d-flex" style="width: 18rem; height:18rem;">
            <div class="card-body d-flex flex-column justify-content-between" style="height: available">
                <p class="card-plantName">${obj.plantName}</p>
                <img class="card-photoUrl" src= ${obj.photoUrl}/>
                <p class="card-plantNotes">${obj.plantNotes}</p>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-danger" onclick="handleDelete(${obj.id})">Delete</button>
                    <button onclick="getPlantById(${obj.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#plant-edit-modal">Edit</button>
                </div>
            </div>
        </div>
        `
        plantContainer.append(plantCard)
    })
}
//method which accepts an object as an argument and uses it to populate fields within the modal and assign a data tag to the save button element
const populateModal = (obj) => {
    plantBody.innerText = ''
    plantBody.innerText = obj.body
    updatePlantBtn.setAttribute('data-plant-id', obj.id)
}
//invoke getPlants method
getPlants(userId);

//event listeners
submitForm.addEventListener("submit", handleSubmit)

updatePlantBtn.addEventListener("click", (event) => {
    let plantId = event.target.getAttribute('data-plant-id')
    handlePlantEdit(plantId);
})








