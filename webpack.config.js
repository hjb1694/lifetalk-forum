const path = require('path');

module.exports = {
    watch : true, 
    mode : 'development',
    entry : {
        home : './webpack-src/home.js',
        newPost : './webpack-src/newPost.js', 
        register : './webpack-src/register.js', 
        verifyreg : './webpack-src/verifyreg.js', 
        login : './webpack-src/login.js'
    }, 
    output : {
        filename : '[name].bundle.js', 
        path : path.resolve(__dirname, 'public', 'js')
    }, 
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
}