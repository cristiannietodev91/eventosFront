<template>
  <b-container id="app" fluid="sm">
    <navbar></navbar>
    <router-view/>
    <notifications group="foo" />
    <footer-component/>
  </b-container>
</template>
<script>
import Footer from './containers/Footer'
import navbar from "./containers/TopNav";

export default {
  components: {
    navbar,
    'footer-component': Footer
  }
}
</script>
<style>

</style>
