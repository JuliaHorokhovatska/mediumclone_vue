import {progress} from '@/core';
import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  user: null,
  getUserProgress: progress.noInitializeted,
  authProgress: progress.noInitializeted,
  loginProgress: progress.noInitializeted,
  registerErrors: null,
  loginErrors: null,
};

export const mutationsTypes = {
  getUserStart: '[auth] getUserStart',
  getUserSuccess: '[auth] getUserSuccess',
  getUserFailed: '[auth] getUserFailed',
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailed: '[auth] registerFailed',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailed: '[auth] loginFailed'
};

const mutations = {
  [mutationsTypes.getUserStart](state) {
    state.getUserProgress = progress.inProgress;
  },
  [mutationsTypes.getUserSuccess](state, userData) {
    state.getUserProgress = progress.success;
    state.user = userData;
  },
  [mutationsTypes.getUserFailed](state) {
    state.getUserProgress = progress.failed;
  },
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
  getUser: '[auth] getUser',
  register: '[auth] register',
  login: '[auth] login',
};

const actions = {
  [actionTypes.getUser](context) {
    context.commit(mutationsTypes.getUserStart);
    return new Promise(resolve => {
      authApi
      .getCurrentUser()
      .then(response => {
        const userData = response?.data?.user;
        context.commit(mutationsTypes.getUserSuccess, userData);
        resolve(userData);
      })
      .catch(() => {
        context.commit(mutationsTypes.getUserFailed);
      });
    }) 
  },
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

export const gettersTypes = {
  isAuth: '[auth] isAuth',
  user: '[auth] user',
}

const getters = {
  [gettersTypes.isAuth]: state => Boolean(state.user),
  [gettersTypes.user]: state => state.user,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
