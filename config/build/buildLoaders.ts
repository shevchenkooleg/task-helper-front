import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    
    const { isDev } = options;

    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // };



    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|svg|ttf|woff|otf)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]',
                    outputPath: 'static/img',
                    esModule: false // <- here
                }
            }
        ]
    };

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader:'css-loader',
                options: {
                    modules: {
                        auto: (resPats: string) => Boolean(resPats.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            :'[hash:base64:8]'
                    },
                },
            },
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };

    const  codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const  tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });


    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader,
        cssLoader
    ];
}