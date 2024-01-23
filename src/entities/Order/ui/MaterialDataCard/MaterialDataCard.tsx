import cls from './MaterialCorrectionCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import {
    OrderConsignmentNoteInterface,
    OrderMaterialCorrectionInterface
} from '../../model/types/orderDetailsSliceSchema';
import { OrderDocumentsStatusSelect } from '../OrderDocumentsStatusSelect/OrderDocumentsStatusSelect';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { useSelector } from 'react-redux';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';
import { OrderDocumentsStatus } from '@/shared/const/orderConsts';

interface MaterialCorrectionCardProps {
    className?: string
    data?: OrderMaterialCorrectionInterface | OrderConsignmentNoteInterface
    onChangeMaterialCorrection?: (correctionId: string, newCorrection: OrderMaterialCorrectionInterface) => void
    onDeleteClick?: ()=>void
}

export const MaterialDataCard = memo((props: MaterialCorrectionCardProps) => {
    const { className, data, onChangeMaterialCorrection, onDeleteClick } = props;
    const editMode = useSelector(getOrderDetailsEditMode);

    const onChangeCorrectionValue = (newValue?: string) => {
        data?._id && onChangeMaterialCorrection && onChangeMaterialCorrection(data?._id, { ...data, value: newValue ?? '' });
    };
    const onChangeCorrectionStatus = (newStatus?: OrderDocumentsStatus) => {
        data?._id && onChangeMaterialCorrection && onChangeMaterialCorrection(data?._id, { ...data, status: newStatus ?? OrderDocumentsStatus.ON_CLEARANCE });
    };

    return (
        <HStack className={classNames(cls.MaterialCorrectionCard, {}, [className])} gap={'12px'} max={true}>
            <Input
                value={data?.value}
                readOnly={!editMode}
                onChange={onChangeCorrectionValue}
            />
            <OrderDocumentsStatusSelect
                readOnly={!editMode}
                value={data?.status}
                size={ButtonSize.SIZE_S}
                onChange={onChangeCorrectionStatus}
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