// Clase para definir un equipo
class Equipo {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Array inicial de equipos disponibles
const equiposDisponibles = [
    new Equipo('Tabla de Surf', 15),
    new Equipo('Kayak', 20),
    new Equipo('Paddleboard', 25)
];

// Función para mostrar los equipos disponibles en el DOM
function mostrarEquipos() {
    const equiposLista = document.getElementById('equiposLista');
    equiposLista.innerHTML = '<h2>Equipos Disponibles</h2>';
    equiposDisponibles.forEach(equipo => {
        const equipoElement = document.createElement('p');
        equipoElement.textContent = `${equipo.nombre} - $${equipo.precio} por hora`;
        equiposLista.appendChild(equipoElement);
    });
}

// Función para buscar un equipo por nombre
function buscarEquipo(nombre) {
    return equiposDisponibles.find(equipo => equipo.nombre.toLowerCase() === nombre.toLowerCase());
}

// Función para agregar un nuevo equipo
function agregarEquipo() {
    const nuevoNombre = document.getElementById('nuevoNombreEquipo').value;
    const nuevoPrecio = parseFloat(document.getElementById('nuevoPrecioEquipo').value);

    if (!nuevoNombre || isNaN(nuevoPrecio)) {
        alert('Por favor, ingrese un nombre y un precio válidos para el nuevo equipo.');
        return;
    }

    if (!buscarEquipo(nuevoNombre)) {
        equiposDisponibles.push(new Equipo(nuevoNombre, nuevoPrecio));
        mostrarEquipos();
        alert(`El equipo "${nuevoNombre}" ha sido agregado con éxito.`);
    } else {
        alert(`El equipo "${nuevoNombre}" ya existe.`);
    }
}

// Función para eliminar un equipo por nombre
function eliminarEquipo() {
    const eliminarNombre = document.getElementById('eliminarNombreEquipo').value;

    const index = equiposDisponibles.findIndex(equipo => equipo.nombre.toLowerCase() === eliminarNombre.toLowerCase());
    if (index !== -1) {
        equiposDisponibles.splice(index, 1);
        mostrarEquipos();
        alert(`El equipo "${eliminarNombre}" ha sido eliminado con éxito.`);
    } else {
        alert(`El equipo "${eliminarNombre}" no se encuentra.`);
    }
}

// Función para calcular el costo total del alquiler
function calcularCostoTotal() {
    const nombreEquipo = document.getElementById('nombreEquipo').value;
    const equipo = buscarEquipo(nombreEquipo);
    const resultadoElement = document.getElementById('resultado');

    if (!equipo) {
        resultadoElement.textContent = `El equipo "${nombreEquipo}" no está disponible.`;
        resultadoElement.className = 'mensaje-error'; // Aplica la clase de error
        return;
    }

    const precioEquipo = equipo.precio;
    const horasAlquiler = parseInt(document.getElementById('horasAlquiler').value);
    const esMiembroPremium = document.getElementById('miembroPremium').checked;

    if (isNaN(horasAlquiler) || horasAlquiler <= 0) {
        resultadoElement.textContent = "Ingrese valores válidos para las horas de alquiler.";
        resultadoElement.className = 'mensaje-error'; // Aplica la clase de error
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
    resultadoElement.className = 'mensaje-exito'; // Aplica la clase de éxito
}

// Mostrar los equipos disponibles al cargar la página
mostrarEquipos();
