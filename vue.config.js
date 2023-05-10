module.exports = {
  publicPath: "./",
  lintOnSave: false, // 关闭eslint语法检测
  devServer: {
    open: true, // 项目运行后打开浏览器
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      "/apis": {
        target: "http://192.168.3.14:18880/yinxiang",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/apis": ""
        }
      },
      "/apix": {
        target: "http://192.168.3.103:5005",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/apix": ""
        }
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?

    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            // 配置项，详见官方文档
            remUnit: 192 // 换算的基数
          })
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  }
};
