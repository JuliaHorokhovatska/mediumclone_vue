<template>
  <div>Register page</div>
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign In</h1>
        <p class="text-xs-center">
          <router-link :to="{name: 'register'}">Sign Up</router-link>
        </p>
        <form @submit.prevent="onSubmit">
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
          <button
            class="btn btn0lg btn-primary pull-xs-right"
            type="submit"
            :disabled="isLoginProgress === progress.inProgress"
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
  name: 'AppLogin',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapState({
      isLoginProgress: state => state.auth.loginProgress,
    }),
    progress() {
      return progress;
    },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password,
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
