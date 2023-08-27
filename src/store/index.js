import { createStore } from "vuex";
import donatur from "./modules/donatur";
import clients from "./modules/clients";
import transaksi from "./modules/transaksi";
import berita from "./modules/berita";
import product from "./modules/product";
import kategori from "./modules/kategori";
import auth from "./modules/auth";
import brands from "./modules/brands";
import cart from "./modules/cart";
import users from "./modules/users"

const store = createStore({
  state: {
    isLoading: false,
  },
  modules: {
    donatur,
    brands,
    clients,
    transaksi,
    berita,
    product,
    kategori,
    auth,
    cart,
    users
  },
});

export default store;
