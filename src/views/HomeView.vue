<template>
   <div>
      <v-data-table :items="Data"></v-data-table>
   </div>
</template>

<script>
import { defineComponent } from 'vue';
import { VDataTable } from 'vuetify/lib/components/index.mjs';
import axios from 'axios';
export default defineComponent({
  name: 'HomeView',

  components: {
    VDataTable
  },

  data(){
    return {
      Headers: [
        { title: 'Campaign'   , align: 'start', key: 'Campaign'   },
        { title: 'Clicks'     , align: 'start', key: 'Clicks'     },
        { title: 'EPC'        , align: 'start', key: 'EPC'        },
        { title: 'Revenue'    , align: 'start', key: 'Revenue'    },
        { title: 'Conversion' , align: 'start', key: 'Conversion' },
        { title: 'Time'       , align: 'start', key: 'Time'       },
      ],
      Data:[]
    }
  },

  methods: {
    async getData()
    {
      var request = await axios.get("/sql");
      console.log(request)
      // var request = await axios.get(
      //   "/api/affiliates/api/Reports/CampaignSummary?start_date=03%2F01%2F2025&end_date=03%2F25%2F2025&conversion_type=all&start_at_row=1&row_limit=30&api_key=hFct58Jru5Y5cPlP8VGq8Q&affiliate_id=207744"
      // );
      // console.log(request);
      // this.Data = request.data.data;
      // this.axios.get("https://login.affluentco.com/affiliates/api/Reports/CampaignSummary?start_date=03%2F01%2F2025&end_date=03%2F25%2F2025&conversion_type=all&start_at_row=1&row_limit=30&api_key=hFct58Jru5Y5cPlP8VGq8Q&affiliate_id=207744");
    }
  },

  created()
  {
    this.getData();
  }
});


</script>
