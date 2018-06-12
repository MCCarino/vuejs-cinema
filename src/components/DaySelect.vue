<template>
  <div id="day-select">
    <ul class="days">
      <li class="day" v-for="day in days" v-bind:key="day">{{ formatDay(day) }}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        days: [0, 1, 2, 3, 4, 5, 6].map(num => this.$moment().add(num, 'days'))
      }
    },
    methods: {
      formatDay: function(rawDay) {
        if (rawDay.isSame(this.$moment(), 'day'))
          return 'Today';
        return rawDay.format('ddd DD/MM');
      }
    }
  }
</script>

