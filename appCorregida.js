const container = document.querySelector('.container');
const bookCardsContainer = document.querySelector('.book-cards-container');
const formContainer = document.querySelector('.form-container');
const agregarLibroBtn = document.createElement('button');
agregarLibroBtn.textContent = 'Add New Book';
agregarLibroBtn.classList.add('add-book-details-btn');
container.appendChild(agregarLibroBtn);
const formularioLibroBtn = document.querySelector('.formulario-libro-btn');
const formulario = document.querySelector('#bookForm');

// Mostrar el formulario cuando se hace clic en el botón "Add Book"
const mostrarFormulario = () => {
    agregarLibroBtn.style.display = 'none';
    formContainer.style.display = 'flex';
};

agregarLibroBtn.addEventListener('click', mostrarFormulario);

// Cerrar el formulario si el clic ocurre fuera del mismo
formContainer.addEventListener('click', function(event) {
    if (!formulario.contains(event.target)) {
        formContainer.style.display = 'none';
        agregarLibroBtn.style.display = 'block';
    }
});

// Array que contendrá los libros (se carga desde localStorage al inicio)
let libros = JSON.parse(localStorage.getItem('libros')) || [];

// Constructor de libros
function Book(titulo, autor, paginas, estado) {
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.estado = estado;
}

// Resetear los inputs después de agregar un libro
const resetInputs = () => {
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('paginas').value = '';
};

// Función para actualizar el almacenamiento en localStorage
const storeBooks = () => {
    localStorage.setItem('libros', JSON.stringify(libros));
};

// Función para mostrar los libros en la página
const displayBooksOnPage = () => {
    // Limpiar el contenedor antes de volver a agregar los libros
    bookCardsContainer.innerHTML = '';

    libros.forEach((libro, index) => {
        const div = document.createElement('div');
        div.classList.add('book-card');
        
        const btnCambiarEstado = document.createElement('button');
        btnCambiarEstado.textContent = 'Change Status';
        
        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = 'Delete Book';
        
        // Crear nodos de texto con la información del libro
        const titulo = document.createElement('h3');
        titulo.innerHTML = `Title: ${libro.titulo}`;
        
        const autor = document.createElement('p');
        autor.innerHTML = `<b>Author:</b> ${libro.autor}`;
        
        const paginas = document.createElement('p');
        paginas.innerHTML = `<b>Pages:</b> ${libro.paginas}`;
        
        const estado = document.createElement('p');
        estado.innerHTML = `<b>Status:</b> ${libro.estado}`;
        
        // Añadir los elementos al div
        div.appendChild(titulo);
        div.appendChild(autor);
        div.appendChild(paginas);
        div.appendChild(estado);
        div.appendChild(btnCambiarEstado);
        div.appendChild(btnBorrar);
        
        // Añadir el div al contenedor principal
        bookCardsContainer.appendChild(div);

        // Cambiar el estado del libro (leído/no leído)
        btnCambiarEstado.addEventListener('click', () => {
            libro.estado = libro.estado === 'not read' ? 'read' : 'not read';
            storeBooks();  // Actualizar el localStorage con el nuevo estado
            displayBooksOnPage();  // Actualizar la UI
        });

        // Eliminar el libro
        btnBorrar.addEventListener('click', () => {
            libros.splice(index, 1);  // Eliminar el libro del array
            storeBooks();  // Actualizar el localStorage
            displayBooksOnPage();  // Actualizar la UI
        });
    });
};

// Añadir un nuevo libro
const añadirLibroALibros = (event) => {
    event.preventDefault();

    // Validar el formulario
    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    // Obtener los valores del formulario
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const paginas = document.getElementById('paginas').value;
    const estado = document.getElementById('estado').value;

    // Crear un nuevo libro y añadirlo al array
    const nuevoLibro = new Book(titulo, autor, paginas, estado);
    libros.push(nuevoLibro);

    // Actualizar el localStorage y la UI
    storeBooks();
    resetInputs();
    formContainer.style.display = 'none'; 
    agregarLibroBtn.style.display = 'block';
    displayBooksOnPage();
};

// Añadir el listener al botón del formulario
formularioLibroBtn.addEventListener('click', añadirLibroALibros);

// Mostrar los libros al cargar la página
document.addEventListener('DOMContentLoaded', displayBooksOnPage);
