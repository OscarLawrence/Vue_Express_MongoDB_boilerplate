const path = require("path");

const srcDir = path.resolve(__dirname, "../../", "src");
const distDir = path.resolve(__dirname, "../../", "dist");

module.exports = {
  entry: path.join(srcDir, "server"),
  output: distDir,
  tsconfig: path.resolve(__dirname, "tsconfig.json")
};
