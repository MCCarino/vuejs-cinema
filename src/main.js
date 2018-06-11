import Vue from 'vue';
import './style.scss';

import genres from './util/genres.js';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

new Vue ({
  el: '#app',
  data: {
    genre: [],
    showtime: []
  },
  methods: {
    checkFilter: function(category, title, checked) {
      if (checked) {
        this[category].push(title);
      } else {
        let index = this[category].indexOf(title);
        if (index > -1) {
          this[category].splice(index, 1);
        }
      }
    }
  },
  components: {
    MovieList,
    MovieFilter
  }
});