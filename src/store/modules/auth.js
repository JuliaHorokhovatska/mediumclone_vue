import {progress} from '@/core';
import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  user: null,
  authProgress: progress.noInitializeted,
  registerErrors: null,
};

const mutations = {
  registrationStart(state) {
    state.authProgress = progress.inProgress;
    state.registerErrors = null;
  },
  registrationSuccess(state, userData) {
    state.authProgress = progress.success;
    state.user = userData;
  },
  registrationFailed(state, error) {
    state.authProgress = progress.failed;
    state.registerErrors = error;
  },
};

const actions = {
  register(context, formData) {
    context.commit('registrationStart');
    return new Promise(resolve => {
      authApi
      .register(formData)
      .then(response => {
        const userData = response?.data?.user;
        context.commit('registrationSuccess', userData);
        setItem('accessToken', userData?.token);
        resolve(userData);
      })
      .catch(response => {
        context.commit('registrationFailed', response?.response?.data?.errors);
      });
    }) 
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
