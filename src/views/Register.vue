<template>
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign Up</h1>
        <p class="text-xs-center">
          <router-link :to="{name: 'login'}">Sign In</router-link>
        </p>
        <form @submit.prevent="onSubmit">
          <fieldset class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="User name"
              v-model="username"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Email"
              v-model="email"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              type="password"
              class="form-control form-control-lg"
              placeholder="Password"
              v-model="password"
            />
          </fieldset>
          {{ isAuthProgress }}
          <button
            class="btn btn0lg btn-primary pull-xs-right"
            type="submit"
            :disabled="isAuthProgress === progress.inProgress"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {progress} from '@/core';
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/auth';

export default {
  name: 'AppRegister',
  data() {
    return {
      user: {
        email: '',
        password: '',
        username: '',
      },
    };
  },
  computed: {
    ...mapState({
      isAuthProgress: state => state.auth.authProgress,
    }),
    progress() {
      return progress;
    },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          password: this.password,
          username: this.username,
        })
        .then(() => {
          this.$router.push({name: 'home'});
        });
    },
  },
  props: {
    msg: String,
  },
};
</script>
