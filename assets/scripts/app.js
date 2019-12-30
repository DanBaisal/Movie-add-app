const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const movies = [];
const entryTextSection = document.getElementById('entry-text');

function updateUI () {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}

function toggleBackdrop () {
    backdrop.classList.toggle('visible');
}

function toggleMovieModal () {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
}

function backdropClickHandler () {
    toggleMovieModal();
}

function cancelAddMovie () {
    toggleMovieModal();
    clearMovieInput();
}

function confirmAddMovie () {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid ratings! (ratings between 1 and 5)');
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInput();
    renderNewmovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
}

function deleteMovie (movieId) {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
}

function renderNewmovieElement (id, title, imageUrl, rating) {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>    
            <p>${rating}/5 stars</p>
        </div>    
    `;
    newMovieElement.addEventListener('click', deleteMovie.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
}

function clearMovieInput () {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
}

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovie);
confirmAddMovieButton.addEventListener('click', confirmAddMovie);