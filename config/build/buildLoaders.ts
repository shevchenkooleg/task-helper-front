import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { BuildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    
    const { isDev } = options;

    // consts typescriptLoader = {
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
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    };

    const cssLoader = BuildCssLoader(isDev);

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