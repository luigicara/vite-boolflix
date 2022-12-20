import { createApp } from 'vue'
import './styles/style.scss'
import App from './App.vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faStar, fasStar)


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
