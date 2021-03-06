<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item v-for="movie in filteredMovies" 
                  v-bind:key="movie.movie.Title" 
                  v-bind:movie="movie.movie">
        <div class="movie-sessions">
          <div v-for="session in filteredSessions(movie.sessions)" 
               v-bind:key="session.id" 
               v-tooltip="{ seats: session.seats }"
               class="session-time-wrapper tooltip-wrapper" >
            <div class="session-time">{{ formatTime(session.time) }}</div>
          </div>
        </div>
      </movie-item>
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
      formatTime: function(rawTime) {
        return this.$moment(rawTime).format('h:mm A');
      },
      filteredSessions: function(sessions) {
        return sessions.filter(this.filterTime);
      },
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
    }
  }
</script>

