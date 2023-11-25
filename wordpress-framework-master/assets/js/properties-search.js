import { createApp, h } from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

import PropertiesSearch from './components/PropertiesSearch.vue';

if (document.getElementById('properties-search') !== null) {
  // window.axios = require('axios');

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.baseURL = '/wp-json/wp/v2/';

  const searchEl = document.getElementById('properties-search');

  const props = {};

  if (searchEl.attributes['data-loadpage']) {
    props.loadpage = searchEl.attributes['data-loadpage'].value;
  }

  if (searchEl.attributes['data-category']) {
    props.category = searchEl.attributes['data-category'].value;
  }

  createApp({ render: () => h(PropertiesSearch, { ...props }) })
    .use(VueAxios, axios)
    .mount('#properties-search-lister');
}
