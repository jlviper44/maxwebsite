<template>
  <div id="wrapper">
    <v-card>
      <v-tabs
        v-model="Tab"
        bg-color="primary"
      >
        <v-tab value="graph">Graph</v-tab>
        <v-tab value="conversion">Conversion Data</v-tab>
        <v-tab value="click">Click Data</v-tab>
      </v-tabs>

      <v-card-text>
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

          <v-tabs-window-item value="conversion">
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
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import '@vuepic/vue-datepicker/dist/main.css'
import {
  GetHoursInDay, 
  SingleDayFormatChartData,
  GetClickData,
  GetConversionData,

} from './functions';

Chart.register(...registerables);

export default defineComponent({
  name: 'SingleDayGraph',

  components: {
    LineChart
  },

  data(){
    return {
      Tab: 0,
      Conversions: {
        Headers: [
          { title: 'Date'         , align: 'start', key: 'conversion_date'},
          { title: 'Offer Name'   , align: 'start', key: 'offer_name'     },
          { title: 'Sub ID'       , align: 'start', key: 'subid_1'        },
          { title: 'Price'        , align: 'start', key: 'price'          },
        ],
        Data:[],
        DataLoading: false,
      },
      Clicks: {
        Keys: ["click_date", "offer", "subid_1", "price", "ip_address", "offer_name"],
        Headers: [
          { title: 'Date'         , align: 'start', key: 'click_date'       },
          { title: 'Offer Name'   , align: 'start', key: 'offer.offer_name' },
          { title: 'Sub ID'       , align: 'start', key: 'subid_1'          },
          { title: 'Price'        , align: 'start', key: 'price'            },
          { title: 'IP Address'   , align: 'start', key: 'ip_address'       },
        ],
        Data:[],
        DataLoading: false,
      },
      ChartData: {
        labels: [],
        datasets: [
          {
            label: 'Conversions Price',
            backgroundColor: '#f87979',
            data: []
          },
          {
            label: 'Clicks',
            backgroundColor: '#12b2e3',
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
              text: "Hours",
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
    // search(options)
    // {
    //   if(options.Mode == "SingleDay")
    //   {
    //     this.getDataForDay(options.StartDate, options.EndDate)
    //   }
    // },

    async getDataForDay(startDate, endDate)
    {
      this.IsDataLoading = true;
      this.ChartData.labels = [];
      this.ChartData.datasets = [];

      this.ChartData.datasets.push({
        label: 'Conversions Price',
        backgroundColor: '#f87979',
        data: []
      });

      this.ChartData.datasets.push({
        label: 'Clicks',
        backgroundColor: '#12b2e3',
        data: []
      });

      var clicksData = await GetClickData(
        startDate,
        endDate,
        this.Clicks.Keys
      );
      var conversionsData = await GetConversionData(
        startDate,
        endDate,
        this.Conversions.Headers.map(x=>x.key)
      );

      this.Clicks.Data = clicksData;
      this.Conversions.Data = conversionsData;
      var conversionChartData = SingleDayFormatChartData(conversionsData, "conversion_date", "price");
      var clickChartData      = SingleDayFormatChartData(clicksData     , "click_date",      "Count");

      this.ChartData.labels = GetHoursInDay();
      conversionChartData.forEach((item) => {
        this.ChartData.datasets[0].data.push(item.data);
      });

      clickChartData.forEach((item) => {
        this.ChartData.datasets[1].data.push(item.data);
      });

      this.IsDataLoading = false;
    },
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