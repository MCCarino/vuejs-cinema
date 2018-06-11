<template>
  <div id="movie-list">
    <movie-item v-for="movie in filteredMovies" v-bind:key="movie.movie.Title" v-bind:movie="movie.movie">
    </movie-item>
  </div>
</template>
<script>
  import genres from '../util/genres.js';
  import MovieItem from './MovieItem.vue';

  export default {
    props: [ 'genre', 'showtime', 'movies' ],
    methods: {
      filterGenre: function(movie) {
        if (!this.genre.length) {
          return true;
        } 
        let movieGenres = movie.movie.Genre.split(", ");
        let matched = true;
        this.genre.forEach(genre => {
          if (movieGenres.indexOf(genre) === -1) {
            matched = false;
          }
        });
        return matched;
      }
    },
    computed: {
      filteredMovies: function() {
        return this.movies.filter(this.filterGenre);
      }
    },
    components: {
      MovieItem
    }
  }
</script>

