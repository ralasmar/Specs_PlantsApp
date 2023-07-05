const loginForm = document.getElementById('login-form')
const loginFirstName = document.getElementById('login-firstName')
const loginLastName = document.getElementById('login-lastName')
const loginUsername = document.getElementById('login-username')
const loginPassword = document.getElementById('login-password')

const headers = {
    'Content-Type': 'application/json'
}
const baseUrl = 'http://localhost:8080/api/users'

const handleSubmit = async(event) => {
    event.preventDefault()

        let bodyObj = {
            firstName: loginFirstName.value,
            lastName: loginLastName.value,
            username: loginUsername.value,
            password: loginPassword.value
        }
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            body: JSON.stringify(bodyObj),
            headers: headers
        })
            .catch(err => console.error(err.message))

        const responseArr = await response.json()

        if (response.status === 200){
            document.cookie = `userId=${responseArr[1]}`
            window.location.replace(responseArr[0])
        }
}
loginForm.addEventListener("submit", handleSubmit)