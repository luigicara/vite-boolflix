import { reactive } from "vue";

export const store = reactive({
    // api components
    apiURL: 'https://api.themoviedb.org/3/',
    apiKey: 'api_key=fdb78ecb579abbbdd6e3a1990e76f699',
    apiLanguage: '&language=it',
    apiPosterURL: 'https://image.tmdb.org/t/p/',
    posterWidth: 'w342',

    // input search
    searchString: "",

    // array search
    searchResult: [],

    // array of genres from search
    genresSelect: [],

    // v-model select of genres
    genresString: "Vedi Tutti",

    // array of search filtered according to selection of genres
    resultFilter: []
})