<template>
  <div>
    <v-card class="mx-auto" :loading="$store.state.isLoading">
      <v-card-title class="text-center">Daily Performance</v-card-title>
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
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { mapState } from 'vuex';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    ...mapState(['campaignData']),
    formattedChartData() {
      const { stackedBarChartData } = this.campaignData.visualizations;

      const labels = Array.from(
        new Set(stackedBarChartData.map((data) => data.data.date)),
      );

      const sources = Array.from(new Set(stackedBarChartData.map((data) => data.source)));

      const datasets = sources.map((source, index) => {
        const sourceData = stackedBarChartData
          .filter((data) => data.source === source)
          .map((data) => data.data);

        const data = labels.map((label) => {
          const foundData = sourceData.find((d) => d.date === label);
          return foundData ? foundData.value : 0;
        });

        return {
          label: source,
          data,
          backgroundColor: `rgba(${index * 40}, ${255 - index * 40}, ${100 + index * 40}, 0.5)`,
          borderColor: `rgba(${index * 40}, ${255 - index * 40}, ${100 + index * 40}, 1)`,
          borderWidth: 1,
        };
      });

      return {
        labels,
        datasets,
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
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
