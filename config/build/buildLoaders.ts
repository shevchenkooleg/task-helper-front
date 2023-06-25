import type webpack from "webpack";
import { type BuildOptions } from "./types/config";
import { BuildCssLoader } from "./loaders/buildCssLoader";
import { buildBabelLoader } from "./loaders/buildBabelLoader";


export function buildLoaders (options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options

    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/
    // }

    const cssLoader = BuildCssLoader(isDev)

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack']
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    }

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })




    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader,
        cssLoader
    ]
}
