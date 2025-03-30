<template>
  <div id="wrapper">
    <!-- <div class="d-flex" id="searchBar">
      <span>Start Date: </span>
      <div class="datePickerDiv">
        <VueDatePicker v-model="StartDate" vertical />
      </div>
      
      <span>Start Date: </span>
      <div class="datePickerDiv">
        <VueDatePicker v-model="EndDate" vertical />
      </div>
      <v-btn size="small" background-color="primary">Edit</v-btn>
    </div>
     -->
    <!-- <center> -->
    <div class="search-container">
      <h2>Search</h2>
      <VueDatePicker v-model="StartDate" vertical />
      <VueDatePicker v-model="EndDate" vertical />
      <button @click="getData">Search</button>
      <div id="result"></div>
    </div>
    <!-- </center> -->
    <v-data-table 
      :items="Data"
    >
    </v-data-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import axios from 'axios';
export default defineComponent({
  name: 'HomeView',

  components: { 
    VueDatePicker
  },

  data(){
    return {
      // Headers: [
      //   { title: 'Domain'         , align: 'start', key: 'Domain'     },
      //   { title: 'Campaign Path'  , align: 'start', key: 'Path'       },
      //   { title: 'User'           , align: 'start', key: 'User'       },
      //   { title: 'WHForm'         , align: 'start', key: 'WHForm'     },
      //   { title: 'Regions'        , align: 'start', key: 'Regions'    },
      //   { title: 'SafetyForm'     , align: 'start', key: 'SafetyForm' },
      //   { title: ''               , align: 'start', key: 'Edit'       },
      // ],
      Data:[],
      StartDate: null,
      EndDate:   null,
    }
  },  

  methods: {
    async getData()
    {
      var request = await axios.post("/Fluent/get/ConversionReports", 
        {
          start_date: this.StartDate,
          end_date:   this.EndDate
        }
      );
      var responseData = request.data.data;
      console.log(responseData)
      responseData.forEach((item) => {
        item["conversion_date"] = this.FormatDateTime(item["conversion_date"]);
      })

      this.Data = request.data.data;
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

</style>