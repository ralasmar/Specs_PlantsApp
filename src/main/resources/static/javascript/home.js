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
//async function getPlantById(plantId){
//    await fetch(baseUrl + plantId, {
//        method: "GET",
//        headers: headers
//    })
//        .then(res => res.json())
//        .then(data => populateModal(data))
//        .catch(err => console.error(err.message))
//}
//async function handlePlantEdit(plantId){
//    let bodyObj = {
//        id: plantId,
//        plantName: document.getElementById("plant-input").value,
//        photoUrl: document.getElementById("photo-input").value,
//        plantNotes: document.getElementById("plant-notes-input").value
//        }
//    await fetch(baseUrl, {
//        method: "PUT",
//        body: JSON.stringify(bodyObj),
//        headers: headers
//    })
//        .catch(err => console.error(err))
//
//    return getPlants(userId);
//}

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
console.log(array)
    array.forEach(plant => {
        let plantCard = document.createElement("div")
        plantCard.classList.add("plant-card")

        plantCard.innerHTML = `

                <div class="card d-flex" style="width: 30rem; height:30rem; margin: 30px">
                    <div class="card-body d-flex flex-column justify-content-between" style="height: available">
                        <p class="card-plantName">${plant.plantName}</p>
                   <a href="plant.html?id=${plant.id}">
                       <img class="card-photoUrl" src="${plant.photoUrl}"/>
                    </a>
                    <p class="card-plantNotes">${plant.plantNotes}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-danger" onclick="handleDelete(${plant.id})">Delete</button>
                        <button onclick="getPlantById(${plant.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#plant-edit-modal">Edit</button>

                    </div>
                </div>
            </div>
        `;

        plantContainer.append(plantCard)
    })
}
//method which accepts an object as an argument and uses it to populate fields within the modal and assign a data tag to the save button element
const populateModal = (obj) => {
    plantBody.innerText = ''
    plantBody.innerText = obj.body
    //updatePlantBtn.setAttribute('data-plant-id', obj.id)
}
//invoke getPlants method
getPlants(userId);



//event listeners
submitForm.addEventListener("submit", handleSubmit)

//updatePlantBtn.addEventListener("click", (event) => {
//    let plantId = event.target.getAttribute('data-plant-id')
//    handlePlantEdit(plantId);
//})








