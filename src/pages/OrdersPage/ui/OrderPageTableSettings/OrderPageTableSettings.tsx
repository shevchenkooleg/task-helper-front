import cls from './OrderPageTableSettings.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import MoreDownIcon from '@/shared/assets/icons/MoreDownIcon.svg';
import MoreUpIcon from '@/shared/assets/icons/MoreUpIcon.svg';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ordersTitlesMapper } from '@/shared/lib/titleMappers/ordersTitlesMapper';
import { Text, TextTheme } from '@/shared/ui/Text';
import { useSelector } from 'react-redux';
import { getOrdersPageTableKeys } from '../../model/selectors/getOrdersPageTableKeys/getOrdersPageTableKeys';
import { OrderTabHeaderKeys, orderTabHeaderKeysArr } from '@/shared/const/orderConsts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ordersPageSliceActions } from '../../model/slice/ordersPageSlice';
import { ORDERS_TABLE_ACTIVE_KEYS } from '@/shared/const/localStorage';

interface OrderPageTableSettingsProps {
    className?: string
}

export const OrderPageTableSettings = memo((props: OrderPageTableSettingsProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [isTableSettingsPanelShow, setIsTableSettingsPanelShow] = useState(false);

    const orderTableActiveKeys = useSelector(getOrdersPageTableKeys) ?? [];

    const onMoreButtonClickHandler = useCallback(()=>{
        setIsTableSettingsPanelShow(prev=>!prev);
    },[

    ]);

    const TableColumnsList = () => {

        const onCheckBoxClickHandler = (key: OrderTabHeaderKeys) => {
            if (orderTableActiveKeys.includes(key)){
                const updatedKeys = orderTableActiveKeys.filter(el => el !== key);
                dispatch(ordersPageSliceActions.setOrderPageTableActiveKeys(updatedKeys));
                localStorage.setItem(ORDERS_TABLE_ACTIVE_KEYS, JSON.stringify(updatedKeys));
            } else {
                const updatedKeys = [...orderTableActiveKeys, key];
                dispatch(ordersPageSliceActions.setOrderPageTableActiveKeys(updatedKeys));
                localStorage.setItem(ORDERS_TABLE_ACTIVE_KEYS, JSON.stringify(updatedKeys));
            }
        };

        return (
            <VStack
                className={classNames(cls.orderTabSettings, { [cls.settingsShow]:isTableSettingsPanelShow }, [])}
                align={'start'} justify={'start'}
            >
                {orderTabHeaderKeysArr.map((el, i)=>{
                    return (
                        <HStack key={i} gap={'16px'} align={'center'}>
                            <input
                                type={'checkbox'}
                                checked={orderTableActiveKeys.includes(el)}
                                onChange={()=>{onCheckBoxClickHandler(el);}}/>
                            <Text
                                theme={TextTheme.INVERTED}
                                text={ordersTitlesMapper[el]}
                                onClick={()=>{console.log('text');}}
                                inverted={true}
                            />
                        </HStack>
                    );
                })}
            </VStack>
        );
    };

    return (
        <VStack className={classNames(cls.OrderPageTableSettings, {}, [className])}>
            <HStack gap={'12px'}>
                <div>Настройки отображения</div>
                <Button theme={ButtonTheme.CLEAR} inverted={true} onClick={onMoreButtonClickHandler}>
                    {isTableSettingsPanelShow
                        ? <Icon Svg={MoreUpIcon} inverted={true} width={'30px'}/>
                        : <Icon Svg={MoreDownIcon} inverted={true} width={'30px'}/>
                    }
                </Button>
            </HStack>
            {isTableSettingsPanelShow && <TableColumnsList/>}
        </VStack>
    );
});

OrderPageTableSettings.displayName = 'OrderPageTableSettings';