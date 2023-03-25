 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, onValue, ref, set, child, get, update, remove} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getStorage,ref as refStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

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
        
        if(childData.estatus=="1"){
            productos.innerHTML +=
            "<div class="+"'producto'"+"> " +
            "<img class='img-item' src="+" "+childData.urlImagen+" "+"> " +
            "<p class='nombre'>"+childData.nombre +"</p>"+
            "<p class='descripcion' style='font-size: .9em;'> "+childData.descripcion +"</p>"+
            "<p class='precio'>$"+childData.precio +"</p>"+
            "<button class='boton-comprar'>Comprar</button>"+
            "</div>";
        }
        
        });
    },
    {
        onlyOnce: true,
    }
    );
}
