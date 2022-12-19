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

        }))
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

      return `https://flagsapi.com/${languageString.toUpperCase()}/flat/16.png`
    },

    imgMissing() {
      return 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
    },

    starsScore(element) {
      return Math.ceil((element.vote_average / 10) * 5);
    }
  }
}
</script>

<template>
  <input type="text" v-model="store.searchString">

  <button @click="searchContent()">Cerca</button>

  <ul v-for="(content, index) in store.searchResult" :key="index">
    {{ content.hasOwnProperty('title') ? 'MOVIE' : 'TV SHOW' }}

    <img
      :src="content.poster_path === null ? this.imgMissing() : store.apiPosterURL + store.posterWidth + content.poster_path"
      alt="artwork">

    <li>{{ content.hasOwnProperty('title') ? content.title : content.name }}</li>

    <li>{{ content.hasOwnProperty('original_title') ? content.original_title : content.original_name }}</li>

    <li>
      <img v-if="content.hasOwnProperty('original_language')" :src="this.countryFlagURL(content.original_language)"
        alt="languageflag">
    </li>

    <li>
      <div v-if="this.starsScore(content) > 0">

        <span v-for="n in this.starsScore(content)">
          <font-awesome-icon icon="fa-solid fa-star" />
        </span>

        <span v-for="n in (5 - this.starsScore(content))">
          <font-awesome-icon icon="fa-regular fa-star" />
        </span>

      </div>

      <div v-else>
        No Ratings
      </div>
    </li>

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
img {
  max-width: 342px;
}
</style>
