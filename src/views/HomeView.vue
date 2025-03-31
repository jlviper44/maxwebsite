<template>
  <div id="wrapper">
    <div class="search-container">
      <h2>Search</h2>
      <VueDatePicker v-model="StartDate" vertical />
      <VueDatePicker v-model="EndDate" vertical />
      <button @click="getDataForDay">Search</button>
      <div id="result"></div>
    </div>

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
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios';

Chart.register(...registerables);

export default defineComponent({
  name: 'HomeView',

  components: { 
    VueDatePicker,
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
        Keys: ["click_date", "offer", "subid_1", "price", "ip_address"],
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
      StartDate: null,
      EndDate:   null,
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
    async getDataForDay()
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

      var clicksData = await this.getClicks();
      var conversionsData = await this.getConversions();

      this.Clicks.Data = clicksData;
      this.Conversions.Data = conversionsData;
      var conversionChartData = this.SingleDayFormatChartData(conversionsData, "conversion_date", "price");
      var clickChartData      = this.SingleDayFormatChartData(clicksData     , "click_date",      "Count");

      this.ChartData.labels = this.GetHoursInDay();
      conversionChartData.forEach((item) => {
        this.ChartData.datasets[0].data.push(item.data);
      });

      clickChartData.forEach((item) => {
        this.ChartData.datasets[1].data.push(item.data);
      });

      this.IsDataLoading = false;
    },

    async getClicks()
    {
      this.Clicks.Data = [];
      var request = await axios.post("/Fluent/get/Reports/Clicks", 
        {
          start_date: this.StartDate,
          end_date:   this.EndDate,
          fields:     this.Clicks.Keys
        }
      );
      var responseData = request.data.data;
      responseData.forEach((item) => {
        item["click_date"] = this.FormatDateTime(item["click_date"]);
        item["Count"] = 1;
      })

      return responseData;
    },

    async getConversions()
    {
      this.Conversions.Data = [];
      var request = await axios.post("/Fluent/get/Reports/Conversions", 
        {
          start_date: this.StartDate,
          end_date:   this.EndDate,
          fields:     this.Conversions.Headers.map(x=>x.key)
        }
      );
      var responseData = request.data.data;
      
      responseData.forEach((item) => {
        item["conversion_date"] = this.FormatDateTime(item["conversion_date"]);
      })
      return responseData;
    },

    GetHoursInDay()
    {
      var hours = [];
      for(var i = 0; i < 24; i++)
      {
        hours.push(String(i).padStart(2, '0'));
      }
      return hours;
    },

    SingleDayFormatChartData(data, dateKey, dataKey)
    {
      var labels = {};
      
      this.GetHoursInDay().forEach((item) => {
        labels[item] = 0.0;
      });

      data.forEach((item) => {
        var label = item[dateKey].substring(11,13);
        labels[label] += item[dataKey];
      });
      var finalData = [];

      this.GetHoursInDay().forEach((item) => {
        finalData.push({
          label: item,
          data: labels[item]
        });
      });
      return finalData;
    },

    FormatDateTime(dateString) {
      const date = new Date(dateString);

      const month   = (date.getMonth() + 1).toString().padStart(2, '0');
      const day     = date.getDate();
      const year    = date.getFullYear();
      const hours   = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
    }
  },
  

  created()
  {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    this.StartDate = startOfDay;

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    this.EndDate = endOfDay;
    
    this.getDataForDay();
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