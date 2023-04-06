<template>
  <div>
    <v-card class="mx-auto" :loading="$store.state.isLoading" >
      <v-card-title class="text-center"> Trends and performance </v-card-title>
      <v-card-text>
        <div class="chart-container">

          <canvas ref="chart"></canvas>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import {
 Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, TimeScale, 
} from 'chart.js';
import { mapState } from 'vuex';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, TimeScale);

export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    ...mapState(['campaignData']),
    formattedChartData() {
      const { lineChartData } = this.campaignData.visualizations;

      return {
        labels: lineChartData.map((data) => data.date),
        datasets: [
          {
            label: 'trends',
            data: lineChartData.map((data) => data.value),
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
        height: 300,
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
        type: 'line',
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
<style>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}</style>
