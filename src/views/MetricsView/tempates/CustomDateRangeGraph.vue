<template>
  <div id="wrapper">
    <v-card>
      <v-tabs
        v-model="Tab"
        bg-color="primary"
      >
        <v-tab value="graph">Graph</v-tab>
      </v-tabs>

      <v-card-text >
        <v-tabs-window v-model="Tab">
          <v-tabs-window-item value="graph">
            <div class="chartDiv">
              <v-progress-linear
                v-if="IsDataLoading"
                color="primary"
                height="6"
                indeterminate
                rounded
              ></v-progress-linear>
              <line-chart 
                :chartData="ChartData" 
                :options="ChartOptions"
                
              />
            </div>
          </v-tabs-window-item>

          <!-- <v-tabs-window-item value="conversion">
            <v-data-table 
              :items  ="Conversions.Data"
              :headers="Conversions.Headers"
              :loading="Conversions.DataLoading"
            >
            </v-data-table>
          </v-tabs-window-item>

          <v-tabs-window-item value="click">
            <v-data-table 
              :items  ="Clicks.Data"
              :headers="Clicks.Headers"
              :loading="Clicks.DataLoading"
            >
            </v-data-table>
          </v-tabs-window-item> -->
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios';

Chart.register(...registerables);

export default defineComponent({
  name: 'CustomDateRangeGraph',

  components: {
    LineChart
  },

  data(){
    return {
      Tab: 0,
      UnformattedData: {},
      
      ChartData: {
        labels: [],
        datasets: [
          {
            label: 'Conversions Price',
            backgroundColor: '#f87979',
            borderColor: "#f87979",
            data: []
          },
          {
            label: 'Clicks',
            backgroundColor: '#12b2e3',
            borderColor: "#12b2e3",
            data: []
          },
          {
            label: 'Revenue',
            backgroundColor: '#43d143',
            borderColor: "#43d143",
            data: []
          },
          {
            label: 'EPC',
            backgroundColor: '#d18221',
            borderColor: "#d18221",
            data: []
          }
        ]
      },
      ChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            
          xAxes: {
            title: {
              display: true,
              text: "Dates",
              font: {
                size: 15
              }
            }
          }
        },
      },
      IsDataLoading: false
    }
  },  

  methods: {
    async GetData(startDate, endDate)
    {
      const differenceInMilliseconds = endDate - startDate;

      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

      const beginDate = startDate;

      this.ChartData.labels = [];
      this.UnformattedData = {};
      for(var i = 0; i < differenceInDays + 1; i++)
      {
        const currentDate = new Date(beginDate);
        currentDate.setDate(currentDate.getDate() + i);
        const currentStartDate = currentDate.setHours(0, 0, 0, 0);
        const currentEndDate   = currentDate.setHours(23, 59, 59, 999);

        // console.log(new Date(currentStartDate), new Date(currentEndDate));
        var request = await axios.post("/Fluent/get/Reports/SubAffiliateSummary", 
          {
            start_date: currentStartDate,
            end_date:   currentEndDate,
            fields:     []
          }
        );
        // console.log(currentDate, request.data.data);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        var dateLabel = String(month).padStart(2,"0") + "/" + String(day).padStart(2,"0");
        this.ChartData.labels.push(dateLabel);
        this.UnformattedData[dateLabel] = request.data.data;
        const totalConversions = request.data.data.reduce((sum, item) => sum + item.conversions, 0);
        const totalClicks = request.data.data.reduce((sum, item) => sum + item.clicks, 0);
        const totalRevenue = request.data.data.reduce((sum, item) => sum + item.revenue, 0);
        const totalEPC = request.data.data.reduce((sum, item) => sum + item.epc, 0);

        this.ChartData.datasets[0].data.push(totalConversions);
        this.ChartData.datasets[1].data.push(totalClicks);
        this.ChartData.datasets[2].data.push(totalRevenue);
        this.ChartData.datasets[3].data.push(totalEPC);
      }
      
    }
  },

  created()
  {
  }
});
</script>

<style>
body {
  /* font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center; */
}
#wrapper {
  margin: 10px;
}

.search-container {
  margin:auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;

}
button {
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}

.chartDiv
{
  /* max-height: 100vh;
  height: 100%; */
}

</style>