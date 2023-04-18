// Función para mostrar la lista de productos
function mostrarProductos() {
    // Obtener la lista de productos almacenados en localStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Obtener la lista HTML donde se mostrarán los productos
    let listaProductos = document.getElementById("listaProductos");

    // Limpiar la lista antes de mostrar los productos
    listaProductos.innerHTML = "";

    // Recorrer la lista de productos y agregarlos a la lista HTML
    productos.forEach(function (producto, indice) {
        let li = document.createElement("li");
        li.innerHTML = producto.nombre + " - " + producto.modelo + " -  $" + producto.precio;
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Eliminar";
        btnEliminar.onclick = function () {
            eliminarProducto(indice);
        };
        let btnModificar = document.createElement("button");
        btnModificar.innerHTML = "Modificar";
        btnModificar.onclick = function () {
            modificarProducto(indice);
        };
        li.appendChild(btnEliminar);
        li.appendChild(btnModificar);
        listaProductos.appendChild(li);
    });
}

// Obtener la lista de productos almacenados en localStorage
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Función para agregar un producto
function agregarProducto(evento) {
	evento.preventDefault();

	// Obtener los valores del formulario
	let nombre = document.getElementById("nombre").value;
	let modelo = document.getElementById("modelo").value;
	let precio = parseFloat(document.getElementById("precio").value);

	// Agregar el nuevo producto a la lista
	productos.push({ nombre: nombre, modelo: modelo, precio: precio });

	// Actualizar la lista de productos en el almacenamiento local
	localStorage.setItem("productos", JSON.stringify(productos));

	// Limpiar el formulario y mostrar la lista de productos actualizada
	document.getElementById("formulario").reset();
	mostrarProductos();
}

// Función para eliminar un producto
function eliminarProducto(indice) {
	// Eliminar el producto correspondiente de la lista
	productos.splice(indice, 1);

	// Actualizar la lista de productos en el almacenamiento local
	localStorage.setItem("productos", JSON.stringify(productos));

	// Mostrar la lista de productos actualizada
	mostrarProductos();
}

// Función para modificar el precio de un producto
function modificarProducto(index) {
	// Obtener el producto a modificar
	let productos = JSON.parse(localStorage.getItem("productos")) || [];
	let producto = productos[index];

	// Pedir al usuario el nuevo precio
	let nuevoPrecio = parseFloat(prompt("Ingrese el nuevo precio del producto:", producto.precio));

	// Validar que se haya ingresado un precio válido
	if (isNaN(nuevoPrecio)) {
		alert("El precio ingresado no es válido");
		return;
	}

	// Actualizar el precio del producto
	producto.precio = nuevoPrecio;

	// Actualizar la lista de productos en el almacenamiento local
	localStorage.setItem("productos", JSON.stringify(productos));

	// Mostrar la lista de productos actualizada
	mostrarProductos();
}


// Función para mostrar la lista de productos
function mostrarProductos() {
	// Obtener la lista de productos almacenados en localStorage
	productos = JSON.parse(localStorage.getItem("productos")) || [];

	// Obtener la lista de productos del HTML
	let listaProductos = document.getElementById("listaProductos");

	// Limpiar la lista de productos existente
	listaProductos.innerHTML = "";

	// Recorrer la lista de productos y agregarlos al HTML
	for (let i = 0; i < productos.length; i++) {
		let producto = productos[i];

		// Crear un elemento de lista para el producto
		let li = document.createElement("li");

		// Agregar el nombre y modelo del producto al elemento de lista
		let nombreModelo = document.createTextNode(producto.nombre + " - " + producto.modelo + " - ");
		li.appendChild(nombreModelo);

		// Agregar el precio del producto al elemento de lista
		let precio = document.createElement("span");
		precio.innerHTML = "$" + producto.precio.toFixed(2);
		li.appendChild(precio);

		// Agregar botón para eliminar el producto
		let botonEliminar = document.createElement("button");
		botonEliminar.innerHTML = "Eliminar";
		botonEliminar.addEventListener("click", function() {
			eliminarProducto(i);
		});
		li.appendChild(botonEliminar);

		// Agregar botón para modificar el producto
		let botonModificar = document.createElement("button");
		botonModificar.innerHTML = "Modificar";
		botonModificar.addEventListener("click", function() {
			modificarProducto(i);
		});
		li.appendChild(botonModificar);

		 // Agregar el elemento de lista al HTML
		listaProductos.appendChild(li);
	}
}

// Mostrar la lista de productos al cargar la página
mostrarProductos();

// Escuchar el evento submit del formulario para agregar un nuevo producto
document.getElementById("formulario").addEventListener("submit", agregarProducto);

