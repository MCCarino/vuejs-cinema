<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <h3>By time of day</h3>
    <div class="filter-group">
      <check-filter v-for="time in times" 
                    v-bind:title="time"
                    v-bind:key="time"
                    category="time">
      </check-filter>
    </div>
    <h3>By genre</h3>
    <div class="filter-group">
      <check-filter v-for="genre in genres" 
                    v-bind:title="genre"
                    v-bind:key="genre"
                    category="genre">
      </check-filter>
    </div>
  <div>
</template>
<script>
  import genres from '../util/genres.js';
  import times from '../util/times.js';
  import CheckFilter from './CheckFilter.vue';
  export default {
    data() {
      return {
        genres, times
      }
    },
    components: {
      CheckFilter 
    }
  }
</script>
