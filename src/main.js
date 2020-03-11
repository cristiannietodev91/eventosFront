import Vue from 'vue'
import vSelect from 'vue-select'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import './plugins/stylemain-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMoment from 'vue-moment'
import momentTz from 'moment-timezone'
import * as firebase from "firebase";
import 'vue-select/dist/vue-select.css';

Vue.prototype.$moment = momentTz


Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyBRHoqWCMyiL5-JzVmp6Plff-yG64sq9IU",
  authDomain: "eventos-auth.firebaseapp.com",
  databaseURL: "https://eventos-auth.firebaseio.com",
  projectId: "eventos-auth",
  storageBucket: "eventos-auth.appspot.com",
  messagingSenderId: "986648552044",
  appId: "1:986648552044:web:0b5160f07b9280d3fd6e49"
}; 

firebase.initializeApp(configOptions);

/*firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});*/

Vue.use(VueMoment, {
  momentTz
});
Vue.use(Notifications)

Vue.component('v-select', vSelect)
Vue.use(Vuelidate);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
