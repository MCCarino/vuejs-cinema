<template>
  <div id="movie-list">
    <div v-for="movie in filteredMovies" class="movie" v-bind:key="movie.title">{{ movie.title }}</div>
  </div>
</template>
<script>
  import genres from '../util/genres.js';
  export default {
    props: [ 'genre', 'showtime' ],
    data() {
      return {
        movies : [
          { title: 'Mo Man Tai', genre: genres.ANIMATION },
          { title: 'M Saai M Goi', genre: genres.DRAMA },
          { title: 'Dong Lai Cha', genre: genres.COMEDY }
        ]
      }
    },
    methods: {
      filterGenre: function(movie) {
        if (!this.genre.length) {
          return true;
        } 
        return this.genre.find(genre => movie.genre === genre); 
      }
    },
    computed: {
      filteredMovies: function() {
        return this.movies.filter(this.filterGenre);
      }
    }
  }
</script>

