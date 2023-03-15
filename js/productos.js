 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getDatabase, onValue, ref, set, child, get, update, remove} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { getStorage,ref as refStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

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
const db = getDatabase();
const storage = getStorage();

// Generar Productos
let productos = document.getElementById('contenido-productos');
window.addEventListener('DOMContentLoaded',mostrarProductos)

function mostrarProductos(){
    const dbRef = ref(db, "productos");

    onValue(dbRef,(snapshot) => {
        productos.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
        
        if(childData.estatus=="0"){
            productos.innerHTML +=
            "<div class="+"'producto'"+"> " +
            "<img src="+" "+childData.urlImagen+" "+"> " +
            "<p class='nombre'>"+childData.nombre +"</p>"+
            "<p class='descripcion' style='font-size: .9em;'> "+childData.descripcion +"</p>"+
            "<p class='precio'>$"+childData.precio +"</p>"+
            "<a class='boton-comprar'>Comprar</a>"+
            "</div>";
        }
        
        });
    },
    {
        onlyOnce: true,
    }
    );
}



