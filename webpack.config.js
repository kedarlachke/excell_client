var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const dotenv = require('dotenv');

const VENDOR_LIBS = [
  'react',
  'react-dom',
  'graphql-tag',
  'apollo-client',
  'apollo-link-http',
  'apollo-cache-inmemory',
  'apollo-link-context',
  'lodash',
  'apollo-boost',
  'jquery',
  'react-redux',
  'react-router',
  'react-router-dom',
	'redux',
	'react-router-redux',
	'react-table',
	'react-tabs'
  
];

  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});





module.exports = {




  


 


  mode: 'development',
  
  entry: {
    bundle: ['babel-polyfill', './src/index.js'] ,
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, '../ExcellInvestigationsServer/public'),
    filename: '[name].[chunkhash].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
	    {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       },
	   {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
	   {
         test: /\.(csv|tsv)$/,
         use: [
           'csv-loader'
         ]
       },
       {
         test: /\.xml$/,
         use: [
           'xml-loader'
         ]
       }
	  
    ]
  },

  // devServer: {
  //   proxy: { "/excellinv": "http://localhost:7001/excellinv",
  // "/filedownload": "http://localhost:7001/filedownload" },
  //   historyApiFallback: true,
  // },

  devServer: {
  proxy: {
    "/excellinv*": {
    target: "http://localhost:7001/excellinv",
  //  target: "http://81.4.102.11:80/excellinv",
   
    }
  },
  historyApiFallback: true
},
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
   
   
   // new webpack.DefinePlugin({
   //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
   //  }),



  //  new webpack.optimize.CommonsChunkPlugin({
  //    names: ['vendor', 'manifest']
  //  }),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),

    new webpack.DefinePlugin(envKeys)
  ],
    optimization: {
     splitChunks: {
       chunks: 'all'
     }
   }
  
};
