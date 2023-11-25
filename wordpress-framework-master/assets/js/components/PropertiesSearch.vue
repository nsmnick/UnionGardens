<template>
  <div class="content content__properties-panel">
    <section id="generic-dialog" class="generic-dialog">
      <div class="generic-dialog__group generic-dialog__group__select">
        <select
          id="cause"
          name="cause"
          class="generic-dialog__group__select__input"
          v-model="params.selected_category"
          @change="search()"
        >
          <option value="0">All properties</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    </section>

    <section class="content content__properties-results">
      <div id="properties-results">
        <a name="results-top" id="results-top" />

        <div v-if="show_no_results" class="no-results">
          <p>Sorry there are currently no upcoming properties listed.</p>
        </div>

        <properties-search-results :properties="properties" />

        <div class="generic-controls">
          <div v-show="loading" class="generic-controls__loading-spinner" />
          <div
            class="generic-controls__show-more-button"
            v-if="showMore"
            @click="getMorePosts"
          >
            View more
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import PropertiesSearchResults from './PropertiesSearchResults.vue';

  export default {
    components: {
      PropertiesSearchResults,
    },
    props: {
      category: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        properties: [],
        categories: [],
        params: {
          page: 1,
          per_page: 12,
          orderby: 'date',
          order: 'desc',
          selected_category: 0,
        },
        clientId: '',
        total_pages: 0,
        total: 0,
        loading: false,
      };
    },
    mounted() {
      this.params.selected_category = this.category;
      console.log('cat');
      console.log(this.category);
      this.getCategories();
      this.search();
    },
    computed: {
      showMore() {
        return this.params.page < this.total_pages;
      },
      show_no_results() {
        return !this.loading && this.total === 0;
      },
    },
    methods: {
      async search() {
        this.properties = [];
        this.loading = true;

        if (
          this.params.selected_category !== 0 &&
          this.params.selected_category !== '0'
        ) {
          this.params.nsm_properties_category = this.params.selected_category;
        } else {
          delete this.params.nsm_properties_category;
        }

        await this.axios
          .get('nsm_properties', {
            params: this.params,
          })
          .then((response) => {
            this.properties = response.data;
            this.total = parseInt(response.headers['x-wp-total'], 10);
            this.total_pages = parseInt(
              response.headers['x-wp-totalpages'],
              10,
            );
          });

        this.loading = false;
      },
      async getMorePosts() {
        this.params.page += 1;
        this.loading = true;

        await this.axios
          .get('nsm_properties', {
            params: this.params,
          })
          .then((response) => {
            this.properties = this.properties.concat(response.data);
          });

        this.loading = false;
      },
      async getCategories() {
        await this.axios
          .get('nsm_properties_category', {
            params: { orderby: 'term_group', hide_empty: 1 },
          })
          .then((response) => {
            this.categories = response.data;
          });
      },
    },
  };
</script>
