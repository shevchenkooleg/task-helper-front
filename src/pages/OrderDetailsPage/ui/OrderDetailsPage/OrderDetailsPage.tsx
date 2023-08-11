import cls from './OrderDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { OrderDetailsPageHeader } from '../OrderDetailsPageHeader/OrderDetailsPageHeader';
import { OrderDetails } from '../OrderDetails/OrderDetails';

interface OrderDetailsPageProps {
    className?: string
}

const OrderDetailsPage = memo((props: OrderDetailsPageProps) => {
    const { className } = props;
    const { orderId } = useParams<{orderId: string}>();


    return (
        <Page className={classNames(cls.OrderDetailsPage, {}, [className])}>
            <VStack gap={'16px'} max={true} >
                <OrderDetailsPageHeader orderId={orderId}/>
                <OrderDetails/>
            </VStack>
        </Page>
    );
});

OrderDetailsPage.displayName = 'OrderDetailsPage';

export default OrderDetailsPage;
