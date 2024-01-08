import cls from './TotalVolumeMaterialReportPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getTotalVolumeMaterialReportData } from '../..';
import { TableGrid } from '@/shared/ui/TableGrid';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { totalVolumeMaterialReportKeysArr } from '@/shared/const/reportConsts';

interface TotalVolumeMaterialReportPageProps {
    className?: string
}

export const TotalVolumeMaterialReportPage = (props: TotalVolumeMaterialReportPageProps) => {
    const { className } = props;
    const reportData = useSelector(getTotalVolumeMaterialReportData);
    console.log(reportData);




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
                        />
                    </VStack>
                </Page>
            </VStack>
        );
    }

    return null;
};

export default memo(TotalVolumeMaterialReportPage);