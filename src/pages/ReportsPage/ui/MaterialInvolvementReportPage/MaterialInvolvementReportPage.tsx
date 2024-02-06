import cls from './MaterialInvolvementReportPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';


import { useSelector } from 'react-redux';
import { getMaterialInvolvementReportData } from '../../model/selectors/getMaterialInvolvementReportData/getMaterialInvolvementReportData';
import { TableGrid } from '@/shared/ui/TableGrid';
import { Order } from '@/entities/Order';
import { OrdersSortField, orderTabHeaderKeysArr } from '@/shared/const/orderConsts';
//TODO fix linting-error with import types

// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { getOrdersPageTableKeys } from '@/pages/OrdersPage';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

interface MaterialInvolvementReportPageProps {
    className?: string
}

export const MaterialInvolvementReportPage = (props: MaterialInvolvementReportPageProps) => {
    const { className } = props;
    const report = useSelector(getMaterialInvolvementReportData);

    const orderTableActiveKeys = useSelector(getOrdersPageTableKeys) ?? [];
    const tableKeysForRender = orderTabHeaderKeysArr.filter(key=>orderTableActiveKeys.includes(key));

    console.log(report);
    return (
        <VStack className={cls.layout}>
            <Page data-testid={'MaterialInvolvementReportPage'} className={classNames(cls.MaterialInvolvementReportPage, {}, [className])} max={true}>
                <VStack max={true} gap={'8px'} align={'start'}  className={classNames(cls.ReportsPage, {}, [className])}>
                    MaterialInvolvementReportPage
                    {report && <TableGrid<Order, OrdersSortField, typeof OrdersSortField>
                        items={report}
                        tabKeys={tableKeysForRender}
                    />
                    }
                </VStack>
            </Page>
        </VStack>
    );
};

export default memo(MaterialInvolvementReportPage);