<template>
  <div id="wrapper">
    <FluentAPI></FluentAPI>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import FluentAPI from './Templates/FluentAPI/FluentAPI.vue';

export default defineComponent({
  name: '',

  components: {
    FluentAPI
  },

  data(){
    return {
      
    }
  },  

  methods: {
    
  },

  async created()
  {
  }
});
</script>

<style>
#wrapper {
  margin: 10px;
}


</style>