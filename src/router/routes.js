import MetricsView from "@/views/MetricsView/MetricsView.vue"

export const routesArr = ()=>{
  return [
    {
      path: "/",
      name: "MetricsView",
      component: MetricsView
    }
  ]
}