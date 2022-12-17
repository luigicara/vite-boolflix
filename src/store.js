import { reactive } from "vue";

export const store = reactive({
    apiURL: 'https://api.themoviedb.org/3/',
    apiKey: 'api_key=fdb78ecb579abbbdd6e3a1990e76f699',
    searchString: "",
    searchResultMovie: [],
    searchResultTV: [],
})