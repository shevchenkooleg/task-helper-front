import cls from './ReportsPageLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { BoundaryLine } from '@/shared/ui/BoundaryLine/BoundaryLine';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getOrdersList } from '@/features/getOrdersList';
import { MaterialToOrderTab } from '@/entities/Material';
import {
    fetchManyMaterialsByArrayID
} from '../../model/services/fetchManyMaterialsByArrayID/fetchManyMaterialsByArrayID';
import { reportsPageSliceActions } from '../../model/slice/reportsPageSlice';
import { ReportPanelContentMode } from '../../model/types/reportsPage';
import { getRouteTotalVolumeMaterialReport } from '@/shared/const/router';
import { useNavigate } from 'react-router-dom';
import { defaultOrdersStatusFilterValue } from '@/shared/const/orderConsts';
import { useSelector } from 'react-redux';
import { getReportPageSettings } from '../../model/selectors/getReportPageSettings/getReportPageSettings';
import { ListBox } from '@/shared/ui/Popups';
import { orderExecutionTypeOptions, orderTypeOptions } from '@/shared/const/orderDetailsConsts';
import {
    OrderExecutionType,
    orderExecutionTypeMapper,
    OrderType,
    orderTypeMapper
} from '@/shared/const/addNewOrderConsts';
import { Input } from '@/shared/ui/Input';

interface ReportsPageLayoutProps {
    className?: string
    contentMode?: ReportPanelContentMode
}

export const ReportsPageLayout = memo((props: ReportsPageLayoutProps) => {
    const { className, contentMode = ReportPanelContentMode.ORDERS_REPORTS } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const reportSettings = useSelector(getReportPageSettings);
    const reportYear = reportSettings?.reportYear ?? '2024';
    const orderTypeValue = reportSettings?.orderType ?? OrderType.INDEPENDENT;
    const orderExecutionTypeValue = reportSettings?.orderExecutionType ?? OrderExecutionType.PLANNED;

    const updateReportYear = useCallback((newValue: string)=>{
        dispatch(reportsPageSliceActions.setReportYear(newValue));
    },[dispatch]);
    const orderTypeValueChange = useCallback((newType?: string) => {
        dispatch(reportsPageSliceActions.setOrderType(newType as OrderType ?? OrderType.INDEPENDENT));
    },[dispatch]);
    const orderExecutionTypeValueChange = useCallback((newType?: string)=>{
        dispatch(reportsPageSliceActions.setOrderExecutionType(newType as OrderExecutionType ?? OrderExecutionType.PLANNED ));
    },[dispatch]);


    //TODO refactor this page. move logic part
    const onTotalMaterialsReportButtonClickHandler = (useCallback(()=>{

        const orders = dispatch(getOrdersList({ yearOfExecution: reportYear, orderStatusFilterFields: defaultOrdersStatusFilterValue, orderType: orderTypeValue, orderExecutionType: orderExecutionTypeValue }));

        orders.then((response)=>{
            const ordersList = response.payload;
            if (ordersList && Array.isArray(ordersList) && ordersList?.length > 0){
                const materialArr: Array<MaterialToOrderTab> = [];
                ordersList.forEach((el)=>{
                    if (el.materials && el.materials.length > 0){
                        el.materials.forEach(material => {
                            materialArr.push(material);
                        });
                    }
                });
                console.log('materialArr ', materialArr);
                const totalMaterial: {
                    [key: string]: number
                } = {};
                materialArr.forEach(material=>{
                    if (material.materialId && material.totalQuantity){
                        if (totalMaterial[material.materialId]){
                            totalMaterial[material.materialId] = totalMaterial[material.materialId] + Number(material.totalQuantity);
                        } else {
                            totalMaterial[material.materialId] = Number(material.totalQuantity);
                        }
                    }
                });
                return totalMaterial;
            }
            return undefined;
        }).then(totalMaterial=>{
            if (totalMaterial){
                dispatch(fetchManyMaterialsByArrayID(Object.keys(totalMaterial))).then((response) => {
                    console.log(response.payload);
                    console.log('totalMaterial ', totalMaterial);
                    if (Array.isArray(response.payload)){
                        const totalMaterialReport = Object.values(response.payload);
                        totalMaterialReport.forEach(el=>{
                            if (el._id){
                                el.totalVolume = String(totalMaterial[el._id]);
                            }
                        });
                        return totalMaterialReport;
                    }
                }).then(report => {
                    report && dispatch(reportsPageSliceActions.setTotalVolumeMaterialReport(report));
                    navigate(getRouteTotalVolumeMaterialReport());
                });
            }
        });
    }, [dispatch, navigate, orderExecutionTypeValue, orderTypeValue, reportYear]));

    if (contentMode === ReportPanelContentMode.MATERIALS_REPORTS){
        return (
            <VStack className={classNames(cls.ReportsPageLayout, {}, [className])} max>
                <div>Отчеты об использовании материалов</div>
                <BoundaryLine/>
                <HStack max={true} gap={'32px'}>
                    <HStack>
                        <div>Использование материалов по заказам с характеристиками:</div>
                        <ListBox
                            onChange={orderTypeValueChange}
                            value={orderTypeMapper[orderTypeValue]}
                            items={orderTypeOptions}
                            buttonTheme={ButtonTheme.CLEAR}
                        />
                        <ListBox
                            onChange={orderExecutionTypeValueChange}
                            value={orderExecutionTypeMapper[orderExecutionTypeValue]}
                            items={orderExecutionTypeOptions}
                            buttonTheme={ButtonTheme.CLEAR}
                        />
                        <div>за</div>
                        <Input type={'number'} min="2023" max="2099" step="1" value={reportYear} onChange={(newValue)=>updateReportYear(newValue)} style={{ margin: '0 10px 0 10px' }}/>
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