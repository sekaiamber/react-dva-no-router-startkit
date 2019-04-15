import dva from 'dva-no-router';
import layout from './layout';
import models from '../dashboard/models';
import './index.scss';

function render() {
  const app = dva();
  Object.keys(models).forEach((key) => {
    app.model(models[key]);
  });
  app.router(layout);
  app.start('#root');
}

render();
