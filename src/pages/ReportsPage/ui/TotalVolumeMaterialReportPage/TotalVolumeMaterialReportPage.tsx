import cls from './TotalVolumeMaterialReportPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getReportPageSettings, getTotalVolumeMaterialReportData } from '../..';
import { TableGrid } from '@/shared/ui/TableGrid';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { totalVolumeMaterialReportKeysArr } from '@/shared/const/reportConsts';
import { MaterialToOrderTab, MaterialToReportTab } from '@/entities/Material';


import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { reportsPageSliceActions } from '../../model/slice/reportsPageSlice';
import { getOrdersList } from '@/features/getOrdersList';
import { defaultOrdersStatusFilterValue } from '@/shared/const/orderConsts';
import {
    fetchManyMaterialsByArrayID
} from '../../model/services/fetchManyMaterialsByArrayID/fetchManyMaterialsByArrayID';
import { precisionRound } from '@/shared/lib/precisionRound/precisionRound';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';
import { getRouteReports } from '@/shared/const/router';

interface TotalVolumeMaterialReportPageProps {
    className?: string
}

export const TotalVolumeMaterialReportPage = (props: TotalVolumeMaterialReportPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const reportData = useSelector(getTotalVolumeMaterialReportData);
    const navigate = useNavigate();
    const location = useLocation();
    // const yearOfExecutionForReport = useSelector(getReportPageSettings)?.reportYear ?? '2025';
    const userId = useSelector(getUserAuthData);
    const [searchParams] = useSearchParams();
    const reportSettings = useSelector(getReportPageSettings);
    const reportYear = reportSettings?.reportYear || location.state && location.state.queryParams.yearOfExecution || searchParams.get('yearOfExecution') || '2022';
    const orderTypeValue = reportSettings?.orderType || location.state && location.state.queryParams.orderType || searchParams.get('orderType') || OrderType.INDEPENDENT;
    const orderExecutionTypeValue = reportSettings?.orderExecutionType || location.state && location.state.queryParams.orderExecutionType || searchParams.get('orderExecutionType') || OrderExecutionType.PLANNED;

    console.log('location ', location);

    useEffect(()=>{
        const orders = dispatch(getOrdersList({
            yearOfExecution: reportYear,
            orderStatusFilterFields: defaultOrdersStatusFilterValue,
            orderType: orderTypeValue as OrderType,
            orderExecutionType: orderExecutionTypeValue as OrderExecutionType
        }));

        orders.then((response) => {
            const ordersList = response.payload;
            if (ordersList && Array.isArray(ordersList) && ordersList?.length > 0) {
                const materialArr: Array<MaterialToOrderTab> = [];
                ordersList.forEach((el) => {
                    if (el.materials && el.materials.length > 0) {
                        el.materials.forEach(material => {
                            materialArr.push(material);
                        });
                    }
                });
                // console.log('materialArr ', materialArr);
                const totalMaterial: {
                    [key: string]: number
                } = {};
                materialArr.forEach(material => {
                    if (material.materialId && material.totalQuantity) {
                        if (totalMaterial[material.materialId]) {
                            totalMaterial[material.materialId] = totalMaterial[material.materialId] + Number(material.totalQuantity);
                        } else {
                            totalMaterial[material.materialId] = Number(material.totalQuantity);
                        }
                    }
                });
                return totalMaterial;
            }
            return undefined;
        }).then(totalMaterial => {
            if (totalMaterial) {
                dispatch(fetchManyMaterialsByArrayID(Object.keys(totalMaterial))).then((response) => {
                // console.log(response.payload);
                // console.log('totalMaterial ', totalMaterial);
                    if (Array.isArray(response.payload)) {
                        const totalMaterialReport = Object.values(response.payload);
                        totalMaterialReport.forEach(el => {
                            if (el._id) {
                                el.totalVolume = String(precisionRound((totalMaterial[el._id]),3));
                            }
                        });
                        // console.log('totalMaterialReport ', totalMaterialReport);
                        return totalMaterialReport;
                    }
                }).then(report => {
                // console.log('report ', report);
                    report && dispatch(reportsPageSliceActions.setTotalVolumeMaterialReport(report));
                    reportYear && dispatch(reportsPageSliceActions.setReportYear(reportYear));
                    orderTypeValue && dispatch(reportsPageSliceActions.setOrderType(orderTypeValue as OrderType));
                    orderExecutionTypeValue && dispatch(reportsPageSliceActions.setOrderExecutionType(orderExecutionTypeValue as OrderExecutionType));
                //
                });
            }
        });},[dispatch, orderExecutionTypeValue, orderTypeValue, reportYear]);

    const onMaterialTableClick = useCallback((i: MaterialToReportTab)=>{

        navigate(getRouteReports('material-involvement'), { state: { materialId: i._id, materialName: i.materialName, userId: userId, reportYear: reportYear } });

    },[navigate, userId, reportYear]);




    if (reportData){
        return (
            <VStack className={cls.layout}>
                <Page data-testid={'TotalVolumeMaterialReportPage'} className={classNames(cls.TotalVolumeMaterialReportPage, {}, [className])} max={true}>
                    <VStack max={true} gap={'8px'} align={'start'}  className={classNames(cls.ReportsPage, {}, [className])}>
                        TotalVolumeMaterialReportPage
                        <TableGrid
                            items={reportData}
                            tabKeys={totalVolumeMaterialReportKeysArr}
                            template = 'totalVolumeMaterialReportTemplate'
                            callback={(e,i)=>onMaterialTableClick(i)}
                        />
                    </VStack>
                </Page>
            </VStack>
        );
    }

    return <div>111</div>;
};

export default memo(TotalVolumeMaterialReportPage);