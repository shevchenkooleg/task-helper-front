import cls from './OrderPageToolsPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { ToolBar } from '@/widgets/ToolBar';
import { Text } from '@/shared/ui/Text';

interface OrderPageToolsPanelProps {
    className?: string
    addOrderCallback?: () => void
    refreshOrdersCallback?: () => void
}

export const OrderPageToolsPanel = memo((props: OrderPageToolsPanelProps) => {
    const { className, addOrderCallback, refreshOrdersCallback } = props;

    return (
        <ToolBar>
            <HStack
                gap={'32px'}
                justify={'between'}
                max
                className={classNames(cls.OrderPageToolsPanel, {}, [className])}>
                <Text text={'Orders Filters block'}/>
                <HStack gap={'32px'}>
                    <Button onClick={refreshOrdersCallback}>обновить заказы</Button>
                    <Button onClick={addOrderCallback}>добавить заказ</Button>
                </HStack>
            </HStack>
        </ToolBar>
    );
});

OrderPageToolsPanel.displayName = 'OrderPageToolsPanel';