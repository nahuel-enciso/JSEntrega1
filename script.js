// Creo un objeto llamado "patentes" que guarda los valores de cada bimestre

const patentes = { 
    "Enero-Febrero": undefined,
    "Marzo/Abril": undefined,
    "Mayo/Junio": undefined,
    "Julio/Agosto": undefined,
    "Septiembre/Octubre": undefined,
    "Noviembre/Diciembre": undefined
};// Cada Key es un bimestre y el value inicial === undefined
console.log(patentes);

// Creo un array con los nombres de todos los bimestres para recorrerlos más fácil
const nombresBimestres = [
    "Enero-Febrero", "Marzo/Abril", "Mayo/Junio", "Julio/Agosto", "Septiembre/Octubre", "Noviembre/Diciembre"
];

// Esta función busca cuáles bimestres no tienen valor cargado *FUNCION 1*
function obtenerBimestresSinCargar() {
    const bimestresSinCargar = []; // Creo un array vacío para guardar los resultados
    nombresBimestres.forEach((bimestre, index) => { // recorro cada elemento del array nombresBimestres
        if (patentes[bimestre] === undefined) { // Si el valor de ese bimestre es undefined, lo agrego al array de bimestres sin cargar
            bimestresSinCargar.push({ nombre: bimestre, numero: index + 1 });// Guardo un objeto con el nombre y el número (index + 1 para que empiece en 1)
        }
    });
    return bimestresSinCargar; // Retorno array con los bimestres que faltan cargar
}


// Esta función calcula el total de todas las patentes cargadas *FUNCION 2*
function calcularTotalPatentes() {
    // Object.values() obtiene todos los valores del objeto en un array y reduce suma todos los valores del array
    const total = Object.values(patentes).reduce((suma, valor) => suma + valor, 0);
    return total; // Retorno el total calculado
}

// Esta es la función principal que carga las patentes *FUNCION 3*
function cargarPatentes() {
    let bimestresSinCargar = obtenerBimestresSinCargar(); // uso la funcion 1
    while (bimestresSinCargar.length > 0) {    // Se repite mientras haya bimestres sin cargar 
        let listaBimestres = "¿Qué bimestre desea cargar?\n"; // Creo la pregunta inicial
        bimestresSinCargar.forEach((bimestre) => {// Repaso los bimestre sin cargar y paso a texto en un string
            // Emprolijo con charAt(0).toUpperCase() y concateno el resto
            listaBimestres += `${bimestre.numero}-${bimestre.nombre.charAt(0).toUpperCase() + bimestre.nombre.slice(1)}\n`;
        });

        // aca pido el valor pagado por el bimestre
        const bimestreSeleccionado = prompt(listaBimestres);
        // Si el usuario cancela (null) o no ingresa nada (""), mostramos un mensaje
        if (bimestreSeleccionado === null || bimestreSeleccionado === "") {
            alert("Valor no válido. Por favor, intente nuevamente.");
            continue; // continue salta a la siguiente iteración del bucle
        }

        // Convierto el texto ingresado a número y le resto 1 para coincidir con los indices del array
        const bimestreIndex = parseInt(bimestreSeleccionado) - 1;

        // Consigo el nombre del bimestre con el índice
        const nombreBimestre = nombresBimestres[bimestreIndex];

        // Valido que el existe y que no esté cargado
        if (!nombreBimestre || patentes[nombreBimestre] !== undefined) {
            alert("Opción inválida o bimestre ya cargado");
            continue; // Vuelvo a empezar
        }

        // Usuario ingresa el valor pagado por la patente del bimestre obtenido
        const valor = prompt(`Ingrese el valor de la patente para ${nombreBimestre}:`);

        // Veo que ingrese algo
        if (valor !== null && valor !== "") {
            // parseFloat convierte el texto a número decimal
            // Guardo el valor en el objeto patentes
            patentes[nombreBimestre] = parseFloat(valor);

            // Mensaje de confirmación
            alert(`Patente cargada: ${nombreBimestre} - $${valor}`);

            // Ver en consola como se completa el objeto
            console.log("Estado actual del objeto patentes:", patentes);
        }

        // Actualizo la lista de bimestres sin cargar *FUNCION 1*
        bimestresSinCargar = obtenerBimestresSinCargar();
    }

    // Si no quedan sin cargar, se muestra el total
    if (bimestresSinCargar.length === 0) {
        // llamo a la FUNCION 2
        const total = calcularTotalPatentes();

        // Muestro el total de los gastos ingresados
        alert(`TUS GASTOS ANUALES DE PATENTES FUERON DE: $${total}`);

        // Veo el Objeto Inicial completo
        console.log("Patentes completas:", patentes);
    }
}
// Invoco a la Funcion 3 para que se ejecute la app
cargarPatentes();