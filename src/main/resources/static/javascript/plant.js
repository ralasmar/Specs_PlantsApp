//get plant id from query parameter
const urlParams = new URLSearchParams(window.location.search);
const plantId = urlParams.get('id');
const submitUpdateForm = document.getElementById("update-form")
const updateContainer = document.getElementById("update-container")

const headers = {
    'Content-Type': 'application/json'
}
const baseUrl = "http://localhost:8080/api/plants/"

//CRUD FUNCTIONS FOR POSTING AND DELETING UPDATES
console.log("hello")
 const handleUpdateSubmit = async(event) => {
 console.log("hi")
    event.preventDefault()
    let bodyObj = {
        body: document.getElementById("update-input").value
    }
    console.log(bodyObj)
    await addUpdate(bodyObj);
    document.getElementById("update-input").value=''
 }

 async function addUpdate(plantId){


    const response = await fetch(`${baseUrl}${plantId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if(response.status == 200){
        return getUpdates();
    }
 }

async function getUpdates(plantId){
    await fetch(`${baseUrl}${plantId}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createUpdateCards(data))
        .catch(err => console.log(err))
}
async function getUpdateById(updateId){
    await fetch(baseUrl + updateId, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))
}
async function handleUpdateDelete(updateId){
    await fetch(baseUrl + updateId, {
        method: "DELETE",
        headers: headers
    })
        .catch(err => console.error(err))

    return getUpdates(plantId);
}
//create update cards, looping through array, create cards for each item, append it to container
const createUpdateCards = (array) => {
    updateContainer.innerHTML = ''
    array.forEach(obj => {
        let updateCard = document.createElement("div")
        updateCard.classList.add("update-card")
        updateCard.innerHTML = `
            <div class="card d-flex" style="width: 18rem; height:18rem;">
                <div class="card-body d-flex flex-column justify-content-between" style="height: available">
                    <p class="card-text">${obj.body}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-danger" onclick="handleUpdateDelete(${obj.id})">Delete</button>
                    </div>
                </div>
            </div>
        `
        updateContainer.append(updateCard);
    })
}
const populateUpdateModal = (obj) =>{
    updateBody.innerText = ''
    updateBody.innerText = obj.body
}

getUpdates(plantId);

submitUpdateForm.addEventListener("submit", handleUpdateSubmit)
