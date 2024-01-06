import { memo, useCallback } from 'react';
import { MaterialInOrderTabHeaderKeys, MaterialTabHeaderKeys } from '@/shared/const/materialTabHeaderKeys';
import { useSelector } from 'react-redux';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';
import { getOrderFormData } from '../../model/selectors/getOrderFormData/getOrderFormData';
import { VStack } from '@/shared/ui/Stack';
import { materialsInOrderTitlesMapper } from '@/shared/lib/titleMappers/materialsInOrderTitlesMapper';
import { MaterialToOrderTab } from '@/entities/Material';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
//TODO

// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { materialToOrderSliceActions } from '@/features/addMatarialToOrder';
import { TableGrid } from '@/shared/ui/TableGrid';

interface OrderMaterialsTableProps {
    className?: string
    onOpen: () => void
}

const materialForOrderTabHeaderKeys = [
    MaterialTabHeaderKeys.MATERIAL_NAME,
    MaterialTabHeaderKeys.KSU_ID,
    MaterialInOrderTabHeaderKeys.QUANTITY_PER_UNIT,
    MaterialInOrderTabHeaderKeys.TOTAL_UNITS_COUNT,
    MaterialInOrderTabHeaderKeys.TOTAL_QUANTITY,
    MaterialTabHeaderKeys.DIMENSION,
    MaterialTabHeaderKeys.FULL_VOLUME,
];


export const OrderMaterialsTable = memo((props: OrderMaterialsTableProps) => {
    const { className, onOpen } = props;
    const editMode = useSelector(getOrderDetailsEditMode);
    const materialsForOrderForRendering = useSelector(getOrderFormData)?.materials?.map(el=>el);
    const dispatch = useAppDispatch();

    const onDoubleClickHandler = useCallback((item: MaterialToOrderTab)=>{
        editMode && dispatch(materialToOrderSliceActions.setMaterialToOrderForm(item));
        editMode && onOpen();
    },[dispatch, editMode, onOpen]);

    if (materialsForOrderForRendering){
        return (
            <>
                <VStack gap={'32px'}>
                    <TableGrid<MaterialToOrderTab, null, null>
                        tabKeys={materialForOrderTabHeaderKeys}
                        headerKeysMapper={materialsInOrderTitlesMapper}
                        items={Object.values(materialsForOrderForRendering)}
                        callback={(event, item)=>onDoubleClickHandler(item)}
                        template={'materialTemplate'}
                        // helpMappers={mapper}
                    />
                </VStack>
            </>
        );
    }
    return <div>Здесь должны были быть материалы к заказу, но что-то пошло не по плану...</div>;
});

OrderMaterialsTable.displayName = 'OrderMaterialsTable';



//const materialsForOrderForRendering: OrderMaterial[] = [
//     {
//         dimension: Dimension.L,
//         fullVolume: '100',
//         KSUId: '0210415',
//         materialName: 'Изолента',
//         quantityPerUnit: '0.2',
//         totalUnitsCount: '2',
//         totalQuantity: '0.4',
//     },
//     {
//         dimension: Dimension.L,
//         fullVolume: '100',
//         KSUId: '0210415',
//         materialName: 'Изолента',
//         quantityPerUnit: '0.2',
//         totalUnitsCount: '2',
//         totalQuantity: '0.4',
//     },
//     {
//         dimension: Dimension.L,
//         fullVolume: '100',
//         KSUId: '0210415',
//         materialName: 'Изолента',
//         quantityPerUnit: '0.2',
//         totalUnitsCount: '2',
//         totalQuantity: '0.4',
//     },
//     {
//         dimension: Dimension.L,
//         fullVolume: '100',
//         KSUId: '0210415',
//         materialName: 'Изолента',
//         quantityPerUnit: '0.2',
//         totalUnitsCount: '2',
//         totalQuantity: '0.4',
//     },
// ];