const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const BabiliPlugin = require('babili-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = {
    entry: {
        common: `${global.skeletor.srcJsDir}/common.js`,
        darkpage: `${global.skeletor.srcJsDir}/darkpage.js`,
        // vendor: [
        //     'svg4everybody',
        //     'picturefill',
        //     'velocity-animate'
        // ]
    },
    // devtool: 'eval',
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: ['babel-loader', 'eslint-loader'], 
                exclude: /node_modules/ 
            }
        ]
    },
    plugins: [
        new BabiliPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     children: true,
        //     name: 'commons',
        //     filename: 'commons.js',
        // }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     Velocity: 'velocity-animate',
        //     //define common modules in here so you don't have to require / import them in every module
        // }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8888,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'gzip',
        //     openAnalyzer: false,
        // })
    ]
};

gulp.task('webpack', () => {
    return gulp.src(`${global.skeletor.srcJsDir}`)
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest(`${global.skeletor.distJsDir}`));  
});