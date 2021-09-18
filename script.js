// ajax murni vanilla javascript
// const xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
//     if (xhr.status === 200) {
//         if (xhr.readyState === 4) {
//             console.log(JSON.parse(xhr.response));
//         } else {
//             console.log(xhr.responseText);
//         }
//     }
// };
// xhr.open('get', 'http://www.omdbapi.com/?apikey=57a4bda1&s=Harry Potter');
// xhr.send();

// menggunkan fetch
// fetch('http://www.omdbapi.com/?apikey=57a4bda1&s=Harry Potter')
//     .then((response) => response.json())
//     .then((response) => console.log(response))

// promise cara 1
// const janji = true;
// const janjiKamu = new Promise((resolve, reject) => {
//     if (janji) {
//         resolve('Janji telah dipenuhi..');
//     } else {
//         reject('Kamu mengingkari jani');
//     }
// });

// janjiKamu.then((response) => console.log('Oke, ' + response)).catch((response) => console.log('Tidak, ' + response));

// promise cara 2

// let janji = true;
// const janjiKamu = new Promise((resolve, reject) => {
//     if (janji) {
//         setTimeout(() => {
//             resolve('Janji dipenuhi setelah beberapa detik');
//         }, 5000);
//     } else {
//         setTimeout(() => {
//             reject('Kamu mengingkari jani, padahal sudah dikasih waktu');
//         }, 5000);
//     }
// });

// console.log('Mulai');
// console.log(janjiKamu.then(() => console.log(janjiKamu)));

$('.btn-cari').on('click', function() {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=57a4bda1&s=' + $('.input-data').val(),

        success: (results) => {
            const movies = results.Search;
            let card = '';
            movies.forEach((m) => {
                // card += `<div class="col-md-4 my-4">
                //             <div class="card" style="width: 18rem">
                //                 <img src="${m.Poster}" class="card-img-top" alt="..." />
                //                 <div class="card-body">
                //                     <h5 class="card-title">${m.Title}</h5>
                //                     <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                //                     <a href="#" class="btn btn-danger btnMovie" data-toggle="modal" data-target="#modalMovie" data-imdbid="${m.imdbID}">View Details</a>
                //                 </div>
                //             </div>
                //         </div>`;
                card += showCards(m);
            });
            $('.movie-container').html(card);

            $('.btnMovie').on('click', function() {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=57a4bda1&i=' + $(this).data('imdbid'),
                    success: (m) => {
                        const movieDetail = showMovieDetails(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    },
                });
            });
        },
        error: (e) => {
            console.log(e.responseText);
        },
    });
});

function showCards(m) {
    return `<div class="col-md-4 my-4">
                        <div class="card" style="width: 18rem">
                            <img src="${m.Poster}" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">${m.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                                <a href="#" class="btn btn-danger btnMovie" data-toggle="modal" data-target="#modalMovie" data-imdbid="${m.imdbID}">View Details</a>
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