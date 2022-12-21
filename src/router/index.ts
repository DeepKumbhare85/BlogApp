import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BlogDetails from "../views/BlogDetails.vue";
import TaggedBlogs from "@/views/TaggedBlogs.vue";
import Newsletter from "@/views/Newsletter.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/blog/:slug",
      name: "blogDetails",
      component: BlogDetails,
      props: true,
    },
    {
      path: "/tags/:tag",
      name: "taggedBlogs",
      component: TaggedBlogs,
      props: true,
    },
    {
      path: "/newsletter",
      name: "newsletter",
      component: Newsletter,
      meta: {
        backgroundColor: "green",
      },
    },
  ],
});

export default router;
