<template>
  <div class="d-flex justify-content-between">
    <div>
      <router-link :to="{name: 'home'}" exact active-class="active">Home</router-link>
    </div>
    <div>
      <template v-if="!user">
        <div class="d-flex">
          <div>
            <router-link :to="{name: 'login'}" active-class="active">Sign In</router-link>
          </div>
          <div class="ms-2">
            <router-link :to="{name: 'register'}" active-class="active">Sign Up</router-link>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="d-flex">
          <div class="profile">
            <router-link :to="{name: 'home', params: {slug: user.username}}" active-class="active">
              <img :src="user.image" alt="avatar" class="profile__avatar" />
              <p class="profile__name ms-2">{{ user.username }}</p>
            </router-link>
          </div>
          <div class="ms-2">
            <!-- <router-link :to="{name: 'logout'}">Logout</router-link> -->
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>

<style scoped lang="scss">
.profile {
  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  &__name {
    text-decoration: none;
  }
}


</style>