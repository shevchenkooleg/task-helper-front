import cls from './ReportsPageBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { ReportPanelContentMode } from '../../model/types/reportsPage';

interface ReportsPageBarProps {
    className?: string
    contentMode?: ReportPanelContentMode
    onToggle?: (newContentMode: ReportPanelContentMode) => void
}

export const ReportsPageBar = memo((props: ReportsPageBarProps) => {
    const { className, contentMode = ReportPanelContentMode.ORDERS_REPORTS, onToggle } = props;

    const onOrdersReportsButtonClickHandler = useCallback(()=>{
        onToggle && onToggle(ReportPanelContentMode.ORDERS_REPORTS);
    },[onToggle]);

    const onMaterialsReportsButtonClickHandler = useCallback(()=>{
        onToggle && onToggle(ReportPanelContentMode.MATERIALS_REPORTS);
    },[onToggle]);

    return (
        <HStack className={classNames(cls.ReportsPageBar, {}, [className])} gap={'32px'}>
            <Button
                active={contentMode === ReportPanelContentMode.ORDERS_REPORTS}
                onClick={onOrdersReportsButtonClickHandler}
            >
                Отчеты о заказах
            </Button>
            <Button
                active={contentMode === ReportPanelContentMode.MATERIALS_REPORTS}
                onClick={onMaterialsReportsButtonClickHandler}
            >
                Отчеты о материалах
            </Button>
        </HStack>
    );
});

ReportsPageBar.displayName = 'ReportsPageBar';