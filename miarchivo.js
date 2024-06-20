// Clase para definir un equipo
class Equipo {
    constructor(nombre, precio, precioCompra) {
        this.nombre = nombre;
        this.precio = precio;
        this.precioCompra = precioCompra;
    }
}

// Inicializar equipos desde el localStorage o usar los valores predeterminados
let equiposDisponibles = JSON.parse(localStorage.getItem('equiposDisponibles')) || [
    new Equipo('Tabla de Surf', 15, 150),
    new Equipo('Kayak', 20, 200),
    new Equipo('Paddleboard', 25, 250),
    new Equipo('Balón', 25, 1500) // Asegurarse de que tenga precioCompra
];

// Inicializar carrito desde el localStorage o usar un array vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Guardar equipos en el localStorage
function guardarEquiposEnStorage() {
    localStorage.setItem('equiposDisponibles', JSON.stringify(equiposDisponibles));
}

// Guardar carrito en el localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para eliminar acentos y hacer que la cadena sea minúscula
function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Mostrar los equipos disponibles en el DOM
function mostrarEquipos() {
    const equiposLista = document.getElementById('equiposLista');
    if (equiposLista) {
        equiposLista.innerHTML = '<h2>Equipos Disponibles</h2>';
        equiposDisponibles.forEach(equipo => {
            const equipoElement = document.createElement('p');
            equipoElement.textContent = `${equipo.nombre} - $${equipo.precio} por hora / $${equipo.precioCompra} para comprar`;
            equiposLista.appendChild(equipoElement);
        });
    }
}

// Mostrar los equipos disponibles en la lista de compra
function mostrarEquiposEnCompra() {
    const nombreEquipoSelect = document.getElementById('nombreEquipo');
    if (nombreEquipoSelect) {
        nombreEquipoSelect.innerHTML = '';
        equiposDisponibles.forEach(equipo => {
            const optionElement = document.createElement('option');
            optionElement.value = equipo.nombre;
            optionElement.textContent = `${equipo.nombre} - $${equipo.precioCompra} para comprar`;
            nombreEquipoSelect.appendChild(optionElement);
        });
    }
}

// Mostrar los equipos en el carrito
function mostrarCarrito() {
    const carritoLista = document.getElementById('carritoLista');
    if (carritoLista) {
        carritoLista.innerHTML = '<h2>Equipos en el Carrito</h2>';
        if (carrito.length === 0) {
            carritoLista.innerHTML += '<p>No hay equipos en el carrito.</p>';
        } else {
            carrito.forEach(item => {
                const carritoElement = document.createElement('p');
                carritoElement.textContent = `${item.nombre} - $${item.precioCompra}`;
                carritoLista.appendChild(carritoElement);
            });
        }
    }
}

// Buscar un equipo por nombre
function buscarEquipo(nombre) {
    const normalizedNombre = normalizeString(nombre);
    return equiposDisponibles.find(equipo => normalizeString(equipo.nombre) === normalizedNombre);
}

// Agregar un nuevo equipo
function agregarEquipo() {
    const nuevoNombre = document.getElementById('nuevoNombreEquipo').value;
    const nuevoPrecio = parseFloat(document.getElementById('nuevoPrecioEquipo').value);
    const nuevoPrecioCompra = parseFloat(document.getElementById('nuevoPrecioCompra').value);

    const resultadoElement = document.getElementById('resultado');

    if (!nuevoNombre || isNaN(nuevoPrecio) || isNaN(nuevoPrecioCompra)) {
        resultadoElement.textContent = 'Por favor, ingrese un nombre y precios válidos para el nuevo equipo.';
        resultadoElement.className = 'mensaje-error';
        return;
    }

    if (!buscarEquipo(nuevoNombre)) {
        equiposDisponibles.push(new Equipo(nuevoNombre, nuevoPrecio, nuevoPrecioCompra));
        guardarEquiposEnStorage();
        mostrarEquipos();
        mostrarEquiposEnCompra();
        resultadoElement.textContent = `El equipo "${nuevoNombre}" ha sido agregado con éxito.`;
        resultadoElement.className = 'mensaje-exito';
    } else {
        resultadoElement.textContent = `El equipo "${nuevoNombre}" ya existe.`;
        resultadoElement.className = 'mensaje-error';
    }
}

// Eliminar un equipo por nombre
function eliminarEquipo() {
    const eliminarNombre = document.getElementById('eliminarNombreEquipo').value;

    const index = equiposDisponibles.findIndex(equipo => normalizeString(equipo.nombre) === normalizeString(eliminarNombre));
    const resultadoElement = document.getElementById('resultado');

    if (index !== -1) {
        equiposDisponibles.splice(index, 1);
        guardarEquiposEnStorage();
        mostrarEquipos();
        mostrarEquiposEnCompra();
        resultadoElement.textContent = `El equipo "${eliminarNombre}" ha sido eliminado con éxito.`;
        resultadoElement.className = 'mensaje-exito';
    } else {
        resultadoElement.textContent = `El equipo "${eliminarNombre}" no se encuentra.`;
        resultadoElement.className = 'mensaje-error';
    }
}

// Calcular el costo total del alquiler
function calcularCostoTotal() {
    const nombreEquipo = document.getElementById('nombreEquipo').value;
    const equipo = buscarEquipo(nombreEquipo);
    const resultadoElement = document.getElementById('resultado');

    if (!equipo) {
        resultadoElement.textContent = `El equipo "${nombreEquipo}" no está disponible.`;
        resultadoElement.className = 'mensaje-error';
        return;
    }

    const precioEquipo = equipo.precio;
    const horasAlquiler = parseInt(document.getElementById('horasAlquiler').value);
    const esMiembroPremium = document.getElementById('miembroPremium').checked;

    if (isNaN(horasAlquiler) || horasAlquiler <= 0) {
        resultadoElement.textContent = "Ingrese valores válidos para las horas de alquiler.";
        resultadoElement.className = 'mensaje-error';
        return;
    }

    const costoBase = precioEquipo * horasAlquiler;
    const impuestos = costoBase * 0.10;
    let descuento = 0;
    let mensajeDescuento = "";

    if (esMiembroPremium) {
        descuento = costoBase * 0.05;
        mensajeDescuento = `Como eres miembro premium, se te aplica un descuento del 5%.`;
    }

    const costoTotal = costoBase + impuestos - descuento;

    const mensaje = `El costo total para alquilar el equipo "${nombreEquipo}" por ${horasAlquiler} horas es $${costoTotal.toFixed(2)}. Se añade un 10% de impuestos ($${impuestos.toFixed(2)}). ${mensajeDescuento}`;

    resultadoElement.textContent = mensaje;
    resultadoElement.className = 'mensaje-exito';
}

// Agregar equipo al carrito
function agregarAlCarrito() {
    const nombreEquipo = document.getElementById('nombreEquipo').value;
    const equipo = buscarEquipo(nombreEquipo);
    const resultadoElement = document.getElementById('resultado');

    if (!equipo) {
        resultadoElement.textContent = `El equipo "${nombreEquipo}" no está disponible.`;
        resultadoElement.className = 'mensaje-error';
        return;
    }

    carrito.push(equipo);
    guardarCarritoEnStorage();
    mostrarCarrito();

    resultadoElement.textContent = `El equipo "${nombreEquipo}" ha sido añadido al carrito.`;
    resultadoElement.className = 'mensaje-exito';
}

// Finalizar compra
function finalizarCompra() {
    const resultadoCarritoElement = document.getElementById('resultadoCarrito');

    if (carrito.length === 0) {
        resultadoCarritoElement.textContent = 'No hay equipos en el carrito para comprar.';
        resultadoCarritoElement.className = 'mensaje-error';
        return;
    }

    const total = carrito.reduce((acc, equipo) => acc + equipo.precioCompra, 0);
    carrito = [];
    guardarCarritoEnStorage();
    mostrarCarrito();

    resultadoCarritoElement.textContent = `Compra finalizada. El total es $${total.toFixed(2)}.`;
    resultadoCarritoElement.className = 'mensaje-exito';
}

// Mostrar los equipos disponibles al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarEquipos();
    mostrarEquiposEnCompra();
    mostrarCarrito();

    if (document.getElementById('calcularCostoButton')) {
        document.getElementById('calcularCostoButton').addEventListener('click', calcularCostoTotal);
    }
    if (document.getElementById('agregarEquipoButton')) {
        document.getElementById('agregarEquipoButton').addEventListener('click', agregarEquipo);
    }
    if (document.getElementById('eliminarEquipoButton')) {
        document.getElementById('eliminarEquipoButton').addEventListener('click', eliminarEquipo);
    }
    if (document.getElementById('agregarAlCarritoButton')) {
        document.getElementById('agregarAlCarritoButton').addEventListener('click', agregarAlCarrito);
    }
    if (document.getElementById('finalizarCompraButton')) {
        document.getElementById('finalizarCompraButton').addEventListener('click', finalizarCompra);
    }
});
