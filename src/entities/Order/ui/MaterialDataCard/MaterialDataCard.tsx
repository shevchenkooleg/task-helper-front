import cls from './MaterialCorrectionCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import {
    OrderConsignmentNoteInterface,
    OrderMaterialCorrectionInterface
} from '../../model/types/orderDetailsSliceSchema';
import { OrderDocumentsStatusSelect } from '../OrderDocumentsStatusSelect/OrderDocumentsStatusSelect';
import { OrderDocumentsStatus } from '@/shared/const/orderConsts';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { useSelector } from 'react-redux';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';

interface MaterialCorrectionCardProps {
    className?: string
    data?: OrderMaterialCorrectionInterface | OrderConsignmentNoteInterface
    onChangeMaterialCorrection?: (newStatus: OrderDocumentsStatus) => void
    onDeleteClick?: ()=>void
}

export const MaterialDataCard = memo((props: MaterialCorrectionCardProps) => {
    const { className, data, onChangeMaterialCorrection, onDeleteClick } = props;
    const editMode = useSelector(getOrderDetailsEditMode);
    const cardId = data?._id;

    return (
        <HStack className={classNames(cls.MaterialCorrectionCard, {}, [className])} gap={'12px'}>
            <Input
                value={data?.value}
                readOnly={!editMode}
            />
            <OrderDocumentsStatusSelect
                readOnly={!editMode}
                value={data?.status}
                size={ButtonSize.SIZE_S}
                onChange={()=>console.log('qqq')
                    // (status: OrderDocumentsStatus)=>{
                    //     onChangeMaterialCorrection(form?.KS2Id?.value, status);
                    // }
                }
            />
            {editMode && <Button
                size={ButtonSize.SIZE_S}
                theme={ButtonTheme.OUTLINE_RED}
                onClick={onDeleteClick}
            >
                Del
            </Button>}
        </HStack>
    );
});

MaterialDataCard.displayName = 'MaterialDataCard';