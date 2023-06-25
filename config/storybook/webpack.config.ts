/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import path from "path";
import { type BuildPaths } from "../build/types/config";
import { BuildCssLoader } from "../build/loaders/buildCssLoader";
import { DefinePlugin, type RuleSetRule } from "webpack";
import type webpack from "webpack";


export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: ''
    }

    config.resolve!.modules = [paths.src, 'node_modules']
    // config.resolve.modules.push(paths.src)

    config.resolve!.extensions!.push('.ts', '.tsx')

    config.resolve!.alias = { ...config.resolve!.alias, '@': paths.src }


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    config.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
        // eslint-disable-next-line
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i }
        }
        return rule
    })
    config.module!.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
    })
    config.module!.rules.push(BuildCssLoader(true))
    config.plugins!.push(new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook')
    }))

    return config;
}
