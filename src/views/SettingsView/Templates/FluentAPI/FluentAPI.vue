<template>
  <v-card>
    <v-card-title>
      Fluent APIs
      <v-btn 
        size="small" 
        style="float:right;" 
        color="primary"
        @click="AddNewButtonClicked()"
      >
        Add New
      </v-btn>
    </v-card-title>
    <v-data-table
      :items="Data"
      :headers="Headers"
    >
      <template v-slot:item.Actions="{ item }">
        <v-btn 
          size="small" 
          color="primary" 
          style="margin-right:5px"
          @click="EditButtonClicked(item)"
        >
          <v-icon>
            mdi-file-document-edit
          </v-icon>
        </v-btn>
        <v-btn 
          size="small" 
          color="red"
          @click="DeleteButtonClicked(item)"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog
      v-model="DialogData.IsShowing"
      width="auto"
    >
      <v-card>
        <v-card-title>
          {{DialogData.Mode}}
          <v-btn 
            size="small" 
            style="float:right;" 
            color="red"
            @click="DialogData.IsShowing = false"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <div style="width: 400px; padding: 20px; padding-top:0px;">
          <table>
            <tbody>
              <tr>
                <td class="tableHeader">Name: </td>
                <td style="width: 100%;">
                  <v-text-field
                    placeholder="API Name"
                    density="compact"
                    variant="solo"
                    hide-details
                    :disabled="DialogData.Mode == 'Delete'"
                    v-model="DialogData.NewAPI.Name"
                  >
                  </v-text-field>
                </td>
              </tr>
              <tr>
                <td class="tableHeader">API_KEY: </td>
                <td style="width: 100%;">
                  <v-text-field
                    placeholder="API_KEY"
                    density="compact"
                    variant="solo"
                    hide-details
                    :disabled="DialogData.Mode == 'Delete'"
                    v-model="DialogData.NewAPI.API_KEY"
                  >
                  </v-text-field>
                </td>
              </tr>
              <tr>
                <td class="tableHeader">AFFILIATE_ID: </td>
                <td style="width: 100%;">
                  <v-text-field
                    placeholder="AFFILIATE_ID"
                    density="compact"
                    variant="solo"
                    hide-details
                    :disabled="DialogData.Mode == 'Delete'"
                    v-model="DialogData.NewAPI.AFFILIATE_ID"
                  >
                  </v-text-field>
                </td>
              </tr>
            </tbody>
          </table>

          <div style="padding: 10px;">
            <v-btn 
              v-if="DialogData.Mode == 'Add'"
              full-width 
              style="width: 100%;"
              color="primary"
              :disabled="
                Data.find(
                  item => item.Name == DialogData.NewAPI.Name
                ) != undefined ||
                DialogData.NewAPI.Name == ''
              "
              @click="InsertData()"
            >
              Add New API
            </v-btn>
            <v-btn 
              v-if="DialogData.Mode == 'Edit'"
              full-width 
              style="width: 100%;"
              color="primary"
              :disabled="
                Data.find(
                  item => item.Name == DialogData.NewAPI.Name
                ) != undefined ||
                DialogData.NewAPI.Name == ''
              "
              @click="UpdateData()"
            >
              Update
            </v-btn>
            <v-btn 
              v-if="DialogData.Mode == 'Delete'"
              full-width 
              style="width: 100%;"
              color="red"
              @click="DeleteData()"
            >
              Delete
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'FluentAPISettings',

  components: {
    
  },

  data(){
    return {
      Data: [],
      Headers: [
        {title:"Name"         , value: "Name"         },
        {title:"API_KEY"      , value: "API_KEY"      },
        {title:"AFFILIATE_ID" , value: "AFFILIATE_ID" },
        {title:"Actions"      , value: "Actions"      }
      ],
      DialogData: {
        IsShowing: false,
        Mode: "",
        OriginalAPI: "",
        NewAPI: {
          Name: "",
          API_KEY: "",
          AFFILIATE_ID: "",
          Actions: ""
        }
      }
    }
  },
  computed: {
  },

  methods: {
    
    async GetData()
    {
      const response = await axios.post("/SQL/FluentAPI/get", {});
      var   data = response.data.data;
      data.forEach(item => {
        item["Actions"] = item["Name"];
      });
      this.Data = data;
    },

    async InsertData()
    {
      const response = await axios.post("/SQL/FluentAPI/insert", {
        Name        : this.DialogData.NewAPI.Name,
        API_KEY     : this.DialogData.NewAPI.API_KEY,
        AFFILIATE_ID: this.DialogData.NewAPI.AFFILIATE_ID
      });
      this.DialogData.IsShowing = false;
      this.GetData();
    },

    async UpdateData()
    {
      const response = await axios.post("/SQL/FluentAPI/update", {
        Name        : this.DialogData.NewAPI.Name,
        API_KEY     : this.DialogData.NewAPI.API_KEY,
        AFFILIATE_ID: this.DialogData.NewAPI.AFFILIATE_ID,
        UpdateName  : this.DialogData.OriginalAPI 
      });
      this.DialogData.IsShowing = false;
      this.GetData();
    },

    async DeleteData()
    {
      const response = await axios.post("/SQL/FluentAPI/delete", {
        Name        : this.DialogData.NewAPI.Name,
      });
      this.DialogData.IsShowing = false;
      this.GetData();
    },

    AddNewButtonClicked()
    {
      this.DialogData.IsShowing = true;
      this.DialogData.Mode = "Add";
      this.DialogData.NewAPI = {
        Name: "",
        API_KEY: "",
        AFFILIATE_ID: "",
        Actions: ""
      };
    },

    EditButtonClicked(item)
    {
      this.DialogData.IsShowing = true;
      this.DialogData.Mode = "Edit";
      this.DialogData.OriginalAPI = item.Name;
      this.DialogData.NewAPI = Object.assign({}, item);
    },

    DeleteButtonClicked(item)
    {
      this.DialogData.IsShowing = true;
      this.DialogData.Mode = "Delete";
      this.DialogData.OriginalAPI = item.Name;
      this.DialogData.NewAPI = Object.assign({}, item);
    }
  },

  async created()
  {
    this.GetData();
  }
});
</script>

<style scoped>
#wrapper {
  margin: 10px;
}

.tableHeader {
  padding: 10px;
}

</style>