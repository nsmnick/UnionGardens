<template>
  <transition-group
    name="stagged-fade"
    tag="div"
    class="property-results__list"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <article
      class="property-results__list__article"
      v-for="(propertyItem, index) in this.properties"
      :key="propertyItem.id"
      :data-index="index"
    >
      <component
        :is="propertyItem.hide_detail_page != 'Yes' ? 'a' : 'span'"
        class="no-underline"
        :href="propertyItem.link"
      >
        <div class="property-container">
          <div
            class="featured-image"
            :style="{ backgroundImage: propertyItem.featuredImage }"
          ></div>

          <div class="description">
            <h2 class="property-title">{{ propertyItem.title.rendered }}</h2>
            <p>{{ propertyItem.location }}</p>
          </div>
        </div>
      </component>
    </article>
  </transition-group>
</template>

<script>
  export default {
    props: {
      properties: Array,
    },
    data() {
      return {
        stagger_delay: 50,
      };
    },
    methods: {
      beforeEnter(el) {
        // eslint-disable-next-line no-param-reassign
        el.style.opacity = 0;
      },
      enter(el) {
        const delay = el.dataset.index * this.stagger_delay;
        setTimeout(() => {
          // eslint-disable-next-line no-param-reassign
          el.style.opacity = 1;
        }, delay);
      },
      leave(el) {
        // eslint-disable-next-line no-param-reassign
        el.style.display = 'none';
      },
    },
  };
</script>
