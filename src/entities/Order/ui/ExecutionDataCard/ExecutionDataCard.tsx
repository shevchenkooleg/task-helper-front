import cls from './ExecutionDataCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { KS2DocumentInterface, WriteOffDocumentInterface } from '../../model/types/orderDetailsSliceSchema';
import { Input } from '@/shared/ui/Input';
import { OrderDocumentsStatusSelect } from '../OrderDocumentsStatusSelect/OrderDocumentsStatusSelect';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';
import { HStack } from '@/shared/ui/Stack';
import { OrderDocumentsStatus, orderDocumentsStatusMapper } from '@/shared/const/orderConsts';
import DeleteIcon from '@/shared/assets/icons/DeleteIcon.svg';
import { Icon } from '@/shared/ui/Icon';

interface ExecutionDataCardProps {
    className?: string
    data: KS2DocumentInterface | WriteOffDocumentInterface
    onDeleteClick?: () => void
    onChangeExecutionDataCardValue?: (newKS2: KS2DocumentInterface, KS2Id: string) => void
}

export const ExecutionDataCard = memo((props: ExecutionDataCardProps) => {
    const { className, data, onDeleteClick, onChangeExecutionDataCardValue } = props;
    const editMode = useSelector(getOrderDetailsEditMode);
    const [lineHover, setLineHover] = useState(false);

    const currentStatus = orderDocumentsStatusMapper[data.status] as OrderDocumentsStatus;

    const onChangeDataCardStatus = useCallback((newStatus?: OrderDocumentsStatus)=>{
        data?._executionId && onChangeExecutionDataCardValue &&  onChangeExecutionDataCardValue(
            { ...data, status: newStatus ?? OrderDocumentsStatus.ON_CLEARANCE }, data?._id
        );
    },[data, onChangeExecutionDataCardValue]);

    const onChangeDataCardValue = useCallback((newValue?: string)=>{
        data?._executionId && onChangeExecutionDataCardValue &&  onChangeExecutionDataCardValue(
            { ...data, value: newValue ?? '' }, data?._id
        );
    },[data, onChangeExecutionDataCardValue]);


    console.log('data in card', data);

    return (
        <HStack gap={'16px'} className={classNames(cls.ExecutionDataCard, {}, [className])}>
            <Input
                value={data?.value}
                readOnly={!editMode}
                onChange={onChangeDataCardValue}
                width={140}
                className={lineHover ? cls.outsideHover : ''}
            />
            <OrderDocumentsStatusSelect
                readOnly={!editMode}
                value={currentStatus}
                size={ButtonSize.SIZE_S}
                onChange={onChangeDataCardStatus}
                className={lineHover ? cls.outsideHover : ''}
            />
            {editMode && <Button
                size={ButtonSize.SIZE_XS}
                theme={ButtonTheme.CLEAR}
                trimPadding={true}
                onClick={onDeleteClick}
                onMouseEnter={()=>setLineHover(true)}
                onMouseLeave={()=>setLineHover(false)}
                className={cls.deleteBtn}
            >
                <Icon Svg={DeleteIcon} style={{ 'width':'20px' }} red/>
            </Button>}
        </HStack>
    );
});

ExecutionDataCard.displayName = 'ExecutionDataCard';