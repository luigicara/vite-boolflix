<script>
import { store } from "../store";

export default {
    props: { content: Object },
    data() {
        return {
            store,
        }
    },

    methods: {
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
    }
}
</script>

<template>
    <div class="card">
        <img :src="content.poster_path === null ? this.imgMissing() : store.apiPosterURL + store.posterWidth + content.poster_path"
            alt="artwork">

        <div class="info">
            <ul>
                <li class="title"><strong>{{ content.hasOwnProperty('title') ? content.title : content.name }}</strong>
                </li>

                <li v-if="content.original_title !== content.title || content.original_name !== content.name">

                    <strong>Titolo originale: </strong>
                    {{ content.hasOwnProperty('original_title') ? content.original_title : content.original_name }}

                </li>

                <li>
                    <img v-if="content.hasOwnProperty('original_language')"
                        :src="this.countryFlagURL(content.original_language)" alt="languageflag">
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

                <li class="trama">
                    <div>{{ content.overview }}</div>
                </li>

                <li>
                    <div class="cast">
                        <strong>Cast: </strong>
                        <span v-for="actor in content.cast">
                            {{ actor.name + ', ' }}
                        </span>
                    </div>
                </li>

                <li>
                    <div class="genres">
                        <strong>Genere: </strong>
                        <span v-for="genre in content.genres">
                            {{ genre.name + ', ' }}
                        </span>
                    </div>
                </li>

            </ul>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    width: calc((100% - 8rem) / 5);
    position: relative;

    img {
        max-width: 100%;
    }

    &:hover .info {
        display: block;
    }

    .info {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;

        padding: 1rem;

        ul {
            list-style: none;

            .title {
                font-size: 1.5rem;
                margin: 1rem 0;
            }

            .trama {
                margin: 1.5rem 0;
            }

            li {
                margin: 0.3rem 0;

            }
        }
    }

}
</style>