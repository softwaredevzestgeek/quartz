import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";
import { spawn } from "child_process";
import baseConfig from "./webpack.config.base";
import webpackPaths from "./webpack.paths";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const port = process.env.PORT || 1212;

const configuration: webpack.Configuration = {
  devtool: "inline-source-map",

  mode: "development",

  target: ["web", "electron-renderer"],

  entry: [
    `webpack-dev-server/client?http://localhost:${port}/dist`,
    "webpack/hot/only-dev-server",
    "core-js",
    "regenerator-runtime/runtime",
    path.join(webpackPaths.srcRendererPath, "index.tsx"),
  ],

  output: {
    path: webpackPaths.distRendererPath,
    publicPath: "/",
    filename: "renderer.dev.js",
    library: {
      type: "umd",
    },
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
        include: /\.module\.s?(c|a)ss$/,
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /\.module\.s?(c|a)ss$/,
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    ...[],

    new webpack.NoEmitOnErrorsPlugin(),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     *
     * By default, use 'development' as NODE_ENV. This can be overriden with
     * 'staging', for example, by changing the ENV variables in the npm scripts
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),

    new ReactRefreshWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: path.join("index.html"),
      template: path.join(webpackPaths.srcRendererPath, "index.ejs"),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      isBrowser: false,
      env: process.env.NODE_ENV,
      isDevelopment: process.env.NODE_ENV !== "production",
      nodeModules: webpackPaths.appNodeModulesPath,
    }),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },

  // @ts-ignore
  devServer: {
    port,
    compress: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    static: {
      publicPath: "/",
    },
    historyApiFallback: false,

    onBeforeSetupMiddleware() {
      console.log("Starting Main Process...");
      spawn("npm", ["run", "start:main"], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("close", (code: number) => process.exit(code!))
        .on("error", (spawnError) => console.error(spawnError));
    },
  },
};

export default merge(baseConfig, configuration);
