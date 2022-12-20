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
      // reset selection of genres
      store.genresSelect = ['Vedi Tutti'];

      // create api search URL
      let movie = this.urlGen('search', 'movie');

      let tv = this.urlGen('search', 'tv');

      // get method of axios on url
      const requestMovie = axios.get(movie);
      const requestTv = axios.get(tv);

      // concat of both request in a single array
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
        // for each search result find cast and genres
        let cast = this.urlGen('', 'movie', '/credits', media[i].id);

        let genres = this.urlGen('', 'movie', '', media[i].id);

        // if they are tvshows...
        if (!media[i].hasOwnProperty('title')) {
          cast = this.urlGen('', 'tv', '/credits', media[i].id);

          genres = this.urlGen('', 'tv', '', media[i].id);
        }

        const requestCast = axios.get(cast);
        const requestGenres = axios.get(genres);

        axios.all([requestCast, requestGenres]).then(axios.spread((...res) => {
          // taking only five results per category
          media[i].cast = res[0].data.cast.splice(0, 5);
          media[i].genres = res[1].data.genres.splice(0, 5);

        })).then(() => {
          this.groupSearchGenres(media[i]);
        })
      }
    },

    groupSearchGenres(element) {
      // for each result iterate a loop of genres and if not already there, add it in a genres array
      for (let k = 0; k < element.genres.length; k++) {

        if (store.genresSelect.indexOf(element.genres[k].name) === -1) {

          store.genresSelect.push(element.genres[k].name);
        }
      }
    },

    urlGen(type, category, castOrGenres, id) {
      // function that generate those apiURLs
      if (type === 'search') {

        return `${store.apiURL}search/${category}/?${store.apiKey}${store.apiLanguage}&query=${store.searchString}`

      } else {

        return `${store.apiURL}${category}/${id}${castOrGenres}?${store.apiKey}${store.apiLanguage}`
      }

    },

    countryFlagURL(language) {
      // api for Flags
      let languageString = language;

      if (language === 'en') {
        languageString = 'gb';
      }

      return `https://flagsapi.com/${languageString.toUpperCase()}/flat/16.png`
    },

    imgMissing() {
      // if there's no artwork
      return 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
    },

    starsScore(element) {
      // rounding the rating in scale 0 to 5
      return Math.ceil((element.vote_average / 10) * 5);
    },

  },

  computed: {
    genresFilter() {
      // filtering array according to selected genre
      if (store.genresString === "Vedi Tutti") {

        store.resultFilter = store.searchResult

      } else {

        store.resultFilter = store.searchResult.filter(content => {

          for (let i = 0; i < content.genres.length; i++) {

            if (content.genres[i].name === store.genresString) {
              return true
            }
          }

        })
      }

    }
  }
}
</script>

<template>
  <input type="text" v-model="store.searchString">

  <button @click="searchContent()">Cerca</button>

  <select name="genres" id="genres" v-model="store.genresString">
    <option v-for="genre in store.genresSelect" :value="genre">
      {{ genre }}
    </option>
  </select>

  <ul v-for="(content, index) in store.resultFilter" :key="index">
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

    <li>
      <div>{{ content.overview }}</div>
    </li>

    <ul>
      <strong>Cast</strong>
      <li v-for="actor in content.cast">
        {{ actor.name }}
      </li>
    </ul>

    <ul>
      <strong>Genres</strong>
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
