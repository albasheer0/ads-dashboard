<template>
  <div>
    <v-card class="mx-auto" :loading="$store.state.isLoading">
      <v-card-title class="text-center">Source Contribution</v-card-title>
      <v-card-text>
        <canvas ref="chart"></canvas>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
 Chart, PieController, ArcElement, Tooltip, Legend, 
} from 'chart.js';
import { mapState } from 'vuex';

Chart.register(PieController, ArcElement, Tooltip, Legend);

export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    ...mapState(['campaignData']),
    formattedChartData() {
      const { pieChartData } = this.campaignData.visualizations;

      return {
        labels: pieChartData.map((data) => data.source),
        datasets: [
          {
            data: pieChartData.map((data) => data.value),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
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
        type: 'pie',
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
