import Noty from 'noty';
// import I18n from '../mainSite/i18n/index';

const errMessage = error => error.results.message;

const signUp = (form, validation, options = {}) => {
  const user = new Parse.User();
  user.set('email', form.email);
  user.set('password', form.password);
  user.set('username', form.email.split('@')[0]);
  user.set('validation', validation);
  return user.signUp().then(res => ({
    success: true,
    results: options.objectResult ? res : res.toJSON(),
  }), error => ({
    success: false,
    results: error,
  }));
};

const logIn = (form, validation, options = {}) => Parse.User.logIn(form.email, form.password, validation).then(res => ({
  success: true,
  results: options.objectResult ? res : res.toJSON(),
}), error => ({
  success: false,
  results: error,
}));

const logOut = () => Parse.User.logOut();

const find = (className, options = {}) => {
  const query = new Parse.Query(className);
  if (options.handler) {
    options.handler(query);
  }
  query.equalTo('locale', window.localStorage.language);
  return query.find().then(res => ({
    success: true,
    results: options.objectResult ? res : res.map(x => x.toJSON()),
  }), error => ({
    success: false,
    results: error,
  }));
};

const get = (className, id, options = {}) => {
  const query = new Parse.Query(className);
  query.equalTo('locale', window.localStorage.language);
  return query.get(id).then(res => ({
    success: true,
    results: options.objectResult ? res : res.toJSON(),
  }), error => ({
    success: false,
    results: error,
  }));
};

const update = (className, form, options = {}) => {
  // console.log(123);
  const Class = Parse.Object.extend(className);
  const instance = new Class();
  // const keys = Object.keys(form);
  // keys.forEach((key) => {
  //   instance.set(key, form[key]);
  // });
  if (typeof form === 'function') {
    form(instance);
  } else {
    instance.set(form);
  }
  return instance.save().then(res => ({
    success: true,
    results: options.objectResult ? res : res.toJSON(),
  }), error => ({
    success: false,
    results: error,
  }));
};

const errorHandle = (results, callback) => {
  if (results.results.code === 209) {
    Parse.User.logOut();
    new Noty({
      text: '登陆已过期',
      type: 'alert',
      theme: 'mint',
    }).show();
    if (callback && callback === 'function') {
      callback();
    }
  } else {
    console.log(errMessage(results));
    new Noty({
      text: errMessage(results),
      type: 'error',
      theme: 'mint',
    }).show();
  }
};

const deleteF = (className, id) => {
  const query = new Parse.Query(className);
  return new Promise((resolve) => {
    query.get(id).then((obj) => {
      obj.destroy().then(resolve);
    });
  });
};

const currentUser = () => Parse.User.current();

const currentPermission = () => {
  const user = currentUser();
  if (!user) return '';
  const p = user.toJSON().permission || '';
  if (p === '*') return p;
  return p.split('|');
};

const parse = {
  find,
  errorHandle,
  signUp,
  logIn,
  logOut,
  update,
  delete: deleteF,
  get,
  currentUser,
  currentPermission,
};
export default parse;
