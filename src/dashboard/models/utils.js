import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'utils',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
  effects: {
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
