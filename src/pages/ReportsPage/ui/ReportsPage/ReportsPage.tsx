import cls from './ReportsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { reportsPageSliceReducer } from '../../model/slice/reportsPageSlice';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { ReportsPageBar } from '../ReportsPageBar/ReportsPageBar';
import { ReportsPageLayout } from '../ReportsPageLayout/ReportsPageLayout';
import { ReportPanelActiveTabValues, ReportPanelContentType } from '../../model/types/reportsPage';

interface ReportsPageProps {
    className?: string
}

export const ReportsPage = (props: ReportsPageProps) => {
    const { className } = props;
    const [activeTab, setActiveTab] = useState<ReportPanelActiveTabValues>(ReportPanelActiveTabValues.MATERIALS_REPORTS);
    const reducers: ReducerList = {
        reports: reportsPageSliceReducer
    };

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <VStack className={cls.layout}>
                <ReportsPageBar activeTab={activeTab} onToggle={setActiveTab} contentType={ReportPanelContentType.REPORT_PAGE}/>
                <Page data-testid={'ReportsPage'} className={classNames('', {}, [className])} max={true}>
                    <VStack max={true} gap={'8px'} align={'start'}  className={classNames(cls.ReportsPage, {}, [className])}>
                        <ReportsPageLayout activeTab={activeTab}/>
                    </VStack>
                </Page>
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(ReportsPage);