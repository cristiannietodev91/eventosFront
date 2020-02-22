<template>
  <b-navbar  toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/" >Eventos Test</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <template v-if="isLoggedIn">
          <b-nav-item @click.prevent="signOut">Sign out</b-nav-item>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link to="login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="register" class="nav-link">Register</router-link>
          </li>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  watch: {
    user(val) {
      if (val && val.uid && val.uid.length > 0) {
        return val;
      }
    },
    isLoggedIn(val) {
      return val;
    }
  }
};
</script>