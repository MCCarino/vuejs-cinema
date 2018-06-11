import Vue from 'vue';
import './style.scss';

import genres from './util/genres.js';

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
    'movie-list' : {
      template: `<div id="movie-list">
                  <div v-for="movie in filteredMovies" class="movie"> {{ movie.title }} </div>
                <div>`,
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
    },
    'movie-filter' : {
      data() {
        return {
          genres
        }
      },
      template: `<div id="movie-filter">
                  <h2>Filter Results</h2>
                  <div class="filter-group">
                    <check-filter v-for="genre in genres" v-bind:title="genre"
                      v-on:check-filter="checkFilter">
                    </check-filter>
                  </div>
                <div>`,
      methods: {
        checkFilter: function(category, title, checked) {
          this.$emit('check-filter', category, title, checked);
        }
      },
      components: {
        'check-filter': {
          data() {
            return {
              checked: false
            }
          },
          props: [ 'title' ],
          template: `<div v-bind:class="{ 'check-filter' : true, 'active' : checked }" v-on:click="checkFilter"> 
                      <span class="checkbox"></span>
                      <span class="check-filter-title"> {{ title }} </span>
                    </div>`,
          methods: {
            checkFilter: function() {
              this.checked = !this.checked;
              this.$emit('check-filter', 'genre', this.title, this.checked);
            }
          }
        }
      }
    }
  }
});