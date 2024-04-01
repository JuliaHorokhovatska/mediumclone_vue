<template>
  <div>
    <p class="text-xs-center">
      Home page
      <router-link :to="{name: 'login'}">Sign In</router-link>
    </p>
    <p class="text-xs-center">
      <router-link :to="{name: 'register'}">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
  props: {
    msg: String,
  },
};
</script>
