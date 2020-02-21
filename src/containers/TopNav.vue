<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <router-link to="/" class="navbar-brand">Eventos Test</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="isLoggedIn">
            <div class="nav-item">{{user.displayName}}</div>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="signOut">Sign out</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {    
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters(["user", "isLoggedIn"])    
  },
  methods: {
    signOut() {
      this.$store
        .dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  watch: {
    user(val){
      if (val && val.uid && val.uid.length > 0) {
        return val;
      }
    },
    isLoggedIn(val) {
      console.log('Valor Is logged TopNav :::>',val);
    }
  }
};
</script>