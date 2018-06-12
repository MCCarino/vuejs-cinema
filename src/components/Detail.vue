<template>
  <div id="detail" v-if="movie">
    <movie-item v-bind:movie="movie">
      <div class="movie-details">
        <p class="movie-genre">{{ movie.Genre }}</p>
        <p class="movie-plot">{{ movie.Plot }}</p>
        <table>
          <tr><td>Released date: </td><td>{{ movie.Released }}</td></tr>
          <tr><td>Running Time: </td><td>{{ movie.Running }}</td></tr>
          <tr><td>Director: </td><td>{{ movie.Director }}</td></tr>
          <tr><td>Cast: </td><td>{{ movie.Cast }}</td></tr>
        </table>
      </div>
      <div class="home">
        <router-link v-bind:to="{ name : 'home'}" >Back to results</router-link>
      </div>
    </movie-item>
  </div>
</template>
<script>
  import MovieItem from './MovieItem.vue';

  export default {
    props: [ 'movies' ],
    computed: {
      movie() {
        let movie = this.movies.find(movie => movie.id === this.$route.params.id);
        return movie ? movie.movie : null;
      }
    },
    components: {
      MovieItem
    }
  }
</script>

