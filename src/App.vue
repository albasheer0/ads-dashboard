<template>
  <v-app>
    <FiltersPanel></FiltersPanel>
  <HeaderNav ></HeaderNav>
    <v-main>
<VisualizationArea></VisualizationArea>
    </v-main>
  </v-app>
</template>

<script>

import HeaderNav from './components/header-nav.vue';
import FiltersPanel from './components/FiltersPanel.vue';
import VisualizationArea from './components/charts/VisualizationArea.vue';

export default {
  name: 'App',
  components: {
    HeaderNav,
    VisualizationArea,
    FiltersPanel,
  },

  data: () => ({
    //
  }),
};
</script>
