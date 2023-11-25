import { createApp, h } from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

import NewsSearch from './components/NewsSearch.vue';

if (document.getElementById('news-search') !== null) {
  // window.axios = require('axios');

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.baseURL = '/wp-json/wp/v2/';

  const searchEl = document.getElementById('news-search');

  const props = {};

  if (searchEl.attributes['data-loadpage']) {
    props.loadpage = searchEl.attributes['data-loadpage'].value;
  }

  createApp({ render: () => h(NewsSearch, { ...props }) })
    .use(VueAxios, axios)
    .mount('#news-search-lister');
}
