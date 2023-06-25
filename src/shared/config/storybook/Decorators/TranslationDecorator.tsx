import { type Story } from "@storybook/react";
import { Suspense } from 'react';
import i18nForTest from "../../i18n/i18nForTest";
import { I18nextProvider } from "react-i18next";



export const TranslationDecorator = (StoryComponent: Story) => {
    return (
        <Suspense fallback=''>
            <I18nextProvider i18n={i18nForTest}>
                <StoryComponent />
            </I18nextProvider>
        </Suspense>
    )
};
