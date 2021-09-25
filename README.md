# create-react-app的jest换成mocha，快N倍

### 安装react项目
```shell
    yarn create react-app my0app
```

### 添加mocha和babel到项目
```shell
yarn add -D mocha @babel/core @babel/register @babel/plugin-transform-modules-commonjs babel-plugin-inline-react-svg babel-preset-react-app-babel-7 chai ignore-styles global-jsdom
```

### 添加mocha配置文件
```js
// .mocharc.js
module.exports = {
  //测试的后缀
  extension: ["ts", "tsx", "js"],
  //测试跑完后的reporter，默认spec，还有dot，nyan等
  reporter: "nyan",
  //启用inline-diffs能更好的看清值之间的差别
  inlineDiffs: true,
  //是不是默认启动就使用watch模式
  watch: false,
  //测试文件的匹配规则
  spec: ["{test,src}/**/*.{test,spec}.{ts,tsx,js,jsx}"],
  //以通知的方式弹出测试结果
  growl: false,
  //预先加载的库，比如babel，ts-node等
  require: [
    "global-jsdom/register",
    "chai/register-expect",
    "chai/register-should",
    "mocha/babel-register.js",
    "mocha/assert-register.js",
    "mocha/mocha-watch-cleanup-after-each.js",
    "ignore-styles",
  ],
  ui: "bdd",
};
```

### 添加自定义文件
* 添加全局expect
```js
// mocha/assert-register.js
global.expect = require("expect");
require("@testing-library/jest-dom/extend-expect");
```

* 注册babel/register，并且指定为test环境
```js
// mocha/babel-register.js
process.env.NODE_ENV = 'test'
const register = require("@babel/register").default;

register({ extensions: [".ts", ".tsx", ".js", ".jsx"] });
```

* 设置mocha全局hook
```js
// mocha/mocha-watch-cleanup-after-each.js
const { cleanup } = require("@testing-library/react");

exports.mochaHooks = {
  afterEach() {
    cleanup();
  },
};
```

### 添加babel的配置文件
```js
module.exports = (api) => {
  api.cache(false);

  const presets = [
    "react-app",
    ["@babel/preset-react", { runtime: "automatic" }],
  ];
  const plugins = ["inline-react-svg"];

  return {
    presets,
    plugins,
  };
};
```

### 在package中修改test命令为mocha
```js
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "jest": "react-scripts test",
    "eject": "react-scripts eject",
    "test": "mocha",
    "test:watch": "mocha --watch",
  },
```

### 把app.test.js里面的test改成it
```js
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```
