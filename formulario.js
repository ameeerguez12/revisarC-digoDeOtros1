// Cambié "#form" por "#formulario" porque el id del formulario en el HTML es "formulario"
var formulario = document.querySelector("#formulario");

formulario.onsubmit = function(event) {
  // Corregí prevent() por preventDefault()
  event.preventDefault();

  // Cambié el nombre de la variable 'e' para no sobrescribir el evento 'event'
  var n = formulario.elements[0];
  var edadInput = formulario.elements[1];
  var na = formulario.elements[2];

  var nombre = n.value;
  // Usé parseInt para asegurarme de que la edad sea un número
  var edad = parseInt(edadInput.value);

  var i = na.selectedIndex;
  var nacionalidad = na.options[i].value;

  if (nombre.length === 0) {
    n.classList.add("error");
  }

  // Agregué validación isNaN para evitar errores si el campo está vacío
  if (edad < 18 || edad > 120 || isNaN(edad)) {
    edadInput.classList.add("error");
  }

  // Corregí condición: antes era edad > 18 y < 120, ahora es >= 18 y <= 120
  if (nombre.length > 0 && edad >= 18 && edad <= 120) {
    agregarInvitado(nombre, edad, nacionalidad);
  }
}

function agregarInvitado(nombre, edad, nacionalidad) {
  if (nacionalidad === "ar") {
    nacionalidad = "Argentina";
  } else if (nacionalidad === "mx") {
    nacionalidad = "Mexicana";
  } else if (nacionalidad === "vnzl") {
    nacionalidad = "Venezolana";
  } else if (nacionalidad === "per") {
    nacionalidad = "Peruana";
  }

  var lista = document.getElementById("lista-de-invitados");

  var elementoLista = document.createElement("div");
  // Corregí ".classList.added" por ".classList.add"
  elementoLista.classList.add("elemento-lista");
  lista.appendChild(elementoLista);

  function crearElemento(descripcion, valor) {
    var span = document.createElement("span");
    var input = document.createElement("input");
    var espacio = document.createElement("br");
    span.textContent = descripcion + ": ";
    input.value = valor;
    elementoLista.appendChild(span);
    elementoLista.appendChild(input);
    elementoLista.appendChild(espacio);
  }

  crearElemento("Nombre", nombre);
  crearElemento("Edad", edad);
  crearElemento("Nacionalidad", nacionalidad);

  var botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Eliminar invitado";

  // Reemplacé this.parentNode.style.display = 'none' por .remove() para eliminar completamente el nodo
  botonBorrar.onclick = function () {
    elementoLista.remove();
  };

  elementoLista.appendChild(botonBorrar);
}