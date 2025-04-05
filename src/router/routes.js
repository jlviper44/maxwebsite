import MetricsView from "@/views/MetricsView/MetricsView.vue"
import SettingsView from "@/views/SettingsView/Settings.vue"

export const routesArr = ()=>{
  return [
    {
      path: "/",
      name: "MetricsTab",
      component: MetricsView
    },
    {
      path: "/Settings",
      name: "SettingsTab",
      component: SettingsView
    },
  ]
}