<template>
  <v-app-bar app color="grey lighten-4" dark loading="isLoading">
    <v-btn  icon @click="toggleDrawer"> <v-icon color="black">mdi-filter-menu-outline</v-icon></v-btn>
    <v-btn icon @click="toggleDarkMode">
  <v-icon color="black">{{ $vuetify.theme.dark ? 'mdi-lightbulb-on' : 'mdi-lightbulb-off' }}</v-icon>
</v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title class="black--text">Ad Campaign Performance Visualization</v-toolbar-title>

  </v-app-bar>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex';
import {updatePayload} from '@/store'
export default {
  name: 'header-nav',
  methods: {
    toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    localStorage.setItem('darkMode', JSON.stringify(this.$vuetify.theme.dark));
  },
    toggleDrawer() {
      this.$store.commit('toggleDrawer')
    },
  },
  computed: {
    ...mapState(['isLoading','isDrawerOpen']),
  },
};
</script>
