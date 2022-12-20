<script>
import { store } from "../store";

export default {
    data() {
        return {
            store,
        }
    },

    methods: {
        resetValue() {
            store.searchString = "";
        }
    }
}
</script>

<template>
    <header>
        <h1 @click="resetValue(); $emit('search')">Boolflix</h1>

        <div>
            <select name="genres" id="genres" v-if="store.genresSelect.length > 0" v-model="store.genresString">
                <option v-for="genre in store.genresSelect" :value="genre">
                    {{ genre }}
                </option>
            </select>

            <input type="text" v-model="store.searchString">

            <button @click="$emit('search')">Cerca</button>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6rem;
    background-color: black;

    h1 {
        margin: 1rem;
        font-size: 4rem;
        color: red;
        cursor: pointer;
    }

    div {
        margin: 3rem;

        select {
            color: white;
            background-color: black;
            border: 2px solid red;
            border-radius: 1rem;
        }

        input {
            margin: 1rem;
            padding: 0.3rem;
            border: 2px solid red;
            border-radius: 1rem;
        }

        button {
            font-size: 1rem;
            color: white;
            padding: 0.4rem;
            border: 2px solid red;
            border-radius: 1rem;
            background-color: black;
        }
    }
}
</style>