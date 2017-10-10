const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const bourbon = require('node-bourbon').includePaths;
const SpritesmithPlugin = require('webpack-spritesmith');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    context: path.resolve(__dirname, './Static/src'),
    entry: {
        common: [
            './js/common.js',
            './scss/main.scss'
        ],
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
        filename: '[name].js'
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
                test: /\.svg$/,
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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
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
        new ExtractTextPlugin({
            filename: '[name].css',
        }),
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
        new SpriteLoaderPlugin()
    ]
};