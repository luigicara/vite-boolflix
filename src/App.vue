<script>
import { store } from './store.js';
import axios from 'axios';

export default {
  data() {
    return {
      store,
    }
  },
  methods: {
    searchContent() {
      let movie = `${store.apiURL}search/movie/?${store.apiKey}&language=it_IT&query=${store.searchString}`;

      let tv = `${store.apiURL}search/tv/?${store.apiKey}&language=it_IT&query=${store.searchString}`;

      const requestMovie = axios.get(movie);
      const requestTv = axios.get(tv);

      axios.all([requestMovie, requestTv]).then(axios.spread((...res) => {
        store.searchResultMovie = res[0].data.results;
        store.searchResultTV = res[1].data.results;
      })).catch(errors => {
        console.log(errors);
      })
    }
  }
}
</script>

<template>
  <input type="text" v-model="store.searchString">

  <button
    @click="searchContent('movie', store.searchResultMovie); searchContent('tv', store.searchResultTV);">Cerca</button>

  <ul v-for="content in store.searchResultMovie">
    MOVIE
    <li>{{ content.title }}</li>
    <li>{{ content.original_title }}</li>
    <li>{{ content.original_language }}</li>
    <li>{{ content.vote_average }}</li>
  </ul>

  <ul v-for="content in store.searchResultTV">
    TV SHOW
    <li>{{ content.name }}</li>
    <li>{{ content.original_name }}</li>
    <li>{{ content.original_language }}</li>
    <li>{{ content.vote_average }}</li>
  </ul>
</template>

<style lang="scss" scoped>

</style>
