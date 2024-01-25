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
import { expandDataForMaterial } from '../../model/services/expandDataForMaterial/expandDataForMaterial';
import { filterObject } from '@/shared/lib/filterObject/filterObject';

interface OrderMaterialsTableProps {
    className?: string
    onOpen: () => void
    copyMaterialMode: boolean
}

const materialForOrderTabHeaderKeys = [
    MaterialTabHeaderKeys.MATERIAL_NAME,
    MaterialTabHeaderKeys.KSU_ID,
    MaterialInOrderTabHeaderKeys.QUANTITY_PER_UNIT,
    MaterialInOrderTabHeaderKeys.TOTAL_UNITS_COUNT,
    MaterialInOrderTabHeaderKeys.TOTAL_QUANTITY,
    // MaterialTabHeaderKeys.DIMENSION,
    // MaterialTabHeaderKeys.FULL_VOLUME,
];


export const OrderMaterialsTable = memo((props: OrderMaterialsTableProps) => {
    const { onOpen, copyMaterialMode } = props;
    const editMode = useSelector(getOrderDetailsEditMode);
    const materialsForOrderForRendering = useSelector(getOrderFormData)?.materials?.map(el=>el);
    const dispatch = useAppDispatch();

    const onDoubleClickHandler = useCallback((item: MaterialToOrderTab)=>{
        editMode && dispatch(materialToOrderSliceActions.setMaterialToOrderForm(item));
        editMode && onOpen();
    },[dispatch, editMode, onOpen]);

    const onCopyBtnClick = useCallback((el: MaterialToOrderTab)=>{
        console.log(el);
        dispatch(expandDataForMaterial(filterObject(el, ['_id'])));

    },[dispatch]);

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
                        stickyHeader={false}
                        copyMode={copyMaterialMode}
                        onCopyClick={onCopyBtnClick}
                        // helpMappers={mapper}
                    />
                </VStack>
            </>
        );
    }
    return <div>Здесь должны были быть материалы к заказу, но что-то пошло не по плану...</div>;
});

OrderMaterialsTable.displayName = 'OrderMaterialsTable';