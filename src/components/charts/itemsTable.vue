<template>
    <div>
        <v-data-table
        :headers="headers"
disable-sort
        :items=" Object.values($store.state.cdata)"
        :loading="$store.state.isLoading"
        :options.sync="options"
        :server-items-length="$store.state.campaignData.totalItems"
        :items-per-page="10"
        class="elevation-1"
        >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.spends="{ item }">
        {{item.spends? parseFloat(item.spends).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }):'0 €' }}
    </template>

        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.attributed_revenue="{ item }">
        {{item.attributed_revenue? parseFloat(item.attributed_revenue).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }):'0 €' }}
    </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.attributed_conversions="{ item }">
        {{parseFloat(item.attributed_conversions).toFixed(2)}}
    </template>
    </v-data-table>
    </div>
</template>
<script>
export default {
    name: 'items-Table',
     watch: {
      options: {
             handler() {
              const payload = {
                  page: this.options.page,
                pageSize: this.options.itemsPerPage,
            };
             this.$store.commit('updateCData', payload);
        this.$store.dispatch('tableUpdate');
        },
        deep: true,
      },
    },
    data () {
        return {
        options: {},
        headers: [
          {
            text: 'Source',
            align: 'start',
            sortable: false,
            value: 'source',
          },
          { text: 'Date', value: 'date' ,width: 120 },
          { text: 'Type', value: 'type' },
          { text: 'Spends', value: 'spends' },
          { text: 'Attributed revenue', value: 'attributed_revenue' },
              { text: 'Attributed conversions', value: 'attributed_conversions' },
              { text: 'Optimisation target', value: 'optimisation_target' },
          { text: 'Partition id', value: 'partition_id' },
        ],
      };
    },
  };
</script>
