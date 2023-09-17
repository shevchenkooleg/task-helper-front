import cls from './MaterialsPageTable.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Material } from '@/entities/Material';
import { useNavigate } from 'react-router-dom';
import { VStack } from '@/shared/ui/Stack';
import { MaterialTabHeaderKeys } from '@/features/addNewMaterial';
import {
    materialsTableContentMapper,
    materialsTableTitleMapper
} from '../../../../shared/lib/titleMappers/materialsTableMappers';
import { getRouteMaterialDetails } from '@/shared/const/router';
import { TableGrid } from '@/shared/ui/TableGrid';

interface MaterialsPageTableProps {
    className?: string
    materials?: Material[]
}

export const MaterialsPageTable = memo((props: MaterialsPageTableProps) => {
    const { className, materials } = props;
    const navigate = useNavigate();

    // const materialsForRendering = materials?.map((el)=>({ ...el, modified: timeConverter(el.modified!) }));
    const materialTabHeaderKeys = [
        MaterialTabHeaderKeys.MATERIAL_NAME,
        MaterialTabHeaderKeys.KSU_ID,
        MaterialTabHeaderKeys.UPP_ID,
        MaterialTabHeaderKeys.FULL_VOLUME,
        MaterialTabHeaderKeys.DIMENSION,
    ];

    const onDoubleClickHandler = (e: React.MouseEvent<HTMLTableRowElement>, el: Material) => {
        el._id && navigate(getRouteMaterialDetails(el._id));
    };

    if (materials){
        return (
            <VStack gap={'32px'}>
                <TableGrid<Material, null, null>
                    tabKeys={materialTabHeaderKeys}
                    headerKeysMapper={materialsTableTitleMapper}
                    items={Object.values(materials)}
                    callback={onDoubleClickHandler}
                    helpMappers={materialsTableContentMapper}
                    template={'materialTemplate'}
                />
            </VStack>

        );
    }

    return (
        <div className={classNames(cls.OrdersPageTable, {}, [className])}>
            Materials Table should be here but some things going wrong
        </div>
    );
});

MaterialsPageTable.displayName = 'MaterialsPageTable';