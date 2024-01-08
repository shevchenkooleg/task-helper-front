import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { TotalVolumeMaterialReportPage } from './TotalVolumeMaterialReportPage';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/TotalVolumeMaterialReportPage',
    component: TotalVolumeMaterialReportPage,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof TotalVolumeMaterialReportPage>;

const Template: ComponentStory<typeof TotalVolumeMaterialReportPage> = (args) =>
    <TotalVolumeMaterialReportPage {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
