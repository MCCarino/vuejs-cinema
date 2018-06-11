import Vue from 'vue';
import './style.scss';

new Vue ({
  el: '#app',
  components: {
    'movie-list' : {
      template: `<div id="movie-list">
                  <div v-for="movie in movies" class="movie"> {{ movie.title }} </div>
                <div>`,
      data() {
        return {
          movies : [
            { title: 'Mo Man Tai' },
            { title: 'M Saai M Goi' },
            { title: 'Dong Lai Cha' }
          ]
        }
      }
    },
    'movie-filter' : {
      template: `<div id="movie-filter">
                  <h2>Filter Results</h2>
                <div>`
    }
  }
});