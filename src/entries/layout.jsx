/**
 * @name: Main组件
 * @description: 主layout组件
 */

import React, { Component } from 'react';
import { connect } from 'dva-no-router';


class Main extends Component {
  render() {
    const { children } = this.props;
    return (
      <div id="main">
        {children}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

const Layout = connect(mapStateToProps)(Main);

export default function (param) {
  return (
    <Layout {...param} />
  );
}
