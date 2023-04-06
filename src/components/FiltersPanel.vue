<template>
  <v-navigation-drawer
      v-model="$store.state.isDrawerOpen" app width="360"
      temporary
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-avatar>AD</v-avatar>
        </v-list-item-avatar>

        <v-list-item-title>Data fillter</v-list-item-title>

        <v-btn
          icon
          @click.stop="toggleDrawer"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

        <v-row  class="mx-3">
<v-col cols="12">
 <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
   <v-combobox
            v-model="date"
            multiple
            chips
            small-chips
          
            label="Select period"
            prepend-icon="mdi-calendar-expand-horizontal-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          >
          
   </v-combobox>
           </template>
           <v-date-picker
      v-model="date"
             @change="updatePayload"
      range
      min="2022-06-01"
      max="2022-12-30"
    ></v-date-picker>
         </v-menu>
          <v-select
             prepend-icon="mdi-account-group-outline"
          v-model="selectedSources"
          :items="allowedSources"
          label="Sources/Channels"
          multiple
          chips
                   @change="updatePayload"

        ></v-select>
         <v-select
            prepend-icon="mdi-poll"
          v-model="selectedMetric"
          :items="allowedMetrics"
          label="Metric"
         @change="updatePayload"
        ></v-select>
      <v-row class="ma-3" justify="center">
        <v-btn
        color="primary"
        block :loading="isLoading"
        :disabled="!validQuery"
        outlined
        large
        @click="fetchapi"
        >update</v-btn>
      </v-row>
</v-col>
</v-row>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      date: ['2022-06-20','2022-06-30'],
      drawer: true,
      items: ['mdi-calendar-expand-horizontal-outline','mdi-account-group-outline','mdi-poll'],
      menu: null,
      mini: true,
      startDate: '',
      endDate: '',
      selectedSources: [],
      selectedMetric: '',
    };
  },
  computed: {
    ...mapState(['allowedSources', 'allowedMetrics','isLoading']),
    validQuery(){
      if(this.date.length !== 0 && this.selectedSources.length !== 0 && this.selectedMetric !== ''){
        return true;
      }
      return false;
    },
    payloadQuery(){
      const d=this.date;
      d.sort();
      const p = {
        startDate: d[0],
        endDate: d[1],
        sources: this.selectedSources,
        metric: this.selectedMetric,
      };
      return p;
    },
  },
  methods: {
     toggleDrawer() {
      this.$store.commit('toggleDrawer');
    },
    async fetchapi(){
      await this.$store.dispatch('fetchData');
    },
    updatePayload(){
      if(this.validQuery){
        this.$store.commit('updatePayload', this.payloadQuery);
        this.$store.dispatch('fetchData');
      }
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>
