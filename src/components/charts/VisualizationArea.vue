<template>
<v-row class="ma-3">
    <v-col clos="12" md="12">
<SummaryMetrics></SummaryMetrics>
</v-col>

<v-col cols="12" md="6">
  <BarChart></BarChart>
  
</v-col>
<v-col cols="12" md="6">
  <StackedBarChart></StackedBarChart>

</v-col>
<v-col clos="12" md="6">
  <LineChart></LineChart>

</v-col>

<v-col cols="12" md="6">
  <PieChart></PieChart>
</v-col>
<v-col cols="12" md="12">
<itemsTable></itemsTable>
    </v-col>
    <v-col cols="12" md="12">
  <BubbleChart></BubbleChart>

</v-col>
</v-row>
</template>
<script>
import itemsTable from './itemsTable.vue';
import BubbleChart from './BubbleChart.vue';
import BarChart from './BarChart.vue';
import SummaryMetrics from './SummaryMetrics.vue';
import LineChart from './LineChart.vue';
import PieChart from './PieChart.vue';
import StackedBarChart from './StackedBarChart.vue';

export default {
  name: 'Visualization-Area',
  components: {
    SummaryMetrics,
itemsTable,
    LineChart,
    BubbleChart,
    BarChart,
    PieChart,
    StackedBarChart,

  },
};
</script>
