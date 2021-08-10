const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

module.exports = {
    entry: "./resources/main.js",
    mode: 'development',
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/i,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader:"css-loader",
                        options:{
                            importLoaders: 1
                        }
                    },
                    {
                        loader:"postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:{
                                    tailwindcss : {},
                                    autoprefixer : {}
                                }
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options:{
                        name:'/img/[name].[ext]'
                    }
                  },
                ],
            },

        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        })
    ],
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm-bundler.js'
        },  
    },
    // devtool : false,
    target:'electron-renderer',
}