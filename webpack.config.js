var path = require("path");
const htmlWbpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:"./src/index.tsx",
    mode:"development",
    output:{
        filename:"game.js",
        path:path.join(__dirname,"dist")
    },
    devServer:{
        headers:{
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Credentials":"true"
        },
        contentBase:path.join(__dirname,"./dist"),
        host:"0.0.0.0",
        port:8888,
        hot:true,
        clientLogLevel:"none",
        disableHostCheck:true
    },
    module:{
        rules:[
            {
                test:/\.(ts|tsx)$/,
                exclude:/(node_modules | bower_components)/,
                use:[
                    {
                        loader:'babel-loader'
                    },
                    {
                        loader:'ts-loader'
                    }
                ]
            },
            {
                test:/\.(jsx|js)$/,
                exclude:/(node_modules | bower_components)/,
                use:[
                    {
                        loader:'babel-loader'
                    }
                ]
            },
            {
                test:/\.(less|css)?$/,
                exclude:/(node_modules | bower_components)/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'less-loader'
                    }
                ]
            }
        ]
    },
    resolve:{
        extensions:['.ts','.tsx','.jsx','.js']
    },
    plugins:[
        new htmlWbpackPlugin({
            template:path.resolve(__dirname,"./src/index.html"),
            filename:'index.html',
            hash:true
        })
    ]
}