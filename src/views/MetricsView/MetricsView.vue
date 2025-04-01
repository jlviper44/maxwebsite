<template>
  <div id="wrapper">
    <SearchBar 
      @SearchClicked="search"
    ></SearchBar>

    <div v-show="Mode == 'SingleDay'">
      <SingleDayGraph
        ref="SingleDayGraphView"
      ></SingleDayGraph>
    </div>

    <div v-show="Mode == 'CustomRange'">
      <CustomDateRangeGraph
        ref="CustomDateRangeGraphView"
      ></CustomDateRangeGraph>
    </div>
    
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css'


import SearchBar from './tempates/SearchBar.vue';
import SingleDayGraph from './tempates/SingleDayGraph.vue';
import CustomDateRangeGraph from './tempates/CustomDateRangeGraph.vue';

export default defineComponent({
  name: 'MetricsView',

  components: {
    SearchBar,
    SingleDayGraph,
    CustomDateRangeGraph
  },

  data(){
    return {
      Mode: "SingleDay",
    }
  },  

  methods: {
    search(options)
    {
      this.Mode = options.Mode;
      if(options.Mode == "SingleDay")
      {
        this.$refs.SingleDayGraphView.GetData(options.StartDate, options.EndDate);
        return;
      }
      if(options.Mode == "CustomRange")
      {
        this.$refs.CustomDateRangeGraphView.GetData(options.StartDate, options.EndDate);
        return;
      }

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