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

document.getElementById('login-btn').addEventListener('click', (e) => {
    e.preventDefault()
    const userUsername = document.getElementById('username-login')
    const userPassword = document.getElementById('password-login')
    console.log('Hi')
        if(usernames.includes(userUsername.value.toLowerCase())){
            onValue(userData, function(snapshot) {
                if(snapshot.val()!=null){
                    let arr = (Object.values(snapshot.val()))
                    let idx = arr.findIndex(val => (val.Username == userUsername.value.toLowerCase()))
                    if(arr[idx].Password == userPassword.value){
                        window.location='./chatbot.html'
                    }else{
                        window.alert("The password is incorrect!");
                    }
                }
                });
        }else{
            window.alert("This username does not exist!");
        }
    
         
    });
