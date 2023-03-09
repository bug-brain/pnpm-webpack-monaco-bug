import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

function webpackConfig(_env, { mode = "development" }) {
  return {
    mode,
    entry: "./src/index.js",
    output: {
      path: resolve(__dirname, "./dist"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js"],
      symlinks: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve("src", "index.html"),
      }),
      new MonacoWebpackPlugin({
        languages: ["cpp", "csharp"],
        features: ["find"],
      }),
    ],
  };
}

export default webpackConfig;
