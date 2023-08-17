
let toDoItems = [];

// En la página 'index.html' hay un elemento span cuyo texto es 'Aplicación creada por:'.
// Usando querySelector seleccionar dicho span por su id ('createdBy') y luego usando innerHTML
// agregar tu nombre al final del texto actual. Ej: 'Aplicación creada por Franco'
// Tu código acá:


// Crear una clase denominada 'ToDo' cuyo constructor debe recibir un único parámetro del tipo string
// con el nombre 'description' que será justamente la descripción del ToDo.
// Agregar dos propiedades a la clase:
// 1) 'description' : debe ser igual a la descripción pasada como parámetro al constructor
// 2) 'complete'    : debe setearse en false
// Ayuda: usar 'this' en el constructor

function ToDo(description) {
    // Tu código acá:
    this.description = description;
    this.complete = false;
    this.clear = false;
}

// Agregar un método denominado 'completeToDo' al prototipo de la clase ToDo
// No requiere ningún argumento
// Debe setear el atributo 'complete' del ToDo en true

// Tu código acá:
ToDo.prototype.completeToDo = function () {
    this.complete = true;
};

ToDo.prototype.clearToDo = function () {
    this.clear = true;
};
// Agregar dos parámetros a la función 'buildToDo':
//    1) Un objeto de la clase ToDo
//    2) Index numérico
//
// La función debe realizar lo siguiente:
//    1) Crear un elemento 'div' y asignárselo a una variable denominada 'toDoShell'
//    2) Asignarle a 'toDoShell' la clase 'toDoShell'
//    3) Crear un elemento 'span' y asignárselo a una variable denominada 'toDoText'
//    4) Utilizando el objeto toDo pasado como argumento, setear el 'toDoText' innerHTML
//       asignándole el valor de la propiedad 'description' del objeto ToDo.
//    5) Asignarle como id del 'toDoText' el valor 'index' recibido como argumento
//    6) En función del atributo 'complete' del objeto ToDo recibido como argumento:
//          - Si es true: asignarle a 'toDoText' la clase 'completeText'
//          - Si es false: no asignarle ninguna clase
//    7) Agregar 'toDoText' como hijo de 'toDoShell'
//    8) Devolver la variable toDoShell

function buildToDo(todo, index) {
    // Tu código acá:
    let borrar = document.createElement('i');
    borrar.className = 'clearOne fa-solid fa-x';
    borrar.id = index;
    borrar.style.fontWeight = '400';
    borrar.addEventListener("click", clearOne);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = index;
    checkbox.className = "completeCheckbox";
    checkbox.addEventListener("click", completeToDo);

    let toDoShell = document.createElement("div");
    toDoShell.id = index;
    toDoShell.className = "toDoShell";
    let toDoText = document.createElement("span");
    toDoText.innerHTML = todo.description;
    toDoText.id = index;
    if (todo.complete) {
        toDoText.className = "completeText";
        toDoShell.className = "toDoShell completePadding";
        checkbox.checked = true;
    }
    if (todo.clear) {
        toDoShell.className = "clearText";
    }
    toDoShell.appendChild(toDoText);
    toDoShell.appendChild(borrar);
    /* toDoShell.appendChild(checkbox); */
    toDoShell.addEventListener("click", completeToDo);
    return toDoShell;
}

// La función 'buildToDos' debe crear un array de objetos toDo y devolverlo
// Recibirá como parámetro un array de objetos ToDo
// Utilizar el método map usando la función previamente creada ('buildToDo')
// Devolver el nuevo array

function buildToDos(toDos) {
  // Tu código acá:
/*   let array = toDos.map(buildToDo());
    let array = toDos.map(function(x, index) {
    return buildToDo()
  }); */
    let array = toDos.map((x, index) => buildToDo(x, index));
    return array;
}

// La función 'displayToDos' se va a encargar de que se vean los toDo's en pantalla
//  1) Seleccionr el elemento cuyo id es 'toDoContainer' y almacenarlo en una variable denominada 'toDoContainer'
//  2) Setear el innerHTML de 'toDoContainer' como un string vacio ("")
//  3) Llamar a la función previemante creada 'buildToDos' pasándole como argumento el array toDoItems
//  4) Iterar sobre el resultado devuelto por la función 'buildToDos' e ir agregndo cada elemento a 'toDoContainer'
//  5) Al final de este archivo, antes de la línea que dice "NO CAMBIES NADA DE ACÁ PARA ABAJO" escribe una
//     línea para hacer el llamado a esta funcion (displayToDos)
//  6) Abrir o en el caso de ya tenerlo abierto, recargar, la página

function displayToDos() {
  // Tu código acá:
    let toDoContainer = document.querySelector('#toDoContainer');
    toDoContainer.innerHTML = '';
    let array = buildToDos(toDoItems);
    for (let i = 0; i < array.length; i++) toDoContainer.append(array[i]);
}

// La función 'addToDo' agregará un nuevo ToDo al array 'toDoItems'
// [NOTA: Algunas cuestiones a tener en cuenta sobre el elemento 'input' de HTML (Ya que 'toDoInput' es un input)
// Todos los elementos input tienen una propiedad llamada 'value' que nos permite acceder al texto que se encuentre
// actualmente escrito dentro del input]
//  1) Crear un nuevo ToDo usando la clase ToDo y pasándole el valor del input 'toDoInput' como parámetro
//  2) Agregar el objeto ToDo recién creado al array toDoItems
//  3) Setear el valor del input toDoInput como un string vacio ("") (Esto se realiza para que en la vista se borre lo que se encontraba escrito)
//  4) Llamar a la función displayToDos para que se actualicen los toDos mostrados en pantalla

function addToDo() {
  // Tu código acá:
    let toDoInput = document.querySelector('#toDoInput');
    let todo = new ToDo(toDoInput.value);
    toDoItems.push(todo);
    toDoInput.value = '';
    displayToDos();
}

// Agregar un 'Event Listener' para que cada vez que el botón 'AGREGAR' sea clickeado
// se ejecute la función 'addToDo'
//   1) Seleccionar el elemento cuyo id es 'addButton'
//   2) Agregarle un 'click' event listener, pasándole la función 'addToDo' como callback

// Tu código acá:
let inputToDo = document.querySelector('#toDoInput');
let addButton = document.querySelector('#addButton');
/* window.addEventListener('click', (e) => {
    if (e.target === inputToDo) toDoInput.placeholder = "";
    else {
        inputToDo.value = '';
        toDoInput.placeholder = "Agregue un ítem...";
    }
}) */
addButton.addEventListener('click', e => {
    if (inputToDo.value) addToDo();
    else e.preventDefault;
});
window.addEventListener('keydown', e => {
    if (e.keyCode === 13 && inputToDo.value) addToDo();
    else e.preventDefault;
})

// La función completeToDo se va a ejecutar cuando queramos completar un todo
// [NOTA: Algunas cuestiones a tener en cuenta
// Todo Event Listener recibe como parámetro el objeto 'event' conteniendo un montón de información que incluye
// el tipo del evento, que elemento fue el que lo llamó, los valores de dicho elemento, etc.
// En este paso vamos a utilizarlo para encontrar el index del item que disparó el evento (Esta parte ya se
// encuentra desarrollada pero está comentada dentro de la función por lo que va a ser necesario que la descomenten)]
//   1) Utilizando el index suministrdo, llamar a 'completeToDo' (Recuerden que habíamos creado dcho método en el
//      prototipo de la clase ToDo) sobre el elemento correspondiente del array toDoItems
//   2) Llamar a displayToDos para actualizar los elementos que se van a mostrar en pantalla
//   3) En la función 'buildToDo' agregar un 'click' event listener al elemento 'toDoText', pasándole
//      esta función como callback

function completeToDo(event) {
  // DESCOMENTAR LA SIGUIENTE LINEA
    const index = event.target.id;
  // Tu código acá:
    if (toDoItems[index].complete === false) toDoItems[index].completeToDo();
    else toDoItems[index].complete = false;
    displayToDos();
}

function clearOne(event) {
    const index = event.target.id;
    /* toDoItems.splice(index, 1); */
    /* delete(toDoItems[index]); */
    if (toDoItems[index].clear === false) toDoItems[index].clearToDo();
    displayToDos();
}

displayToDos();
