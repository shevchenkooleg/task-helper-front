import cls from './MaterialInvolvementReportPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';


import { useSelector } from 'react-redux';
import { getMaterialInvolvementReportData } from '../../model/selectors/getMaterialInvolvementReportData/getMaterialInvolvementReportData';
import { TableGrid } from '@/shared/ui/TableGrid';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { MaterialInvolvementReportTabHeaderKeysArr } from '@/shared/const/reportConsts';
import { MaterialInvolvementReportData } from '../../model/types/reportsPage';

interface MaterialInvolvementReportPageProps {
    className?: string
}

export const MaterialInvolvementReportPage = (props: MaterialInvolvementReportPageProps) => {
    const { className } = props;
    const report = useSelector(getMaterialInvolvementReportData);

    return (
        <VStack className={cls.layout}>
            <Page data-testid={'MaterialInvolvementReportPage'} className={classNames(cls.MaterialInvolvementReportPage, {}, [className])} max={true}>
                <VStack max={true} gap={'8px'} align={'start'}  className={classNames(cls.ReportsPage, {}, [className])}>
                    MaterialInvolvementReportPage
                    {report && <TableGrid<MaterialInvolvementReportData, null, null>
                        items={report}
                        tabKeys={MaterialInvolvementReportTabHeaderKeysArr}
                        template={'materialInvolvementReportTemplate'}
                    />
                    }
                </VStack>
            </Page>
        </VStack>
    );
};

export default memo(MaterialInvolvementReportPage);