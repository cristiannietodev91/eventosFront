<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="mynavbar">
    <b-navbar-brand>Proyecto Entrevista</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="isLoggedIn">
        <b-nav-item to="/">Poker</b-nav-item>
        <b-nav-item to="/home">Eventos</b-nav-item>        
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">        
      </b-navbar-nav>
      <b-nav-item-dropdown right text="Usuario" class="mynav">        
        <b-dropdown-item @click.prevent="signOut" v-if="isLoggedIn" >Desloguear</b-dropdown-item>
        <b-dropdown-item to="login" v-if="!isLoggedIn">Login</b-dropdown-item>
        <b-dropdown-item to="register" v-if="!isLoggedIn">Register</b-dropdown-item>
      </b-nav-item-dropdown>
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
<style lang="scss">

.router-link-exact-active{
  font-weight: bold;
  text-decoration: overline;
  background-color: dodgerblue;
}

.mynav{
  font-weight: bold;
  color: white;
}

.mynav a{
  color: rgb(236, 226, 226) !important;
  font-weight: bold;
}

.dropdown-menu-right{
  background-color: dodgerblue;
}

.dropdown-menu-right .dropdown-item:hover{
  background-color: #342ac0;
  text-decoration: double;
}



.mynav a:hover{
  color: grey;
  text-decoration: none;
}

</style>