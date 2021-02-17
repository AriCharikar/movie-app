$(document).ready(() => {
    $('#search-form').on('submit', (e) => {
        e.preventDefault();
        searchAndDisplayMovies();
    });
});

const searchAndDisplayMovies = () => {
    $('.movie-display').remove();
    // I'm removing the div in order to reimplement it whenever a user searches for a movie.
    let searchValue = $('#search-input').val();
    let mykey = config.MY_KEY;

    const searchResultURL = `https://api.themoviedb.org/3/search/movie?api_key=${mykey}&query=${searchValue}`;
    
    let movieDisplay = $('<div></div>');
    $(movieDisplay).addClass('movie-display');
    $(movieDisplay).appendTo('.movie-search-results');  
    axios.get(searchResultURL)
        .then((res) => {
            let results = res.data.results;
            results.map((movie) => {
                let allMovies =  `    
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" data-movie-id=${movie.id}>
                `;
                if (movie.poster_path) {
                    $(allMovies).appendTo(movieDisplay);
                }
            });
        });
        $('#search-input').val('');
}