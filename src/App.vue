<template>
  <v-app>
    <v-app-bar app color="primary darken-1" dark id="vAppBar">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          transition="scale-transition"
          width="50"
        />
        <div>
          <table class="titleTable">
            <tbody>
              <tr class="titleText">
                Admin Website
              </tr>
              <tr>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <v-spacer></v-spacer>
      <!-- <div class="usernameText" >
        <h4>
        </h4>
      </div>
      <v-btn
        light
        color="secondary"
      >
        Logout
        <v-icon>mdi-logout</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <div class="tabClick">
        <v-tabs bg-color="white" dark>
          <v-tab 
            v-for="tab in getCurrentTabs" 
            :key="tab.name" 
            :to="tab.path"
            color="primary"
          >
            {{tab.name.replace("Tab","").replace(/([a-z])([A-Z])/g, '$1 $2')}}
          </v-tab>
        </v-tabs>
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {routesArr} from "./router/routes.js"

export default {
  name: 'App',

  data: () => ({
  }),
  methods:{
  },
  computed: {
    routesArr,
    getCurrentTabs()
    {
      var tabs = this.routesArr;
      // tabs.push(
      //   this.routesArr.find((item) => item.name == "MetricsView")
      // );
      return tabs;
    }
  },
  created()
  {
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--v-primary-base);
  
}
#vAppBar{
  zoom: 80%;
}
body {
  background-color: var(--v-primary-base);
  min-width: 800px;
}
.tabClick {
  margin-left: 10px;
  zoom: 80%;
  margin-top: -10px;
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 32px !important;
}
.v-text-field {
  font-size: 15px;
}
.usernameText {
  padding-right: 10px;
}
.snackbarItems {
  padding: 10px;
  width: 100%;
}
.snackbarText {
  font-weight: 700;
}
.snackbarBtn {
  width: 75px;
}
.snackbarBtns td {
  padding: 5px;
}
.titleText
{
  font-size: 1.5em;
  font-weight: bold;
  padding: 0px;
  margin: 0px;
}
.updateText
{
  margin-top: -3px;
  margin-left: 5px;
  font-size: 10px;
  float: left;
}

.updateSubText
{
  font-size: 10px;
}
.updateSubText:hover
{
  color: rgba(255, 204, 0, 1);
  cursor: pointer;
}

.titleTable{
  border-collapse: collapse;
  margin-top: 15px;
}
.smallerDate{
  font-size: 13px;
  float: left;
  font-weight: bold;

}
.smallerText{
  font-size: 12px;
  white-space: pre-line;
  text-align: left;
  margin-bottom: 10px;
  display: block;

}
.cardVersion
{
  margin-bottom: 10px;
  width: 100%;
}

#icon
{
  padding: 10px;
}
</style>
