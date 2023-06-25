import { addDecorator } from '@storybook/react'
import { RouterDecorator } from '../../src/shared/config/storybook/Decorators/RouterDecorator'
import { StyleDecorator } from '../../src/shared/config/storybook/Decorators/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/Decorators/ThemeDecorator'
import { TranslationDecorator } from '../../src/shared/config/storybook/Decorators/TranslationDecorator'
import { Theme } from '../../src'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
}

addDecorator(StyleDecorator)
addDecorator(ThemeDecorator(Theme.LIGHT))
addDecorator(RouterDecorator)
addDecorator(TranslationDecorator)

