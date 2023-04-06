import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDrawerOpen: true,
    isLoading: false,
    allowedSources: [
      'affiliate_prospecting',
      'baseline',
      'direct',
      'display_prospecting',
      'displav_retargeting',
      'gooale_performance',
      'organicsearch',
      'organicsocial',
      'paidsearch_dynamic_search_ads_prospecting',
      'paid_generic_prospecting',
      'paidsocial_prospecting',
      'paidsocial_retargeting',
      'radio',
      'tv',
    ],
    allowedMetrics: ['attributed_conversions', 'attributed_revenue', 'spends'],
    campaignData: {
      totalItems: 10,
      visualizations: {
        lineChartData: [{
                date: '2022-06-10',
                value: '50.87',
            },
            {
                date: '2022-06-10',
                value: '50.87',
          }],
        barChartData: [
            {
                source: 'radio',
                value: '101.74',
            },
        ],
        pieChartData: [
          {
                source: 'radio',
                value: '101.74',
            },
            {
                source: 'tv',
                value: '1586.50',
            },
        ],
        stackedBarChartData: [
            {
                source: 'radio',
                data: {
                    date: '2022-06-10',
                    value: 101.74,
                },
            },
        ],
      bubbleChartData: [{
                source: 'radio',
                conversions: 1.828593327638144,
                revenue: 262.195568601616,
                adSpend: 50.870000000000005,
            },
        ],
      areaChartData: [
            {
                source: 'radio',
                data: {
                    date: '2022-06-10',
                    value: 101.74000000000001,
                },
            }],
      },
      summary: {
        totalAttributedConversions: 0,
        totalAttributedRevenue: 0,
        totalAdSpend: 0,
    },
    },
    cdata: [{
            date: '',
            source: '',
            attributed_conversions: '',
            attributed_revenue: '',
            type: '',
            spends: '',
            partition_id: '',
            optimisation_target: '',
        }],
    payload: {
      startDate: '2022-06-30',
      endDate: '2022-07-2',
      sources: [],
      metric: '',
      page: 1,
      pageSize: 20,
    },
  },
  mutations: {
    // show hide filter panle
      toggleDrawer(state) {
    state.isDrawerOpen = !state.isDrawerOpen;
  },
    // update loading indecator
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setCampaignData(state, payload) {
      state.campaignData = payload;
      state.cdata=payload.data;
    },
     // Update cdata with new data
   updateCData(state, newPayload) {
  if (Array.isArray(newPayload)) {
    state.cdata = newPayload;
  } else if (typeof newPayload === 'object') {
    state.cdata = [newPayload];
  } else {
    console.error('Invalid payload format for updateCData');
  }
},
    // Update payload with  new data
    updatePayload(state, newPayload) {
      state.payload = { ...state.payload, ...newPayload };
    },
  },
  actions: {
    async fetchData({ commit, state }) {
      commit('setLoading', true);
      try {
        const response = await axios.post('https://adscampapi.herokuapp.com/api/data', state.payload);
        commit('setCampaignData', response.data);
        commit('updateCData', response.data.data);
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        console.error(error);
      }
    },
    //  
     async tableUpdate({ commit, state }) {
      commit('setLoading', true);
      try {
        const response = await axios.post('https://adscampapi.herokuapp.com/api/datatable', state.payload);
        commit('updateCData', response.data.data);
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        console.error(error);
      }
    },
  },
  getters: {
    getCampaignData: (state) => state.campaignData,
  },
});
