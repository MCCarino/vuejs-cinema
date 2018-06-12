<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item v-for="movie in filteredMovies" v-bind:key="movie.movie.Title" 
        v-bind:movie="movie.movie" v-bind:sessions="movie.sessions"
        v-bind:day="day" v-bind:time="time"></movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
      {{ noResultsMsg }}
    </div>
    <div v-else class="no-results">
      Loading...
    </div>
  </div>
</template>
<script>
  import genres from '../util/genres.js';
  import times from '../util/times.js';
  import MovieItem from './MovieItem.vue';

  export default {
    props: [ 'genre', 'time', 'showtime', 'movies', 'day' ],
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
      },
      filterTime: function(session) {
        if (!this.day.isSame(this.$moment(session.time), 'day')) {
          return false;
        } else if (this.time.length === 0 || this.time.length === 2) {
          return true; 
        } else if (this.time[0] === times.AFTER_6PM) {
          return this.$moment(session.time).hour() >= 18;
        } else {
          return this.$moment(session.time).hour() < 18;
        }
      }
    },
    computed: {
      filteredMovies: function() {
        return this.movies.
                filter(this.filterGenre).
                filter(movie => movie.sessions.find(this.filterTime));
      },
      noResultsMsg: function() {
        let times = this.time.join(', ');
        let genres = this.genre.join(', ');
        return `No Results for ${times}${times.length && genres.length ? ', ' : ''}${genres}.`;
      }
    },
    components: {
      MovieItem
    },
    created() {
      console.log(this.$moment);
    }
  }
</script>

