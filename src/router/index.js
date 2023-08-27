import { createWebHistory, createRouter } from "vue-router";
import Banner from "../views/Banner.vue";
import Berita from "../views/Berita.vue";
import Product from "../views/Product.vue";
import SingleProduct from "../views/SingleProduct.vue";
import Kategori from "../views/Kategori.vue";
import Login from "../views/auth/Login.vue";
import FilterPageKategori from "../views/FilterPageKategori.vue";
import store from "../store";
import Brands from "../views/Brands.vue";
import Contact from "../views/Contact.vue";
import User from "../views/user/Index.vue";

const routes = [
  {
    path: "/",
    name: "Banner",
    component: Banner,
  },
  {
    path: "/news",
    name: "News",
    component: Berita,
  },
  {
    path: "/kategori",
    name: "Kategori",
    component: Kategori,
  },
  {
    path: "/category/:category",
    name: "FilterCategory",
    component: FilterPageKategori,
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/product/:slug",
    name: "SingleProduct",
    component: SingleProduct,
  },
  {
    path: "/brands",
    name: "Brands",
    component: Brands,
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { requiresLogin: true },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../views/Checkout.vue"),
    meta: { requiresLogin: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/Register.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/users",
    name: "User",
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresGuest && store.getters["auth/isAuthenticated"]) {
    next("/"); // Redirect to Home
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresLogin && !store.getters["auth/isAuthenticated"]) {
    next("/login");
  } else {
    next();
  }
});

export default router;
