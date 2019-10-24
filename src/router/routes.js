import CarShow from '../pages/showCar/index'
import CarEdit from '../pages/editCar/index'

const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { 
        path: "",
        name: "home",
        component: () => import("pages/Index.vue") 
      },
      {
        name: "addCar",
        path: "/add",
        components: {
          default: () => import('pages/addCar/index'),
        }
      },
      {
        name: "car-list",
        path: "/list",
        components: {
          default: () => import('pages/list/index')
        }
      },
      {
        name: "car-show",
        path: "/car/:id",
        component: CarShow,
        props: true
      },
      {
        name: "car-edit",
        path: "/car/:id/edit",
        component: CarEdit,
        props: true
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
