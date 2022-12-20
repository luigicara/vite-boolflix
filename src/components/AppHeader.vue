<script>
import { store } from "../store";

export default {
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <header>
        <h1>Boolflix</h1>

        <div>
            <input type="text" v-model="store.searchString">

            <button @click="$emit('search')">Cerca</button>

            <select name="genres" id="genres" v-if="store.genresSelect.length > 0" v-model="store.genresString">
                <option v-for="genre in store.genresSelect" :value="genre">
                    {{ genre }}
                </option>
            </select>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10rem;
    background-color: black;

    h1 {
        color: red;
    }
}
</style>