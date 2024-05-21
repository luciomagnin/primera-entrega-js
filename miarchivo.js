function calcularCostoTotal() {
    const nombreEquipo = document.getElementById('nombreEquipo').value;
    const precioEquipo = parseFloat(document.getElementById('precioEquipo').value);
    const horasAlquiler = parseInt(document.getElementById('horasAlquiler').value);
    const esMiembroPremium = document.getElementById('miembroPremium').checked;

    if (isNaN(precioEquipo) || isNaN(horasAlquiler)) {
        alert("Ingrese valores válidos para el precio del equipo y las horas de alquiler.");
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

    document.getElementById('resultado').textContent = mensaje;
}
