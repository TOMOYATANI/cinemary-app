import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import InstantSearch from "vue-instantsearch";

Vue.use(InstantSearch);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBtioFgWlCI1TAzRptTLOucB7aDIVNCRgI",
  authDomain: "cinemary-app-8d617.firebaseapp.com",
  projectId: "cinemary-app-8d617",
  storageBucket: "cinemary-app-8d617.appspot.com",
  messagingSenderId: "884358470443",
  appId: "1:884358470443:web:e4df5906e06e45a19f036e",
  measurementId: "G-C29Z9XDRS9",
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
