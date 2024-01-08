import cls from './ReportsPageLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { ReportPanelContentMode } from '../../model/type/reportPage';
import { HStack, VStack } from '@/shared/ui/Stack';
import { BoundaryLine } from '@/shared/ui/BoundaryLine/BoundaryLine';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getOrdersList } from '@/features/getOrdersList';

interface ReportsPageLayoutProps {
    className?: string
    contentMode?: ReportPanelContentMode
}

export const ReportsPageLayout = memo((props: ReportsPageLayoutProps) => {
    const { className, contentMode = ReportPanelContentMode.ORDERS_REPORTS } = props;
    const [reportYear, setReportYear] = useState('2024');
    const dispatch = useAppDispatch();

    const onTotalMaterialsReportButtonClickHandler = (useCallback(()=>{
        console.log('onTotalMaterialsReportButtonClick');
        const orders = dispatch(getOrdersList(null));
        console.log('orders ', orders);
    }, [dispatch]));

    if (contentMode === ReportPanelContentMode.MATERIALS_REPORTS){
        return (
            <VStack className={classNames(cls.ReportsPageLayout, {}, [className])} max>
                <div>Отчеты об использовании материалов</div>
                <BoundaryLine/>
                <HStack max={true} gap={'32px'}>
                    <HStack gap={'8px'}>
                        <div>Использование материалов по всем заказам за</div>
                        <Input type={'number'} min="2023" max="2099" step="1" value={reportYear} onChange={(newValue)=>setReportYear(newValue)}/>
                        <div>год</div>
                    </HStack>
                    <Button
                        onClick={onTotalMaterialsReportButtonClickHandler}
                        theme={ButtonTheme.OUTLINE}
                    >
                        Сформировать отчет
                    </Button>
                </HStack>



            </VStack>
        );
    }

    return (
        <div className={classNames(cls.ReportsPageLayout, {}, [className])}>
                OrdersReport
        </div>
    );
});

ReportsPageLayout.displayName = 'ReportsPageLayout';