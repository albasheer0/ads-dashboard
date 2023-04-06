<template>
  <div>
    <v-card class="mx-auto" :loading="$store.state.isLoading">
      <v-card-title class="text-center">Source Performance</v-card-title>
      <v-card-text>
        <canvas ref="chart"></canvas>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { mapState } from 'vuex';

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    ...mapState(['campaignData']),
    formattedChartData() {
      const { barChartData } = this.campaignData.visualizations;

      return {
        labels: barChartData.map((data) => data.source),
        datasets: [
          {
            label: 'Source',
            data: barChartData.map((data) => data.value),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    },
  },
  watch: {
    campaignData: {
      deep: true,
      handler() {
        this.updateChart();
      },
    },
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      this.chartInstance = new Chart(this.$refs.chart, {
        type: 'bar',
        data: this.formattedChartData,
        options: this.chartOptions,
      });
    },
    updateChart() {
      if (!this.chartInstance) return;
      this.chartInstance.data = this.formattedChartData;
      this.chartInstance.options = this.chartOptions;
      this.chartInstance.update();
    },
  },
};
</script>
