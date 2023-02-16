/* eslint-env node */
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

function webpackConfig(_env, { mode = "development" }) {
  const isDevelopment = mode === "development";

  return {
    mode,
    entry: "./src/index.tsx",
    devServer: {
      hot: true,
    },
    output: {
      path: resolve(__dirname, "./dist"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: [isDevelopment && "react-refresh/babel"].filter(
                  Boolean
                ),
              },
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
      extensions: [".tsx", ".ts", ".js"],
      symlinks: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve("src", "index.html"),
      }),
      new MonacoWebpackPlugin({
        // beware: adding further languages (like typescript) can have a dramatic impact on bundle size!
        languages: ["cpp", "csharp", "python", "java"],
        features: ["find"],
      }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  };
}

export default webpackConfig;
