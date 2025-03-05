const tareaInput = document.querySelector("#tareaInput");
const agregarBtn = document.querySelector("#agregarBtn");
const listaTareas = document.querySelector("#listaTareas");

document.addEventListener("DOMContentLoaded", cargarTareas);

function agregarTareaPrincipal() {
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
}

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

    elementoTarea.innerHTML = `${tarea.texto} <button class='eliminar'>X</button> <button class='editarBtn'>Editar</button>`;
    listaTareas.appendChild(elementoTarea);
  });
}

function cargarTareas() {
  renderizarTareas();
}

listaTareas.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("eliminar")) {
    const tareaElemento = evento.target.parentElement;
    const tareaTexto = tareaElemento.textContent.replace("X", "").replace("Editar", "").trim();
    
    eliminarTareaLocalStorage(tareaTexto);
    tareaElemento.remove();

  } else if (evento.target.classList.contains("editarBtn")) {
    const tareaElemento = evento.target.parentElement;
    const tareaTexto = tareaElemento.textContent.replace("X", "").replace("Editar", "").trim();
    editarTarea(tareaTexto, tareaElemento);

  } else {
    const tareaElemento = evento.target;
    if (tareaElemento.tagName === "LI") {
      const tareaTexto = tareaElemento.textContent.replace("X", "").replace("Editar", "").trim();
      marcarTareaCompletada(tareaTexto);
    }
  }
});

function editarTarea(tareaTexto, tareaElemento) {
  tareaInput.value = tareaTexto;
  agregarBtn.removeEventListener("click", agregarTareaPrincipal);

  agregarBtn.textContent = "Guardar cambios";
  agregarBtn.addEventListener("click", function guardarCambios() {
    const nuevasTareas = obtenerTareasLocalStorage().map(tarea => {
      if (tarea.texto === tareaTexto) {
        tarea.texto = tareaInput.value.trim();
      }
      return tarea;
    });

    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
    renderizarTareas();

    agregarBtn.textContent = "Agregar Tarea";
    agregarBtn.removeEventListener("click", guardarCambios);
    agregarBtn.addEventListener("click", agregarTareaPrincipal);
    tareaInput.value = "";
  });

    
  }

function marcarTareaCompletada(tareaTexto) {
  let tareas = obtenerTareasLocalStorage();
  tareas = tareas.map(tarea => {
    if (tarea.texto === tareaTexto) {
      tarea.completada =!tarea.completada;
    }
    return tarea;
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
  renderizarTareas();
}

agregarBtn.addEventListener("click", agregarTareaPrincipal);
