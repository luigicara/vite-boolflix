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
      let movie = this.urlGen('search', 'movie');

      let tv = this.urlGen('search', 'tv');

      const requestMovie = axios.get(movie);
      const requestTv = axios.get(tv);

      axios.all([requestMovie, requestTv]).then(axios.spread((...res) => {
        store.searchResult = res[0].data.results.concat(res[1].data.results)

      })).catch(errors => {
        console.log(errors);
      }).then(() => {
        this.getCastAndGenres();
      })
    },

    getCastAndGenres() {
      const media = store.searchResult;

      for (let i = 0; i < media.length; i++) {

        let cast = this.urlGen('', 'movie', '/credits', media[i].id);

        let genres = this.urlGen('', 'movie', '', media[i].id);

        if (!media[i].hasOwnProperty('title')) {
          cast = this.urlGen('', 'tv', '/credits', media[i].id);

          genres = this.urlGen('', 'tv', '', media[i].id);
        }

        const requestCast = axios.get(cast);
        const requestGenres = axios.get(genres);

        axios.all([requestCast, requestGenres]).then(axios.spread((...res) => {

          media[i].cast = res[0].data.cast.splice(0, 5);
          media[i].genres = res[1].data.genres.splice(0, 5);

        })).then(() => {
          console.log(media);
        })
      }
    },

    urlGen(type, category, castOrGenres, id) {
      if (type === 'search') {

        return `${store.apiURL}search/${category}/?${store.apiKey}${store.apiLanguage}&query=${store.searchString}`

      } else {

        return `${store.apiURL}${category}/${id}${castOrGenres}?${store.apiKey}${store.apiLanguage}`
      }


    },

    countryFlagURL(language) {
      let languageString = language;

      if (language === 'en') {
        languageString = 'gb';
      }

      return `https://flagsapi.com/${languageString.toUpperCase()}/flat/64.png`
    }

  }
}
</script>

<template>
  <input type="text" v-model="store.searchString">

  <button @click="searchContent()">Cerca</button>

  <ul v-for="content in store.searchResult">
    {{ content.hasOwnProperty('title') ? 'MOVIE' : 'TV SHOW' }}

    <img :src="store.apiPosterURL + store.posterWidth + content.poster_path" alt="img">

    <li>{{ content.hasOwnProperty('title') ? content.title : content.name }}</li>

    <li>{{ content.hasOwnProperty('original_title') ? content.original_title : content.original_name }}</li>

    <li>
      <img v-if="content.hasOwnProperty('original_language')" :src="this.countryFlagURL(content.original_language)"
        alt="languageflag">
    </li>

    <li>{{ content.vote_average }}</li>

    <ul>
      <li v-for="actor in content.cast">
        {{ actor.name }}
      </li>
    </ul>

    <ul>
      <li v-for="genre in content.genres">
        {{ genre.name }}
      </li>
    </ul>
  </ul>
</template>

<style lang="scss" scoped>

</style>
