<template>
  <div id="wrapper">
    <div class="search-container">
      <h2>Search</h2>
      <VueDatePicker v-model="StartDate" vertical />
      <VueDatePicker v-model="EndDate" vertical />
      <button @click="getData">Search</button>
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
              <line-chart :chartData="ChartData" :options="ChartOptions"/>
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
          }
        ]
      },
      ChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },  

  methods: {
    getData()
    {
      this.getClicks();
      this.getConversions();
    },

    async getClicks()
    {
      this.Clicks.DataLoading = true;
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
      })

      this.Clicks.Data = request.data.data;
      this.Clicks.DataLoading = false;
    },

    async getConversions()
    {
      this.Conversions.DataLoading = true;
      this.Conversions.Data = [];
      var request = await axios.post("/Fluent/get/Reports/Conversions", 
        {
          start_date: this.StartDate,
          end_date:   this.EndDate,
          fields:     this.Conversions.Headers.map(x=>x.key)
        }
      );
      var responseData = request.data.data;
      responseData.sort((a, b) => new Date(a.conversion_date) - new Date(b.conversion_date));

      responseData.forEach((item) => {
        item["conversion_date"] = this.FormatDateTime(item["conversion_date"]);
        this.ChartData.labels.push(item["conversion_date"]);
        this.ChartData.datasets[0].data.push(item["price"]);
      })

      this.Conversions.Data = request.data.data;
      this.Conversions.DataLoading = false;
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