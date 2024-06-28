import { classNames } from '@/shared/lib/classNames/classNames';
import { type FC, Suspense, useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text/index';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteOrderById } from '@/entities/Order';
import { useNavigate } from 'react-router-dom';
import { getRouteOrders } from '@/shared/const/router';

interface DeleteOrderModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    element?: HTMLElement
    orderName?: string
    orderId?: string
}


export const DeleteOrderModal: FC<DeleteOrderModalProps> = (props) => {
    const { className, isOpen, onClose, element, orderName='', orderId } = props;
    const [inputValue, setInputValue] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCancelClick = () => {
        setInputValue('');
        onClose();
    };

    const onDeleteClick = () => {
        console.log('request order because modal close');
        orderId && dispatch(deleteOrderById(orderId)).then((res)=>{
            if (res.payload !== 'error'){
                navigate(getRouteOrders());
                setInputValue('');
                onClose();
            } else {
                //TODO implement error messages
                console.log(res.payload);
            }
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancelClick}
            element={element}
            className={classNames('', {}, [className])}
        >
            <Suspense fallback={<Loader/>}>
                <VStack gap={'24px'}>
                    <HStack gap={'8px'} align={'end'}>
                        <Text title={'Внимание!'}/>
                        <Text text={`Вы удаляете заказ ${orderName}?`}/>
                    </HStack>
                    <VStack gap={'4px'}>
                        <Text text={`Введите в поле ввода значение "${orderName}"`}/>
                        <Text text={'и нажмите УДАЛИТЬ, чтобы подтвердить действие '}/>
                        <Text text={'или нажмите ОТМЕНА, чтобы отменить действие '}/>
                    </VStack>
                    <VStack gap={'24px'}>
                        <Input
                            value={inputValue}
                            onChange={setInputValue}
                            fontSize={TextSize.SIZE_M}
                        />
                        <HStack gap={'32px'}>
                            <Button
                                theme={ButtonTheme.BACKGROUND_RED}
                                rounded
                                onClick={onDeleteClick}
                                disabled={!(inputValue === orderName)}
                            >
                                Удалить
                            </Button>
                            <Button
                                theme={ButtonTheme.BACKGROUND}
                                rounded
                                onClick={onCancelClick}
                            >
                                Отмена
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </Suspense>
        </Modal>
    );
};
