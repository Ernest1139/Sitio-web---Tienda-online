  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDuBvUNIV-BYvchsUty4spFt_wiXfTOvrw",
    authDomain: "proyecto-web---thompson.firebaseapp.com",
    databaseURL: "https://proyecto-web---thompson-default-rtdb.firebaseio.com/",
    projectId: "proyecto-web---thompson",
    storageBucket: "proyecto-web---thompson.appspot.com",
    messagingSenderId: "682750582027",
    appId: "1:682750582027:web:eda07890e30d60a065960e",
    measurementId: "G-6DVLX3T6FC"
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
        // if (window.location.pathname.includes("login")) {
        //     window.location.href = "/html/administrador.html";
        // }
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