import cls from './MaterialsReportPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';


import { reportsPageSliceActions } from '../../model/slice/reportsPageSlice';
import { HStack, VStack } from '@/shared/ui/Stack';
import { BoundaryLine } from '@/shared/ui/BoundaryLine/BoundaryLine';
import { ListBox } from '@/shared/ui/Popups';
import {
    OrderExecutionType,
    orderExecutionTypeMapper,
    OrderType,
    orderTypeMapper
} from '@/shared/const/addNewOrderConsts';
import { orderExecutionTypeOptions, orderTypeOptions } from '@/shared/const/orderDetailsConsts';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getReportPageSettings } from '../..';
import { getRouteReports } from '@/shared/const/router';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface MaterialsReportPageProps {
    className?: string
}

export const MaterialsReportPage = memo((props: MaterialsReportPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const reportSettings = useSelector(getReportPageSettings);
    const reportYear = reportSettings?.reportYear ?? searchParams.get('yearOfExecution') ?? '2024';
    const orderTypeValue = reportSettings?.orderType || searchParams.get('orderType') || OrderType.INDEPENDENT;
    const orderExecutionTypeValue = reportSettings?.orderExecutionType || searchParams.get('orderExecutionType') || OrderExecutionType.PLANNED;

    const updateReportYear = useCallback((newValue: string) => {
        dispatch(reportsPageSliceActions.setReportYear(newValue));
    }, [dispatch]);
    const orderTypeValueChange = useCallback((newType?: string) => {
        dispatch(reportsPageSliceActions.setOrderType(newType as OrderType ?? OrderType.INDEPENDENT));
    }, [dispatch]);
    const orderExecutionTypeValueChange = useCallback((newType?: string) => {
        dispatch(reportsPageSliceActions.setOrderExecutionType(newType as OrderExecutionType ?? OrderExecutionType.PLANNED));
    }, [dispatch]);

    const onTotalMaterialsReportButtonClickHandler = (useCallback(() => {
        const params = {
            ['yearOfExecution']: reportYear,
            ['orderType']: orderTypeValue,
            ['orderExecutionType']: orderExecutionTypeValue
        };
        addQueryParams(params);
        // dispatch(reportsPageSliceActions.setReportYear(reportYear));
        // dispatch(reportsPageSliceActions.setOrderType(orderTypeValue as OrderType));
        // dispatch(reportsPageSliceActions.setOrderExecutionType(orderExecutionTypeValue as OrderExecutionType));
        // console.log('reportYear ', reportYear);
        // console.log('orderTypeValue ', orderTypeValue);
        // console.log('orderExecutionTypeValue ', orderExecutionTypeValue);
        // setTimeout(()=>{navigate(getRouteReports('total-volume-material'));});
        navigate(getRouteReports('total-volume-material'), { state: { queryParams: params } });
    }, [navigate, orderExecutionTypeValue, orderTypeValue, reportYear]));


    return (
        <VStack className={classNames(cls.MaterialsReportPage, {}, [className])} max>
            <div>Отчеты об использовании материалов</div>
            <BoundaryLine/>
            <HStack max={true} gap={'32px'}>
                <HStack>
                    <div>Использование материалов по заказам с характеристиками:</div>
                    <ListBox
                        onChange={orderTypeValueChange}
                        value={orderTypeMapper[orderTypeValue as OrderType]}
                        items={orderTypeOptions}
                        buttonTheme={ButtonTheme.CLEAR}
                    />
                    <ListBox
                        onChange={orderExecutionTypeValueChange}
                        value={orderExecutionTypeMapper[orderExecutionTypeValue as OrderExecutionType]}
                        items={orderExecutionTypeOptions}
                        buttonTheme={ButtonTheme.CLEAR}
                    />
                    <div>за</div>
                    <Input type={'number'} min="2023" max="2099" step="1" value={reportYear}
                        onChange={(newValue) => updateReportYear(newValue)} style={{ margin: '0 10px 0 10px' }}/>
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
});

MaterialsReportPage.displayName = 'MaterialsReportPage';
