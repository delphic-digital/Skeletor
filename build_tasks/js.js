const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const BabiliPlugin = require('babili-webpack-plugin');

const webpackConfig = {
    entry: {
        homepage: `${global.skeletor.srcJsDir}/homepage.js`,
        darkpage: `${global.skeletor.srcJsDir}/darkpage.js`,
        vendor: [
            'svg4everybody',
            'picturefill',
            'velocity-animate'
        ]
    },
    devtool: 'source-map',
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                use: ['babel-loader', 'eslint-loader'], 
                exclude: /node_modules/ 
            }
        ]
    },
    plugins: [
        new BabiliPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            // (the commons chunk name)

            filename: 'commons.js',
            // (the filename of the commons chunk)

            // minChunks: 3,
            // (Modules must be shared between 3 entries)

            // chunks: ["pageA", "pageB"],
            // (Only use these entries)
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            Velocity: 'velocity-animate',
            //define common modules in here so you don't have to require / import them in every module
        })
    ],
    profile: true,
    stats: {
        hash: true,
        version: true,
        timings: true,
        assets: true,
        chunks: true,
        modules: true,
        reasons: true,
        children: true,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: true
    },
};

gulp.task('js', () => {
    return gulp.src(`${global.skeletor.srcJsDir}`)
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest(`${global.skeletor.distJsDir}`));  
});