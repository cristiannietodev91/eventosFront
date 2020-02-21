<template>
  <div class="home">
    <ListEventos />
  </div>
</template>

<script>
// @ is an alias to /src
import ListEventos from '@/components/ListEventos.vue'


export default {
  name: 'Home',
  components: {
    ListEventos    
  }
}
</script>
