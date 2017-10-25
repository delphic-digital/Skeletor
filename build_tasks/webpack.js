const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');

const webpackConfig = {
    entry: {
        main: [
            `${global.skeletor.srcJsDir}/common.js`,
            `${global.skeletor.srcJsDir}/darkpage.js`
        ]
        // common: `${global.skeletor.srcJsDir}/common.js`,
        // darkpage: `${global.skeletor.srcJsDir}/darkpage.js`,
        // vendor: [
        //     'svg4everybody',
        //     'picturefill',
        //     'velocity-animate'
        // ]
    },
    // devtool: 'eval',
    output: {
        path: path.resolve(global.skeletor.distJsDir),
        filename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: ['babel-loader', {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint/lib/formatters/codeframe')
                    }
                }], 
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
        new webpack.ProvidePlugin({
            $: 'jquery',
            Velocity: 'velocity-animate',
            //define common modules in here so you don't have to require / import them in every module
        })
    ]
};


gulp.task('webpack:build', () => {
    return gulp.src(global.skeletor.srcJsDir)
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest(global.skeletor.distJsDir));  
});

if (global.skeletor.useBrowserSync) {
    gulp.task('webpack:watch', () => {
        webpackConfig.watch = true;
        return gulp.src(global.skeletor.srcJsDir)
            .pipe(webpackStream(webpackConfig))
            .pipe(gulp.dest(global.skeletor.distJsDir))
            .pipe(global.browserSync.stream({match: '**/*.js'}));
    });
} else {
    gulp.task('webpack:watch', () => {
        webpackConfig.watch = true;
        return gulp.src(global.skeletor.srcJsDir)
            .pipe(webpackStream(webpackConfig))
            .pipe(gulp.dest(global.skeletor.distJsDir));
    });
}