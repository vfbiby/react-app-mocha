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
