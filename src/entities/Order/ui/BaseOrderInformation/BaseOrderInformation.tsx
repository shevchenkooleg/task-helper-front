import cls from './BaseOrderInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useSelector } from 'react-redux';
import { getOrderFormData } from '../../model/selectors/getOrderFormData/getOrderFormData';
import { Input } from '@/shared/ui/Input';
import { ListBox } from '@/shared/ui/Popups';
import { ButtonTheme } from '@/shared/ui/Button';
import { orderExecutionTypeOptions, orderTypeOptions } from '@/shared/const/orderDetailsConsts';
import { orderExecutionTypeMapper, orderTypeMapper } from '@/shared/const/addNewOrderConsts';
import { OrderStatusSelect } from '../OrderStatusSelect/OrderStatusSelect';

interface BaseOrderInformationProps {
    className?: string
}

export const BaseOrderInformation = memo((props: BaseOrderInformationProps) => {
    const { className } = props;
    const orderFormData = useSelector(getOrderFormData);


    return (
        <div className={classNames(cls.BaseOrderInformation, {}, [className])}>
            <h4>Основная информация</h4>
            <VStack align={'start'} max={true} gap={'4px'}>
                <HStack gap={'16px'} justify={'between'}  max={true}>
                    <HStack gap={'16px'} justify={'between'}>
                        <HStack gap={'8px'} width={'289px'} justify={'between'}>
                            <div>№ заказа:</div>
                            <Input value={orderFormData?.orderId}/>
                        </HStack>
                        <HStack gap={'8px'}>
                            <ListBox
                                value={orderFormData?.orderType && orderTypeMapper[orderFormData?.orderType]}
                                onChange={()=>console.log('qqq')}
                                buttonTheme={ButtonTheme.CLEAR}
                                items={orderTypeOptions}
                            />
                            <ListBox
                                value={orderFormData?.orderExecutionType && orderExecutionTypeMapper[orderFormData?.orderExecutionType]}
                                onChange={()=>console.log('qqq')}
                                buttonTheme={ButtonTheme.CLEAR}
                                items={orderExecutionTypeOptions}
                            />
                        </HStack>
                    </HStack>
                    <HStack gap={'8px'}>
                        <OrderStatusSelect
                            value={orderFormData?.orderStatus}
                            onChange={()=>console.log('qqq')}
                        />
                    </HStack>
                </HStack>
                <HStack gap={'8px'} justify={'between'}>
                    <div>Оборудование:</div>
                    <Input value={orderFormData?.description} autoWidth={true}/>
                </HStack>
            </VStack>
        </div>
    );
});

BaseOrderInformation.displayName = 'BaseOrderInformation';