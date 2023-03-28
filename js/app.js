 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, onValue, ref, set, child, get, update, remove} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getStorage,ref as refStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";


if (sessionStorage.getItem("isAuth") === null || sessionStorage.getItem("isAuth") !== "true") {
    window.location.href = "login.html";
}

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
const auth = getAuth(app);


// Declaración de objetos
var btnInsertar = document.getElementById("btnAgregar");
var btnConsultar = document.getElementById("btnConsultar");
var btnModificar = document.getElementById("btnModificar");
var btnDeshabilitar = document.getElementById("btnDeshabilitar");
var btnLimpiar = document.getElementById("btnLimpiar");
var btnMostrar = document.getElementById("btnMostrar");
var archivo = document.getElementById('imagen');

var codigo = "";
var precio = "";
var nombre = "";
var descripcion = "";
var urlImagen = "";
var estatus = 1;
var cantidad = 0;
var categoria = 0;
var nombreImagen = "";

function insertar() {
    event.preventDefault();
    leer();
    const dbref = ref(db);
    if(nombre == "" || descripcion == "" || codigo == "" || precio == "" || urlImagen == "" || estatus == "" || categoria == 0 || cantidad == 0){
        alert("Complete los campos");
    }else{
      //Validación para que no se repita el producto
        get(child(dbref, "productos/" + codigo))
        .then((snapshot) => {
        if (snapshot.exists() == true) {
            alert('El producto ya existe');
            return;
        }
        set(ref(db,"productos/" + codigo),{
            nombre:nombre,
            precio:precio,
            descripcion:descripcion,
            estatus:estatus,
            cantidad:cantidad,
            categoria:categoria,
            urlImagen:urlImagen})
            .then(() => {
                alert("Producto añadido");
                mostrarProductos();
            })
            .catch((error) => {
                alert("No se pudo insertar el producto -> " + error);
            });  
        })
        .catch((error) => {
            alert("Ocurrio un error " + error);
        });
        
    }
}

function modificar() {
    event.preventDefault();
    leer();
    if(nombre == "" || descripcion == "" || codigo == "" || precio == "" || urlImagen == "" || estatus == "" || categoria == 0 || cantidad == 0){
        alert("Complete los campos");
    }else {
        const dbref = ref(db);
        get(child(dbref, "productos/" + codigo))
        .then((snapshot) => {
        if (snapshot.exists()) {
            update(ref(db, "productos/" + codigo), {
                nombre:nombre,
                precio:precio,
                descripcion:descripcion,
                cantidad:cantidad,
                estatus:estatus,
                categoria:categoria,
                urlImagen:urlImagen,
            }).then(() => {
                alert("El registro se modifico");
                mostrarProductos();
            }).catch((error) => {
                alert("No se pudo modificar -> " + error);
            });
        } else {
            alert("Código inexistente, favor de colocar uno existente.");
        }
    })
    //     update(ref(db, "productos/" + codigo), {
    //     nombre:nombre,
    //     precio:precio,
    //     descripcion:descripcion,
    //     cantidad:cantidad,
    //     estatus:estatus,
    //     categoria:categoria,
    //     urlImagen:urlImagen,
    // })
        // .then(() => {
        //     alert("El registro se modifico");
        //     mostrarProductos();
        // })
        // .catch((error) => {
        //     alert("No se pudo modificar -> " + error);
        // });
    }
}

function mostrarProducto() {
    event.preventDefault();
    leer();
    if(codigo==""){
        alert('Ingresa un código');
        return;
    }
    const dbref = ref(db);
    get(child(dbref, "productos/" + codigo))
        .then((snapshot) => {
        if (snapshot.exists()) {
            nombre = snapshot.val().nombre;
            precio = snapshot.val().precio;
            descripcion = snapshot.val().descripcion;
            cantidad = snapshot.val().cantidad;
            estatus = snapshot.val().estatus;
            categoria = snapshot.val().categoria;
            urlImagen = snapshot.val().urlImagen;
            escribirInputs();
        } else {
            alert("No existe el producto");
        }
    })
    .catch((error) => {
        alert("Surgio un error " + error);
    });
}

function deshabilitar() {
    event.preventDefault();
    leer();
    // Referencia a la base de datos
    if(codigo =="" ){
        alert("Introduce un código");
    }else {
        update(ref(db, "productos/" + codigo), {
        estatus:0
    })
    .then(() => {
        alert("El Producto ha sido deshabilitado");
        mostrarProductos();
        })
        .catch((error) => {
        alert("No se pudo actualizar -> " + error);
        });
    }
}

async function cargarImagen(){
    const file = event.target.files[0];
    const name = event.target.files[0].name;
    
    const storageRef = refStorage(storage, 'imagenes/'+name);
    await uploadBytes(storageRef, file).then((snapshot) => {
    nombreImagen = name;
    });

}

function descargarImagen(){

    archivo = nombreImagen;
    alert('Archivo = '+ archivo);
    const storageRef = refStorage(storage, 'imagenes/'+ archivo);
    // Get the download URL
    getDownloadURL(storageRef)
    .then((url) => {
        document.getElementById('url').value=url;
        urlImagen =url;
        document.getElementById('imgPreview').src=urlImagen;
        document.getElementById('imgPreview').classList.remove('none');
    })
    .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
        case 'storage/object-not-found':
            alert("No existe el archivo");
        break;

        case 'storage/unauthorized':
            alert("No tiene permisos");
        break;

        case 'storage/canceled':
            alert("Se canceló la subida")
        break;

        case 'storage/unknown':
            alert("Error desconocido");
        break;
    }
    });
}

async function obtenerUrl(){
    await cargarImagen();
    await descargarImagen();
}

function mostrarProductos(){
    event.preventDefault();
    const dbRef = ref(db, "productos");
    productos.classList.remove("d-none");

    productos.innerHTML = `<thead><tr>
					<th scope="col" width="10%"">Código</th>
					<th scope="col" width="20%"">Nombre</th>
					<th scope="col" width="15%"">Precio</th>
					<th scope="col" width="30%"">Descripcion</th>
					<th scope="col" width="15%"">Imagen</th>
                    <th scope="col" width="5%"">Cantidad</th>
                    <th scope="col" width="5%"">Estatus</th>
                    <th scope="col" width="10%"">Categoria</th>
				</tr></thead><tbody></tbody>`;
onValue(dbRef,(snapshot) => {

    snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        let categoriaTexto = '';
        let estatusTexto = '';

        // convertir valor de categoria a texto
        if(childData.categoria == 1) {
            categoriaTexto = 'Tarjetas Graficas';
        }else if (childData.categoria == 2) {
            categoriaTexto = 'Gabinetes';
        }else if((childData.categoria == 3)) {
            categoriaTexto = 'Procesadores';
        }else if(((childData.categoria == 4))) {
            categoriaTexto = 'Tarjetas Madre';
        }else if(((childData.categoria == 5))) {
            categoriaTexto = 'Memorias RAM';
        }

        // convertir valor de estatus a texto
        if(childData.estatus == 0) {
            estatusTexto = 'Inactivo';
        }else if(childData.estatus == 1) {
            estatusTexto = 'Activo'
        }


        productos.lastElementChild.innerHTML += `<tr>
						<th class="text-center" scope="row">${childKey}</th>
						<td class="text-center">${childData.nombre}</td>
						<td class="text-center">${childData.precio}</td>
						<td class="text-center">${childData.descripcion}</td>
						<td class="text-center"><img class="imgModificar" src="${childData.urlImagen}" alt="Imagen de ${childData.nombre}"/></td>
                        <td class="text-center">${childData.cantidad}</td>
                        <td class="text-center">${estatusTexto}</td>
                        <td class="text-center">${categoriaTexto}</td>
					</tr>`;
    });
    },
    {
        onlyOnce: true,
    }
    
    );
}

function leer() {
    precio = document.getElementById("precio").value;
    nombre = document.getElementById("nombre").value;
    descripcion = document.getElementById("descripcion").value;
    codigo = document.getElementById('codigo').value;
    urlImagen = document.getElementById('url').value;
    cantidad = document.getElementById('cantidad').value;
    estatus = document.getElementById('estatus').value;
    categoria = document.getElementById('categoria').value;
}

function escribirInputs(){
    document.getElementById('precio').value = precio;
    document.getElementById('nombre').value = nombre;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('codigo').value = codigo;
    document.getElementById('url').value = urlImagen;
    document.getElementById('imgPreview').src=document.getElementById('url').value;
    document.getElementById('imgPreview').classList.remove('none');
    document.getElementById('cantidad').value=cantidad;
    document.getElementById('estatus').value=estatus;
    document.getElementById('categoria').value=categoria;
} 

// Limpiar imagen
function limpiar(){
    event.preventDefault();
    document.getElementById("precio").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById('codigo').value = "";
    document.getElementById('url').value = "";
    document.getElementById('imgPreview').src =""; 
    document.getElementById('cantidad').value="";
    document.getElementById('estatus').value="";
    document.getElementById('categoria').value=0;
    document.getElementById('imgPreview').classList.add('none');
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



btnInsertar.addEventListener("click", insertar);
archivo.addEventListener("change", obtenerUrl);
btnConsultar.addEventListener('click', mostrarProducto);
btnLimpiar.addEventListener('click', limpiar);
btnDeshabilitar.addEventListener('click', deshabilitar);
btnModificar.addEventListener('click', modificar);
btnMostrar.addEventListener('click', mostrarProductos);
