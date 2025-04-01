<template>
  <div id="wrapper">
    <div class="search-container">
      <h2>Search</h2>
      <v-combobox
        label="SearchType"
        variant="outlined"
        density="comfortable"
        hide-details
        :items="SearchTypeItems"
        v-model="SearchType"
      ></v-combobox>


      <div v-if="SearchType=='Date (Hours)'">
        <VueDatePicker v-model="SingleDayDate" vertical :enable-time-picker="false"/>
      </div>
      <div v-if="SearchType=='Custom Date Range (Days)'">
        <VueDatePicker v-model="CustomStartDate" vertical :enable-time-picker="false"/>
        <br>
        <VueDatePicker v-model="CustomEndDate"   vertical :enable-time-picker="false"/>
      </div>

      <v-btn color="primary" @click="clickSearch()">Search</v-btn>
      <div id="result"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
  name: 'SearchBar',

  components: { 
    VueDatePicker,
  },

  data(){
    return {
      SearchTypeItems: ["Date (Hours)", "Custom Date Range (Days)"],
      SearchType: "Date (Hours)",
      SingleDayDate: null,
      CustomStartDate: null,
      CustomEndDate:   null,
    }
  },  

  methods: {
    getSearchOptions()
    {
      if(this.SearchType == "Date (Hours)")
      {
        var tempDate = new Date(this.SingleDayDate);
        tempDate.setHours(0, 0, 0, 0);
        var startDate = new Date(tempDate);
        tempDate.setHours(23, 59, 59, 999);
        var endDate = new Date(tempDate);
        return {
          StartDate: startDate,
          EndDate: endDate,
          Mode: "SingleDay"
        };
      }

      if(this.SearchType == "Custom Date Range (Days)")
      {
        var startDate = new Date(this.CustomStartDate);
        startDate.setHours(0, 0, 0, 0);
        var endDate = new Date(this.CustomEndDate);
        endDate.setHours(23, 59, 59, 999);
        return {
          StartDate: startDate,
          EndDate: endDate,
          Mode: "CustomRange"
        };
      }
    },

    clickSearch()
    {
      this.$emit('SearchClicked', this.getSearchOptions()); 
    }
  },
  
  created()
  {
    const startOfDay = new Date();
    this.SingleDayDate = startOfDay;
    this.CustomEndDate = startOfDay;

    const oneWeekAgo = new Date(startOfDay);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    this.CustomStartDate = oneWeekAgo;
  }
});
</script>

<style>
</style>