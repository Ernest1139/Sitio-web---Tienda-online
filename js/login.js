  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCZIX9wlPLLRh5K5qk_g961Mh2Fz2ddDLM",
    authDomain: "dbweb-da9ef.firebaseapp.com",
    databaseURL: "https://dbweb-da9ef-default-rtdb.firebaseio.com",
    projectId: "dbweb-da9ef",
    storageBucket: "dbweb-da9ef.appspot.com",
    messagingSenderId: "1020692243373",
    appId: "1:1020692243373:web:aadb3d3a5adec49e0b7724",
    measurementId: "G-VZMNHGVF0F"
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




// Iniciar Sesión
function login(){
    event.preventDefault();
    let email = document.getElementById('email').value;
    let contra = document.getElementById('contraseña').value;

    if(email == "" || contra == ""){
        alert('Complete los campos');
        return;
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, contra).then((userCredential) => {
    alert('Bienvenido ' + email);
    sessionStorage.setItem('isAuth',"true");
    window.location.href = 'administrador.html';
    
    })
    .catch((error) => {
        alert('Usuario y o contraseña incorrectos')
    });

}



var btnCerrarSesion = document.getElementById('btnCerrarSesion');

if(btnCerrarSesion){
    btnCerrarSesion.addEventListener('click',  (e)=>{
        signOut(auth).then(() => {
        alert("SESIÓN CERRADA")
        window.location.href="login.html";
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    });
}

onAuthStateChanged(auth, async user => {
    console.log(window.location.pathname);
    if (user) {
        if (window.location.pathname.includes("login")) {
            window.location.href = "/html/administrador.html";
        }
    } else {
        if (window.location.pathname.includes("administrador")) {
            window.location.href = "/html/login.html";
        }
    }
});

var botonLogin = document.getElementById('btnIniciarSesion');

if(botonLogin){
    botonLogin.addEventListener('click', login);
}