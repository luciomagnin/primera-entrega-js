function calcularCostoTotal() {
    const nombreEquipo = document.getElementById('nombreEquipo').value;
    const precioEquipo = parseFloat(document.getElementById('precioEquipo').value);
    const horasAlquiler = parseInt(document.getElementById('horasAlquiler').value);

    if (isNaN(precioEquipo) || isNaN(horasAlquiler)) {
        alert("Ingrese valores válidos para el precio del equipo y las horas de alquiler.");
        return;
    }

    const impuestos = precioEquipo * 0.10;
    const precioConImpuestos = precioEquipo + impuestos;
    const costoTotal = precioConImpuestos * horasAlquiler;

    const mensaje = `El costo total para alquilar el equipo "${nombreEquipo}" por ${horasAlquiler} horas es $${costoTotal.toFixed(2)}. Se añade un 10% de impuestos ($${impuestos.toFixed(2)} por hora).`;

    document.getElementById('resultado').textContent = mensaje;
}
