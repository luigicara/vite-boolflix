import { reactive } from "vue";

export const store = reactive({
    apiURL: 'https://api.themoviedb.org/3/',
    apiKey: 'api_key=fdb78ecb579abbbdd6e3a1990e76f699',
    apiLanguage: '&language=it_IT',
    searchString: "",
    searchResult: [],
    apiPosterURL: 'https://image.tmdb.org/t/p/',
    posterWidth: 'w342',
})