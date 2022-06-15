window.onload = function () {
  let titulo = document.querySelector(".moviesAddTitulo");
  let formulario = document.querySelector("#formulario");
  let article = document.querySelector("article");
  titulo.innerHTML = "AGREGAR PELÍCULA";
  titulo.classList.add("titulo");
  article.classList.add("fondoTransparente");
  formulario.classList.add("fondoCRUD");

  //------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
  //-------------------DE REGISTRO DE PELÍCULAS------------------//

  let form = document.querySelector(".form");
  form.title.focus();

  form.addEventListener("submit", (e) => {
    let errors = [];

    let title = document.querySelector("#title");
    let rating = document.querySelector("#rating");
    let awards = document.querySelector("#awards");
    let release_date = document.querySelector("#release_date");
    let length = document.querySelector("#length");
    let genre_id = document.querySelector("#genre_id");
    let ulErrors = document.querySelector(".errores");
    if (title.value == "") {
      errors.push("El titulo no puede estar vacío");
      title.classList.add("is-invalid");
    } else {
      title.classList.add("is-valid");
      title.classList.remove("is-invalid");
    }
    console.log(rating.value);
    if (rating.value <= 0 || rating.value > 10) {
      errors.push("El rating no puede ser menor que 0 y mayor que 10");
      rating.classList.add("is-invalid");
    } else {
      rating.classList.add("is-valid");
      rating.classList.remove("is-invalid");
    }

    if (awards.value <= 0 || awards.value > 10) {
      errors.push("El awards no puede ser menor que 0 y mayor que 10");
      awards.classList.add("is-invalid");
    } else {
      awards.classList.add("is-valid");
      awards.classList.remove("is-invalid");
    }

    if (release_date.value == "") {
      errors.push("El release_date no puede estar vacío");
      release_date.classList.add("is-invalid");
    } else {
      release_date.classList.add("is-valid");
      release_date.classList.remove("is-invalid");
    }

    if (length.value <= 0 || length.value > 360) {
      errors.push("La duracion no puede ser menor que 0 y mayor que 360");
      length.classList.add("is-invalid");
    } else {
      length.classList.add("is-valid");
      length.classList.remove("is-invalid");
    }

    if (genre_id.value == "") {
      errors.push("El genero no puede estar vacío");
      genre_id.classList.add("is-invalid");
    } else {
      genre_id.classList.add("is-valid");
      genre_id.classList.remove("is-invalid");
    }

    if (errors.length > 0) {
      e.preventDefault();
      ulErrors.classList.add("alert-warning");
      for (const error of errors) {
        ulErrors.innerHTML += `<li>${error}</li>`;
      }
    } else {
      alert("Tamo chelo");
      // form.submit(); -----> no es necesario
    }
  });
};
