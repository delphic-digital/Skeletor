const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = {
    entry: {
        main: [
            `${global.skeletor.srcJsDir}/common.js`,
        ],
        vendor: [
            'jquery',
            'velocity-animate',
            'svg4everybody',
            'picturefill'
        ],
        future: `${global.skeletor.srcJsDir}/future.js`,
        // common: `${global.skeletor.srcJsDir}/common.js`,
        // darkpage: `${global.skeletor.srcJsDir}/darkpage.js`,
    },
    // devtool: 'eval',
    output: {
        path: path.resolve(global.skeletor.distJsDir),
        filename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /(?!test)[\w-]{4}\.js$/, //match .js files but not .test.js files
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
        // new webpack.optimize.CommonsChunkPlugin({ //TODO: This breaks - webpack jsonp is not defined
        //     name: 'vendor',
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            Velocity: 'velocity-animate',
            //define common modules in here so you don't have to require / import them in every module
        })
    ]
};


gulp.task('webpack:build', () => {
    //Some libs ditch developer niceties in production mode - turn it on!
    //TODO: check if this can be / is being set by gulp
    webpackConfig.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }));

    //on build run an analysis (Not in the watcher - don't want to slow down development by doing this on every save)
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'js-bundle-analysis.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false, //if you want to use https://chrisbateman.github.io/webpack-visualizer/ turn this to true, it will appear in dist/js
        statsFilename: 'stats.json'
    }));


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