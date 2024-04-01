import {progress} from '@/core';
import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  user: null,
  authProgress: progress.noInitializeted,
  registerErrors: null,
};

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailed: '[auth] registerFailed',
};

const mutations = {
  [mutationsTypes.registerStart](state) {
    state.authProgress = progress.inProgress;
    state.registerErrors = null;
  },
  [mutationsTypes.registerSuccess](state, userData) {
    state.authProgress = progress.success;
    state.user = userData;
  },
  [mutationsTypes.registerFailed](state, error) {
    state.authProgress = progress.failed;
    state.registerErrors = error;
  },
};

export const actionTypes = {
  register: '[auth] register',
};

const actions = {
  [actionTypes.register](context, formData) {
    context.commit(mutationsTypes.registerStart);
    return new Promise(resolve => {
      authApi
      .register(formData)
      .then(response => {
        const userData = response?.data?.user;
        context.commit(mutationsTypes.registerSuccess, userData);
        setItem('accessToken', userData?.token);
        resolve(userData);
      })
      .catch(response => {
        context.commit(mutationsTypes.registerFailed, response?.response?.data?.errors);
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
