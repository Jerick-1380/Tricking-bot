import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, get, remove, onValue } from 'firebase/database'


const appSettings = {
    databaseURL: 'https://user-information-d71b8-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)

const database = getDatabase(app)

const userData = ref(database)

let emails = []
let usernames = []

onValue(userData, function(snapshot) {
if(snapshot.val()!=null){
    let arr = (Object.values(snapshot.val()))
    emails = arr.map(obj => obj.Email)
    usernames = arr.map(obj => obj.Username)
}
});

document.getElementById('register-btn').addEventListener('click', (e) => {
    e.preventDefault()
    const userEmail = document.getElementById('email')
    const userUsername = document.getElementById('username')
    const userPassword = document.getElementById('password')

    if(userEmail.value.length < 8 || !userEmail.value.includes('.com') || !userEmail.value.includes('@') ){
        window.alert("Please input a valid email ")
    }else if(userUsername.value.length < 8){
        window.alert("Please make your username longer");
    }else if(userUsername.value.length < 6){
        window.alert("Please make your password longer");
    }else{
        if(emails.includes(userEmail.value.toLowerCase())){
            window.alert("This email has already been registered");
        }else if(usernames.includes(userUsername.value.toLowerCase())){
            window.alert("This username has already been taken!");
        }else{
            addData(userData, userEmail, userUsername, userPassword)
            onValue(userData, function(snapshot) {
                if(snapshot.val()!=null){
                    let arr = (Object.values(snapshot.val()))
                    emails = arr.map(obj => obj.Email)
                    usernames = arr.map(obj => obj.Username)
                }
                });
            window.alert("You have been successfully registered!");
            window.location='./index.html'
        }
    }
         
    });
      


function addData(userData, userEmail, userUsername, userPassword){
   push(userData, {
        Email: userEmail.value.toLowerCase(),
        Username: userUsername.value.toLowerCase(),
        Password: userPassword.value
    })
    console.log("Hi")

}
