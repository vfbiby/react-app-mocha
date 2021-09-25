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
