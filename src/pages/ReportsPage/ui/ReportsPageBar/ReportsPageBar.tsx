import cls from './ReportsPageBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { ReportPanelActiveTabValues, ReportPanelContentType } from '../../model/types/reportsPage';

interface ReportsPageBarProps {
    className?: string
    activeTab?: ReportPanelActiveTabValues
    contentType?: ReportPanelContentType
    onToggle?: (newContentMode: ReportPanelActiveTabValues) => void
}

export const ReportsPageBar = memo((props: ReportsPageBarProps) => {
    const { className, activeTab = ReportPanelActiveTabValues.ORDERS_REPORTS, onToggle, contentType } = props;

    const onOrdersReportsButtonClickHandler = useCallback(()=>{
        onToggle && onToggle(ReportPanelActiveTabValues.ORDERS_REPORTS);
    },[onToggle]);

    const onMaterialsReportsButtonClickHandler = useCallback(()=>{
        onToggle && onToggle(ReportPanelActiveTabValues.MATERIALS_REPORTS);
    },[onToggle]);

    if (contentType !== ReportPanelContentType.REPORT_PAGE){
        return (
            <HStack className={classNames(cls.ReportsPageBar, {}, [className])} gap={'32px'}>
                <Button
                    active={activeTab === ReportPanelActiveTabValues.ORDERS_REPORTS}
                    onClick={onOrdersReportsButtonClickHandler}
                >
                    Назад
                </Button>
                <Button
                    active={activeTab === ReportPanelActiveTabValues.MATERIALS_REPORTS}
                    onClick={onMaterialsReportsButtonClickHandler}
                >
                    К меню формирования отчетов
                </Button>
            </HStack>
        );
    }

    return (
        <HStack className={classNames(cls.ReportsPageBar, {}, [className])} gap={'32px'}>
            <Button
                active={activeTab === ReportPanelActiveTabValues.ORDERS_REPORTS}
                onClick={onOrdersReportsButtonClickHandler}
            >
                Отчеты о заказах
            </Button>
            <Button
                active={activeTab === ReportPanelActiveTabValues.MATERIALS_REPORTS}
                onClick={onMaterialsReportsButtonClickHandler}
            >
                Отчеты о материалах
            </Button>
        </HStack>
    );
});

ReportsPageBar.displayName = 'ReportsPageBar';