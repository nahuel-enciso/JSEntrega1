/* JAVASCRIPT - Aquí va la lógica e interactividad de la página */

/* Selecciona los elementos del HTML que vamos a usar en JavaScript */
const form = document.querySelector('.form');              /* Selecciona el formulario */
const btnBorrar = document.querySelector('.btnBorrar');   /* Selecciona el botón Borrar */
resultado.style.display = 'none';                          /* Oculta el elemento resultado al cargar */

/* Un objeto que guarda los valores de gastos por cada bimestre */
let gastosBimestrales = {
    eneFeb: 0,      /* Enero-Febrero */
    marAbr: 0,      /* Marzo-Abril */
    mayJun: 0,      /* Mayo-Junio */
    julAgo: 0,      /* Julio-Agosto */
    sepOct: 0,      /* Septiembre-Octubre */
    novDic: 0       /* Noviembre-Diciembre */
};

/* Cuando el usuario hace click en el botón Calcular, se ejecuta esta función */
form.addEventListener('submit', function (e) {
    e.preventDefault();  /* Previene que la página se recargue (comportamiento por defecto del form) */

    /* Obtiene los valores de cada input y los guarda en el objeto gastosBimestrales */
    gastosBimestrales = {
        eneFeb: parseFloat(document.querySelector('#eneFeb').value) || 0,      /* Convierte a número decimal */
        marAbr: parseFloat(document.querySelector('#marAbr').value) || 0,      /* || 0 significa: si está vacío, usa 0 */
        mayJun: parseFloat(document.querySelector('#mayJun').value) || 0,
        julAgo: parseFloat(document.querySelector('#julAgo').value) || 0,
        sepOct: parseFloat(document.querySelector('#sepOct').value) || 0,
        novDic: parseFloat(document.querySelector('#novDic').value) || 0
    };

    /* Calcula el total sumando todos los valores del objeto */
    const total = Object.values(gastosBimestrales).reduce((sum, valor) => sum + valor, 0);
    /* Object.values = extrae solo los números del objeto */
    /* reduce = suma todos los números juntos */
    
    /* Muestra el total en el span con id "totalValor" redondeado a 2 decimales */
    document.querySelector('#totalValor').textContent = total.toFixed(2);
    /* toFixed(2) = redondea a 2 decimales (ejemplo: 123.456 se convierte en 123.46) */
    
    /* Muestra el elemento resultado (que estaba oculto) */
    resultado.style.display = 'block';

    /* Imprime la información en la consola para verificar (para desarrolladores) */
    console.log(gastosBimestrales);
    console.log('Total:', total);
});

/* Cuando el usuario hace click en el botón Borrar, se ejecuta esta función */
btnBorrar.addEventListener('click', function (e) {
    e.preventDefault();  /* Previene el comportamiento por defecto del botón reset */
    
    form.reset();  /* Limpia todos los campos del formulario */

    /* Reinicia todos los valores del objeto a 0 */
    Object.keys(gastosBimestrales).forEach(key => gastosBimestrales[key] = 0);
    /* Object.keys = obtiene los nombres de las propiedades del objeto */
    /* forEach = repite para cada propiedad */
    
    /* Oculta el elemento resultado */
    resultado.style.display = 'none';
    
    /* Reinicia el valor mostrado a 0.00 */
    document.querySelector('#totalValor').textContent = '0.00';

    /* Imprime un mensaje en la consola */
    console.log('Formulario borrado:', gastosBimestrales);
});
