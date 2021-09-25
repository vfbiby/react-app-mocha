process.env.NODE_ENV = 'test'
const register = require("@babel/register").default;

register({ extensions: [".ts", ".tsx", ".js", ".jsx"] });
