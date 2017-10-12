var webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const bourbon = require('node-bourbon').includePaths;
const SpritesmithPlugin = require('webpack-spritesmith');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');

const extractCSS = new ExtractTextPlugin({filename: 'css/[name].css'});
const extractSVG = new ExtractTextPlugin({filename: '[name].svg'});

module.exports = {
    context: path.resolve(__dirname, './Static/src'),
    entry: {
        homepage: './js/homepage.js',
        darkpage: './js/darkpage.js',
        styles: './scss/main.scss',
        vendor: [
            'svg4everybody',
            'picturefill',
            'velocity-animate'
        ]
    },
    devtool: 'source-map',
    devServer: { 
        contentBase: path.join(__dirname, 'Static/dist'),
        port: 9000
    },
    output: {
        path: path.resolve('./Static/dist/'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: ['babel-loader', 'eslint-loader'], 
                exclude: /node_modules/ 
            },
            {
                test: /\.png$/,
                use: ['file-loader?name=i/[hash].[ext]']
            },
            {
                test: /\.xsvg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'sprite.svg'
                        }
                    },
                    { loader: 'svg-fill-loader' },
                    { loader: 'svgo-loader' }
                ]
            },
            {
                test: /\.xxsvg$/,
                use: extractSVG.extract({
                    use: [
                        { 
                            loader: 'external-svg-sprite-loader',
                            options: {
                                publicPath: path.resolve('./Static/dist/svg/')
                            }
                        }
                    ]
                })
            },
            {
                test: /\.svg$/,
                loader: 'external-svg-sprite-loader',
            },
            {
                test: /\.scss$/,
                use: extractCSS.extract({
                    use: [
                        { loader: 'css-loader' }, 
                        { loader: 'postcss-loader' }, 
                        { 
                            loader: 'sass-loader',
                            options: {
                                includePaths: [
                                    bourbon
                                ]
                            }
                        }, 
                        { loader: 'import-glob-loader' }
                    ],
                    fallback: 'style-loader',
                }),
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: ['node_modules', 'spritesmith-generated']
    },
    plugins: [
        extractCSS,
        extractSVG,
        new BabiliPlugin(),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'Static/src/sprite_png'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'Static/dist/sprite/sprite.png'),
                css: path.resolve(__dirname, 'Static/dist/sprite/sprite.css')
            },
            apiOptions: {
                cssImageRef: '~sprite.png'
            }
        }),
        new SpriteLoaderPlugin(),
        new SvgStorePlugin(),
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
    ]
};