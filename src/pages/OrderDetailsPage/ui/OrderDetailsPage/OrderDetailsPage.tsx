import cls from './OrderDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { EditableOrderCard } from '@/features/editableOrderCard';

interface OrderDetailsPageProps {
    className?: string
}

const OrderDetailsPage = memo((props: OrderDetailsPageProps) => {
    const { className } = props;


    return (
        <Page className={classNames(cls.OrderDetailsPage, {}, [className])}>
            <VStack gap={'16px'} max={true} >
                <EditableOrderCard/>
            </VStack>
        </Page>
    );
});

OrderDetailsPage.displayName = 'OrderDetailsPage';

export default OrderDetailsPage;
