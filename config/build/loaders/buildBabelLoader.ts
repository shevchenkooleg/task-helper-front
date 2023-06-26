import {BuildOptions} from '../types/config';


interface buildBabelLoaderProps extends BuildOptions {
    isTsx: boolean
}

export function buildBabelLoader({isTsx}: buildBabelLoaderProps) {

    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx
                        }
                    ],
                    '@babel/plugin-transform-runtime'
                ].filter(Boolean)
            },
        }
    };


}