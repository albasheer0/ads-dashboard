<template>
  <v-card :loading="isLoading" class="mt-3">
    <v-card-title>Summary Metrics</v-card-title>
    <v-card-subtitle >from {{ $store.state.payload.startDate }} to {{  $store.state.payload.endDate}}</v-card-subtitle>
    <v-card-text>
      <v-row>
      <v-col cols="12">
 <v-row>
  <v-col cols="12" md="4">
    <v-card class="gradient-background-1 text-center summary-card">
      <v-row>
         <v-col cols="7">
            <v-card-text>
        <p class="summary-title"><strong>Total attributed conversions:</strong></p>
        <v-skeleton-loader v-if="isLoading" type="text" width="100px" class="ml-11 mt-1" />
        <p v-else class="summary-value">
          {{ campaignData.summary.totalAttributedConversions }}
        </p>
      </v-card-text>
        </v-col>
         <v-col cols="5">
           <v-icon size="100" color="white" opacity="0.2">mdi-chart-line</v-icon>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
  <v-col cols="12" md="4">
    <v-card class="gradient-background-2 text-center summary-card">
      <v-row>
        <v-col cols="7">
            <v-card-text>
        <p class="summary-title"><strong>Total attributed revenue:</strong></p>
        <v-skeleton-loader v-if="isLoading" type="text" width="100px" class="ml-11 mt-1" />
        <p v-else class="summary-value">
          {{
            parseFloat(campaignData.summary.totalAttributedRevenue).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            })
          }}
        </p>
      </v-card-text>
        </v-col>
         <v-col cols="5">
           <v-icon size="100" color="white" opacity="0.2">mdi-cash-plus</v-icon>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
  <v-col cols="12" md="4">
    <v-card class="gradient-background-3 text-center summary-card">
      <v-row>
        <v-col cols="7">       
          <v-card-text>
            <p class="summary-title"><strong>Total add spend:</strong></p>
            <v-skeleton-loader v-if="isLoading" type="text" width="100px" class="ml-11 mt-1" />
            <p v-else class="summary-value">
              {{
                parseFloat(campaignData.summary.totalAdSpend).toLocaleString('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                })
              }}
            </p>
          </v-card-text>
        </v-col>
        <v-col cols="5">
           <v-icon size="100" color="white" opacity="0.2">mdi-cash-minus</v-icon>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</v-row>

        </v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'summary-mitrcs',
  computed: {
    ...mapState(['campaignData', 'isLoading']),
    summary() {
      return this.campaignData.summary || {};
    },
  },
};
</script>

<style>
.summary-card {
  position: relative;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  z-index: 1;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 1;
}
.gradient-background-1 {
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}
.gradient-background-2 {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
}
.gradient-background-3 {
  background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
}
</style>
