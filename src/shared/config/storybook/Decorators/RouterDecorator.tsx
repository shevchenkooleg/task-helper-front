import '../../../../app/styles/index.scss'
import { BrowserRouter } from "react-router-dom";
import { type Story } from '@storybook/react';


export const RouterDecorator = (StoryComponent: Story) => {
    return (
        <BrowserRouter>
            <StoryComponent />
        </BrowserRouter>
    )
};
