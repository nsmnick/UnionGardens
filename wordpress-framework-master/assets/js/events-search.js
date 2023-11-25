import { createApp, h } from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

import EventsSearch from './components/EventsSearch.vue';

if (document.getElementById('events-search') !== null) {
  // window.axios = require('axios');

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.baseURL = '/wp-json/wp/v2/';

  const searchEl = document.getElementById('events-search');

  const props = {};

  if (searchEl.attributes['data-loadpage']) {
    props.loadpage = searchEl.attributes['data-loadpage'].value;
  }

  createApp({ render: () => h(EventsSearch, { ...props }) })
    .use(VueAxios, axios)
    .mount('#events-search-lister');
}
