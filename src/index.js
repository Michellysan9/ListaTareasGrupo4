const tareaInput = document.querySelector("#tareaInput");
const agregarBtn = document.querySelector("#agregarBtn");
const listaTareas = document.querySelector("#listaTareas");

document.addEventListener("DOMContentLoaded", cargarTareas);

agregarBtn.addEventListener("click", () => {
  const tareaTexto = tareaInput.value.trim();
  if (!tareaTexto) {
    alert("Por favor, ingresa una tarea");
    return;
  }

  const tarea = {
    texto: tareaTexto,
    completada: false,
  };

  agregarTareaLocalStorage(tarea);

  tareaInput.value = "";
});

function agregarTareaLocalStorage(tarea) {
  const tareas = obtenerTareasLocalStorage();
  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  renderizarTareas();
}

function eliminarTareaLocalStorage(tareaTexto) {
  let tareas = obtenerTareasLocalStorage();
  tareas = tareas.filter(tarea => tarea.texto !== tareaTexto);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function obtenerTareasLocalStorage() {
  let tareas = JSON.parse(localStorage.getItem("tareas"));
  if (!tareas) {
    tareas = [];
  }
  return tareas;
}

function renderizarTareas() {
  const tareas = obtenerTareasLocalStorage();
  listaTareas.innerHTML = "";

  tareas.forEach(tarea => {
    const elementoTarea = document.createElement("li");

    if (tarea.completada) {
      elementoTarea.classList.add("completada");
    }

    elementoTarea.innerHTML = `${tarea.texto} <button class='eliminar'>X</button>`;
    listaTareas.appendChild(elementoTarea);
  });
}

function cargarTareas() {
  renderizarTareas();
}

listaTareas.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("eliminar")) {
    const tareaElemento = evento.target.parentElement;
    const tareaTexto = tareaElemento.textContent.replace("X", "").trim();
    
    eliminarTareaLocalStorage(tareaTexto);

    tareaElemento.remove();
  } else {
    const tareaElemento = evento.target;
    if (tareaElemento.tagName === "LI") {
      const tareaTexto = tareaElemento.textContent.replace("X", "").trim();
      marcarTareaCompletada(tareaTexto);
    }
  }
});

function marcarTareaCompletada(tareaTexto) {
  const tareas = obtenerTareasLocalStorage();
  const tarea = tareas.find(tarea => tarea.texto === tareaTexto);
  
  if (tarea) {
    tarea.completada = !tarea.completada;
    localStorage.setItem("tareas", JSON.stringify(tareas));
    renderizarTareas();
  }
}
