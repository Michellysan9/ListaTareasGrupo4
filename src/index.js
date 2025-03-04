const tareaInput = document.querySelector("#tareaInput");
const agregarBtn = document.querySelector("#agregarBtn");
const listaTareas = document.querySelector("#listaTareas");

agregarBtn.addEventListener("click", () => {
  const tareaTexto = tareaInput.value.trim();
  if (!tareaTexto) {
    alert("Por favor, ingresa una tarea");
    return;
  }

  const elementoTarea = document.createElement("li");
  elementoTarea.innerHTML = `${tareaTexto} <button class='eliminar'>X</button>`;
  listaTareas.appendChild(elementoTarea);
  tareaInput.value = "";
});

listaTareas.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("eliminar")) {
    evento.target.parentElement.remove();
  } else {
    evento.target.classList.toggle("completado");
  }
});
