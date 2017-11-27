const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = {
	entry: {
		main: [
			`${global.skeletor.srcJsDir}/main.js`
		],
		vendor: [
			'jquery',
			// 'velocity-animate',
			'svg4everybody',
			'picturefill'
		]
	},
	// devtool: 'eval',
	output: {
		path: path.resolve(global.skeletor.distJsDir),
		filename: '[name].js'
	},
	module: {
		rules: [
			{ 
				// test: /(?!test)[\w-]{4}\.js$/, //match .js files but not .test.js files
				test: /\.js$/,
				exclude: /node_modules/, 
				// include: path.resolve(__dirname, './src/js'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		})
	]
};


gulp.task('webpack:build', () => {
	//Some libs ditch developer niceties in production mode - turn it on!
	//TODO: check if this can be / is being set by gulp
	webpackConfig.plugins.push(new BabiliPlugin());

	webpackConfig.plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': '"production"'
	}));

	//on build run an analysis (Not in the watcher - don't want to slow down development by doing this on every save)
	webpackConfig.plugins.push(new BundleAnalyzerPlugin({
		analyzerMode: 'static',
		reportFilename: 'js-bundle-analysis.html',
		defaultSizes: 'stat',
		openAnalyzer: false,
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
