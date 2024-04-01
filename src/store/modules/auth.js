import {progress} from '@/core';
import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  user: null,
  authProgress: progress.noInitializeted,
  loginProgress: progress.noInitializeted,
  registerErrors: null,
  loginErrors: null,
};

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailed: '[auth] registerFailed',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailed: '[auth] loginFailed'
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
  [mutationsTypes.loginStart](state) {
    state.loginProgress = progress.inProgress;
    state.loginErrors = null;
  },
  [mutationsTypes.loginSuccess](state, userData) {
    state.loginProgress = progress.success;
    state.user = userData;
  },
  [mutationsTypes.loginFailed](state, error) {
    state.loginProgress = progress.failed;
    state.loginErrors = error;
  },
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
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
  [actionTypes.login](context, formData) {
    context.commit(mutationsTypes.loginStart);
    return new Promise(resolve => {
      authApi
      .login(formData)
      .then(response => {
        const userData = response?.data?.user;
        context.commit(mutationsTypes.loginSuccess, userData);
        setItem('accessToken', userData?.token);
        resolve(userData);
      })
      .catch(response => {
        context.commit(mutationsTypes.loginFailed, response?.response?.data?.errors);
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
