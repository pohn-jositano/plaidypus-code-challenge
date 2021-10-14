const Path = require( 'path' );

module.exports = ( _env, argv ) => {
  return {
    mode: 'production',
    // entry: './Scripts/Source/index.js',
    entry: {
      'main-dashboard': './Scripts/Source/MainDashboard.js',
      'detail-page': './Scripts/Source/DetailPage.js'
    },
    output: {
      path: Path.resolve( __dirname, 'Scripts/Distributable' ),
      filename: '[name].js',
      publicPath: '/scripts/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: 'production'
            }
          }
        }
      ]
    },
    resolve: {
      extensions: [ '.js', '.jsx' ]
    }
  };
};