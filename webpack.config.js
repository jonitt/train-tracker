const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/front.jsx",
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/env", "@babel/react"]
        }
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ["@babel/env", "@babel/react"]
            }
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      } //svg
    ] //rules arr
  }, //module
  devServer: {
    historyApiFallback: true,
    contentBase: "./"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/page.html",
      filename: "./index.html"
    })
  ]
};
