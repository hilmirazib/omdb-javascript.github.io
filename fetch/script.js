const searchButton = document.querySelector('.btn-cari');
searchButton.addEventListener('click', function() {
    const inputCari = document.querySelector('.input-data');
    fetch('http://www.omdbapi.com/?apikey=57a4bda1&s=' + inputCari.value)
        .then((res) => res.json())
        .then((res) => {
            const movies = res.Search;
            let card = '';
            movies.forEach((m) => (card += showCards(m)));
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = card;

            // tombol diklik
            const btnMovie = document.querySelectorAll('.btnMovie');
            btnMovie.forEach((btn) => {
                btn.addEventListener('click', function() {
                    const imdbId = this.dataset.imdbid;

                    fetch('http://www.omdbapi.com/?apikey=57a4bda1&i=' + imdbId)
                        .then((res) => res.json())
                        .then((res) => {
                            const showMovies = showMovieDetails(res);
                            const modalBody = document.querySelector('.modal-body');
                            modalBody.innerHTML = showMovies;
                        });
                });
            });
        });
});

function showCards(m) {
    return `<div class="col-md-4 my-4">
                        <div class="card" style="width: 18rem">
                            <img src="${m.Poster}" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">${m.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                                <a href="#" class="btn btn-danger btnMovie" data-bs-toggle="modal" data-bs-target="#modalMovie" data-imdbid="${m.imdbID}">View Details</a>
                            </div>
                        </div>
                    </div>`;
}

function showMovieDetails(m) {
    return `<div class="container-fluid">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <img src="${m.Poster}" alt="" class="img-fluid" />
                                                </div>
                                                <div class="col-md">
                                                    <ul class="list-group">
                                                        <li class="list-group-item">
                                                            <h4>${m.Title}, (${m.Year})</h4>
                                                        </li>
                                                        <li class="list-group-item"><strong>${m.Director}</strong></li>
                                                        <li class="list-group-item"><strong>${m.Actors}</strong></li>
                                                        <li class="list-group-item"><strong>${m.Writer}</strong></li>
                                                        <li class="list-group-item"><strong>${m.Plot}</strong></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>`;
}