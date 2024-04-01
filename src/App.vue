<template>
  <app-header></app-header>
  <router-view></router-view>
</template>

<script>
import AppHeader from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 60px 100px;
}

a {
  text-decoration: none !important;
  color: #514f4f !important;
}

a:hover, .active {
  color: #42b983 !important;
}
</style>
