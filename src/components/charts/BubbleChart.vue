<template>
  <div>
    <v-card class="mx-auto" :loading="$store.state.isLoading">
      <v-card-title class="text-center">Attributed conversions Vs. revenue</v-card-title>
      <v-card-text>
        <div class="chart-container">
          <canvas ref="chart"></canvas>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
 Chart, BubbleController, PointElement, LinearScale, 
} from 'chart.js';

Chart.register(BubbleController, PointElement, LinearScale);

export default {
  name: 'BubbleChart',
  data() {
    return {
      chart: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Attributed Conversions',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Attributed Revenue',
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState(['campaignData']),
   chartData() {
  const bubbleData = this.campaignData.visualizations.bubbleChartData;

  // Group data by source and sum conversions, revenue, and ad spend
  const groupedData = bubbleData.reduce((acc, item) => {
    if (!acc[item.source]) {
      acc[item.source] = {
        conversions: 0,
        revenue: 0,
        adSpend: 0,
      };
    }
    acc[item.source].conversions += item.conversions;
    acc[item.source].revenue += item.revenue;
    acc[item.source].adSpend += item.adSpend;
    return acc;
  }, {});

  // Convert grouped data to datasets format
  const datasets = Object.entries(groupedData).map(([source, data]) => ({
    label: source,
    data: [
      {
        x: data.conversions,
        y: parseFloat(data.revenue).toFixed(2),
        r: parseFloat(data.adSpend / 1000).toFixed(2),
      },
    ],
    backgroundColor: this.randomColor(),
  }));

  return {
    datasets,
  };
},
  },
  methods: {
    randomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i += 1) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    renderBubbleChart() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(this.$refs.chart.getContext('2d'), {
        type: 'bubble',
        data: this.chartData,
        options: this.options,
      });
    },
  },
  watch: {
    chartData: {
      handler() {
        this.renderBubbleChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.renderBubbleChart();
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 500px;
  width: 100%;
}
</style>
